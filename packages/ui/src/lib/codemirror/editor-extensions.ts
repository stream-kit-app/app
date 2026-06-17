import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { lintGutter } from '@codemirror/lint';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import type { Extension } from '@codemirror/state';
import { highlightActiveLine, highlightActiveLineGutter, keymap } from '@codemirror/view';

import { formatEditorDocument } from './format-document';

/** Shared CodeMirror extensions for all Stream Kit editors. */
export const streamKitEditorExtensions: Extension[] = [
	highlightActiveLine(),
	highlightActiveLineGutter(),
	lintGutter(),
	bracketMatching(),
	closeBrackets(),
	foldGutter(),
	search({ top: true }),
	keymap.of([
		...closeBracketsKeymap,
		...searchKeymap,
		...foldKeymap,
		{ key: 'Mod-Shift-f', run: (view) => (void formatEditorDocument(view), true) },
		{ key: 'Shift-Alt-f', run: (view) => (void formatEditorDocument(view), true) }
	])
];

export { highlightSelectionMatches };
