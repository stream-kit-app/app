---
'@stream-kit/plugin-twitch': patch
---

Connecting the Twitch bot account can no longer replace the main account's token: each sign-in only accepts its own OAuth callback, and listeners are cleaned up afterwards.
