import type { Extension } from '@codemirror/state';
import { EditorView, ViewPlugin } from '@codemirror/view';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('json', json);

const HIGHLIGHTED_ATTR = 'data-stream-kit-highlighted';

function highlightTooltipMarkup(container: ParentNode): void {
	container.querySelectorAll('pre code').forEach((element) => {
		if (!(element instanceof HTMLElement) || element.hasAttribute(HIGHLIGHTED_ATTR)) {
			return;
		}

		hljs.highlightElement(element);
		element.setAttribute(HIGHLIGHTED_ATTR, '');
	});
}

function findTooltips(node: Node): HTMLElement[] {
	if (!(node instanceof HTMLElement)) {
		return [];
	}

	if (node.classList.contains('cm-tooltip')) {
		return [node];
	}

	return [...node.querySelectorAll<HTMLElement>('.cm-tooltip')];
}

class LspTooltipHighlighter {
	private readonly observer: MutationObserver;

	constructor(_view: EditorView) {
		this.observer = new MutationObserver((records) => {
			for (const record of records) {
				for (const node of record.addedNodes) {
					for (const tooltip of findTooltips(node)) {
						highlightTooltipMarkup(tooltip);
					}
				}
			}
		});

		this.observer.observe(document.body, { childList: true, subtree: true });
	}

	destroy(): void {
		this.observer.disconnect();
	}
}

/** Applies syntax highlighting to markdown code blocks inside LSP hover/completion tooltips. */
export function lspTooltipSyntaxHighlighting(): Extension {
	return ViewPlugin.define((view) => new LspTooltipHighlighter(view));
}
