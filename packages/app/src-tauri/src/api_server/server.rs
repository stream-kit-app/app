use std::net::{IpAddr, SocketAddr};
use std::str::FromStr;

use axum::extract::ws::{CloseFrame, Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Query, State};
use axum::response::IntoResponse;
use axum::routing::get;
use axum::Router;
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use std::sync::atomic::{AtomicU64, Ordering};

use tauri::{AppHandle, Emitter};
use tokio::net::TcpListener;
use tokio::sync::{broadcast, oneshot};
use tower_http::cors::CorsLayer;

use super::state::{
    current_timestamp_ms, parse_auth_frame, ApiClientLifecycleEvent, ApiIncomingRequest,
    ApiOutboundMessage, ApiServerInner,
};

static CLIENT_SEQ: AtomicU64 = AtomicU64::new(1);

fn new_client_id() -> String {
    format!(
        "c{}-{}",
        current_timestamp_ms(),
        CLIENT_SEQ.fetch_add(1, Ordering::Relaxed)
    )
}

#[derive(Clone)]
struct AppState {
    token: String,
    broadcast_tx: broadcast::Sender<ApiOutboundMessage>,
    app_handle: AppHandle,
}

#[derive(Debug, Deserialize)]
struct WsQuery {
    token: Option<String>,
}

pub async fn run_server(
    bind: &str,
    port: u16,
    token: String,
    shutdown_rx: oneshot::Receiver<()>,
    app_handle: AppHandle,
) -> Result<ApiServerInner, String> {
    if token.trim().is_empty() {
        return Err("API server token is required".to_string());
    }

    let ip = IpAddr::from_str(bind).map_err(|error| format!("invalid bind address: {error}"))?;
    let (broadcast_tx, _) = broadcast::channel::<ApiOutboundMessage>(256);

    let app_state = AppState {
        token,
        broadcast_tx: broadcast_tx.clone(),
        app_handle: app_handle.clone(),
    };

    let router = Router::new()
        .route("/ws", get(ws_handler))
        .with_state(app_state)
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from((ip, port));
    let listener = TcpListener::bind(addr)
        .await
        .map_err(|error| format!("failed to bind API server to {bind}:{port}: {error}"))?;

    let actual_port = listener
        .local_addr()
        .map(|address| address.port())
        .unwrap_or(port);

    let server = axum::serve(listener, router).with_graceful_shutdown(async move {
        let _ = shutdown_rx.await;
    });

    tauri::async_runtime::spawn(async move {
        if let Err(error) = server.await {
            eprintln!("API server stopped with error: {error}");
        }
    });

    Ok(ApiServerInner {
        port: actual_port,
        bind: bind.to_string(),
        broadcast_tx,
        shutdown_tx: None,
    })
}

async fn ws_handler(
    ws: WebSocketUpgrade,
    Query(query): Query<WsQuery>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    let query_token = query.token;
    let expected_token = state.token.clone();
    let broadcast_tx = state.broadcast_tx.clone();
    let app_handle = state.app_handle.clone();

    ws.on_upgrade(move |socket| {
        handle_socket(socket, query_token, expected_token, broadcast_tx, app_handle)
    })
}

async fn handle_socket(
    socket: WebSocket,
    query_token: Option<String>,
    expected_token: String,
    broadcast_tx: broadcast::Sender<ApiOutboundMessage>,
    app_handle: AppHandle,
) {
    let client_id = new_client_id();
    let (mut sender, mut receiver) = socket.split();

    let authenticated = match query_token.as_deref() {
        Some(token) if token == expected_token => true,
        Some(_) => {
            let _ = sender
                .send(Message::Close(Some(CloseFrame {
                    code: 1008,
                    reason: "invalid token".into(),
                })))
                .await;
            return;
        }
        None => false,
    };

    let mut authenticated = authenticated;

    if !authenticated {
        match receiver.next().await {
            Some(Ok(Message::Text(text))) => {
                if let Some(token) = parse_auth_frame(text.as_ref()) {
                    if token == expected_token {
                        authenticated = true;
                    }
                }
            }
            _ => {}
        }

        if !authenticated {
            let _ = sender
                .send(Message::Close(Some(CloseFrame {
                    code: 1008,
                    reason: "authentication required".into(),
                })))
                .await;
            return;
        }
    }

    let _ = app_handle.emit(
        "api-server-client",
        ApiClientLifecycleEvent {
            client_id: client_id.clone(),
            event: "connected".to_string(),
            timestamp: current_timestamp_ms(),
        },
    );

    let mut rx = broadcast_tx.subscribe();
    let client_id_filter = client_id.clone();

    let mut send_task = tokio::spawn(async move {
        loop {
            match rx.recv().await {
                Ok(message) => {
                    if !message.client_ids.is_empty()
                        && !message.client_ids.iter().any(|id| id == &client_id_filter)
                    {
                        continue;
                    }

                    if sender
                        .send(Message::Text(message.data.into()))
                        .await
                        .is_err()
                    {
                        break;
                    }
                }
                Err(broadcast::error::RecvError::Closed) => break,
                Err(broadcast::error::RecvError::Lagged(_)) => continue,
            }
        }
    });

    let recv_client_id = client_id.clone();
    let recv_app_handle = app_handle.clone();
    let mut recv_task = tokio::spawn(async move {
        while let Some(result) = receiver.next().await {
            let Ok(message) = result else {
                break;
            };

            match message {
                Message::Text(text) => {
                    let _ = recv_app_handle.emit(
                        "api-server-request",
                        ApiIncomingRequest {
                            client_id: recv_client_id.clone(),
                            raw: text.to_string(),
                            timestamp: current_timestamp_ms(),
                        },
                    );
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

    let _ = app_handle.emit(
        "api-server-client",
        ApiClientLifecycleEvent {
            client_id,
            event: "disconnected".to_string(),
            timestamp: current_timestamp_ms(),
        },
    );
}

pub async fn find_available_port(bind: &str, preferred: u16) -> Result<u16, String> {
    let ip = IpAddr::from_str(bind).map_err(|error| format!("invalid bind address: {error}"))?;

    for port in preferred..preferred.saturating_add(20) {
        let addr = SocketAddr::from((ip, port));
        if TcpListener::bind(addr).await.is_ok() {
            return Ok(port);
        }
    }

    Ok(preferred)
}
