---
'@stream-kit/app': patch
---

When an action or queue is edited on two devices before they sync, changes to different settings are now combined instead of one device overwriting the other (for example reordering on one PC no longer discards a handler edit made on another). Overwritten versions are kept as a local backup.
