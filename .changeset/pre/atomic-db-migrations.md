---
'@stream-kit/app': patch
---

Recover from database migrations that were interrupted by a crash or close (previously actions could disappear), and repair rows without a sync id that caused actions to duplicate on every cloud sync.
