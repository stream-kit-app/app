import { openSearchPanel } from '@codemirror/search';
import type { EditorView } from '@codemirror/view';

import { formatEditorDocument as formatDocument } from './format-document';

export function openEditorSearch(view: EditorView): void {
	openSearchPanel(view);
}

export function formatEditorDocument(view: EditorView): Promise<boolean> {
	return formatDocument(view);
}
