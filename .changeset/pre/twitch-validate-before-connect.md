---
'@stream-kit/plugin-twitch': patch
---

Twitch only reports "connected" once the token is validated. If Twitch can't be reached at startup the plugin keeps retrying instead of silently missing raids, subs and follows, and an expired token shows a reconnect hint.
