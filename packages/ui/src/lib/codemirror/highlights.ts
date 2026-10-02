import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export const streamKitHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: 'var(--syntax-keyword)' },
	{ tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: 'var(--syntax-name)' },
	{ tag: [t.function(t.variableName), t.labelName], color: 'var(--syntax-function)' },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: 'var(--syntax-constant)' },
	{ tag: [t.definition(t.name), t.separator], color: 'var(--syntax-name)' },
	{
		tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
		color: 'var(--syntax-type)'
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: 'var(--syntax-operator)'
	},
	{ tag: [t.meta, t.comment], color: 'var(--syntax-comment)', fontStyle: 'italic' },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.link, color: 'var(--syntax-function)', textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: 'var(--syntax-keyword)' },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: 'var(--syntax-constant)' },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: 'var(--syntax-string)' },
	{ tag: t.invalid, color: 'var(--syntax-invalid)' },
	{ tag: t.tagName, color: 'var(--syntax-tag)' },
	{ tag: t.attributeName, color: 'var(--syntax-keyword)' },
	{ tag: t.attributeValue, color: 'var(--syntax-string)' }
]);

export const streamKitSyntaxHighlighting = syntaxHighlighting(streamKitHighlightStyle);
