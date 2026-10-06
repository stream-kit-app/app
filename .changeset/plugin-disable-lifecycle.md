---
'@stream-kit/plugin-twitch': patch
'@stream-kit/plugin-youtube': patch
'@stream-kit/plugin-obs': patch
'@stream-kit/plugin-discord': patch
---

Disabling and re-enabling Twitch, YouTube, OBS or Discord no longer leaves old connections running (duplicate chat handlers, doubled YouTube polling), and pages and widgets keep updating afterwards.
