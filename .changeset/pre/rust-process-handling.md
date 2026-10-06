---
'@stream-kit/app': patch
---

"Run program" no longer times out on programs that print a lot of output, toggling the process watcher no longer freezes the window, and local TTS gives up on a stuck Piper process after two minutes.
