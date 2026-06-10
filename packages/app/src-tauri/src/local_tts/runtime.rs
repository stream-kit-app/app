use std::fs::{self, File};
use std::io::copy;
use std::path::{Path, PathBuf};

use reqwest::blocking::Client;
use tauri::{AppHandle, Manager};
use zip::ZipArchive;

const PIPER_RELEASE_TAG: &str = "2023.11.14-2";
const PIPER_WINDOWS_URL: &str =
    "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip";

pub fn piper_runtime_dir(app: &AppHandle) -> Result<PathBuf, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("failed to resolve app data directory: {error}"))?;
    let runtime_dir = app_data_dir.join("tts").join("piper");

    fs::create_dir_all(&runtime_dir)
        .map_err(|error| format!("failed to create Piper runtime directory: {error}"))?;

    Ok(runtime_dir)
}

pub fn piper_executable_path(app: &AppHandle) -> Result<PathBuf, String> {
    let runtime_dir = piper_runtime_dir(app)?;
    find_piper_executable(&runtime_dir)
}

pub fn is_piper_runtime_installed(app: &AppHandle) -> Result<bool, String> {
    Ok(piper_executable_path(app).is_ok())
}

pub fn ensure_piper_runtime(app: &AppHandle) -> Result<PathBuf, String> {
    if let Ok(executable) = piper_executable_path(app) {
        return Ok(executable);
    }

    download_piper_runtime(app)?;
    piper_executable_path(app)
}

pub fn download_piper_runtime(app: &AppHandle) -> Result<(), String> {
    let runtime_dir = piper_runtime_dir(app)?;
    let zip_path = runtime_dir.join("piper_windows_amd64.zip");

    let client = Client::builder()
        .timeout(std::time::Duration::from_secs(300))
        .build()
        .map_err(|error| format!("failed to create HTTP client: {error}"))?;

    let response = client
        .get(PIPER_WINDOWS_URL)
        .send()
        .map_err(|error| format!("failed to download Piper runtime: {error}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "failed to download Piper runtime (status {})",
            response.status()
        ));
    }

    let mut zip_file = File::create(&zip_path)
        .map_err(|error| format!("failed to create Piper zip file: {error}"))?;

    copy(
        &mut response
            .bytes()
            .map_err(|error| format!("failed to read Piper zip response: {error}"))?
            .as_ref(),
        &mut zip_file,
    )
    .map_err(|error| format!("failed to write Piper zip file: {error}"))?;

    extract_piper_zip(&zip_path, &runtime_dir)?;

    let _ = fs::remove_file(&zip_path);

    find_piper_executable(&runtime_dir).map_err(|error| {
        format!("Piper executable was not found after extracting release {PIPER_RELEASE_TAG}: {error}")
    })?;

    Ok(())
}

fn find_piper_executable(runtime_dir: &Path) -> Result<PathBuf, String> {
    let expected = runtime_dir.join("piper").join("piper.exe");

    if expected.is_file() {
        return Ok(expected);
    }

    find_piper_executable_recursive(runtime_dir)
}

fn find_piper_executable_recursive(root: &Path) -> Result<PathBuf, String> {
    let entries = fs::read_dir(root)
        .map_err(|error| format!("failed to read Piper runtime directory: {error}"))?;

    for entry in entries {
        let entry = entry.map_err(|error| format!("failed to read directory entry: {error}"))?;
        let path = entry.path();

        if path.is_dir() {
            if let Ok(found) = find_piper_executable_recursive(&path) {
                return Ok(found);
            }

            continue;
        }

        if path
            .file_name()
            .and_then(|name| name.to_str())
            .is_some_and(|name| name.eq_ignore_ascii_case("piper.exe"))
        {
            return Ok(path);
        }
    }

    Err(format!(
        "piper.exe was not found under {}",
        root.display()
    ))
}

fn extract_piper_zip(zip_path: &Path, destination: &Path) -> Result<(), String> {
    let file = File::open(zip_path)
        .map_err(|error| format!("failed to open Piper zip file: {error}"))?;

    let mut archive = ZipArchive::new(file)
        .map_err(|error| format!("failed to read Piper zip archive: {error}"))?;

    for index in 0..archive.len() {
        let mut entry = archive
            .by_index(index)
            .map_err(|error| format!("failed to read Piper zip entry: {error}"))?;

        let entry_path = entry
            .enclosed_name()
            .ok_or_else(|| "invalid path in Piper zip archive".to_string())?;

        let output_path = destination.join(entry_path);

        if entry.name().ends_with('/') {
            fs::create_dir_all(&output_path)
                .map_err(|error| format!("failed to create extracted directory: {error}"))?;
            continue;
        }

        if let Some(parent) = output_path.parent() {
            fs::create_dir_all(parent)
                .map_err(|error| format!("failed to create parent directory: {error}"))?;
        }

        let mut output_file = File::create(&output_path)
            .map_err(|error| format!("failed to create extracted file: {error}"))?;

        copy(&mut entry, &mut output_file)
            .map_err(|error| format!("failed to extract Piper file: {error}"))?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn expected_piper_path_matches_release_layout() {
        let runtime_dir = PathBuf::from("C:/app-data/tts/piper");
        let expected = runtime_dir.join("piper").join("piper.exe");
        assert_eq!(expected.file_name().and_then(|name| name.to_str()), Some("piper.exe"));
        assert_eq!(
            expected.parent().and_then(|path| path.file_name()).and_then(|name| name.to_str()),
            Some("piper")
        );
    }
}
