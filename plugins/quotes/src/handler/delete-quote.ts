import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { QuotesService } from '../app/lib/quotes.svelte';
import { contextToVariables, getFieldValue, resolveFieldText } from '../lib/get-field-value';
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

export function createDeleteQuoteHandler(app: PluginAppApi, quotes: QuotesService) {
	return {
		name: 'Delete quote',
		fields: [
			{
				type: 'text',
				name: 'Quote ID',
				placeholder: '{id}'
			},
			{
				type: 'text',
				name: 'Reply',
				placeholder: 'Quote #{id} deleted.'
			},
			{
				type: 'switch',
				name: 'As bot',
				placeholder: 'Send reply as bot account'
			}
		],
		execute: async (_action, handler, context, next) => {
			const data = context.data as Record<string, unknown> | undefined;
			const channel = readContextString(data, 'channel');
			const broadcasterId = readContextString(data, 'broadcasterId');
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const idField = resolveFieldText(handler.fields, 'quote-id', context.data).trim();
			const quoteId = resolveQuoteId(data, idField);
			const replyValue = getFieldValue(handler.fields, 'reply');
			const replyTemplate = typeof replyValue === 'string' ? replyValue.trim() : '';

			if (quoteId == null) {
				app.toast.create({
					title: app.i18n.translate('Quote ID is required'),
					variant: 'warning'
				});
				next();
				return;
			}

			const deleted = await quotes.delete(quoteId);

			if (!deleted) {
				app.toast.create({
					title: app.i18n.translate('Quote #{id} not found', { id: quoteId }),
					variant: 'warning'
				});
				next();
				return;
			}

			if (replyTemplate) {
				const message = quotes.formatQuoteMessage(
					deleted,
					replyTemplate,
					contextToVariables(context.data)
				);
				sendChatMessage(app, { message, channel, broadcasterId, asBot });
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
}
