# Site

The `@stream-kit/site` package is the public marketing/documentation website for Stream Kit. It lives at the repository root in `site/` and is part of the pnpm workspace.

## Homepage

The homepage (`site/src/routes/+page.svelte`) is a landing page that positions Stream Kit as the modern alternative to Streamer.bot. It contains:

- **Hero** — tagline badge, headline, download button (placeholder link, see `downloadUrl` in `+layout.svelte` and `+page.svelte`) and a dummy app screenshot
- **Features grid** — chat commands, timers, moderation, actions, Twitch + YouTube, OBS, TTS, WebSocket
- **Plugin showcase** — the available plugins (Core, Twitch, YouTube, Bot, OBS, TTS, WebSocket)
- **How it works** — four-step onboarding flow
- **FAQ** — native `<details>` accordions
- **CTA + footer** — closing download call-to-action and site links

The app screenshot in the hero is a dummy built in HTML/CSS (`site/src/routes/app-mock.svelte`) that mimics the app UI (sidebar plus the Bot timers page). Replace it with a real screenshot when available.

The page reuses `@stream-kit/ui` components (`Button`, `Badge`, `Container`, `Logo`) and the shared app color tokens from `site/src/routes/layout.css`, so the branding matches the desktop app. Content is currently English only; copy lives in plain arrays/constants at the top of `+page.svelte` so it can be extracted for i18n later.

## Plugins page

The plugins catalog lives at `/plugins` (`site/src/routes/plugins/`). It lists official plugin releases from PocketBase and is linked from the site header.

- **Data source** — server-side `PluginsService.listLatest()` queries `plugin_versions` where `isLatest = true`, expands related `plugins` and `files` records, and maps the result to flat catalog entries with a PocketBase file download URL.
- **UI** — card grid with icon, name, version, description, Stream Kit version requirement, and a download button when a release file is linked.
- **Empty state** — shown when no published plugins exist yet.
- **Error banner** — shown when PocketBase is unreachable (e.g. dev server running without PocketBase).

Plugin records can be seeded from the repo manifests with:

```sh
POCKETBASE_ADMIN_EMAIL=you@example.com POCKETBASE_ADMIN_PASSWORD=your-password pnpm --filter @stream-kit/site pb:seed
```

The script reads `plugins/*/manifest.json`, downloads release zips from GitHub distribution repos, uploads them to the `files` collection, upserts `plugins` + `plugin_versions` records, and marks each manifest version as `isLatest`. PocketBase must be running (`pnpm dev:site` or `pb:serve`). Superuser credentials come from the PocketBase admin UI at [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/).

### Manifest API (desktop app)

Official plugins expose a remote manifest for in-app updates at:

```
GET /api/plugins/{key}/manifest.json
```

Example: `https://stream-kit.app/api/plugins/twitch/manifest.json`

The response matches the app's remote manifest shape. `downloadUrl` and `sha256` are derived from the linked `files` record (not stored on `plugin_versions`).

You can also create records manually in the admin UI: upload a zip to `files`, then link it from `plugin_versions`.

## PocketBase

The site uses [PocketBase](https://pocketbase.io/) as its backend. The PocketBase project lives in `site/pb/`:

| Path | Purpose |
| --- | --- |
| `site/pb/pocketbase` (or `.exe` on Windows) | Downloaded executable (gitignored) |
| `site/pb/pb_data/` | Local database and uploads (gitignored) |
| `site/pb/pb_migrations/` | Collection migrations (`plugins`, `plugin_versions`, `files`) |
| `site/pb/pb_hooks/` | JavaScript hooks (including `files.pb.js` metadata sync) |
| `site/src/lib/pocketbase/types.ts` | Generated PocketBase TypeScript types |

On first run, the dev script downloads the PocketBase binary automatically. The admin UI is available at [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/).

### Collections

**`plugins`** — stable plugin identity:

| Field | Description |
| --- | --- |
| `name` | Display name (unique) |
| `key` | Plugin identifier (unique, e.g. `twitch`) |
| `description` | Short catalog description |
| `icon` | Iconify icon id (e.g. `ri:twitch-fill`) |
| `author` | Relation to auth users |

Both `plugins`, `plugin_versions`, and `files` have public read rules (`listRule` / `viewRule` = `""`) so the catalog and release downloads can be fetched without admin credentials. Write access remains admin-only.

**`files`** — uploaded release zips with hook-populated metadata:

| Field | Description |
| --- | --- |
| `file` | Zip upload (max 50 MB) |
| `mimeType` | Set automatically by `files.pb.js` |
| `size` | File size in bytes (hook) |
| `sha256` | SHA-256 hex digest (hook) |
| `originalName` | Original upload filename (hook) |

**`plugin_versions`** — release-specific manifest data, linked to a plugin:

| Field | Description |
| --- | --- |
| `plugin` | Relation to `plugins` (cascade delete) |
| `file` | Relation to `files` (release zip) |
| `version` | Semver string |
| `streamKitVersion` | Supported app version range |
| `entry` | Plugin entry file (e.g. `dist/index.js`) |
| `changelog` | Release notes |
| `isLatest` | Marks the current release |
| `publishedAt` | Publication date |

Unique index on `(plugin, version)`.

### Type generation

During `dev`, nodemon watches `site/pb/pb_migrations/` and regenerates `site/src/lib/pocketbase/types.ts` via [`pocketbase-typegen`](https://github.com/patmood/pocketbase-typegen) whenever a migration file changes.

Types are read from the local SQLite database (`pb_data/data.db`), so PocketBase must be running and must have applied the latest migrations before the generated types match your schema edits. Restart PocketBase after changing migrations, then save a migration file again (or run `pb:typegen` manually) to refresh types.

Useful package scripts:

```sh
pnpm --filter @stream-kit/site pb:setup        # download PocketBase only
pnpm --filter @stream-kit/site pb:serve        # run PocketBase only
pnpm --filter @stream-kit/site pb:typegen      # generate types once
pnpm --filter @stream-kit/site pb:typegen:watch # watch migrations and regenerate types
pnpm --filter @stream-kit/site pb:seed           # seed plugins from repo manifests
pnpm --filter @stream-kit/site dev:site          # run the SvelteKit dev server only
```

## Development

From the repository root:

```sh
pnpm dev:site
```

This starts PocketBase and the SvelteKit dev server together.

Or run commands directly in the package:

```sh
pnpm --filter @stream-kit/site dev
pnpm --filter @stream-kit/site build
pnpm --filter @stream-kit/site preview
```

## Stack

- SvelteKit with the Node adapter
- Svelte 5 (runes mode)
- Tailwind CSS v4
