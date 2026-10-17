import type { PluginAppApi } from '@stream-kit/plugin';

import { ELEVENLABS_STORE_KEYS } from './service';

type ActionRecord = ReturnType<PluginAppApi['actions']['getSnapshot']>[number];
type StoredActionHandler = ActionRecord['handlers'][number];

const PLUGIN_KEY = 'tts';
const SPEAK_HANDLER_ID = 'tts:tts:elevenlabs:speak-text';
const VOICE_FIELD_KEY = 'voice';

function remapFieldValue(value: unknown, from: string, to: string): unknown {
	if (typeof value === 'string') {
		return value.trim() === from ? to : value;
	}

	if (!value || typeof value !== 'object' || !('values' in value)) {
		return value;
	}

	const oneOf = value as { variant: string; values: Record<string, unknown> };
	const values: Record<string, unknown> = {};
	let changed = false;

	for (const [variant, variantValue] of Object.entries(oneOf.values)) {
		values[variant] = remapFieldValue(variantValue, from, to);
		changed ||= values[variant] !== variantValue;
	}

	return changed ? { ...oneOf, values } : value;
}

function remapHandlers(
	handlers: StoredActionHandler[] | undefined,
	from: string,
	to: string
): { handlers: StoredActionHandler[] | undefined; changed: boolean } {
	if (!handlers) {
		return { handlers, changed: false };
	}

	let changed = false;
	const next = handlers.map((handler) => {
		const then = remapHandlers(handler.thenHandlers, from, to);
		const otherwise = remapHandlers(handler.elseHandlers, from, to);
		let fields = handler.fields;

		if (handler.handlerTypeId === SPEAK_HANDLER_ID) {
			fields = handler.fields.map((field) => {
				if (field.key !== VOICE_FIELD_KEY) {
					return field;
				}

				const value = remapFieldValue(field.value, from, to);

				return value === field.value
					? field
					: { ...field, value: value as typeof field.value };
			});
		}

		const handlerChanged =
			then.changed ||
			otherwise.changed ||
			fields.some((field, i) => field !== handler.fields[i]);

		changed ||= handlerChanged;

		return handlerChanged
			? {
					...handler,
					fields,
					...(then.changed ? { thenHandlers: then.handlers } : {}),
					...(otherwise.changed ? { elseHandlers: otherwise.handlers } : {})
				}
			: handler;
	});

	return { handlers: next, changed };
}

/**
 * Point every reference to an ElevenLabs voice id at a new id: the default voice
 * in the TTS settings and the voice field of ElevenLabs speak handlers in actions.
 * Returns the number of actions that were updated.
 */
export async function remapElevenLabsVoiceReferences(
	app: PluginAppApi,
	from: string,
	to: string
): Promise<number> {
	if (!from || !to || from === to) {
		return 0;
	}

	const defaultVoice = app.plugins.getSettingValue(
		PLUGIN_KEY,
		ELEVENLABS_STORE_KEYS.defaultVoice
	);

	if (typeof defaultVoice === 'string' && defaultVoice.trim() === from) {
		await app.plugins.setSettingValue(PLUGIN_KEY, ELEVENLABS_STORE_KEYS.defaultVoice, to);
	}

	let updated = 0;

	for (const action of app.actions.getSnapshot()) {
		const { handlers, changed } = remapHandlers(action.handlers, from, to);

		if (!changed || !handlers) {
			continue;
		}

		await app.actions.update(action.id, {
			name: action.name,
			group: action.group,
			groupSortOrder: action.groupSortOrder,
			sortOrder: action.sortOrder,
			enabled: action.enabled,
			queueId: action.queueId,
			triggers: action.triggers,
			handlers
		});
		updated++;
	}

	return updated;
}
