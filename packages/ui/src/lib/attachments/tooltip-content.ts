import type { Snippet } from 'svelte';

export type TooltipSnippetPayloadNone = {
	readonly kind: 'snippet';
	readonly mode: 'none';
	snippet: Snippet<[]>;
};

export type TooltipSnippetPayloadOne<Arg = unknown> = {
	readonly kind: 'snippet';
	readonly mode: 'one';
	snippet: Snippet<[Arg]>;
	arg: Arg;
};

export type TooltipSnippetPayload = TooltipSnippetPayloadNone | TooltipSnippetPayloadOne<any>;

export type TooltipHtmlPayload = {
	readonly kind: 'html';
	content: string;
};

export type TooltipPayload = TooltipHtmlPayload | TooltipSnippetPayload;

export type TooltipContent =
	| string
	| TooltipSnippetPayload
	| (() => string | TooltipSnippetPayload);

export function tooltipSnippet(snippet: Snippet<[]>): TooltipSnippetPayloadNone;
export function tooltipSnippet<Arg>(
	snippet: Snippet<[Arg]>,
	arg: Arg
): TooltipSnippetPayloadOne<Arg>;
export function tooltipSnippet<Arg>(
	snippet: Snippet<[Arg]> | Snippet<[]>,
	arg?: Arg
): TooltipSnippetPayload {
	if (arguments.length === 1) {
		return { kind: 'snippet', mode: 'none', snippet: snippet as Snippet<[]> };
	}

	return {
		kind: 'snippet',
		mode: 'one',
		snippet: snippet as Snippet<[any]>,
		arg
	};
}

export function isTooltipSnippetPayload(value: unknown): value is TooltipSnippetPayload {
	return (
		typeof value === 'object' &&
		value !== null &&
		'kind' in value &&
		(value as TooltipSnippetPayload).kind === 'snippet'
	);
}

export function resolveTooltipContent(content: TooltipContent): TooltipPayload {
	const value = typeof content === 'function' ? content() : content;

	if (typeof value === 'string') {
		return { kind: 'html', content: value };
	}

	if (isTooltipSnippetPayload(value)) {
		return value;
	}

	throw new Error('Invalid tooltip content');
}
