use std::net::SocketAddr;
use std::path::PathBuf;

use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Path as AxumPath, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{Html, IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use tauri::Manager;
use tokio::net::TcpListener;
use tokio::sync::{broadcast, oneshot};
use tower_http::cors::CorsLayer;

use super::state::{OverlayBroadcastMessage, OverlayServerInner};

#[derive(Clone)]
pub struct AppState {
    pub overlays_dir: PathBuf,
    pub broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
}

#[derive(Debug, Deserialize)]
struct WsQuery {
    #[serde(rename = "overlayId")]
    overlay_id: String,
}

pub async fn run_server(
    port: u16,
    overlays_dir: PathBuf,
    shutdown_rx: oneshot::Receiver<()>,
) -> Result<OverlayServerInner, String> {
    let (broadcast_tx, _) = broadcast::channel::<OverlayBroadcastMessage>(256);

    let app_state = AppState {
        overlays_dir: overlays_dir.clone(),
        broadcast_tx: broadcast_tx.clone(),
    };

    let router = Router::new()
        .route("/ws", get(ws_handler))
        .route("/o/{overlay_id}", get(serve_overlay_index))
        .route("/o/{overlay_id}/", get(serve_overlay_index))
        .route("/o/{overlay_id}/{*file_path}", get(serve_overlay_asset))
        .with_state(app_state)
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let listener = TcpListener::bind(addr)
        .await
        .map_err(|error| format!("failed to bind overlay server to port {port}: {error}"))?;

    let (shutdown_tx, shutdown_rx_inner) = oneshot::channel::<()>();

    let server = axum::serve(listener, router).with_graceful_shutdown(async move {
        let _ = shutdown_rx.await;
        let _ = shutdown_rx_inner.await;
    });

    tauri::async_runtime::spawn(async move {
        if let Err(error) = server.await {
            eprintln!("overlay server stopped with error: {error}");
        }
    });

    Ok(OverlayServerInner {
        port,
        overlays_dir,
        broadcast_tx,
        shutdown_tx: Some(shutdown_tx),
    })
}

async fn ws_handler(
    ws: WebSocketUpgrade,
    Query(query): Query<WsQuery>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    let overlay_id = query.overlay_id;
    let broadcast_tx = state.broadcast_tx.clone();

    ws.on_upgrade(move |socket| handle_socket(socket, overlay_id, broadcast_tx))
}

async fn handle_socket(
    socket: WebSocket,
    overlay_id: String,
    broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
) {
    let mut rx = broadcast_tx.subscribe();
    let (mut sender, mut receiver) = socket.split();

    let overlay_id_filter = overlay_id.clone();

    let mut send_task = tokio::spawn(async move {
        loop {
            match rx.recv().await {
                Ok(message) => {
                    if message.overlay_id != overlay_id_filter && message.overlay_id != "*" {
                        continue;
                    }

                    let json = match serde_json::to_string(&message) {
                        Ok(value) => value,
                        Err(_) => continue,
                    };

                    if sender.send(Message::Text(json.into())).await.is_err() {
                        break;
                    }
                }
                Err(broadcast::error::RecvError::Closed) => break,
                Err(broadcast::error::RecvError::Lagged(_)) => continue,
            }
        }
    });

    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(message)) = receiver.next().await {
            if matches!(message, Message::Close(_)) {
                break;
            }
        }
    });

    tokio::select! {
        _ = (&mut send_task) => recv_task.abort(),
        _ = (&mut recv_task) => send_task.abort(),
    }
}

async fn serve_overlay_index(
    AxumPath(overlay_id): AxumPath<String>,
    State(state): State<AppState>,
) -> Response {
    let dist_dir = state.overlays_dir.join(&overlay_id).join("dist");
    let index_path = dist_dir.join("index.html");

    if !index_path.exists() {
        return Html(overlay_not_built_html(&overlay_id)).into_response();
    }

    match std::fs::read_to_string(&index_path) {
        Ok(content) => Html(content).into_response(),
        Err(error) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("failed to read overlay index: {error}"),
        )
            .into_response(),
    }
}

async fn serve_overlay_asset(
    AxumPath((overlay_id, file_path)): AxumPath<(String, String)>,
    State(state): State<AppState>,
) -> Response {
    let dist_dir = state.overlays_dir.join(&overlay_id).join("dist");
    let asset_path = dist_dir.join(&file_path);

    if !asset_path.starts_with(&dist_dir) {
        return StatusCode::FORBIDDEN.into_response();
    }

    if !asset_path.exists() || asset_path.is_dir() {
        return StatusCode::NOT_FOUND.into_response();
    }

    match std::fs::read(&asset_path) {
        Ok(bytes) => {
            let mime = mime_guess::from_path(&asset_path)
                .first_or_octet_stream()
                .to_string();

            (
                [(header::CONTENT_TYPE, mime)],
                bytes,
            )
                .into_response()
        }
        Err(error) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("failed to read asset: {error}"),
        )
            .into_response(),
    }
}

fn overlay_not_built_html(overlay_id: &str) -> String {
    format!(
        r#"<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Overlay not built</title>
  <style>
    body {{
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, sans-serif;
      background: #0f0f12;
      color: #f4f4f5;
    }}
    main {{
      max-width: 32rem;
      padding: 2rem;
      border: 1px solid #3f3f46;
      border-radius: 1rem;
      background: #18181b;
    }}
    h1 {{ margin-top: 0; font-size: 1.25rem; }}
    p {{ line-height: 1.5; color: #d4d4d8; }}
    code {{
      font-family: ui-monospace, monospace;
      background: #27272a;
      padding: 0.15rem 0.35rem;
      border-radius: 0.35rem;
    }}
    pre {{
      background: #27272a;
      padding: 1rem;
      border-radius: 0.75rem;
      overflow-x: auto;
    }}
  </style>
</head>
<body>
  <main>
    <h1>Overlay not built</h1>
    <p>The overlay <code>{overlay_id}</code> does not have a <code>dist/index.html</code> file yet.</p>
    <p>Open the project in your editor from Stream Kit, then run:</p>
    <pre>pnpm install
pnpm run build</pre>
    <p>Vanilla HTML overlays are served directly from <code>dist/</code> without a build step.</p>
  </main>
</body>
</html>"#
    )
}

pub fn resolve_overlays_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("failed to resolve app data dir: {error}"))?
        .join("overlays");

    std::fs::create_dir_all(&dir)
        .map_err(|error| format!("failed to create overlays directory: {error}"))?;

    Ok(dir)
}

pub async fn find_available_port(preferred: u16) -> u16 {
    for port in preferred..preferred.saturating_add(20) {
        let addr = SocketAddr::from(([127, 0, 0, 1], port));
        if TcpListener::bind(addr).await.is_ok() {
            return port;
        }
    }

    preferred
}
