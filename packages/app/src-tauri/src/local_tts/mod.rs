mod catalog;
mod download;
mod paths;
mod runtime;
mod synthesize;

use catalog::voice_catalog;
use download::{delete_voice, download_voice};
use paths::{is_voice_installed_in, models_root};
use runtime::{download_piper_runtime, is_piper_runtime_installed};
use serde::Serialize;
use synthesize::synthesize_speech;
use tauri::AppHandle;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalTtsVoiceInfo {
    pub id: String,
    pub name: String,
    pub language: String,
    pub quality: String,
    pub installed: bool,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalTtsRuntimeInfo {
    pub installed: bool,
}

#[tauri::command]
pub fn list_local_tts_voices(app: AppHandle) -> Result<Vec<LocalTtsVoiceInfo>, String> {
    let models_root = models_root(&app)?;

    Ok(voice_catalog()
        .iter()
        .map(|voice| LocalTtsVoiceInfo {
            id: voice.id.clone(),
            name: voice.name.clone(),
            language: voice.language.clone(),
            quality: voice.quality.clone(),
            installed: is_voice_installed_in(&models_root, &voice.id),
        })
        .collect())
}

#[tauri::command]
pub fn get_local_tts_runtime_info(app: AppHandle) -> Result<LocalTtsRuntimeInfo, String> {
    Ok(LocalTtsRuntimeInfo {
        installed: is_piper_runtime_installed(&app)?,
    })
}

#[tauri::command]
pub async fn download_local_tts_runtime(app: AppHandle) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || download_piper_runtime(&app))
        .await
        .map_err(|error| format!("runtime download task failed: {error}"))?
}

#[tauri::command]
pub async fn download_local_tts_voice(app: AppHandle, voice_id: String) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || download_voice(&app, &voice_id))
        .await
        .map_err(|error| format!("download task failed: {error}"))?
}

#[tauri::command]
pub async fn delete_local_tts_voice(app: AppHandle, voice_id: String) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || delete_voice(&app, &voice_id))
        .await
        .map_err(|error| format!("delete task failed: {error}"))?
}

#[tauri::command]
pub async fn synthesize_local_speech(
    app: AppHandle,
    voice_id: String,
    text: String,
) -> Result<Vec<u8>, String> {
    tauri::async_runtime::spawn_blocking(move || synthesize_speech(&app, &voice_id, &text))
        .await
        .map_err(|error| format!("synthesis task failed: {error}"))?
}
