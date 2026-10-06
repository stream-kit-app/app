use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Cursor, Read, Seek};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use rodio::{Decoder, DeviceSinkBuilder, Player, Source};
use tokio::time::timeout;

const PLAYBACK_TIMEOUT_MARGIN: Duration = Duration::from_secs(5);
const PLAYBACK_TIMEOUT_MAX: Duration = Duration::from_secs(120);
const PLAYBACK_INVOKE_TIMEOUT: Duration = Duration::from_secs(125);
const PLAYBACK_POLL_INTERVAL: Duration = Duration::from_millis(20);

type StopFn = Box<dyn Fn() + Send + Sync>;

struct SessionEntry {
	generation: u64,
	stop: StopFn,
}

#[derive(Clone)]
pub struct AudioPlaybackState {
	sessions: Arc<Mutex<HashMap<String, SessionEntry>>>,
	next_generation: Arc<Mutex<u64>>,
}

impl AudioPlaybackState {
	pub fn new() -> Self {
		Self {
			sessions: Arc::new(Mutex::new(HashMap::new())),
			next_generation: Arc::new(Mutex::new(1)),
		}
	}

	fn next_generation(&self) -> u64 {
		let mut generation = self
			.next_generation
			.lock()
			.expect("audio generation mutex poisoned");
		let value = *generation;
		*generation = generation.wrapping_add(1);
		value
	}

	fn register_stop(&self, session_id: String, stop: StopFn) -> u64 {
		let generation = self.next_generation();
		let mut sessions = self
			.sessions
			.lock()
			.expect("audio sessions mutex poisoned");

		if let Some(previous) = sessions.remove(&session_id) {
			(previous.stop)();
		}

		sessions.insert(session_id, SessionEntry { generation, stop });
		generation
	}

	fn unregister(&self, session_id: &str, generation: u64) {
		let mut sessions = self
			.sessions
			.lock()
			.expect("audio sessions mutex poisoned");

		if sessions.get(session_id).is_some_and(|entry| entry.generation == generation) {
			sessions.remove(session_id);
		}
	}

	pub fn stop(&self, session_id: &str) -> Result<(), String> {
		let stop = {
			let mut sessions = self
				.sessions
				.lock()
				.expect("audio sessions mutex poisoned");
			sessions.remove(session_id).map(|entry| entry.stop)
		};

		if let Some(stop) = stop {
			stop();
		}

		Ok(())
	}
}

fn playback_timeout(source_duration: Option<Duration>) -> Duration {
	source_duration
		.map(|duration| duration.saturating_add(PLAYBACK_TIMEOUT_MARGIN))
		.unwrap_or(PLAYBACK_TIMEOUT_MAX)
		.min(PLAYBACK_TIMEOUT_MAX)
		.max(PLAYBACK_TIMEOUT_MARGIN)
}

/// Why playback stopped waiting before the clip finished on its own.
enum PlaybackEnd {
	Finished,
	Stopped,
	TimedOut,
	StreamFailed,
}

/// Polls instead of `Player::sleep_until_end`: rodio only applies `stop()` while the
/// output device pulls samples, so a lost/switched device (e.g. OBS grabbing audio on
/// a scene switch) would otherwise block this thread — and the caller's queue — forever.
fn wait_until_done(
	player: &Player,
	stopped: &AtomicBool,
	stream_failed: &AtomicBool,
	limit: Duration,
) -> PlaybackEnd {
	let deadline = Instant::now() + limit;

	let end = loop {
		if player.empty() {
			break PlaybackEnd::Finished;
		}
		if stopped.load(Ordering::SeqCst) {
			break PlaybackEnd::Stopped;
		}
		if stream_failed.load(Ordering::SeqCst) {
			break PlaybackEnd::StreamFailed;
		}
		if Instant::now() >= deadline {
			break PlaybackEnd::TimedOut;
		}
		std::thread::sleep(PLAYBACK_POLL_INTERVAL);
	};

	player.stop();
	end
}

fn play_source<R>(
	read: R,
	volume: f32,
	session_id: Option<String>,
	state: Option<AudioPlaybackState>,
) -> Result<(), String>
where
	R: Read + Seek + Send + Sync + 'static,
{
	let stream_failed = Arc::new(AtomicBool::new(false));
	let stream_failed_for_callback = Arc::clone(&stream_failed);
	let mut device_sink = DeviceSinkBuilder::from_default_device()
		.map_err(|error| format!("failed to open default audio output: {error}"))?
		.with_error_callback(move |error| {
			eprintln!("audio stream error: {error}");
			stream_failed_for_callback.store(true, Ordering::SeqCst);
		})
		.open_sink_or_fallback()
		.map_err(|error| format!("failed to open default audio output: {error}"))?;
	device_sink.log_on_drop(false);
	let source = Decoder::new(read)
		.map_err(|error| format!("failed to decode audio stream: {error}"))?
		.amplify(volume.clamp(0.0, 2.0));
	let limit = playback_timeout(source.total_duration());
	let player = Player::connect_new(device_sink.mixer());
	player.append(source);

	let stopped = Arc::new(AtomicBool::new(false));
	let end = if let (Some(session_id), Some(state)) = (session_id, state) {
		let stopped_for_session = Arc::clone(&stopped);
		let generation = state.register_stop(
			session_id.clone(),
			Box::new(move || {
				stopped_for_session.store(true, Ordering::SeqCst);
			}),
		);
		let end = wait_until_done(&player, &stopped, &stream_failed, limit);
		state.unregister(&session_id, generation);
		end
	} else {
		wait_until_done(&player, &stopped, &stream_failed, limit)
	};

	match end {
		PlaybackEnd::Finished | PlaybackEnd::Stopped => Ok(()),
		PlaybackEnd::TimedOut => Err("audio playback did not finish in time".to_string()),
		PlaybackEnd::StreamFailed => Err("audio output device stopped during playback".to_string()),
	}
}

async fn run_playback_blocking<F>(work: F) -> Result<(), String>
where
	F: FnOnce() -> Result<(), String> + Send + 'static,
{
	timeout(
		PLAYBACK_INVOKE_TIMEOUT,
		tauri::async_runtime::spawn_blocking(work),
	)
	.await
	.map_err(|_| "audio playback timed out".to_string())?
	.map_err(|error| format!("audio playback task failed: {error}"))?
}

pub async fn play_audio_bytes(
	state: AudioPlaybackState,
	data: Vec<u8>,
	volume: f32,
	session_id: Option<String>,
) -> Result<(), String> {
	run_playback_blocking(move || {
		let playback_state = session_id.as_ref().map(|_| state);
		play_source(Cursor::new(data), volume, session_id, playback_state)
	})
	.await
}

pub async fn play_audio_file(
	state: AudioPlaybackState,
	path: String,
	volume: f32,
	session_id: Option<String>,
) -> Result<(), String> {
	run_playback_blocking(move || {
		let file = File::open(&path)
			.map_err(|error| format!("failed to open audio file {path}: {error}"))?;
		let playback_state = session_id.as_ref().map(|_| state);
		play_source(BufReader::new(file), volume, session_id, playback_state)
	})
	.await
}
