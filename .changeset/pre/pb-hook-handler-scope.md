---
'@stream-kit/pocketbase': patch
---

Fix `ReferenceError` in PocketBase hooks: handlers run in isolated runtimes, so entitlement, `user_files`, and plugin rating helpers now live in `pb_hooks/shared/*` and are loaded with `require()` inside each handler.
