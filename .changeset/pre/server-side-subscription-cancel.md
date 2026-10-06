---
'@stream-kit/app': patch
'@stream-kit/pocketbase': patch
---

Cancel subscriptions through a server route that sets the grace end date, so clients can no longer choose their own `endsAt`.
