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

Static output: `docs-site/out/`

GitHub Actions: `.github/workflows/deploy-docs.yml` → Cloudflare Pages (`stream-kit-docs`).
