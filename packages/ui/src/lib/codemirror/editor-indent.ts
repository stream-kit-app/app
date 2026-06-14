import { indentUnit } from '@codemirror/language';
import { EditorState, type Extension } from '@codemirror/state';

/** Matches the Stream Kit repo Prettier config (`.prettierrc`). */
export const EDITOR_TAB_SIZE = 4;
export const EDITOR_USE_TABS = true;

export const editorIndentUnit = EDITOR_USE_TABS ? '\t' : ' '.repeat(EDITOR_TAB_SIZE);

export const editorIndentExtensions: Extension[] = [
	indentUnit.of(editorIndentUnit),
	EditorState.tabSize.of(EDITOR_TAB_SIZE)
];

export const VIRTUAL_EDITORCONFIG = `root = true

[*]
indent_style = tab
indent_size = ${EDITOR_TAB_SIZE}
tab_width = ${EDITOR_TAB_SIZE}
`;

export const VIRTUAL_PRETTIERRC = JSON.stringify(
	{
		useTabs: EDITOR_USE_TABS,
		tabWidth: EDITOR_TAB_SIZE,
		singleQuote: true
	},
	null,
	2
);
