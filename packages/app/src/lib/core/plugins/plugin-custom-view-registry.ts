import type { PageCustomView } from '@stream-kit/ui/blocks/types';
import type { Component } from 'svelte';

import CommandsPage from '$lib/components/core/commands/commands-page.svelte';

export const pluginCustomViewRegistry = {
	commands: CommandsPage
} satisfies Record<PageCustomView, Component>;

export function isRegisteredCustomView(
	value: string
): value is keyof typeof pluginCustomViewRegistry {
	return value in pluginCustomViewRegistry;
}
