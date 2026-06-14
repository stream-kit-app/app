// src/index.ts
function readEnvelope() {
  const envelope = window.__OVERLAY_CONTEXT__;
  if (!envelope || typeof envelope !== "object") {
    return { overlayId: "", context: {} };
  }
  return {
    overlayId: typeof envelope.overlayId === "string" ? envelope.overlayId : "",
    context: envelope.context && typeof envelope.context === "object" ? envelope.context : {}
  };
}
function resolveWebSocketUrl(overlayId) {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.host;
  const params = new URLSearchParams({ overlayId });
  return `${protocol}//${host}/ws?${params.toString()}`;
}
function createOverlay(options = {}) {
  const envelope = readEnvelope();
  const overlayId = envelope.overlayId;
  const handlers = options.handlers ?? {};
  let socket = null;
  let reconnectAttempt = 0;
  let reconnectTimer = null;
  let disposed = false;
  const connect = () => {
    if (disposed || !overlayId) {
      return;
    }
    socket = new WebSocket(resolveWebSocketUrl(overlayId));
    socket.addEventListener("open", () => {
      reconnectAttempt = 0;
      options.onConnect?.();
    });
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(String(event.data));
        const handler = handlers[message.event];
        if (handler) {
          handler(message.payload);
        }
      } catch {
      }
    });
    socket.addEventListener("close", () => {
      options.onDisconnect?.();
      if (disposed) {
        return;
      }
      const delay = Math.min(1e3 * 2 ** reconnectAttempt, 3e4);
      reconnectAttempt += 1;
      reconnectTimer = setTimeout(connect, delay);
    });
  };
  connect();
  return {
    overlayId,
    context: envelope.context,
    send: (event, payload) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }
      socket.send(
        JSON.stringify({
          event,
          payload,
          timestamp: Date.now()
        })
      );
    }
  };
}
export {
  createOverlay
};
