---
'@stream-kit/plugin-discord': patch
'@stream-kit/plugin-websocket': patch
---

Discord detects connections that silently stopped delivering events and reconnects, and retries when it can't connect at startup. WebSocket connections keep retrying (once a minute) after their configured attempts are used up instead of staying disconnected.
