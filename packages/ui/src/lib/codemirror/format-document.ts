import type { EditorView } from '@codemirror/view';
import { Facet } from '@codemirror/state';

import { EDITOR_TAB_SIZE, EDITOR_USE_TABS } from './editor-indent';
import type { CodeLanguage } from './types';

/** Tracks the Stream Kit language mode for client-side formatting. */
export const editorDocumentLanguage = Facet.define<CodeLanguage, CodeLanguage>({
	combine: (values) => values[0] ?? 'typescript'
});

const PRETTIER_OPTIONS = {
	useTabs: EDITOR_USE_TABS,
	tabWidth: EDITOR_TAB_SIZE,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'none' as const
};

function formatJson(source: string): string {
	const indent = EDITOR_USE_TABS ? '\t' : ' '.repeat(EDITOR_TAB_SIZE);
	return `${JSON.stringify(JSON.parse(source), null, indent)}\n`;
}

async function loadPrettierPlugins(language: CodeLanguage) {
	const [prettier, estree, babel, typescript] = await Promise.all([
		import('prettier/standalone'),
		import('prettier/plugins/estree'),
		import('prettier/plugins/babel'),
		import('prettier/plugins/typescript')
	]);

	if (language !== 'svelte') {
		return {
			prettier,
			plugins: [typescript, babel, estree]
		};
	}

	const [html, postcss, sveltePluginModule] = await Promise.all([
		import('prettier/plugins/html'),
		import('prettier/plugins/postcss'),
		import('prettier-plugin-svelte/browser')
	]);

	const sveltePlugin = sveltePluginModule.default ?? sveltePluginModule;

	// Order matters: core parsers first, Svelte plugin last (see prettier-plugin-svelte browser docs).
	return {
		prettier,
		plugins: [babel, estree, html, typescript, postcss, sveltePlugin]
	};
}

async function formatWithPrettier(source: string, language: CodeLanguage): Promise<string> {
	const { prettier, plugins } = await loadPrettierPlugins(language);

	return prettier.format(source, {
		parser: language === 'typescript' ? 'typescript' : language === 'svelte' ? 'svelte' : 'babel',
		plugins,
		...PRETTIER_OPTIONS
	});
}

/** Format source text with Prettier (or JSON.stringify for json). Throws on invalid JSON. */
export async function formatSourceText(source: string, language: CodeLanguage): Promise<string> {
	if (language === 'json') {
		return formatJson(source);
	}

	return formatWithPrettier(source, language);
}

export function applyFormattedDocument(view: EditorView, formatted: string): boolean {
	const source = view.state.doc.toString();

	if (formatted === source) {
		return true;
	}

	view.dispatch({
		changes: { from: 0, to: view.state.doc.length, insert: formatted },
		selection: view.state.selection
	});

	return true;
}

export async function formatEditorDocument(view: EditorView): Promise<boolean> {
	const language = view.state.facet(editorDocumentLanguage);
	const source = view.state.doc.toString();

	try {
		const formatted = await formatSourceText(source, language);
		return applyFormattedDocument(view, formatted);
	} catch (error) {
		console.warn('[codemirror] Format failed:', error);
		return false;
	}
}
