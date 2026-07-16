import type { App } from '../app.svelte';

import type { OpenProjectInEditorResult } from '../opener/open-in-editor';

import type { OverlayManifest } from './overlay-manifest';

import type { OverlaySettingsDefinition } from './overlay-settings.svelte';

import type { OverlayFrameworkId, OverlayServerStatus } from './types';
import type { OverlayWidgetId } from './widget-templates';

import {
	getOverlay,
	saveOverlayManifestMetadata,
	type SaveOverlayInput
} from '$db/repositories/overlays';



import { invoke } from '@tauri-apps/api/core';

import { join } from '@tauri-apps/api/path';

import { save } from '@tauri-apps/plugin-dialog';



import { translate } from '$lib/i18n';



import { openProjectInEditor } from '../opener/open-in-editor';

import { buildOverlayProject } from './overlay-build';

import { buildOverlayProjectZip } from './overlay-export';
import { importOverlayProjectFromZip } from './overlay-import';

import {

	createOverlayProject,

	isOverlayBuilt,

	listOverlayProjects,

	removeOverlayProject,

	updateOverlayMetadata,

	ensureOverlayManifestEditorSupport

} from './overlay-project';

import { loadOverlaySettingsDefinition, readOverlayManifest } from './overlay-settings.svelte';
import { getOverlayFramework } from './templates';
import { OverlayMessageHub } from './overlay-message-hub';
import {
	canUseOverlay as isOverlayUsable,
	getOverlayUnavailableReason as resolveOverlayUnavailableReason
} from './overlay-dependencies';
import {
	installActionPresets,
	validateActionPresets,
	type OverlayActionPresetValidation
} from './overlay-action-presets';



import { registerOverlayDefinitions } from './register-overlay-definitions';
import { createOverlayId, DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';

export class OverlayService {

	items: SaveOverlayInput[] = $state.raw([]);

	messages = new OverlayMessageHub();



	status: OverlayServerStatus = $state({

		running: false,

		port: 0,

		baseUrl: ''

	});



	builtStatus: Record<string, boolean> = $state({});

	buildingId: string | null = $state(null);

	dependenciesRevision = $state(0);

	port = DEFAULT_OVERLAY_PORT;



	private app: App | null = null;



	init(app: App): Promise<void> {
		this.app = app;

		return registerOverlayDefinitions(app).then(() => this.boot());
	}



	private getApp(): App {

		if (!this.app) {

			throw new Error('OverlayService has not been initialized yet');

		}



		return this.app;

	}



	notifyDependenciesChanged(): void {

		this.dependenciesRevision += 1;

	}



	private async requireOverlayManifest(id: string): Promise<OverlayManifest> {

		return readOverlayManifest(id);

	}



	private async assertOverlayUsable(id: string): Promise<OverlayManifest> {

		const manifest = await this.requireOverlayManifest(id);

		const app = this.getApp();



		if (!isOverlayUsable(manifest, app)) {

			const reason = resolveOverlayUnavailableReason(manifest, app) ?? translate('Overlay is unavailable.');

			throw new Error(reason);

		}



		return manifest;

	}



	isOverlayAvailable(requiredPlugins: string[] = []): boolean {

		const manifest = { requiredPlugins } as OverlayManifest;

		return isOverlayUsable(manifest, this.getApp());

	}



	getOverlayUnavailableReason(requiredPlugins: string[] = []): string | null {

		const manifest = { requiredPlugins } as OverlayManifest;

		return resolveOverlayUnavailableReason(manifest, this.getApp());

	}



	async getActionPresets(id: string): Promise<OverlayActionPresetValidation[]> {

		const record = await getOverlay(id);



		if (!record) {

			throw new Error(translate('Overlay not found.'));

		}



		const manifest = await this.requireOverlayManifest(id);



		return validateActionPresets(

			manifest,

			this.getApp(),

			record.installedActionKeys ?? []

		);

	}



	async installRecommendedActions(id: string, keys?: string[]) {

		const record = await getOverlay(id);



		if (!record) {

			throw new Error(translate('Overlay not found.'));

		}



		const manifest = await this.requireOverlayManifest(id);

		const result = await installActionPresets(

			id,

			manifest,

			this.getApp(),

			record.installedActionKeys ?? [],

			keys ? { keys } : undefined

		);



		if (result.installed.length > 0) {

			const updated = await getOverlay(id);



			if (updated) {

				this.patchOverlayRecord(id, {

					installedActionKeys: updated.installedActionKeys ?? []

				});

			}

		}



		return result;

	}



	private async boot(): Promise<void> {

		await this.refresh();



		await this.startServer();

		await this.syncAllConfigsToServer();

	}



	async refresh(): Promise<void> {

		this.items = await listOverlayProjects();

		this.status = await invoke<OverlayServerStatus>('overlay_server_status');



		await this.refreshBuiltStatus();

	}



	async refreshBuiltStatus(): Promise<void> {

		const entries = await Promise.all(

			this.items.map(async (item) => [item.id, await isOverlayBuilt(item.id)] as const)

		);



		this.builtStatus = Object.fromEntries(entries);

	}



	isBuilt(overlayId: string): boolean {

		return this.builtStatus[overlayId] ?? false;

	}



	async startServer(port = this.port): Promise<OverlayServerStatus> {

		this.status = await invoke<OverlayServerStatus>('overlay_server_start', { port });

		this.port = this.status.port;



		return this.status;

	}



	async stopServer(): Promise<void> {

		await invoke('overlay_server_stop');

		await this.refresh();

	}



	getUrl(overlayId: string): string {

		const baseUrl = this.status.baseUrl || `http://127.0.0.1:${this.status.port || this.port}`;



		return overlayBrowserSourceUrl(baseUrl, overlayId);

	}



	async create(input: {
		name: string;
		framework?: OverlayFrameworkId;
		widgetTemplate?: OverlayWidgetId;
	}): Promise<SaveOverlayInput> {
		if (!input.widgetTemplate && !input.framework) {
			throw new Error('Overlay create requires a framework or widget template.');
		}

		const record = await createOverlayProject(this.getApp().fs, {
			id: createOverlayId(),
			name: input.name,
			framework: input.framework,
			widgetTemplate: input.widgetTemplate
		});

		await this.refresh();
		await this.syncConfigToServer(record.id, record.config);

		return record;
	}



	async saveMetadata(record: SaveOverlayInput): Promise<void> {

		await updateOverlayMetadata(record);

		await this.refresh();

	}



	async rename(id: string, name: string): Promise<void> {

		const overlay = this.requireOverlay(id);

		const trimmed = name.trim();



		if (!trimmed) {

			throw new Error(translate('Name is required'));

		}



		await this.saveMetadata({ ...overlay, name: trimmed });

	}



	async remove(id: string): Promise<void> {

		await removeOverlayProject(this.getApp().fs, id);



		await this.refresh();

		await this.syncAllConfigsToServer();

	}



	async readManifest(id: string): Promise<OverlayManifest> {

		this.requireOverlay(id);



		return readOverlayManifest(id);

	}



	async getSettings(id: string): Promise<OverlaySettingsDefinition> {
		const record = await getOverlay(id);

		if (!record) {
			throw new Error(translate('Overlay not found.'));
		}

		await ensureOverlayManifestEditorSupport(id);

		const definition = await loadOverlaySettingsDefinition(id);
		const config = definition.mergedConfigValues();

		await saveOverlayManifestMetadata(id, {
			expectedEvents: definition.manifest.expectedEvents,
			requiredPlugins: definition.manifest.requiredPlugins ?? []
		});

		await this.syncConfigToServer(id, config);

		this.patchOverlayRecord(id, {
			config,
			version: definition.versionSnapshot,
			expectedEvents: definition.manifest.expectedEvents,
			requiredPlugins: definition.manifest.requiredPlugins ?? []
		});

		return definition;
	}



	async saveConfig(settings: OverlaySettingsDefinition): Promise<void> {

		await settings.save();



		const config = settings.mergedConfigValues();



		await invoke('overlay_broadcast_settings', {

			overlayId: settings.overlayId,

			config

		});



		this.patchOverlayRecord(settings.overlayId, {

			config,

			version: settings.versionSnapshot

		});

	}



	private patchOverlayRecord(
		overlayId: string,
		patch: Partial<
			Pick<
				SaveOverlayInput,
				'config' | 'version' | 'expectedEvents' | 'requiredPlugins' | 'installedActionKeys'
			>
		>
	): void {
		const existing = this.items.find((item) => item.id === overlayId);

		if (!existing) {
			return;
		}

		if (
			existing.version === patch.version &&
			(patch.config === undefined ||
				JSON.stringify(existing.config) === JSON.stringify(patch.config)) &&
			(patch.expectedEvents === undefined ||
				JSON.stringify(existing.expectedEvents) === JSON.stringify(patch.expectedEvents)) &&
			(patch.requiredPlugins === undefined ||
				JSON.stringify(existing.requiredPlugins ?? []) ===
					JSON.stringify(patch.requiredPlugins)) &&
			(patch.installedActionKeys === undefined ||
				JSON.stringify(existing.installedActionKeys ?? []) ===
					JSON.stringify(patch.installedActionKeys))
		) {
			return;
		}

		this.items = this.items.map((item) =>
			item.id === overlayId ? { ...item, ...patch } : item
		);
	}



	async syncConfigToServer(overlayId: string, config: Record<string, unknown>): Promise<void> {

		if (!this.status.running) {

			return;

		}



		await invoke('overlay_sync_config', {

			overlayId,

			config

		});

	}



	async syncAllConfigsToServer(): Promise<void> {

		if (!this.status.running) {

			return;

		}



		const configs = Object.fromEntries(this.items.map((item) => [item.id, item.config ?? {}]));



		await invoke('overlay_sync_all_configs', { configs });

	}



	async broadcast(overlayId: string, event: string, payload: unknown): Promise<void> {

		await this.assertOverlayUsable(overlayId);

		await invoke('overlay_broadcast', {

			overlayId,

			event,

			payload

		});

	}



	async runTest(overlayId: string, event: string, payload?: unknown): Promise<void> {

		await this.broadcast(overlayId, event, payload ?? {});

	}



	async getProjectPath(id: string): Promise<string> {

		const overlaysDir = await invoke<string>('overlay_get_overlays_dir');



		return join(overlaysDir, id.trim());

	}



	async openInExternalEditor(id: string): Promise<OpenProjectInEditorResult> {

		this.requireOverlay(id);



		const projectPath = await this.getProjectPath(id);

		const app = this.getApp();



		return openProjectInEditor(projectPath, {

			onOpenFolder: (path) => app.opener.openPath(path),

			onCopyPath: (path) => navigator.clipboard.writeText(path),

			onOpenUrl: (url) => app.opener.openUrl(url)

		});

	}



	async openProjectFolder(id: string): Promise<void> {

		const projectPath = await this.getProjectPath(id);



		await this.getApp().opener.openPath(projectPath);

	}



	async exportZip(id: string, name: string): Promise<void> {

		const zip = await buildOverlayProjectZip(id);



		const path = await save({

			defaultPath: `${name}.zip`,

			filters: [{ name: 'ZIP archive', extensions: ['zip'] }]

		});



		if (!path) {

			return;

		}



		await this.getApp().fs.writeFile(path, zip);

	}



	async importFromZipPath(zipPath: string, replaceExisting = false): Promise<SaveOverlayInput> {

		const zipBytes = await this.getApp().fs.readFile(zipPath);

		const record = await importOverlayProjectFromZip(this.getApp().fs, zipBytes, {

			replaceExisting

		});



		await this.refresh();

		await this.syncConfigToServer(record.id, record.config);

		await this.refreshBuiltStatus();



		return record;

	}



	async build(id: string): Promise<{ success: boolean; error?: string }> {

		const overlay = this.requireOverlay(id);

		const framework = getOverlayFramework(overlay.template as OverlayFrameworkId).id;



		this.buildingId = id;



		try {

			const projectPath = await this.getProjectPath(id);



			const result = await buildOverlayProject({

				overlayId: id,



				projectPath,



				framework,



				overlayName: overlay.name

			});



			if (result.success) {

				await this.refreshBuiltStatus();

			}



			return result;

		} finally {

			this.buildingId = null;

		}

	}



	private requireOverlay(id: string): SaveOverlayInput {

		const overlay = this.items.find((item) => item.id === id);



		if (!overlay) {

			throw new Error(translate('Overlay not found.'));

		}



		return overlay;

	}

}


