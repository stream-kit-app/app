# PocketBase (site + app)

Ops notes for the shared PocketBase backend used by `@stream-kit/site` and the desktop app account/cloud features. Schema/layout details also live in `.cursor/rules/pocketbase.mdc` and `contributing/site.mdx`.

## Auth rate limits

In production PocketBase admin (`Settings` → **Rate limits** / collection auth options), **enable rate limits** for:

- Auth collection **login** (`authWithPassword`)
- Auth collection **register** (create)
- Related auth endpoints (password reset, email change, verification) as appropriate

Without rate limits, credential stuffing and account spam are trivial. Local/dev instances may leave limits loose; production should restrict by IP (and optionally by identity) for auth routes.

## Collections used by the desktop app

| Collection | Notes |
| --- | --- |
| `users` | Auth; avatar/name/email |
| `subscriptions` / `user_subscriptions` | Plan catalog + membership (`status`, optional `endsAt` grace) |
| `user_files` | Protected media uploads; clients use `pb.files.getToken()` |
| `user_actions` / `user_action_queues` | Config sync; monotone `revision` + LWW |
| `user_plugin_records` | Generic per-record plugin data sync (`pluginKey` + `collection` + JSON `payload`); entitlement via `user_config_sync.pb.js` |
| `user_overlay_projects` | Full overlay authoring sync (metadata + protected `source` zip + `sourceHash`); distinct from public `user_overlays` publish |
| `user_dashboard_widgets` | Dashboard widget layout sync |
| `user_overlays` | Published overlay browser sources: `overlayId` = local overlay UUID (unique), PB `id` is auto 15-char, `bundle` (zip of `dist/`, public, max 25MB), `config` JSON, `published`. Public list/view when `published = true`; owner CRUD + entitlement hook (`user_overlays.pb.js`). Served by the site at `/app/overlays/[uuid]/`, not as PocketBase UI routes. |

Prefer `pb.filter('user={:id}', { id })` on the JS SDK when building filters with dynamic values.
