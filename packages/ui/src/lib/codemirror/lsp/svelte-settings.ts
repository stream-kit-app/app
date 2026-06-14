/** Minimal LSP settings for the in-browser Svelte language server. */
export const SVELTE_LSP_SETTINGS = {
	svelte: {
		enable: true
	},
	'svelte.plugin.prettier.config': {
		useTabs: true,
		tabWidth: 4,
		singleQuote: true
	}
} as const;

export const SVELTE_LSP_INITIALIZATION_OPTIONS = {
	configuration: SVELTE_LSP_SETTINGS
} as const;
