use std::collections::HashMap;

use serde_json::Value;
use tauri::{AppHandle, State};

use super::server::{find_available_port, resolve_overlays_dir, run_server};
use super::state::{OverlayServerState, OverlayServerStatus, OVERLAY_SETTINGS_EVENT};

#[tauri::command]
pub async fn overlay_server_start(
    app: AppHandle,
    state: State<'_, OverlayServerState>,
    port: Option<u16>,
) -> Result<OverlayServerStatus, String> {
    if state.is_running().await {
        return Ok(state.status().await);
    }

    let preferred_port = port.unwrap_or(7891);
    let actual_port = find_available_port(preferred_port).await;
    let overlays_dir = resolve_overlays_dir(&app)?;

    let (shutdown_tx, shutdown_rx) = tokio::sync::oneshot::channel();

    let inner = run_server(actual_port, overlays_dir, shutdown_rx, app.clone()).await?;

    let mut inner_with_shutdown = inner;
    inner_with_shutdown.shutdown_tx = Some(shutdown_tx);

    state.set_running(inner_with_shutdown).await;

    Ok(state.status().await)
}

#[tauri::command]
pub async fn overlay_server_stop(state: State<'_, OverlayServerState>) -> Result<(), String> {
    state.clear().await;
    Ok(())
}

#[tauri::command]
pub async fn overlay_server_status(
    state: State<'_, OverlayServerState>,
) -> Result<OverlayServerStatus, String> {
    Ok(state.status().await)
}

#[tauri::command(rename_all = "camelCase")]
pub async fn overlay_broadcast(
    state: State<'_, OverlayServerState>,
    overlay_id: String,
    event: String,
    payload: Value,
) -> Result<(), String> {
    state.broadcast(overlay_id, event, payload).await
}

#[tauri::command(rename_all = "camelCase")]
pub async fn overlay_sync_config(
    state: State<'_, OverlayServerState>,
    overlay_id: String,
    config: Value,
) -> Result<(), String> {
    state.sync_config(overlay_id, config).await
}

#[tauri::command(rename_all = "camelCase")]
pub async fn overlay_sync_all_configs(
    state: State<'_, OverlayServerState>,
    configs: HashMap<String, Value>,
) -> Result<(), String> {
    state.sync_all_configs(configs).await
}

#[tauri::command(rename_all = "camelCase")]
pub async fn overlay_broadcast_settings(
    state: State<'_, OverlayServerState>,
    overlay_id: String,
    config: Value,
) -> Result<(), String> {
    state.sync_config(overlay_id.clone(), config.clone()).await?;
    state
        .broadcast(
            overlay_id,
            OVERLAY_SETTINGS_EVENT.to_string(),
            config,
        )
        .await
}

#[tauri::command]
pub async fn overlay_get_overlays_dir(app: AppHandle) -> Result<String, String> {
    resolve_overlays_dir(&app).map(|path| path.to_string_lossy().to_string())
}
