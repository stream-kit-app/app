# @stream-kit/pocketbase

## 0.2.0-alpha.6

### Patch Changes

- [`7856ba3`](https://github.com/stream-kit-app/app/commit/7856ba3105cc895a412c2792fe5104aeb47cbc88) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Raise published overlay bundle size limit from 25MB to 100MB, and allow non-UUID local overlay ids (slugs) on `user_overlays.overlayId`.

## 0.2.0-alpha.5

### Patch Changes

- [`89ac6b2`](https://github.com/stream-kit-app/app/commit/89ac6b2a31e3db09db2ab5d2d838c47ea691d887) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Fix cloud file uploads rejecting signed-in users: move auth, ownership, metadata, and quota checks from `onRecordCreate` (no request auth) to `onRecordCreateRequest`.

## 0.2.0-alpha.4

### Minor Changes

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Multi-PC Pro cloud sync: generic ConfigSync adapters, `app.records` / `user_plugin_records`, overlay project + dashboard sync, settings account/device split, and restore flow.

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; cloud features, design updates and much more

### Patch Changes

- [`fd9558d`](https://github.com/stream-kit-app/app/commit/fd9558d95834c054a5a50733f09c2149970ddbcd) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Add `revision` to user config sync collections; protect `user_files` and tighten mime allowlist.

- [`fd9558d`](https://github.com/stream-kit-app/app/commit/fd9558d95834c054a5a50733f09c2149970ddbcd) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Fix `ReferenceError` in PocketBase hooks: handlers run in isolated runtimes, so entitlement, `user_files`, and plugin rating helpers now live in `pb_hooks/shared/*` and are loaded with `require()` inside each handler.

- [`fd9558d`](https://github.com/stream-kit-app/app/commit/fd9558d95834c054a5a50733f09c2149970ddbcd) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Add `user_overlays` for cloud-hosted overlay browser sources (published dist zip + config).

## 0.1.1-alpha.3

### Patch Changes

- [`82a8d3d`](https://github.com/stream-kit-app/app/commit/82a8d3dbecfa10d6435b08c329ba0f0b366840e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

## 0.1.1-alpha.2

### Patch Changes

- [`cec0d23`](https://github.com/stream-kit-app/app/commit/cec0d23142fb02df941a320f839a026be5fa8721) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

## 0.1.1-alpha.1

### Patch Changes

- [`d41000c`](https://github.com/stream-kit-app/app/commit/d41000c599cf167404047a1afdf97e5d473a07a9) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

## 0.1.1-alpha.0

### Patch Changes

- [`e8c9c30`](https://github.com/stream-kit-app/app/commit/e8c9c302552a67e5014450a9ddf907b9cf471d64) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; add type generator to dockerignore

- [`57be460`](https://github.com/stream-kit-app/app/commit/57be46079e78960c2e6e1e7e5315efdb953f4e06) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - add auth and cloud features
