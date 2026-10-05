---
'@stream-kit/site': patch
---

Fix cloud overlay asset 404s by injecting a `<base href>` so Vite relative assets resolve under `/app/overlays/{id}/`.
