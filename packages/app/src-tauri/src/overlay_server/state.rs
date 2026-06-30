use std::sync::Arc;

use serde::Serialize;
use tokio::sync::{broadcast, RwLock};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OverlayServerStatus {
    pub running: bool,
    pub port: u16,
    pub base_url: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OverlayBroadcastMessage {
    pub overlay_id: String,
    pub event: String,
    pub payload: serde_json::Value,
    pub timestamp: u64,
}

pub struct OverlayServerInner {
    pub port: u16,
    pub overlays_dir: std::path::PathBuf,
    pub broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
    pub shutdown_tx: Option<tokio::sync::oneshot::Sender<()>>,
}

pub struct OverlayServerState {
    inner: Arc<RwLock<Option<OverlayServerInner>>>,
}

impl Default for OverlayServerState {
    fn default() -> Self {
        Self {
            inner: Arc::new(RwLock::new(None)),
        }
    }
}

impl OverlayServerState {
    pub fn new() -> Self {
        Self::default()
    }

    pub async fn is_running(&self) -> bool {
        self.inner.read().await.is_some()
    }

    pub async fn status(&self) -> OverlayServerStatus {
        let guard = self.inner.read().await;

        if let Some(inner) = guard.as_ref() {
            OverlayServerStatus {
                running: true,
                port: inner.port,
                base_url: format!("http://127.0.0.1:{}", inner.port),
            }
        } else {
            OverlayServerStatus {
                running: false,
                port: 0,
                base_url: String::new(),
            }
        }
    }

    pub async fn set_running(&self, inner: OverlayServerInner) {
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

    pub async fn broadcast(
        &self,
        overlay_id: String,
        event: String,
        payload: serde_json::Value,
    ) -> Result<(), String> {
        let guard = self.inner.read().await;
        let inner = guard
            .as_ref()
            .ok_or_else(|| "overlay server is not running".to_string())?;

        let message = OverlayBroadcastMessage {
            overlay_id,
            event,
            payload,
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map(|duration| duration.as_millis() as u64)
                .unwrap_or(0),
        };

        let _ = inner.broadcast_tx.send(message);

        Ok(())
    }
}
