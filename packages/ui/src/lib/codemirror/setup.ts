import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput } from '@codemirror/language';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, placeholder as placeholderExt } from '@codemirror/view';

import { streamKitEditorExtensions } from './editor-extensions';
import { editorDocumentLanguage } from './format-document';
import { editorIndentExtensions } from './editor-indent';
import { getLanguageExtensions } from './languages';
import { streamKitSyntaxHighlighting } from './highlights';
import { streamKitEditorTheme } from './theme';
import type { CodeLanguage } from './types';

export type CreateEditorOptions = {
	parent: HTMLElement;
	doc: string;
	language: CodeLanguage;
	placeholder?: string;
	extensions?: Extension[];
	onChange?: (value: string) => void;
};

export function createEditorView(options: CreateEditorOptions): EditorView {
	const updateListener = EditorView.updateListener.of((update) => {
		if (update.docChanged) {
			options.onChange?.(update.state.doc.toString());
		}
	});

	const extensions: Extension[] = [
		lineNumbers(),
		history(),
		...editorIndentExtensions,
		...streamKitEditorExtensions,
		indentOnInput(),
		streamKitEditorTheme,
		streamKitSyntaxHighlighting,
		EditorView.lineWrapping,
		keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
		...getLanguageExtensions(options.language),
		editorDocumentLanguage.of(options.language),
		updateListener,
		...(options.extensions ?? [])
	];

	if (options.placeholder) {
		extensions.push(placeholderExt(options.placeholder));
	}

	const state = EditorState.create({
		doc: options.doc,
		extensions
	});

	return new EditorView({
		state,
		parent: options.parent
	});
}

export function syncEditorDocument(view: EditorView, nextValue: string): void {
	const current = view.state.doc.toString();

	if (current === nextValue) {
		return;
	}

	const selection = view.state.selection;

	view.dispatch({
		changes: { from: 0, to: view.state.doc.length, insert: nextValue },
		selection
	});
}
