import { EditorView } from '@codemirror/view';

/** Max width for LSP hover, completion info, and other editor tooltips. */
const TOOLTIP_MAX_WIDTH = '32rem';

export const streamKitEditorTheme = EditorView.theme(
	{
		'&': {
			backgroundColor: 'var(--color-dark-900)',
			color: 'var(--color-dark-50)',
			fontSize: '13px',
			fontFamily:
				'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
			lineHeight: '1.55'
		},
		'.cm-content': {
			caretColor: 'var(--color-primary)',
			padding: '14px 0'
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: 'var(--color-primary)'
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: 'color-mix(in srgb, var(--color-primary) 24%, transparent) !important'
		},
		'.cm-gutters': {
			backgroundColor: 'var(--color-dark-900)',
			color: 'var(--color-dark-300)',
			borderRight: '1px solid var(--color-dark-700)'
		},
		'.cm-activeLineGutter': {
			backgroundColor: 'var(--color-dark-800)',
			color: 'var(--color-dark-50)'
		},
		'.cm-activeLine': {
			backgroundColor: 'color-mix(in srgb, var(--color-dark-800) 74%, transparent)'
		},
		'.cm-lineNumbers .cm-gutterElement': {
			padding: '0 9px 0 12px',
			minWidth: '2.5rem'
		},
		'.cm-scroller': {
			overflow: 'auto'
		},
		'.cm-placeholder': {
			color: 'var(--color-dark-300)'
		},
		'.cm-tooltip': {
			backgroundColor: 'var(--color-dark-800)',
			border: '1px solid var(--color-dark-600)',
			borderRadius: '0.5rem',
			boxShadow: '0 18px 40px color-mix(in srgb, black 32%, transparent)',
			color: 'var(--color-dark-50)',
			maxWidth: TOOLTIP_MAX_WIDTH,
			overflow: 'auto',
			wordBreak: 'break-word'
		},
		'.cm-tooltip-hover, .cm-completionInfo': {
			maxWidth: TOOLTIP_MAX_WIDTH
		},
		'.cm-tooltip .documentation': {
			maxWidth: TOOLTIP_MAX_WIDTH,
			lineHeight: '1.5',
			overflowWrap: 'anywhere'
		},
		'.cm-tooltip .documentation pre': {
			overflowX: 'auto',
			maxWidth: '100%',
			whiteSpace: 'pre-wrap',
			margin: '0.5rem 0',
			padding: '0.5rem 0.75rem',
			borderRadius: '0.5rem',
			backgroundColor: 'var(--color-dark-900)'
		},
		'.cm-tooltip .documentation :not(pre) > code': {
			backgroundColor: 'var(--color-dark-700)',
			padding: '0.1em 0.35em',
			borderRadius: '0.25rem',
			fontSize: '0.92em',
			color: '#c3e88d'
		},
		'.cm-tooltip .hljs': {
			background: 'transparent',
			padding: 0,
			fontSize: '12px'
		},
		'.cm-tooltip .hljs-keyword, .cm-tooltip .hljs-selector-tag, .cm-tooltip .hljs-built_in': {
			color: '#c792ea'
		},
		'.cm-tooltip .hljs-title, .cm-tooltip .hljs-title.function_, .cm-tooltip .hljs-function': {
			color: '#82aaff'
		},
		'.cm-tooltip .hljs-type, .cm-tooltip .hljs-class .hljs-title, .cm-tooltip .hljs-number': {
			color: '#ffcb6b'
		},
		'.cm-tooltip .hljs-string, .cm-tooltip .hljs-regexp, .cm-tooltip .hljs-symbol': {
			color: '#c3e88d'
		},
		'.cm-tooltip .hljs-literal, .cm-tooltip .hljs-params': {
			color: '#f78c6c'
		},
		'.cm-tooltip .hljs-comment, .cm-tooltip .hljs-quote': {
			color: '#64748b',
			fontStyle: 'italic'
		},
		'.cm-tooltip .hljs-operator, .cm-tooltip .hljs-punctuation': {
			color: '#89ddff'
		},
		'.cm-tooltip .hljs-variable, .cm-tooltip .hljs-attr, .cm-tooltip .hljs-attribute': {
			color: '#e2e8f0'
		},
		'.cm-tooltip .hljs-tag, .cm-tooltip .hljs-name': {
			color: '#f07178'
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: 'color-mix(in srgb, var(--color-primary) 18%, transparent)',
				color: '#f8fafc'
			}
		},
		'.cm-diagnostic': {
			padding: '4px 8px'
		},
		'.cm-diagnostic-error': {
			borderLeft: '3px solid #f87171'
		},
		'.cm-diagnostic-warning': {
			borderLeft: '3px solid #fbbf24'
		},
		'.cm-diagnostic-info': {
			borderLeft: '3px solid #60a5fa'
		},
		'.cm-foldGutter .cm-gutterElement': {
			padding: '0 4px',
			cursor: 'pointer'
		},
		'.cm-panel.cm-search': {
			backgroundColor: 'var(--color-dark-800)',
			borderTop: '1px solid var(--color-dark-600)',
			color: 'var(--color-dark-50)',
			padding: '8px 12px'
		},
		'.cm-panel.cm-search input, .cm-panel.cm-search button, .cm-panel.cm-search label': {
			font: 'inherit',
			color: 'inherit'
		},
		'.cm-panel.cm-search input': {
			backgroundColor: 'var(--color-dark-900)',
			border: '1px solid var(--color-dark-600)',
			borderRadius: '0.375rem',
			padding: '4px 8px'
		},
		'.cm-panel.cm-search button': {
			backgroundColor: 'var(--color-dark-700)',
			border: '1px solid var(--color-dark-600)',
			borderRadius: '0.375rem',
			padding: '4px 10px',
			cursor: 'pointer'
		},
		'.cm-searchMatch': {
			backgroundColor: 'color-mix(in srgb, var(--color-primary) 28%, transparent)',
			outline: '1px solid color-mix(in srgb, var(--color-primary) 50%, transparent)'
		},
		'.cm-searchMatch-selected': {
			backgroundColor: 'color-mix(in srgb, var(--color-primary) 42%, transparent)'
		}
	},
	{ dark: true }
);
