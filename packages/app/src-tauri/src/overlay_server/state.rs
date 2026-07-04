use std::collections::HashMap;
use std::sync::Arc;

use serde::Serialize;
use serde_json::Value;
use tokio::sync::{broadcast, RwLock};

pub const OVERLAY_SETTINGS_EVENT: &str = "overlay:settings";

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
    pub payload: Value,
    pub timestamp: u64,
}

pub type OverlayConfigCache = Arc<RwLock<HashMap<String, Value>>>;

pub fn create_overlay_config_cache() -> OverlayConfigCache {
    Arc::new(RwLock::new(HashMap::new()))
}

pub fn overlay_settings_message(overlay_id: String, payload: Value) -> OverlayBroadcastMessage {
    OverlayBroadcastMessage {
        overlay_id,
        event: OVERLAY_SETTINGS_EVENT.to_string(),
        payload,
        timestamp: current_timestamp_ms(),
    }
}

pub fn current_timestamp_ms() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or(0)
}

pub struct OverlayServerInner {
    pub port: u16,
    pub overlays_dir: std::path::PathBuf,
    pub broadcast_tx: broadcast::Sender<OverlayBroadcastMessage>,
    pub config_cache: OverlayConfigCache,
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

    pub async fn sync_config(&self, overlay_id: String, config: Value) -> Result<(), String> {
        let guard = self.inner.read().await;
        let inner = guard
            .as_ref()
            .ok_or_else(|| "overlay server is not running".to_string())?;

        inner
            .config_cache
            .write()
            .await
            .insert(overlay_id, config);

        Ok(())
    }

    pub async fn sync_all_configs(&self, configs: HashMap<String, Value>) -> Result<(), String> {
        let guard = self.inner.read().await;
        let inner = guard
            .as_ref()
            .ok_or_else(|| "overlay server is not running".to_string())?;

        let mut cache = inner.config_cache.write().await;
        *cache = configs;

        Ok(())
    }

    pub async fn broadcast(
        &self,
        overlay_id: String,
        event: String,
        payload: Value,
    ) -> Result<(), String> {
        let guard = self.inner.read().await;
        let inner = guard
            .as_ref()
            .ok_or_else(|| "overlay server is not running".to_string())?;

        let message = OverlayBroadcastMessage {
            overlay_id,
            event,
            payload,
            timestamp: current_timestamp_ms(),
        };

        let _ = inner.broadcast_tx.send(message);

        Ok(())
    }
}
