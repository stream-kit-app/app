---
'@stream-kit/pocketbase': patch
---

Fix cloud file uploads rejecting signed-in users: move auth, ownership, metadata, and quota checks from `onRecordCreate` (no request auth) to `onRecordCreateRequest`.
