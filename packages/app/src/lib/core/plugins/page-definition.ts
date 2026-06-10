import type { PageBlock, PageDefinition } from '@stream-kit/ui/blocks/types';

export function isPageCustomViewDefinition(
	page: PageDefinition
): page is Extract<PageDefinition, { customView: string }> {
	return 'customView' in page && page.customView != null;
}

export function isPageBlocksDefinition(
	page: PageDefinition
): page is Extract<PageDefinition, { blocks: PageBlock[] }> {
	return 'blocks' in page && Array.isArray(page.blocks);
}
