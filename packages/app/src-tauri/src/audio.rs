use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Cursor, Read, Seek};
use std::sync::mpsc;
use std::sync::{Arc, Mutex};
use std::time::Duration;

use rodio::{Decoder, OutputStream, Sink, Source};
use tokio::time::timeout;

const PLAYBACK_TIMEOUT_MARGIN: Duration = Duration::from_secs(5);
const PLAYBACK_TIMEOUT_MAX: Duration = Duration::from_secs(120);
const PLAYBACK_INVOKE_TIMEOUT: Duration = Duration::from_secs(125);

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

fn sleep_until_end_or_timeout(sink: &Arc<Sink>, limit: Duration) {
	let (done_tx, done_rx) = mpsc::channel::<()>();
	let sink_for_timeout = Arc::clone(sink);
	let watchdog = std::thread::spawn(move || {
		if done_rx.recv_timeout(limit).is_err() {
			sink_for_timeout.stop();
		}
	});
	sink.sleep_until_end();
	let _ = done_tx.send(());
	let _ = watchdog.join();
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
	let (_stream, stream_handle) = OutputStream::try_default()
		.map_err(|error| format!("failed to open default audio output: {error}"))?;
	let source = Decoder::new(read)
		.map_err(|error| format!("failed to decode audio stream: {error}"))?
		.amplify(volume.clamp(0.0, 2.0));
	let limit = playback_timeout(source.total_duration());
	let sink = Sink::try_new(&stream_handle)
		.map_err(|error| format!("failed to create audio sink: {error}"))?;
	sink.append(source);
	let sink = Arc::new(sink);

	if let (Some(session_id), Some(state)) = (session_id, state) {
		let sink_for_stop = Arc::clone(&sink);
		let generation = state.register_stop(
			session_id.clone(),
			Box::new(move || {
				sink_for_stop.stop();
			}),
		);
		sleep_until_end_or_timeout(&sink, limit);
		state.unregister(&session_id, generation);
	} else {
		sleep_until_end_or_timeout(&sink, limit);
	}

	Ok(())
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
