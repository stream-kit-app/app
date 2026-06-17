# Plugin updates

Stream Kit can check installed plugins for updates by fetching each plugin's remote `manifest.json`. First-party plugins use the site manifest API; third-party authors can still host their own manifests on GitHub, GitLab, or any HTTPS server.

## How it works

1. The author publishes release metadata (and a zip) at a stable manifest URL.
2. The installed plugin stores `updateManifestUrl` from its manifest on disk.
3. Stream Kit fetches the remote manifest and compares `version` (semver) with the installed version.
4. If a newer version is available and `downloadUrl` is set in the remote response, the user can update with one click.
5. The app downloads the zip, verifies optional `sha256`, replaces `{app_data}/plugins/{key}/`, and reloads the plugin registration. Plugin settings (`plugin.{key}.json`) are preserved when the key stays the same.

Dev-linked plugins are included in update checks. In development mode (`pnpm dev`), Stream Kit shows available updates but does not download or install them.

## Manifest fields for updates

Add these optional fields to `manifest.json`:

| Field | Required for updates | Description |
|-------|----------------------|-------------|
| `updateManifestUrl` | Yes | HTTPS URL to the published manifest |
| `downloadUrl` | Yes in remote manifest response | HTTPS URL to the zip (not stored in repo manifests for first-party plugins) |
| `sha256` | No | Lowercase hex SHA-256 digest of the zip file (provided by remote manifest) |
| `streamKitVersion` | Recommended | Semver range the plugin supports (for example `>=0.1.0`). Prerelease app builds (for example `0.1.0-alpha.6`) satisfy `>=0.1.0` when their release components meet the requirement. |

### Third-party example (self-hosted)

```json
{
  "key": "hello-world",
  "name": "Hello World",
  "version": "0.1.1",
  "entry": "dist/index.js",
  "streamKitVersion": ">=0.1.0",
  "updateManifestUrl": "https://raw.githubusercontent.com/your-org/hello-world-plugin/main/manifest.json",
  "downloadUrl": "https://github.com/your-org/hello-world-plugin/releases/download/v0.1.1/hello-world.zip",
  "sha256": "optional-hex-digest"
}
```

### First-party example (repo manifest)

Official plugins in this monorepo only set `updateManifestUrl`. Release zips and checksums live in PocketBase (`files` collection):

```json
{
  "key": "twitch",
  "name": "Twitch",
  "version": "0.1.1-alpha.2",
  "entry": "dist/index.js",
  "dependencies": ["core"],
  "streamKitVersion": ">=0.1.0",
  "updateManifestUrl": "https://stream-kit.app/api/plugins/twitch/manifest.json"
}
```

The manifest API returns `downloadUrl` (PocketBase file URL) and `sha256` derived from the linked `files` record.

For local testing against the site dev server, point `updateManifestUrl` at `http://localhost:5173/api/plugins/{key}/manifest.json`.

## Author release workflow

### Third-party (self-hosted)

1. Bump `version` in `manifest.json`.
2. Build the plugin zip (`pnpm --filter @stream-kit/plugin-template package` or your plugin's package script).
3. Upload the zip to a release (GitHub Releases, GitLab Releases, etc.).
4. Set `downloadUrl` to the release asset URL in the hosted manifest.
5. Optionally compute and set `sha256` for the zip.
6. Commit and push `manifest.json` so `updateManifestUrl` serves the new version.

Keep `updateManifestUrl` stable across releases. Only `version`, `downloadUrl`, and `sha256` need to change per release in the remote manifest.

### Official Stream Kit plugins (PocketBase)

1. Bump `version` in `plugins/{key}/manifest.json`.
2. Build the plugin zip (`pnpm package:plugins` or per-plugin package script).
3. Upload the zip to PocketBase (`files` collection) via the admin UI or `pnpm --filter @stream-kit/site pb:seed`.
4. Create or update the `plugin_versions` record, link the `files` record, and set `isLatest = true`.

The site manifest API (`/api/plugins/{key}/manifest.json`) serves the update metadata to the desktop app automatically.

## GitHub example (third-party)

- Manifest: `https://raw.githubusercontent.com/your-org/my-plugin/main/manifest.json`
- Zip: `https://github.com/your-org/my-plugin/releases/download/v0.2.0/my-plugin.zip`

## Official Stream Kit plugins

First-party plugins are catalogued on the site and stored in PocketBase. Source and development stay in the [stream-kit-app/app](https://github.com/stream-kit-app/app) monorepo.

| Plugin | Update manifest |
|--------|-----------------|
| Bot | `https://stream-kit.app/api/plugins/bot/manifest.json` |
| Core Handlers | `https://stream-kit.app/api/plugins/core/manifest.json` |
| OBS | `https://stream-kit.app/api/plugins/obs/manifest.json` |
| TTS | `https://stream-kit.app/api/plugins/tts/manifest.json` |
| Twitch | `https://stream-kit.app/api/plugins/twitch/manifest.json` |
| WebSocket | `https://stream-kit.app/api/plugins/websocket/manifest.json` |
| YouTube | `https://stream-kit.app/api/plugins/youtube/manifest.json` |

Distribution-only GitHub repos under [stream-kit-app](https://github.com/stream-kit-app) may still host release zips used by the seed script. The desktop app fetches updates from the site manifest API, not from GitHub raw manifests.

To seed the local PocketBase catalog from GitHub release zips:

```bash
POCKETBASE_ADMIN_EMAIL=you@example.com POCKETBASE_ADMIN_PASSWORD=your-password pnpm --filter @stream-kit/site pb:seed
```

To publish distribution repos from the monorepo (legacy GitHub workflow):

```bash
pnpm build:packages
pnpm publish:plugins
```

Or publish a single plugin:

```bash
node scripts/publish-plugin-distribution.mjs --plugin bot
```

CI publishes all plugins automatically when an app release tag (`v*`) is pushed, or manually via the **Publish Plugins** workflow.

## GitLab example

- Manifest: `https://gitlab.com/your-org/my-plugin/-/raw/main/manifest.json`
- Zip: use a GitLab release asset URL or project package URL

## In the app

- **Plugins** page: **Check for updates** checks all installed plugins that have `updateManifestUrl`.
- Plugin cards show **Update available** when a newer version is found.
- On startup, Stream Kit can check silently when **Check for plugin updates on startup** is enabled (default).

## Security

Updates use the same trust model as manual zip install: plugins run with full app access. Users confirm before downloading an update. Use HTTPS URLs only. Authors should publish `sha256` when possible.

## API

Tauri commands:

- `fetch_plugin_manifest(manifestUrl)` — fetch and validate remote manifest
- `download_and_install_plugin_update(downloadUrl, expectedKey, expectedSha256?)` — download zip and replace installed plugin

Frontend helpers live in `packages/app/src/lib/core/plugins/plugin-update.ts`.
