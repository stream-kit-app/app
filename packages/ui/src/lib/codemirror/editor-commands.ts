import { openSearchPanel } from '@codemirror/search';
import type { EditorView } from '@codemirror/view';
import { formatDocument } from 'codemirror-languageserver';

export function openEditorSearch(view: EditorView): void {
	openSearchPanel(view);
}

export function formatEditorDocument(view: EditorView): boolean {
	return formatDocument(view);
}
