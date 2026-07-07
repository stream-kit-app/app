use std::path::PathBuf;

use tauri::{AppHandle, Manager};

fn resolve_scripts_root(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("failed to resolve app data dir: {error}"))?
        .join("scripts");

    std::fs::create_dir_all(&dir)
        .map_err(|error| format!("failed to create scripts directory: {error}"))?;

    Ok(dir)
}

#[tauri::command(rename_all = "camelCase")]
pub fn script_get_project_dir(app: AppHandle, handler_id: String) -> Result<String, String> {
    let dir = resolve_scripts_root(&app)?
        .join("handlers")
        .join(handler_id.trim());

    std::fs::create_dir_all(&dir)
        .map_err(|error| format!("failed to create script project directory: {error}"))?;

    Ok(dir.to_string_lossy().to_string())
}

#[tauri::command]
pub fn script_get_scripts_dir(app: AppHandle) -> Result<String, String> {
    resolve_scripts_root(&app).map(|path| path.to_string_lossy().to_string())
}
