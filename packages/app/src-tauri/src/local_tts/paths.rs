use std::path::{Path, PathBuf};

use tauri::{AppHandle, Manager};

pub fn models_root(app: &AppHandle) -> Result<PathBuf, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("failed to resolve app data directory: {error}"))?;
    let models_dir = app_data_dir.join("tts").join("models");

    std::fs::create_dir_all(&models_dir)
        .map_err(|error| format!("failed to create TTS models directory: {error}"))?;

    Ok(models_dir)
}

pub fn voice_dir(app: &AppHandle, voice_id: &str) -> Result<PathBuf, String> {
    Ok(models_root(app)?.join(voice_id))
}

pub fn model_file_path(voice_dir: &Path, voice_id: &str) -> PathBuf {
    voice_dir.join(format!("{voice_id}.onnx"))
}

pub fn config_file_path(voice_dir: &Path, voice_id: &str) -> PathBuf {
    voice_dir.join(format!("{voice_id}.onnx.json"))
}

pub fn is_voice_installed(app: &AppHandle, voice_id: &str) -> Result<bool, String> {
    let models_root = models_root(app)?;
    Ok(is_voice_installed_in(&models_root, voice_id))
}

pub fn is_voice_installed_in(models_root: &Path, voice_id: &str) -> bool {
    let dir = models_root.join(voice_id);
    let model_path = model_file_path(&dir, voice_id);
    let config_path = config_file_path(&dir, voice_id);

    model_path.is_file() && config_path.is_file()
}
