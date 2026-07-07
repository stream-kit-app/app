use std::time::Duration;

use tokio::net::TcpStream;
use tokio::time::timeout;

#[tauri::command]
pub async fn is_tcp_port_reachable(
    host: String,
    port: u16,
    timeout_ms: Option<u64>,
) -> Result<bool, String> {
    let timeout_duration = Duration::from_millis(timeout_ms.unwrap_or(1000).max(1));

    let mut addrs = tokio::net::lookup_host((host.as_str(), port))
        .await
        .map_err(|error| error.to_string())?;

    while let Some(addr) = addrs.next() {
        if timeout(timeout_duration, TcpStream::connect(addr))
            .await
            .ok()
            .and_then(|result| result.ok())
            .is_some()
        {
            return Ok(true);
        }
    }

    Ok(false)
}
