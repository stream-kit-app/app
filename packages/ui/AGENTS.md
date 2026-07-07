# @stream-kit/ui

This package contains app-agnostic Svelte 5 UI primitives for Stream Kit.

Declarative plugin menu pages are rendered by the app with this package. Plugin authors should define page schemas through `@stream-kit/plugin`; they should not import Svelte components from this package for menu pages.

The package is published to npm for plugin authors who build custom Svelte views or dashboard widgets. At runtime the app provides `@stream-kit/ui` through the plugin host import map — consumers externalize it at build time.

Rules for changes in this package:

- Do not import from `packages/app`, `$lib`, SvelteKit routes, app stores, app i18n, or Tauri APIs.
- Keep exports stable and documented because the app renderer and internal screens consume them.
- Prefer typed Svelte 5 props and snippets.
- Keep components theme-token based; the app provides Tailwind tokens and global styles.
- Attachments such as `tooltip` belong here when they are useful to shared app UI.
- Tooltip content should use Svelte snippets via `tooltipSnippet(snippet, arg)`, not HTML strings built in JavaScript. Pass a single object when the snippet needs multiple values (`{@render}` does not support spread). Reserve string/`{@html}` tooltips for trivial one-line text only.
