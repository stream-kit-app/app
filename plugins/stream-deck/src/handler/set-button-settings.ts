import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { emitFeedback } from '../lib/api-bridge';
import { resolveFieldText } from '../lib/get-field-value';
import { streamDeck } from '../lib/instances';
import { aliasField } from './shared';

export function createSetButtonSettingsHandler(app: PluginAppApi) {
	return {
		name: 'Set Button Settings',
		fields: [
			aliasField(),
			{
				type: 'json',
				name: 'Settings JSON',
				placeholder: '{"label":"Live"}',
				useContextVariables: true
			}
		],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const raw = resolveFieldText(handler.fields, 'settings-json', context.data).trim();

			if (!raw) {
				app.toast.create({
					title: app.i18n.translate('Settings JSON is required'),
					variant: 'warning'
				});
				next();
				return;
			}

			let settings: Record<string, unknown>;

			try {
				const parsed = JSON.parse(raw) as unknown;

				if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
					throw new Error('Settings must be a JSON object');
				}

				settings = parsed as Record<string, unknown>;
			} catch (error) {
				app.toast.create({
					title: app.i18n.translate('Invalid settings JSON'),
					description: error instanceof Error ? error.message : String(error),
					variant: 'warning'
				});
				next();
				return;
			}

			const payload = streamDeck.buildFeedbackPayload(alias || undefined, { settings });
			await emitFeedback(app, 'setSettings', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}
