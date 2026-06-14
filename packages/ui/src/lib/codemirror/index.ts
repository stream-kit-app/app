export { createEditorView, syncEditorDocument, type CreateEditorOptions } from './setup';
export {
	EDITOR_TAB_SIZE,
	EDITOR_USE_TABS,
	VIRTUAL_EDITORCONFIG,
	VIRTUAL_PRETTIERRC,
	editorIndentUnit
} from './editor-indent';
export { getLanguageExtensions } from './languages';
export { streamKitEditorTheme } from './theme';
export { createLanguageServerConnection, type LanguageServerConnection } from './lsp/connection';
export type { CodeLanguage, LanguageServerConfig, LanguageServerKind } from './types';
