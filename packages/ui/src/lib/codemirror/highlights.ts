import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export const streamKitHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: '#c792ea' },
	{ tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: '#e2e8f0' },
	{ tag: [t.function(t.variableName), t.labelName], color: '#82aaff' },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#f78c6c' },
	{ tag: [t.definition(t.name), t.separator], color: '#e2e8f0' },
	{
		tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
		color: '#ffcb6b'
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: '#89ddff'
	},
	{ tag: [t.meta, t.comment], color: '#64748b', fontStyle: 'italic' },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.link, color: '#82aaff', textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: '#c792ea' },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: '#f78c6c' },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: '#c3e88d' },
	{ tag: t.invalid, color: '#f87171' },
	{ tag: t.tagName, color: '#f07178' },
	{ tag: t.attributeName, color: '#c792ea' },
	{ tag: t.attributeValue, color: '#c3e88d' }
]);

export const streamKitSyntaxHighlighting = syntaxHighlighting(streamKitHighlightStyle);
