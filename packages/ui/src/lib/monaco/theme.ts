import type { editor } from 'monaco-editor';

export const streamKitMonacoTheme: editor.IStandaloneThemeData = {
	base: 'vs-dark',
	inherit: true,
	rules: [
		{ token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
		{ token: 'keyword', foreground: 'c084fc' },
		{ token: 'string', foreground: '86efac' },
		{ token: 'number', foreground: 'fbbf24' },
		{ token: 'type', foreground: '67e8f9' },
		{ token: 'identifier', foreground: 'e5e7eb' }
	],
	colors: {
		'editor.background': '#111827',
		'editor.foreground': '#e5e7eb',
		'editorLineNumber.foreground': '#4b5563',
		'editorLineNumber.activeForeground': '#9ca3af',
		'editor.selectionBackground': '#374151',
		'editor.inactiveSelectionBackground': '#1f2937',
		'editorCursor.foreground': '#a78bfa',
		'editor.lineHighlightBackground': '#1f293780',
		'editorIndentGuide.background': '#374151',
		'editorIndentGuide.activeBackground': '#4b5563',
		'editorWidget.background': '#111827',
		'editorWidget.foreground': '#e5e7eb',
		'editorWidget.border': '#374151',
		'editorHoverWidget.background': '#111827',
		'editorHoverWidget.foreground': '#e5e7eb',
		'editorHoverWidget.border': '#374151',
		'editorSuggestWidget.background': '#111827',
		'editorSuggestWidget.foreground': '#e5e7eb',
		'editorSuggestWidget.border': '#374151',
		'editorSuggestWidget.selectedBackground': '#1f2937',
		'editorSuggestWidget.selectedForeground': '#f9fafb',
		'editorSuggestWidget.highlightForeground': '#c084fc',
		'editorSuggestWidget.focusHighlightForeground': '#c084fc',
		'menu.background': '#111827',
		'menu.foreground': '#e5e7eb',
		'menu.border': '#374151',
		'menu.selectionBackground': '#1f2937',
		'menu.selectionForeground': '#f9fafb',
		'menu.separatorBackground': '#374151',
		'editorActionList.background': '#111827',
		'editorActionList.foreground': '#e5e7eb',
		'editorActionList.focusBackground': '#1f2937',
		'editorActionList.focusForeground': '#f9fafb',
		'input.background': '#1f2937',
		'input.foreground': '#e5e7eb',
		'input.border': '#374151',
		'quickInput.background': '#111827',
		'quickInput.foreground': '#e5e7eb'
	}
};

export const streamKitMonacoLightTheme: editor.IStandaloneThemeData = {
	base: 'vs',
	inherit: true,
	rules: [
		{ token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
		{ token: 'keyword', foreground: '7c3aed' },
		{ token: 'string', foreground: '15803d' },
		{ token: 'number', foreground: 'b45309' },
		{ token: 'type', foreground: '0e7490' },
		{ token: 'identifier', foreground: '1f2937' }
	],
	colors: {
		'editor.background': '#ffffff',
		'editor.foreground': '#1f2937',
		'editorLineNumber.foreground': '#9ca3af',
		'editorLineNumber.activeForeground': '#4b5563',
		'editor.selectionBackground': '#ddd6fe',
		'editor.inactiveSelectionBackground': '#ede9fe',
		'editorCursor.foreground': '#6d28d9',
		'editor.lineHighlightBackground': '#f3f4f680',
		'editorIndentGuide.background': '#e5e7eb',
		'editorIndentGuide.activeBackground': '#d1d5db',
		'editorWidget.background': '#ffffff',
		'editorWidget.foreground': '#1f2937',
		'editorWidget.border': '#d1d5db',
		'editorHoverWidget.background': '#ffffff',
		'editorHoverWidget.foreground': '#1f2937',
		'editorHoverWidget.border': '#d1d5db',
		'editorSuggestWidget.background': '#ffffff',
		'editorSuggestWidget.foreground': '#1f2937',
		'editorSuggestWidget.border': '#d1d5db',
		'editorSuggestWidget.selectedBackground': '#eef2ff',
		'editorSuggestWidget.selectedForeground': '#111827',
		'editorSuggestWidget.highlightForeground': '#7c3aed',
		'editorSuggestWidget.focusHighlightForeground': '#7c3aed',
		'menu.background': '#ffffff',
		'menu.foreground': '#1f2937',
		'menu.border': '#d1d5db',
		'menu.selectionBackground': '#eef2ff',
		'menu.selectionForeground': '#111827',
		'menu.separatorBackground': '#e5e7eb',
		'editorActionList.background': '#ffffff',
		'editorActionList.foreground': '#1f2937',
		'editorActionList.focusBackground': '#eef2ff',
		'editorActionList.focusForeground': '#111827',
		'input.background': '#f3f4f6',
		'input.foreground': '#1f2937',
		'input.border': '#d1d5db',
		'quickInput.background': '#ffffff',
		'quickInput.foreground': '#1f2937'
	}
};

export const STREAM_KIT_MONACO_THEMES = {
	dark: 'stream-kit-dark',
	light: 'stream-kit-light'
} as const;

/** Register both Stream Kit themes on a Monaco instance (idempotent). */
export function defineStreamKitMonacoThemes(monaco: { editor: typeof editor }): void {
	monaco.editor.defineTheme(STREAM_KIT_MONACO_THEMES.dark, streamKitMonacoTheme);
	monaco.editor.defineTheme(STREAM_KIT_MONACO_THEMES.light, streamKitMonacoLightTheme);
}
