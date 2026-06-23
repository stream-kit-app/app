use std::fs::File;
use std::io::BufReader;
use std::path::Path;

use mp4parse::{read_mp4, TrackType};

fn ticks_to_ms(duration_ticks: u64, timescale: u64) -> Option<u64> {
	if timescale == 0 || duration_ticks == 0 {
		return None;
	}

	let ms = ((duration_ticks as f64 / timescale as f64) * 1000.0).ceil() as u64;

	if ms == 0 {
		return None;
	}

	Some(ms)
}

fn probe_mp4_duration_ms(path: &Path) -> Result<Option<u64>, String> {
	let file =
		File::open(path).map_err(|error| format!("failed to open {}: {error}", path.display()))?;
	let mut reader = BufReader::new(file);
	let context = read_mp4(&mut reader)
		.map_err(|error| format!("failed to parse {}: {error}", path.display()))?;

	let movie_timescale = context.timescale.map(|scale| scale.0);
	let mut max_ms = 0u64;

	for track in &context.tracks {
		if !matches!(track.track_type, TrackType::Video | TrackType::Audio) {
			continue;
		}

		let timescale = track
			.timescale
			.map(|value| value.0)
			.or(movie_timescale)
			.unwrap_or(0);

		let duration_ticks = track
			.duration
			.map(|value| value.0)
			.or_else(|| track.tkhd.as_ref().map(|header| header.duration))
			.unwrap_or(0);

		if let Some(ms) = ticks_to_ms(duration_ticks, timescale) {
			max_ms = max_ms.max(ms);
		}
	}

	if max_ms == 0 {
		return Ok(None);
	}

	Ok(Some(max_ms))
}

pub fn probe_duration_ms(path: &str) -> Result<Option<u64>, String> {
	let path = Path::new(path.trim());

	if !path.is_file() {
		return Ok(None);
	}

	let extension = path
		.extension()
		.and_then(|value| value.to_str())
		.map(|value| value.to_ascii_lowercase());

	match extension.as_deref() {
		Some("mp4") | Some("m4v") | Some("mov") => probe_mp4_duration_ms(path),
		_ => Ok(None),
	}
}

#[tauri::command]
pub async fn get_media_file_duration_ms(path: String) -> Result<Option<u64>, String> {
	tauri::async_runtime::spawn_blocking(move || probe_duration_ms(&path))
		.await
		.map_err(|error| format!("duration probe task failed: {error}"))?
}
