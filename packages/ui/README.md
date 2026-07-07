# @stream-kit/ui

Shared Svelte 5 UI primitives for Stream Kit.

The app uses this package to render first-party screens and declarative plugin menu pages. Plugin menu page authors should define page schemas from `@stream-kit/plugin`; Stream Kit renders those schemas with these components.

## Installation (plugin authors)

Add as a **dev dependency** when you build custom Svelte views or dashboard widgets. Zip plugins that use declarative page blocks only do not need this package.

```bash
npm install --save-dev @stream-kit/ui @stream-kit/plugin @stream-kit/core
```

At runtime Stream Kit resolves `@stream-kit/ui` from the plugin host import map (`/plugin-host/@stream-kit/ui/*`). **Do not bundle** `@stream-kit/ui` into your plugin entry. Externalize it in your Vite or Rollup config alongside `svelte`, `@stream-kit/plugin`, and `@stream-kit/core`.

Match the npm version to the Stream Kit app version you target so types align with the host bundles.

## App Usage

```svelte
<script lang="ts">
	import { Button, Container, Heading, tooltip, tooltipSnippet } from '@stream-kit/ui';
</script>

<Container size="md" class="py-8">
	<Heading level={1} subTitle="Rendered by Stream Kit">
		Hello
	</Heading>

	<Button {@attach tooltip('App-owned UI')}>Click me</Button>
	<Button {@attach tooltip(() => tooltipSnippet(details, item))}>Details</Button>
</Container>
```

## Plugin Page Usage

Plugins do not pass Svelte components or HTML for menu pages. They provide declarative page definitions:

```ts
import type { Plugin } from '@stream-kit/plugin';

const plugin: Plugin = (app) => ({
	name: 'Hello World',
	menuItems: [
		{
			title: 'Hello World',
			icon: 'ri:hand-heart-line',
			page: {
				title: 'Hello World',
				blocks: [{ type: 'text', text: 'Rendered by Stream Kit.' }]
			}
		}
	]
});

export default plugin;
```

## Plugin custom views

Built-in-style plugins with `customViews` or dashboard widgets can import Svelte components:

```svelte
<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	let { app }: PluginCustomViewProps = $props();
</script>

<Container size="md" class="px-6 py-6">
	<Button onclick={() => app.toast.create({ title: 'Hello' })}>Click me</Button>
</Container>
```

External zip plugins cannot register `customViews`; they use declarative page blocks instead.

## Notes

- Components assume the Stream Kit Tailwind theme is present in the host app.
- This package must not import from `@stream-kit/app`, `$lib`, SvelteKit routes, app stores, app i18n, or Tauri APIs.
- Plugin menu pages must not use raw HTML, `{@html}`, or plugin-provided Svelte components.
- Page block types and the generic `PageBlocks` renderer live in `@stream-kit/ui/blocks`.
- Button blocks may define an `onClick` handler; the plugin controls that callback.
