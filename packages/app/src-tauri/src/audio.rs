use std::fs::File;
use std::io::{BufReader, Cursor, Read, Seek};

use rodio::{Decoder, OutputStream, Sink, Source};

fn play_source<R>(read: R, volume: f32) -> Result<(), String>
where
    R: Read + Seek + Send + Sync + 'static,
{
    let (_stream, stream_handle) = OutputStream::try_default()
        .map_err(|error| format!("failed to open default audio output: {error}"))?;
    let source = Decoder::new(read)
        .map_err(|error| format!("failed to decode audio stream: {error}"))?
        .amplify(volume.clamp(0.0, 2.0));
    let sink = Sink::try_new(&stream_handle)
        .map_err(|error| format!("failed to create audio sink: {error}"))?;

    sink.append(source);
    sink.sleep_until_end();

    Ok(())
}

pub async fn play_audio_bytes(data: Vec<u8>, volume: f32) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || play_source(Cursor::new(data), volume))
        .await
        .map_err(|error| format!("audio playback task failed: {error}"))?
}

pub async fn play_audio_file(path: String, volume: f32) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || {
        let file = File::open(&path)
            .map_err(|error| format!("failed to open audio file {path}: {error}"))?;

        play_source(BufReader::new(file), volume)
    })
    .await
    .map_err(|error| format!("audio playback task failed: {error}"))?
}
