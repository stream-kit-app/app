# Plugin updates

Stream Kit can check installed plugins for updates by fetching each plugin's remote `manifest.json`. There is no central marketplace or catalog — authors host their own releases on GitHub, GitLab, or any HTTPS server.

## How it works

1. The author publishes `manifest.json` and a release zip at stable URLs.
2. The installed plugin stores `updateManifestUrl` from its manifest on disk.
3. Stream Kit fetches the remote manifest and compares `version` (semver) with the installed version.
4. If a newer version is available and `downloadUrl` is set, the user can update with one click.
5. The app downloads the zip, verifies optional `sha256`, replaces `{app_data}/plugins/{key}/`, and reloads the plugin registration. Plugin settings (`plugin.{key}.json`) are preserved when the key stays the same.

Dev-linked plugins are included in update checks. In development mode (`pnpm dev`), Stream Kit shows available updates but does not download or install them.

## Manifest fields for updates

Add these optional fields to `manifest.json`:

| Field | Required for updates | Description |
|-------|----------------------|-------------|
| `updateManifestUrl` | Yes | HTTPS URL to the published manifest (for example a raw GitHub URL) |
| `downloadUrl` | Yes in remote manifest | HTTPS URL to the zip for the version described in that manifest |
| `sha256` | No | Lowercase hex SHA-256 digest of the zip file |
| `streamKitVersion` | Recommended | Semver range the plugin supports (for example `>=0.1.0`). Prerelease app builds (for example `0.1.0-alpha.6`) satisfy `>=0.1.0` when their release components meet the requirement. |

Example:

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

## Author release workflow

1. Bump `version` in `manifest.json`.
2. Build the plugin zip (`pnpm --filter @stream-kit/plugin-template package` or your plugin's package script).
3. Upload the zip to a release (GitHub Releases, GitLab Releases, etc.).
4. Set `downloadUrl` to the release asset URL.
5. Optionally compute and set `sha256` for the zip.
6. Commit and push `manifest.json` so `updateManifestUrl` serves the new version.

Keep `updateManifestUrl` stable across releases. Only `version`, `downloadUrl`, and `sha256` need to change per release.

## GitHub example

- Manifest: `https://raw.githubusercontent.com/your-org/my-plugin/main/manifest.json`
- Zip: `https://github.com/your-org/my-plugin/releases/download/v0.2.0/my-plugin.zip`

## Official Stream Kit plugins

First-party plugins are published as **distribution-only** repositories under [stream-kit-app](https://github.com/stream-kit-app). Each repo contains `manifest.json` and a README on `main`; release zips live in GitHub Releases.

| Plugin | Distribution repo | Update manifest |
|--------|-------------------|-----------------|
| Bot | [plugin-bot](https://github.com/stream-kit-app/plugin-bot) | `https://raw.githubusercontent.com/stream-kit-app/plugin-bot/main/manifest.json` |
| Core Handlers | [plugin-core](https://github.com/stream-kit-app/plugin-core) | `https://raw.githubusercontent.com/stream-kit-app/plugin-core/main/manifest.json` |
| OBS | [plugin-obs](https://github.com/stream-kit-app/plugin-obs) | `https://raw.githubusercontent.com/stream-kit-app/plugin-obs/main/manifest.json` |
| TTS | [plugin-tts](https://github.com/stream-kit-app/plugin-tts) | `https://raw.githubusercontent.com/stream-kit-app/plugin-tts/main/manifest.json` |
| Twitch | [plugin-twitch](https://github.com/stream-kit-app/plugin-twitch) | `https://raw.githubusercontent.com/stream-kit-app/plugin-twitch/main/manifest.json` |
| WebSocket | [plugin-websocket](https://github.com/stream-kit-app/plugin-websocket) | `https://raw.githubusercontent.com/stream-kit-app/plugin-websocket/main/manifest.json` |
| YouTube | [plugin-youtube](https://github.com/stream-kit-app/plugin-youtube) | `https://raw.githubusercontent.com/stream-kit-app/plugin-youtube/main/manifest.json` |

Example download URL pattern (Bot `v0.1.1-alpha.2`):

```
https://github.com/stream-kit-app/plugin-bot/releases/download/v0.1.1-alpha.2/plugin-bot.zip
```

Plugin source and development stay in the [stream-kit-app/app](https://github.com/stream-kit-app/app) monorepo. To publish a new plugin version from the monorepo:

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
