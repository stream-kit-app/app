---
'@stream-kit/plugin-bot': patch
'@stream-kit/plugin-discord': patch
'@stream-kit/plugin-obs': patch
'@stream-kit/plugin-quotes': patch
'@stream-kit/plugin-tts': patch
'@stream-kit/plugin-twitch': patch
'@stream-kit/plugin-websocket': patch
'@stream-kit/plugin-youtube': patch
---

The core handlers plugin is now an optional dependency, so these plugins can be enabled on their own. Bot lists Twitch and YouTube as optional dependencies; Bot command and timer editors pick up the new variable autocomplete.
