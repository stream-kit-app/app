# Stream Kit Docs (`@stream-kit/docs`)

Fumadocs documentation site for [docs.stream-kit.app](https://docs.stream-kit.app).

## Stack

- Next.js (static export)
- Fumadocs MDX
- Content in `/docs` at the repository root

## Commands

```sh
pnpm dev:docs
pnpm build:docs
pnpm preview:docs
```

## Content

- Write `.mdx` files under `/docs` with YAML frontmatter (`title`, optional `description`).
- Sidebar: `meta.json` in `/docs` and subfolders.
- Use Fumadocs paths for internal links (`/docs/core/actions`), not `.md` relatives.
- Escape bare `{variable}` placeholders in prose as `\{variable\}` (MDX treats `{` as JSX).

## Deploy

Static output: `docs-site/out/` → Cloudflare Pages project `stream-kit-docs` (`docs.stream-kit.app`).

```sh
pnpm --filter @stream-kit/docs deploy   # local: build + wrangler pages deploy
```

CI: `.github/workflows/deploy-docs.yml` runs from `docs-site/` (Wrangler is a package `devDependency`) so the monorepo root install does not need to add Wrangler on the fly.

Required secrets: `CLOUDFLARE_API_TOKEN` (Pages: Edit) and `CLOUDFLARE_ACCOUNT_ID`.
