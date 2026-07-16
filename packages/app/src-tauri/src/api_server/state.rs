use std::sync::Arc;

use serde::{Deserialize, Serialize};
use tokio::sync::{broadcast, RwLock};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiServerStatus {
    pub running: bool,
    pub port: u16,
    pub bind: String,
    pub base_url: String,
    pub ws_url: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiOutboundMessage {
    /// Empty = deliver to every connected client. Otherwise only listed clients.
    pub client_ids: Vec<String>,
    pub data: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiIncomingRequest {
    pub client_id: String,
    pub raw: String,
    pub timestamp: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApiClientLifecycleEvent {
    pub client_id: String,
    pub event: String,
    pub timestamp: u64,
}

#[derive(Debug, Deserialize)]
struct AuthFrame {
    #[serde(rename = "type")]
    frame_type: String,
    token: Option<String>,
}

pub fn parse_auth_frame(text: &str) -> Option<String> {
    let frame: AuthFrame = serde_json::from_str(text).ok()?;
    if frame.frame_type != "auth" {
        return None;
    }
    frame.token.filter(|token| !token.is_empty())
}

pub fn current_timestamp_ms() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or(0)
}

pub fn build_status(running: bool, port: u16, bind: &str) -> ApiServerStatus {
    let host = if bind == "0.0.0.0" {
        "127.0.0.1"
    } else {
        bind
    };

    ApiServerStatus {
        running,
        port,
        bind: bind.to_string(),
        base_url: if running {
            format!("http://{host}:{port}")
        } else {
            String::new()
        },
        ws_url: if running {
            format!("ws://{host}:{port}/ws")
        } else {
            String::new()
        },
    }
}

pub struct ApiServerInner {
    pub port: u16,
    pub bind: String,
    pub broadcast_tx: broadcast::Sender<ApiOutboundMessage>,
    pub shutdown_tx: Option<tokio::sync::oneshot::Sender<()>>,
}

pub struct ApiServerState {
    inner: Arc<RwLock<Option<ApiServerInner>>>,
}

impl Default for ApiServerState {
    fn default() -> Self {
        Self {
            inner: Arc::new(RwLock::new(None)),
        }
    }
}

impl ApiServerState {
    pub fn new() -> Self {
        Self::default()
    }

    pub async fn is_running(&self) -> bool {
        self.inner.read().await.is_some()
    }

    pub async fn status(&self) -> ApiServerStatus {
        let guard = self.inner.read().await;

        if let Some(inner) = guard.as_ref() {
            build_status(true, inner.port, &inner.bind)
        } else {
            build_status(false, 0, "")
        }
    }

    pub async fn set_running(&self, inner: ApiServerInner) {
        let mut guard = self.inner.write().await;
        *guard = Some(inner);
    }

    pub async fn clear(&self) {
        let mut guard = self.inner.write().await;

        if let Some(mut inner) = guard.take() {
            if let Some(shutdown_tx) = inner.shutdown_tx.take() {
                let _ = shutdown_tx.send(());
            }
        }
    }

    pub async fn send(&self, client_ids: Vec<String>, data: String) -> Result<(), String> {
        let guard = self.inner.read().await;
        let inner = guard
            .as_ref()
            .ok_or_else(|| "API server is not running".to_string())?;

        let _ = inner.broadcast_tx.send(ApiOutboundMessage { client_ids, data });
        Ok(())
    }
}
