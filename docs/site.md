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

## Development

From the repository root:

```sh
pnpm dev:site
```

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
