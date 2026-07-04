import type { App } from '../app.svelte';
import type { StoredActionHandler, StoredActionTrigger } from '../action/stored-action';
import type { HandlerFieldInstance } from '../action/handler/field';
import type {
	OverlayActionPresetFieldJson,
	OverlayActionPresetJson,
	OverlayManifest
} from './overlay-manifest';

import { Action } from '../action/action.svelte';
import { resolveHandlerDefinition, resolveTriggerDefinition } from '../action/definition-id';
import { saveAction } from '$db/repositories/actions';
import { saveOverlayInstalledActionKeys } from '$db/repositories/overlays';

import { OVERLAY_SELF_FIELD_TOKEN } from './overlay-manifest';
import { canUseOverlay, missingRequiredPlugins } from './overlay-dependencies';
import { translate } from '$lib/i18n';

export type OverlayActionPresetStatus = 'installable' | 'installed' | 'blocked';

export type OverlayActionPresetValidation = {
	preset: OverlayActionPresetJson;
	status: OverlayActionPresetStatus;
	issues: string[];
};

export type InstallOverlayActionPresetsResult = {
	installed: string[];
	skipped: string[];
	failed: Array<{ key: string; error: string }>;
};

function resolvePresetFieldValue(
	field: OverlayActionPresetFieldJson,
	overlayId: string
): HandlerFieldInstance['value'] {
	if (field.key === 'overlay' && field.value === OVERLAY_SELF_FIELD_TOKEN) {
		return overlayId;
	}

	return field.value;
}

function materializeHandlerFields(
	fields: OverlayActionPresetFieldJson[],
	overlayId: string
): HandlerFieldInstance[] {
	return fields.map((field) => ({
		id: crypto.randomUUID(),
		key: field.key,
		value: resolvePresetFieldValue(field, overlayId)
	}));
}

function materializePresetTriggers(preset: OverlayActionPresetJson): StoredActionTrigger[] {
	return preset.triggers.map((trigger) => ({
		id: crypto.randomUUID(),
		triggerTypeId: trigger.triggerTypeId,
		conditions: structuredClone(trigger.conditions ?? { kind: 'group', id: crypto.randomUUID(), children: [] })
	}));
}

function materializePresetHandlers(
	preset: OverlayActionPresetJson,
	overlayId: string
): StoredActionHandler[] {
	return preset.handlers.map((handler) => ({
		id: crypto.randomUUID(),
		handlerTypeId: handler.handlerTypeId,
		fields: materializeHandlerFields(handler.fields, overlayId)
	}));
}

export function validateActionPreset(
	preset: OverlayActionPresetJson,
	app: App,
	manifest: OverlayManifest,
	installedKeys: string[]
): OverlayActionPresetValidation {
	const issues: string[] = [];

	if (installedKeys.includes(preset.key)) {
		return { preset, status: 'installed', issues };
	}

	for (const pluginKey of missingRequiredPlugins(manifest, app)) {
		issues.push(
			translate('Required plugin is not installed: {plugin}.', { plugin: pluginKey })
		);
	}

	for (const trigger of preset.triggers) {
		const definition = resolveTriggerDefinition(app.actions.triggers, trigger.triggerTypeId);

		if (!definition) {
			issues.push(
				translate('Trigger type is unavailable: {type}.', { type: trigger.triggerTypeId })
			);
		} else if (!definition.isAvailable) {
			issues.push(
				translate('Trigger type is disabled: {type}.', { type: trigger.triggerTypeId })
			);
		}
	}

	for (const handler of preset.handlers) {
		const definition = resolveHandlerDefinition(app.actions.actions, handler.handlerTypeId);

		if (!definition) {
			issues.push(
				translate('Handler type is unavailable: {type}.', { type: handler.handlerTypeId })
			);
		} else if (!definition.isAvailable) {
			issues.push(
				translate('Handler type is disabled: {type}.', { type: handler.handlerTypeId })
			);
		}
	}

	if (!canUseOverlay(manifest, app)) {
		issues.push(translate('Install and enable the required plugins before installing actions.'));
	}

	return {
		preset,
		status: issues.length > 0 ? 'blocked' : 'installable',
		issues
	};
}

export function validateActionPresets(
	manifest: OverlayManifest,
	app: App,
	installedKeys: string[]
): OverlayActionPresetValidation[] {
	return (manifest.actions ?? []).map((preset) =>
		validateActionPreset(preset, app, manifest, installedKeys)
	);
}

export async function installActionPresets(
	overlayId: string,
	manifest: OverlayManifest,
	app: App,
	installedKeys: string[],
	options?: { keys?: string[] }
): Promise<InstallOverlayActionPresetsResult> {
	const targetKeys = new Set(options?.keys ?? (manifest.actions ?? []).map((preset) => preset.key));
	const result: InstallOverlayActionPresetsResult = {
		installed: [],
		skipped: [],
		failed: []
	};

	const nextInstalledKeys = [...installedKeys];

	for (const preset of manifest.actions ?? []) {
		if (!targetKeys.has(preset.key)) {
			continue;
		}

		const validation = validateActionPreset(preset, app, manifest, nextInstalledKeys);

		if (validation.status === 'installed') {
			result.skipped.push(preset.key);
			continue;
		}

		if (validation.status === 'blocked') {
			result.failed.push({
				key: preset.key,
				error: validation.issues.join(' ')
			});
			continue;
		}

		try {
			const row = await saveAction({
				name: preset.name,
				group: overlayId,
				enabled: preset.enabled !== false,
				queueId: app.actionQueues.defaultQueueId,
				triggers: materializePresetTriggers(preset),
				handlers: materializePresetHandlers(preset, overlayId)
			});

			if (!row) {
				throw new Error(translate('Action could not be saved.'));
			}

			const action = Action.fromRecord(row);

			app.actions.add(action);

			if (action.enabled) {
				app.actions.activate(action);
			}

			nextInstalledKeys.push(preset.key);
			result.installed.push(preset.key);
		} catch (error) {
			result.failed.push({
				key: preset.key,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}

	if (result.installed.length > 0) {
		await saveOverlayInstalledActionKeys(overlayId, nextInstalledKeys);
	}

	return result;
}

export function getPresetEventSummary(preset: OverlayActionPresetJson): string | null {
	for (const handler of preset.handlers) {
		const sendHandler = handler.fields.find((field) => field.key === 'event');

		if (sendHandler && typeof sendHandler.value === 'string') {
			return sendHandler.value;
		}
	}

	return null;
}
