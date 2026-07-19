import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { QuotesService } from '../app/lib/quotes.svelte';
import {
	contextToVariables,
	getFieldValue,
	interpolateTemplate,
	resolveFieldText
} from '../lib/get-field-value';
import { sendChatMessage } from '../lib/send-chat';

function readContextString(data: Record<string, unknown> | undefined, key: string): string | undefined {
	const value = data?.[key];

	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function resolveQuoteId(data: Record<string, unknown> | undefined, fieldId: string): number | undefined {
	const raw = fieldId || readContextString(data, 'id');

	if (!raw) {
		return undefined;
	}

	const id = Number(raw);

	if (!Number.isInteger(id) || id < 1) {
		return undefined;
	}

	return id;
}

function readTemplate(fields: Parameters<typeof getFieldValue>[0], key: string): string {
	const value = getFieldValue(fields, key);

	return typeof value === 'string' ? value.trim() : '';
}

export function createSendQuoteMessageHandler(app: PluginAppApi, quotes: QuotesService) {
	return {
		name: 'Send quote message',
		fields: [
			{
				type: 'text',
				name: 'Quote ID',
				placeholder: '{id}'
			},
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Quote #{id}: "{quote}" — {addedBy}'
			},
			{
				type: 'text',
				name: 'Not found',
				placeholder: 'Quote #{id} does not exist.',
				defaultValue: 'Quote #{id} does not exist.'
			},
			{
				type: 'text',
				name: 'Empty',
				placeholder: 'No quotes saved yet.',
				defaultValue: 'No quotes saved yet.'
			},
			{
				type: 'switch',
				name: 'As bot',
				placeholder: 'Send as bot account'
			}
		],
		execute: async (_action, handler, context, next) => {
			const data = context.data as Record<string, unknown> | undefined;
			const channel = readContextString(data, 'channel');
			const broadcasterId = readContextString(data, 'broadcasterId');
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const template = readTemplate(handler.fields, 'message');
			const notFoundTemplate =
				readTemplate(handler.fields, 'not-found') || 'Quote #{id} does not exist.';
			const emptyTemplate = readTemplate(handler.fields, 'empty') || 'No quotes saved yet.';
			const idField = resolveFieldText(handler.fields, 'quote-id', context.data).trim();
			const quoteId = resolveQuoteId(data, idField);
			const contextVars = contextToVariables(context.data);

			if (!template) {
				next();
				return;
			}

			const quote =
				quoteId != null ? quotes.getById(quoteId) : quotes.getRandom();

			if (quoteId != null && !quote) {
				const message = interpolateTemplate(notFoundTemplate, {
					...contextVars,
					id: quoteId
				});
				sendChatMessage(app, { message, channel, broadcasterId, asBot });
				next();
				return;
			}

			if (!quote) {
				const message = interpolateTemplate(emptyTemplate, contextVars);
				sendChatMessage(app, { message, channel, broadcasterId, asBot });
				next();
				return;
			}

			const message = quotes.formatQuoteMessage(quote, template, contextVars);
			sendChatMessage(app, { message, channel, broadcasterId, asBot });
			next();
		}
	} satisfies HandlerDefinitionProps;
}
