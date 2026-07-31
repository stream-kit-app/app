# `@stream-kit/site`

Marketing site and cloud overlay host for [stream-kit.app](https://stream-kit.app).

## Stack

- SvelteKit + Tailwind v4 + `@stream-kit/ui`
- Cloudflare Workers (`@sveltejs/adapter-cloudflare`) with Durable Objects for overlay WebSockets
- PocketBase backend (separate; see `site/pb/`)

## Commands

```sh
pnpm --filter @stream-kit/site dev:site   # Vite + local /ws hub
pnpm --filter @stream-kit/site build      # production Worker bundle
pnpm --filter @stream-kit/site preview    # wrangler dev after build
pnpm --filter @stream-kit/site deploy     # wrangler deploy after build
```

From the monorepo root: `pnpm dev:site`, `pnpm build:site`, `pnpm preview:site`.

## Docs

See [contributing/site.mdx](../contributing/site.mdx) for PocketBase, overlays, and Cloudflare deploy details.
