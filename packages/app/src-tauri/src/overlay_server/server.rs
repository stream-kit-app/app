use std::collections::HashMap;
use std::net::SocketAddr;
use std::path::{Path, PathBuf};

use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Path as AxumPath, Query, State};
use axum::http::{header, StatusCode, Uri};
use axum::response::{Html, IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use tauri::Manager;
use tokio::net::TcpListener;
use tokio::sync::{broadcast, oneshot};
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;

use super::state::{OverlayBroadcastMessage, OverlayServerInner};

#[derive(Clone)]
pub struct AppState {
    pub overlays_dir: PathBuf,
    pub sdk_dir: PathBuf,
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
    sdk_dir: PathBuf,
    shutdown_rx: oneshot::Receiver<()>,
) -> Result<OverlayServerInner, String> {
    let (broadcast_tx, _) = broadcast::channel::<OverlayBroadcastMessage>(256);

    let app_state = AppState {
        overlays_dir: overlays_dir.clone(),
        sdk_dir: sdk_dir.clone(),
        broadcast_tx: broadcast_tx.clone(),
    };

    let router = Router::new()
        .route("/ws", get(ws_handler))
        .route("/o/{overlay_id}", get(serve_overlay_index))
        .route("/o/{overlay_id}/", get(serve_overlay_index))
        .route("/o/{overlay_id}/{*file_path}", get(serve_overlay_asset))
        .nest_service(
            "/overlay-sdk",
            ServeDir::new(sdk_dir.clone()).append_index_html_on_directories(true),
        )
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
        sdk_dir,
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
    uri: Uri,
    State(state): State<AppState>,
) -> Response {
    let dist_dir = state.overlays_dir.join(&overlay_id).join("dist");
    let index_path = dist_dir.join("index.html");

    if !index_path.exists() {
        return (StatusCode::NOT_FOUND, "overlay not found or not built").into_response();
    }

    let html = match std::fs::read_to_string(&index_path) {
        Ok(content) => content,
        Err(error) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("failed to read overlay index: {error}"),
            )
                .into_response();
        }
    };

    let context = load_overlay_context(&state.overlays_dir, &overlay_id, uri.query());

    let injected = prepare_overlay_html(&html, &context);

    Html(injected).into_response()
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

    if file_path == "main.js" {
        if let Ok(content) = std::fs::read_to_string(&asset_path) {
            if overlay_main_js_needs_migration(&content) {
                let mime = "text/javascript";
                return (
                    [(header::CONTENT_TYPE, mime)],
                    overlay_main_js_template().as_bytes().to_vec(),
                )
                    .into_response();
            }
        }
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

fn load_overlay_context(
    overlays_dir: &Path,
    overlay_id: &str,
    query: Option<&str>,
) -> serde_json::Value {
    let context_path = overlays_dir.join(overlay_id).join("context.json");
    let mut context: serde_json::Value = if context_path.exists() {
        std::fs::read_to_string(&context_path)
            .ok()
            .and_then(|content| serde_json::from_str(&content).ok())
            .unwrap_or_else(|| serde_json::json!({}))
    } else {
        serde_json::json!({})
    };

    let query_context = parse_query_context(query);

    if let serde_json::Value::Object(ref mut map) = context {
        if let serde_json::Value::Object(query_map) = query_context {
            for (key, value) in query_map {
                map.insert(key, value);
            }
        }
    }

    let mut envelope = serde_json::Map::new();
    envelope.insert("overlayId".into(), serde_json::Value::String(overlay_id.into()));
    envelope.insert("context".into(), context);

    serde_json::Value::Object(envelope)
}

fn parse_query_context(query: Option<&str>) -> serde_json::Value {
    let Some(query) = query else {
        return serde_json::json!({});
    };

    let mut map = HashMap::new();

    for pair in query.split('&') {
        let Some((key, value)) = pair.split_once('=') else {
            continue;
        };

        let decoded_key = urlencoding::decode(key)
            .map(|value| value.into_owned())
            .unwrap_or_else(|_| key.to_string());
        let decoded_value = urlencoding::decode(value)
            .map(|value| value.into_owned())
            .unwrap_or_else(|_| value.to_string());

        map.insert(decoded_key, decoded_value);
    }

    serde_json::Value::Object(
        map.into_iter()
            .map(|(key, value)| (key, serde_json::Value::String(value)))
            .collect(),
    )
}

fn overlay_main_js_template() -> &'static str {
    r#"import { mount } from '/overlay-sdk/overlay-runtime.js';
import App from './app.compiled.js';

mount(App, { target: document.body });
"#
}

fn overlay_main_js_needs_migration(content: &str) -> bool {
    content.contains("bootstrap.js") || content.contains("mountOverlay")
}

fn strip_import_maps(html: &str) -> String {
    let mut result = String::with_capacity(html.len());
    let mut cursor = 0usize;
    let marker = r#"<script type="importmap">"#;

    while let Some(start) = html[cursor..].find(marker) {
        let start = cursor + start;
        result.push_str(&html[cursor..start]);

        let Some(end) = html[start..].find("</script>") else {
            result.push_str(&html[start..]);
            return result;
        };

        cursor = start + end + "</script>".len();
    }

    result.push_str(&html[cursor..]);
    result
}

fn overlay_import_map_script() -> &'static str {
    r#"<script type="importmap">
{
  "imports": {
    "@stream-kit/overlay-sdk": "/overlay-sdk/index.js",
    "svelte": "/overlay-sdk/overlay-runtime.js",
    "svelte/internal/disclose-version": "/overlay-sdk/overlay-runtime.js",
    "svelte/internal/client": "/overlay-sdk/overlay-runtime.js",
    "svelte/internal/flags/legacy": "/overlay-sdk/overlay-runtime.js",
    "svelte/internal/flags/async": "/overlay-sdk/overlay-runtime.js",
    "svelte/internal/flags/tracing": "/overlay-sdk/overlay-runtime.js",
    "svelte/reactivity": "/overlay-sdk/overlay-runtime.js"
  }
}
</script>"#
}

fn ensure_overlay_import_map(html: &str) -> String {
    let html = strip_import_maps(html);
    let import_map = overlay_import_map_script();

    if let Some(position) = html.find("<head>") {
        let insert_at = position + "<head>".len();
        let mut result = String::with_capacity(html.len() + import_map.len());
        result.push_str(&html[..insert_at]);
        result.push_str(import_map);
        result.push_str(&html[insert_at..]);
        return result;
    }

    if let Some(position) = html.find("</head>") {
        let mut result = String::with_capacity(html.len() + import_map.len());
        result.push_str(&html[..position]);
        result.push_str(import_map);
        result.push_str(&html[position..]);
        return result;
    }

    format!("{import_map}{html}")
}

fn prepare_overlay_html(html: &str, context: &serde_json::Value) -> String {
    inject_console_forwarder(&inject_context(
        &ensure_overlay_import_map(html),
        context,
    ))
}

fn inject_console_forwarder(html: &str) -> String {
    let script = overlay_console_forwarder_script();

    if let Some(position) = html.find("</head>") {
        let mut result = String::with_capacity(html.len() + script.len());
        result.push_str(&html[..position]);
        result.push_str(script);
        result.push_str(&html[position..]);
        return result;
    }

    format!("{script}{html}")
}

fn overlay_console_forwarder_script() -> &'static str {
    r#"<script>
(function () {
	if (window.parent === window) return;

	var CHANNEL = 'stream-kit-overlay-console';

	function format(value) {
		if (value === undefined) return 'undefined';
		if (value === null) return 'null';
		if (typeof value === 'string') return value;
		if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
			return String(value);
		}
		try {
			return JSON.stringify(value);
		} catch (error) {
			return String(value);
		}
	}

	function publish(level, args) {
		try {
			window.parent.postMessage(
				{
					type: CHANNEL,
					level: level,
					message: args.map(format).join(' '),
					timestamp: Date.now()
				},
				'*'
			);
		} catch (error) {}
	}

	['log', 'info', 'warn', 'error', 'debug'].forEach(function (level) {
		var original = console[level].bind(console);
		console[level] = function () {
			var args = Array.prototype.slice.call(arguments);
			original.apply(console, args);
			publish(level, args);
		};
	});

	window.addEventListener('error', function (event) {
		publish('error', [event.message || 'Uncaught error']);
	});

	window.addEventListener('unhandledrejection', function (event) {
		var reason = event.reason;
		publish('error', [
			reason && reason.message ? reason.message : String(reason)
		]);
	});
})();
</script>"#
}

fn inject_context(html: &str, context: &serde_json::Value) -> String {
    let script = format!(
        "<script>window.__OVERLAY_CONTEXT__={};</script>",
        serde_json::to_string(context).unwrap_or_else(|_| "{}".to_string())
    );

    if let Some(position) = html.find("</head>") {
        let mut result = String::with_capacity(html.len() + script.len());
        result.push_str(&html[..position]);
        result.push_str(&script);
        result.push_str(&html[position..]);
        return result;
    }

    format!("{script}{html}")
}

pub fn resolve_sdk_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let dev_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("static")
        .join("overlay-sdk");

    let mut candidates: Vec<PathBuf> = Vec::new();

    #[cfg(debug_assertions)]
    if dev_path.exists() {
        candidates.push(dev_path.clone());
    }

    if let Ok(resource_dir) = app.path().resource_dir() {
        candidates.push(resource_dir.join("overlay-sdk"));
    }

    if let Ok(app_dir) = app.path().app_data_dir() {
        candidates.push(app_dir.join("overlay-sdk"));
    }

    #[cfg(not(debug_assertions))]
    if dev_path.exists() {
        candidates.push(dev_path);
    }

    for candidate in candidates {
        if sdk_dir_is_ready(&candidate) {
            return Ok(candidate);
        }
    }

    Err("overlay SDK assets not found; run pnpm build:overlay-sdk".to_string())
}

fn sdk_dir_is_ready(path: &Path) -> bool {
    path.join("overlay-runtime.js").is_file() && path.join("index.js").is_file()
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
