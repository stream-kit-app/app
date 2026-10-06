use std::net::SocketAddr;
use std::path::{Component, Path, PathBuf};
use std::time::{Duration, Instant};

use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Path as AxumPath, Query, Request, State};
use axum::http::{header, HeaderMap, StatusCode};
use axum::middleware::{self, Next};
use axum::response::{Html, IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use serde_json::Value;
use tauri::{AppHandle, Emitter, Manager};
use tokio::net::TcpListener;
use tokio::sync::{broadcast, oneshot};

use super::state::{
    create_overlay_config_cache, overlay_settings_message, parse_overlay_incoming,
    OverlayBroadcastMessage, OverlayConfigCache, OverlayServerInner,
};

/// Overlay pages only ever send small control messages back to the app.
const MAX_INCOMING_MESSAGE_BYTES: usize = 64 * 1024;
/// Incoming messages per socket per second; extra messages are dropped.
const MAX_INCOMING_MESSAGES_PER_SECOND: u32 = 50;
const OVERLAY_ID_MAX_LEN: usize = 64;

#[derive(Clone)]
pub struct AppState {
    pub overlays_dir: PathBuf,
    pub broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
    pub config_cache: OverlayConfigCache,
    pub app_handle: AppHandle,
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
    app_handle: AppHandle,
) -> Result<OverlayServerInner, String> {
    let (broadcast_tx, _) = broadcast::channel::<OverlayBroadcastMessage>(256);
    let config_cache = create_overlay_config_cache();

    let app_state = AppState {
        overlays_dir: overlays_dir.clone(),
        broadcast_tx: broadcast_tx.clone(),
        config_cache: config_cache.clone(),
        app_handle: app_handle.clone(),
    };

    let router = Router::new()
        .route("/ws", get(ws_handler))
        .route("/o/{overlay_id}", get(serve_overlay_index))
        .route("/o/{overlay_id}/", get(serve_overlay_index))
        .route("/o/{overlay_id}/{*file_path}", get(serve_overlay_asset))
        .with_state(app_state)
        .layer(middleware::from_fn_with_state(port, require_loopback_host));

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
        config_cache,
        shutdown_tx: Some(shutdown_tx),
    })
}

/// Rejects requests whose `Host` isn't this loopback server, so a public site can't
/// reach it through DNS rebinding.
async fn require_loopback_host(State(port): State<u16>, request: Request, next: Next) -> Response {
    let allowed = request
        .headers()
        .get(header::HOST)
        .and_then(|value| value.to_str().ok())
        .is_some_and(|host| {
            host == format!("127.0.0.1:{port}") || host == format!("localhost:{port}")
        });

    if !allowed {
        return StatusCode::FORBIDDEN.into_response();
    }

    next.run(request).await
}

/// Overlay ids are UUIDs or slugs; anything else could escape the overlays directory.
fn is_valid_overlay_id(overlay_id: &str) -> bool {
    !overlay_id.is_empty()
        && overlay_id.len() <= OVERLAY_ID_MAX_LEN
        && overlay_id
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || byte == b'-' || byte == b'_')
}

/// OBS loads overlays from this server (same origin) and scaffolded overlays run on a
/// local Vite dev server; pages on any other site must not open the socket.
fn is_allowed_ws_origin(headers: &HeaderMap) -> bool {
    let Some(origin) = headers.get(header::ORIGIN) else {
        // Non-browser local clients don't send an Origin.
        return true;
    };
    let Ok(origin) = origin.to_str() else {
        return false;
    };
    let Some(authority) = origin.strip_prefix("http://") else {
        return false;
    };
    let host = authority
        .rsplit_once(':')
        .map_or(authority, |(host, _port)| host);

    matches!(host, "127.0.0.1" | "localhost" | "[::1]")
}

async fn ws_handler(
    ws: WebSocketUpgrade,
    headers: HeaderMap,
    Query(query): Query<WsQuery>,
    State(state): State<AppState>,
) -> Response {
    let overlay_id = query.overlay_id;

    if !is_allowed_ws_origin(&headers) {
        return StatusCode::FORBIDDEN.into_response();
    }

    if !is_valid_overlay_id(&overlay_id) {
        return StatusCode::NOT_FOUND.into_response();
    }

    let known_overlay = state.config_cache.read().await.contains_key(&overlay_id)
        || tokio::fs::metadata(state.overlays_dir.join(&overlay_id))
            .await
            .is_ok_and(|metadata| metadata.is_dir());
    if !known_overlay {
        return StatusCode::NOT_FOUND.into_response();
    }

    let broadcast_tx = state.broadcast_tx.clone();
    let config_cache = state.config_cache.clone();
    let app_handle = state.app_handle.clone();

    ws.max_message_size(MAX_INCOMING_MESSAGE_BYTES)
        .on_upgrade(move |socket| {
            handle_socket(socket, overlay_id, broadcast_tx, config_cache, app_handle)
        })
        .into_response()
}

async fn handle_socket(
    socket: WebSocket,
    overlay_id: String,
    broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
    config_cache: OverlayConfigCache,
    app_handle: AppHandle,
) {
    let config = config_cache
        .read()
        .await
        .get(&overlay_id)
        .cloned()
        .unwrap_or(Value::Object(Default::default()));

    let settings_message = overlay_settings_message(overlay_id.clone(), config);
    let settings_json = match serde_json::to_string(&settings_message) {
        Ok(value) => value,
        Err(_) => return,
    };

    let (mut sender, mut receiver) = socket.split();

    if sender
        .send(Message::Text(settings_json.into()))
        .await
        .is_err()
    {
        return;
    }

    let mut rx = broadcast_tx.subscribe();
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

    let recv_overlay_id = overlay_id.clone();
    let mut recv_task = tokio::spawn(async move {
        let mut window_start = Instant::now();
        let mut window_count = 0u32;

        while let Some(result) = receiver.next().await {
            let Ok(message) = result else {
                break;
            };

            match message {
                Message::Text(text) => {
                    if window_start.elapsed() >= Duration::from_secs(1) {
                        window_start = Instant::now();
                        window_count = 0;
                    }
                    window_count += 1;
                    if window_count > MAX_INCOMING_MESSAGES_PER_SECOND {
                        continue;
                    }

                    if let Some(incoming) =
                        parse_overlay_incoming(text.as_ref(), &recv_overlay_id)
                    {
                        let _ = app_handle.emit("overlay-message", incoming);
                    }
                }
                Message::Close(_) => break,
                _ => {}
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
    if !is_valid_overlay_id(&overlay_id) {
        return StatusCode::NOT_FOUND.into_response();
    }

    let index_path = state.overlays_dir.join(&overlay_id).join("dist").join("index.html");

    if !tokio::fs::try_exists(&index_path).await.unwrap_or(false) {
        return Html(overlay_not_built_html(&overlay_id)).into_response();
    }

    match tokio::fs::read_to_string(&index_path).await {
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
    if !is_valid_overlay_id(&overlay_id) || !is_plain_relative_path(&file_path) {
        return StatusCode::NOT_FOUND.into_response();
    }

    let Some(asset_path) = resolve_asset_path(&state.overlays_dir, &overlay_id, &file_path).await
    else {
        return StatusCode::NOT_FOUND.into_response();
    };

    match tokio::fs::read(&asset_path).await {
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

/// Only plain path segments: no `..`, roots, drive prefixes or `.`.
fn is_plain_relative_path(path: &str) -> bool {
    !path.is_empty()
        && Path::new(path)
            .components()
            .all(|component| matches!(component, Component::Normal(_)))
}

/// Resolves symlinks and confirms the file really lives inside the overlay's `dist`.
async fn resolve_asset_path(
    overlays_dir: &Path,
    overlay_id: &str,
    file_path: &str,
) -> Option<PathBuf> {
    let dist_dir = tokio::fs::canonicalize(overlays_dir.join(overlay_id).join("dist"))
        .await
        .ok()?;
    let asset_path = tokio::fs::canonicalize(dist_dir.join(file_path)).await.ok()?;

    if !asset_path.starts_with(&dist_dir) {
        return None;
    }

    let metadata = tokio::fs::metadata(&asset_path).await.ok()?;
    metadata.is_file().then_some(asset_path)
}

fn escape_html(value: &str) -> String {
    let mut escaped = String::with_capacity(value.len());
    for character in value.chars() {
        match character {
            '&' => escaped.push_str("&amp;"),
            '<' => escaped.push_str("&lt;"),
            '>' => escaped.push_str("&gt;"),
            '"' => escaped.push_str("&quot;"),
            '\'' => escaped.push_str("&#39;"),
            _ => escaped.push(character),
        }
    }
    escaped
}

fn overlay_not_built_html(overlay_id: &str) -> String {
    let overlay_id = escape_html(overlay_id);
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
