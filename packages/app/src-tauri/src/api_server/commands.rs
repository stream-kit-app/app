use serde::Deserialize;
use tauri::{AppHandle, State};

use super::server::{find_available_port, run_server};
use super::state::{ApiServerState, ApiServerStatus};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiServerStartOptions {
    pub port: Option<u16>,
    pub bind: Option<String>,
    pub token: String,
}

#[tauri::command(rename_all = "camelCase")]
pub async fn api_server_start(
    app: AppHandle,
    state: State<'_, ApiServerState>,
    options: ApiServerStartOptions,
) -> Result<ApiServerStatus, String> {
    if state.is_running().await {
        return Ok(state.status().await);
    }

    let token = options.token.trim().to_string();
    if token.is_empty() {
        return Err("API server token is required".to_string());
    }

    let bind = options
        .bind
        .unwrap_or_else(|| "127.0.0.1".to_string())
        .trim()
        .to_string();

    if bind != "127.0.0.1" && bind != "0.0.0.0" {
        return Err("bind must be 127.0.0.1 or 0.0.0.0".to_string());
    }

    let preferred_port = options.port.unwrap_or(7892);
    let actual_port = find_available_port(&bind, preferred_port).await?;

    let (shutdown_tx, shutdown_rx) = tokio::sync::oneshot::channel();

    let mut inner = run_server(&bind, actual_port, token, shutdown_rx, app.clone()).await?;
    inner.shutdown_tx = Some(shutdown_tx);

    state.set_running(inner).await;

    Ok(state.status().await)
}

#[tauri::command]
pub async fn api_server_stop(state: State<'_, ApiServerState>) -> Result<(), String> {
    state.clear().await;
    Ok(())
}

#[tauri::command]
pub async fn api_server_status(
    state: State<'_, ApiServerState>,
) -> Result<ApiServerStatus, String> {
    Ok(state.status().await)
}

#[tauri::command(rename_all = "camelCase")]
pub async fn api_server_send(
    state: State<'_, ApiServerState>,
    client_ids: Vec<String>,
    data: String,
) -> Result<(), String> {
    state.send(client_ids, data).await
}

#[tauri::command(rename_all = "camelCase")]
pub async fn api_server_broadcast(
    state: State<'_, ApiServerState>,
    data: String,
) -> Result<(), String> {
    state.send(Vec::new(), data).await
}
