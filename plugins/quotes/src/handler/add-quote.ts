import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { QuotesService } from '../app/lib/quotes.svelte';
import { contextToVariables, getFieldValue, resolveFieldText } from '../lib/get-field-value';
import { sendChatMessage } from '../lib/send-chat';

function readContextString(data: Record<string, unknown> | undefined, key: string): string | undefined {
	const value = data?.[key];

	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function createAddQuoteHandler(app: PluginAppApi, quotes: QuotesService) {
	return {
		name: 'Add quote',
		fields: [
			{
				type: 'text',
				name: 'Quote',
				placeholder: '{quote}'
			},
			{
				type: 'text',
				name: 'Reply',
				placeholder: 'Quote #{id} added.'
			},
			{
				type: 'switch',
				name: 'As bot',
				placeholder: 'Send reply as bot account'
			}
		],
		execute: async (_action, handler, context, next) => {
			const data = context.data as Record<string, unknown> | undefined;
			const fromField = resolveFieldText(handler.fields, 'quote', context.data).trim();
			const fromArg = readContextString(data, 'quote');
			const text = fromField || fromArg || '';
			const username = readContextString(data, 'user') ?? readContextString(data, 'username');
			const userId = readContextString(data, 'userId');
			const source = quotes.resolveSource(data?.source);
			const channel = readContextString(data, 'channel');
			const broadcasterId = readContextString(data, 'broadcasterId');
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const replyValue = getFieldValue(handler.fields, 'reply');
			const replyTemplate = typeof replyValue === 'string' ? replyValue.trim() : '';

			if (!text) {
				app.toast.create({
					title: app.i18n.translate('Quote text is required'),
					variant: 'warning'
				});
				next();
				return;
			}

			try {
				const record = await quotes.create({
					text,
					addedBy: username ?? app.i18n.translate('Manual'),
					addedByUserId: userId,
					source: username ? source : 'manual'
				});

				if (replyTemplate) {
					const message = quotes.formatQuoteMessage(
						record,
						replyTemplate,
						contextToVariables(context.data)
					);
					sendChatMessage(app, { message, channel, broadcasterId, asBot });
				}
			} catch (error) {
				app.toast.create({
					title: app.i18n.translate('Could not add quote'),
					description: error instanceof Error ? error.message : String(error),
					variant: 'warning'
				});
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
}
