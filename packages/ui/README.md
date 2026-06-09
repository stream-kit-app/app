# @stream-kit/ui

Shared Svelte 5 UI primitives for Stream Kit.

The app uses this package to render first-party screens and declarative plugin menu pages. Plugin menu page authors should define page schemas from `@stream-kit/app/api`; Stream Kit renders those schemas with these components.

## App Usage

```svelte
<script lang="ts">
	import { Button, Container, Heading, tooltip } from '@stream-kit/ui';
</script>

<Container size="md" class="py-8">
	<Heading level={1} subTitle="Rendered by Stream Kit">
		Hello
	</Heading>

	<Button {@attach tooltip('App-owned UI')}>Click me</Button>
</Container>
```

## Plugin Page Usage

Plugins do not pass Svelte components or HTML for menu pages. They provide declarative page definitions:

```ts
import type { Plugin } from '@stream-kit/app/api';

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

## Notes

- Components assume the Stream Kit Tailwind theme is present in the host app.
- This package must not import from `@stream-kit/app`, `$lib`, SvelteKit routes, app stores, app i18n, or Tauri APIs.
- Plugin menu pages must not use raw HTML, `{@html}`, or plugin-provided Svelte components.
- Page block types and the generic `PageBlocks` renderer live in `@stream-kit/ui/blocks`.
- Button blocks may define an `onClick` handler; the plugin controls that callback.
