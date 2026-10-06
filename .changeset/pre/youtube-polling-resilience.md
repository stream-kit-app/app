---
'@stream-kit/plugin-youtube': patch
---

YouTube chat and stream polling survive network and quota errors instead of stopping or reporting the stream as offline, "stream started" fires once per broadcast, chat history isn't replayed as new commands when monitoring (re)starts, and a temporary token refresh failure no longer signs you out.
