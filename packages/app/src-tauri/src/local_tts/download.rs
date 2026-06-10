use std::fs;
use std::io::Write;
use std::path::Path;

use reqwest::blocking::Client;

use super::catalog::{config_download_url, find_voice, model_download_url};
use super::paths::{config_file_path, model_file_path, voice_dir};
use tauri::AppHandle;

fn download_file(client: &Client, url: &str, destination: &Path) -> Result<(), String> {
    let response = client
        .get(url)
        .send()
        .map_err(|error| format!("download request failed: {error}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "download failed with status {} for {}",
            response.status(),
            url
        ));
    }

    let bytes = response
        .bytes()
        .map_err(|error| format!("failed to read download response: {error}"))?;

    if let Some(parent) = destination.parent() {
        fs::create_dir_all(parent)
            .map_err(|error| format!("failed to create directory {}: {error}", parent.display()))?;
    }

    let mut file = fs::File::create(destination)
        .map_err(|error| format!("failed to create file {}: {error}", destination.display()))?;

    file.write_all(&bytes)
        .map_err(|error| format!("failed to write file {}: {error}", destination.display()))?;

    Ok(())
}

pub fn download_voice(app: &AppHandle, voice_id: &str) -> Result<(), String> {
    if find_voice(voice_id).is_none() {
        return Err(format!("unknown voice id: {voice_id}"));
    }

    let model_url = model_download_url(voice_id)
        .ok_or_else(|| format!("no model URL for voice id: {voice_id}"))?;
    let config_url = config_download_url(voice_id)
        .ok_or_else(|| format!("no config URL for voice id: {voice_id}"))?;

    let dir = voice_dir(app, voice_id)?;
    let model_path = model_file_path(&dir, voice_id);
    let config_path = config_file_path(&dir, voice_id);

    let client = Client::builder()
        .timeout(std::time::Duration::from_secs(300))
        .build()
        .map_err(|error| format!("failed to create HTTP client: {error}"))?;

    download_file(&client, &model_url, &model_path)?;
    download_file(&client, &config_url, &config_path)?;

    Ok(())
}

pub fn delete_voice(app: &AppHandle, voice_id: &str) -> Result<(), String> {
    if find_voice(voice_id).is_none() {
        return Err(format!("unknown voice id: {voice_id}"));
    }

    let dir = voice_dir(app, voice_id)?;

    if dir.exists() {
        fs::remove_dir_all(&dir)
            .map_err(|error| format!("failed to remove voice directory: {error}"))?;
    }

    Ok(())
}
