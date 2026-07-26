<script lang="ts">
	import { EmptyState } from '@stream-kit/ui/empty-state';

	type Props = {
		html: string;
	};

	let { html }: Props = $props();
</script>

{#if html}
	<div class="plugin-markdown">
		{@html html}
	</div>
{:else}
	<EmptyState
		icon="ri:file-text-line"
		title="No overview yet"
		description="No overview content yet for this plugin."
		class="min-h-0 p-0"
	/>
{/if}

<style>
	:global(.plugin-markdown) {
		color: var(--color-dark-100);
		font-size: 0.95rem;
		line-height: 1.7;
	}

	:global(.plugin-markdown > :first-child) {
		margin-top: 0;
	}

	:global(.plugin-markdown > :last-child) {
		margin-bottom: 0;
	}

	:global(.plugin-markdown h1),
	:global(.plugin-markdown h2),
	:global(.plugin-markdown h3),
	:global(.plugin-markdown h4) {
		font-family: var(--font-outfit, Outfit, sans-serif);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--color-dark-50);
		margin: 1.5em 0 0.6em;
	}

	:global(.plugin-markdown h1) {
		font-size: 1.75rem;
	}

	:global(.plugin-markdown h2) {
		font-size: 1.35rem;
	}

	:global(.plugin-markdown h3) {
		font-size: 1.15rem;
	}

	:global(.plugin-markdown p),
	:global(.plugin-markdown ul),
	:global(.plugin-markdown ol),
	:global(.plugin-markdown pre),
	:global(.plugin-markdown blockquote) {
		margin: 0.85em 0;
	}

	:global(.plugin-markdown a) {
		color: var(--color-primary-200);
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
	}

	:global(.plugin-markdown ul),
	:global(.plugin-markdown ol) {
		padding-left: 1.35rem;
	}

	:global(.plugin-markdown li) {
		margin: 0.25em 0;
	}

	:global(.plugin-markdown code) {
		border-radius: 0.35rem;
		background: color-mix(in oklch, var(--color-dark-700) 80%, transparent);
		padding: 0.15em 0.4em;
		font-size: 0.875em;
	}

	:global(.plugin-markdown pre) {
		overflow-x: auto;
		border-radius: 0.75rem;
		border: 1px solid var(--color-dark-600);
		background: var(--color-dark-900);
		padding: 1rem;
	}

	:global(.plugin-markdown pre code) {
		background: transparent;
		padding: 0;
	}

	:global(.plugin-markdown blockquote) {
		border-left: 3px solid var(--color-primary-400);
		padding-left: 1rem;
		color: var(--color-dark-200);
	}

	:global(.plugin-markdown table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1em 0;
		font-size: 0.9rem;
	}

	:global(.plugin-markdown th),
	:global(.plugin-markdown td) {
		border: 1px solid var(--color-dark-600);
		padding: 0.5rem 0.75rem;
		text-align: left;
	}

	:global(.plugin-markdown th) {
		background: var(--color-dark-800);
	}
</style>
