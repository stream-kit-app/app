import type { SettingsContext } from '../settings/context';
import type {
	SettingsFieldInstance,
	SettingsFieldItem,
	SettingsFieldValue
} from '../settings/field';
import type { App } from '../app.svelte';
import type { SettingsFormErrors } from '../settings/validate-settings';
import type { OverlayManifest, OverlayTestHandlerDefinition } from './overlay-manifest';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { getOverlay, saveOverlayConfig } from '$db/repositories/overlays';

import {
	createSettingsFields,
	flattenSettingsFieldItems,
	getSettingsFieldDefinition,
	getSettingsFieldInstance,
	getSettingsFieldValue,
	isPersistedSettingsField,
	withGeneratedSettingsKeys
} from '../settings/settings-field';
import { validateSettingsFields } from '../settings/validate-settings';
import {
	collectOverlayDefaultConfig,
	mergeOverlayConfig,
	overlayManifestToSettingsItems,
	parseOverlayManifest
} from './overlay-manifest';
import { overlayDir } from './overlay-project';
import { OVERLAY_SETTINGS_EVENT } from './overlay-manifest';

export type OverlaySettingsContext = SettingsContext<Record<string, SettingsFieldValue>, App>;

export class OverlaySettingsDefinition {
	readonly overlayId: string;
	readonly manifest: OverlayManifest;
	fieldItems: SettingsFieldItem[];
	fields: SettingsFieldInstance[] = $state([]);
	formErrors: SettingsFormErrors | null = $state(null);
	private version: number;
	private mergedConfig: Record<string, SettingsFieldValue>;

	get versionSnapshot(): number {
		return this.version;
	}

	constructor(overlayId: string, manifest: OverlayManifest, storedConfig: Record<string, unknown>, storedVersion: number) {
		this.overlayId = overlayId;
		this.manifest = manifest;
		this.fieldItems = withGeneratedSettingsKeys(
			overlayManifestToSettingsItems(manifest.settings),
			overlayId
		);

		const hasPersistedFields =
			flattenSettingsFieldItems(this.fieldItems).filter(isPersistedSettingsField).length > 0;

		if (!hasPersistedFields) {
			this.version = Math.max(manifest.version ?? 0, storedVersion);
			this.mergedConfig = {};
			this.fields = [];
			return;
		}

		const defaults = collectOverlayDefaultConfig(manifest.settings);
		const merged = mergeOverlayConfig(
			storedConfig,
			defaults,
			manifest.version ?? 0,
			storedVersion
		);

		this.version = merged.version;
		this.mergedConfig = merged.config;

		const storedFields = Object.entries(this.mergedConfig).map(([key, value]) => ({
			id: crypto.randomUUID(),
			key,
			value
		}));

		this.fields = createSettingsFields(this.fieldItems, storedFields);
	}

	get hasSettings(): boolean {
		return flattenSettingsFieldItems(this.fieldItems).filter(isPersistedSettingsField).length > 0;
	}

	get testHandlers(): OverlayTestHandlerDefinition[] {
		return this.manifest.testHandlers ?? [];
	}

	getField(key: string): SettingsFieldInstance | undefined {
		return getSettingsFieldInstance(this.fields, key);
	}

	getFieldDefinition(key: string) {
		return getSettingsFieldDefinition(this.fieldItems, key);
	}

	getFieldError(fieldId: string, errors?: SettingsFormErrors | null): string | undefined {
		return errors?.fieldErrors[fieldId];
	}

	createContext(app: App): OverlaySettingsContext {
		return {
			app,
			settings: this.mergedConfigValues(),
			getValue: (key) => getSettingsFieldValue(this.fields, key)
		};
	}

	mergedConfigValues(): Record<string, SettingsFieldValue> {
		const values: Record<string, SettingsFieldValue> = {};

		for (const field of this.fields) {
			values[field.key] = field.value;
		}

		return values;
	}

	validate(context: OverlaySettingsContext): SettingsFormErrors | null {
		this.formErrors = validateSettingsFields(this.fields, this.fieldItems, context);

		return this.formErrors;
	}

	async save(): Promise<boolean> {
		const config = this.mergedConfigValues();

		await saveOverlayConfig(this.overlayId, config, this.version);

		this.mergedConfig = config;

		return true;
	}
}

export async function readOverlayManifest(overlayId: string): Promise<OverlayManifest> {
	const { readTextFile } = await import('@tauri-apps/plugin-fs');
	const raw = await readTextFile(`${overlayDir(overlayId)}/manifest.json`, {
		baseDir: BaseDirectory.AppData
	});

	return parseOverlayManifest(JSON.parse(raw));
}

export async function loadOverlaySettingsDefinition(
	overlayId: string
): Promise<OverlaySettingsDefinition> {
	const [manifest, record] = await Promise.all([readOverlayManifest(overlayId), getOverlay(overlayId)]);

	if (!record) {
		throw new Error(`Overlay not found: ${overlayId}`);
	}

	const storedVersion = record.version ?? 0;
	const manifestVersion = manifest.version ?? 0;
	const definition = new OverlaySettingsDefinition(
		overlayId,
		manifest,
		record.config ?? {},
		storedVersion
	);

	if (!definition.hasSettings && Object.keys(record.config ?? {}).length > 0) {
		await saveOverlayConfig(overlayId, {}, definition.versionSnapshot);
	}

	if (definition.hasSettings && manifestVersion > storedVersion) {
		await saveOverlayConfig(
			overlayId,
			definition.mergedConfigValues(),
			definition.versionSnapshot
		);
	}

	return definition;
}

export { OVERLAY_SETTINGS_EVENT };
