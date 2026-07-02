use std::fs;
use std::io::Write;
use std::process::{Command, Stdio};

use super::paths::{config_file_path, is_voice_installed, model_file_path, voice_dir};
use super::runtime::ensure_piper_runtime;
use tauri::AppHandle;

pub fn synthesize_speech(app: &AppHandle, voice_id: &str, text: &str) -> Result<Vec<u8>, String> {
    if text.trim().is_empty() {
        return Err("text must not be empty".to_string());
    }

    if !is_voice_installed(app, voice_id)? {
        return Err(format!("voice is not installed: {voice_id}"));
    }

    let piper_executable = ensure_piper_runtime(app)?;
    let dir = voice_dir(app, voice_id)?;
    let model_path = model_file_path(&dir, voice_id);
    let config_path = config_file_path(&dir, voice_id);

    let output_path = std::env::temp_dir().join(format!(
        "stream-kit-tts-{}-{}.wav",
        voice_id.replace('/', "_"),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|duration| duration.as_nanos())
            .unwrap_or(0)
    ));

    let piper_home = piper_executable
        .parent()
        .ok_or_else(|| "failed to resolve Piper runtime directory".to_string())?;

    let mut command = Command::new(&piper_executable);
    command
        .current_dir(piper_home)
        .arg("--model")
        .arg(&model_path)
        .arg("--config")
        .arg(&config_path)
        .arg("--output_file")
        .arg(&output_path)
        .arg("--quiet")
        .stdin(Stdio::piped());

    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;

        const CREATE_NO_WINDOW: u32 = 0x0800_0000;
        command.creation_flags(CREATE_NO_WINDOW);
    }

    let mut child = command
        .spawn()
        .map_err(|error| format!("failed to run Piper: {error}"))?;

    if let Some(mut stdin) = child.stdin.take() {
        stdin
            .write_all(text.trim().as_bytes())
            .map_err(|error| format!("failed to send text to Piper: {error}"))?;
    }

    let status = child
        .wait()
        .map_err(|error| format!("failed while waiting for Piper: {error}"))?;

    if !status.success() {
        let _ = fs::remove_file(&output_path);
        return Err(format!(
            "Piper exited with status {}",
            status.code().unwrap_or(-1)
        ));
    }

    let wav_bytes = fs::read(&output_path)
        .map_err(|error| format!("failed to read synthesized WAV file: {error}"))?;

    let _ = fs::remove_file(&output_path);

    if wav_bytes.is_empty() {
        return Err("Piper produced an empty audio file".to_string());
    }

    Ok(wav_bytes)
}
