import type { App } from '../app.svelte';
import type { OverlayFrameworkId, OverlayServerStatus } from './types';

import { invoke } from '@tauri-apps/api/core';
import { join } from '@tauri-apps/api/path';
import { save } from '@tauri-apps/plugin-dialog';

import type { SaveOverlayInput } from '$db/repositories/overlays';

import { openProjectInEditor, type OpenProjectInEditorResult } from '../opener/open-in-editor';
import { buildOverlayProject } from './overlay-build';
import { buildOverlayProjectZip } from './overlay-export';
import {
	createOverlayProject,
	isOverlayBuilt,
	listOverlayProjects,
	removeOverlayProject,
	updateOverlayMetadata
} from './overlay-project';
import { DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';

export class OverlayService {
	items: SaveOverlayInput[] = $state.raw([]);
	status: OverlayServerStatus = $state({
		running: false,
		port: 0,
		baseUrl: ''
	});
	builtStatus: Record<string, boolean> = $state({});
	buildingId: string | null = $state(null);
	port = DEFAULT_OVERLAY_PORT;

	constructor(private readonly getApp: () => App) {}

	async init(): Promise<void> {
		await this.refresh();
		await this.startServer();
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
		if (!this.status.baseUrl) {
			return overlayBrowserSourceUrl(`http://127.0.0.1:${this.port}`, overlayId);
		}

		return overlayBrowserSourceUrl(this.status.baseUrl, overlayId);
	}

	async create(input: {
		id: string;
		name: string;
		framework: OverlayFrameworkId;
	}): Promise<SaveOverlayInput> {
		const record = await createOverlayProject(this.getApp().fs, input);
		await this.refresh();

		return record;
	}

	async saveMetadata(record: SaveOverlayInput): Promise<void> {
		await updateOverlayMetadata(record);
		await this.refresh();
	}

	async remove(id: string): Promise<void> {
		await removeOverlayProject(this.getApp().fs, id);
		await this.refresh();
	}

	async broadcast(overlayId: string, event: string, payload: unknown): Promise<void> {
		await invoke('overlay_broadcast', {
			overlayId,
			event,
			payload
		});
	}

	async getProjectPath(id: string): Promise<string> {
		const overlaysDir = await invoke<string>('overlay_get_overlays_dir');

		return join(overlaysDir, id.trim());
	}

	async openInExternalEditor(id: string): Promise<OpenProjectInEditorResult> {
		const overlay = this.items.find((item) => item.id === id);

		if (!overlay) {
			throw new Error('Overlay not found');
		}

		const projectPath = await this.getProjectPath(id);

		return openProjectInEditor(projectPath, {
			onOpenFolder: (path) => this.getApp().opener.openPath(path),
			onCopyPath: (path) => navigator.clipboard.writeText(path),
			onOpenUrl: (url) => this.getApp().opener.openUrl(url)
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

		const { writeFile } = await import('@tauri-apps/plugin-fs');
		await writeFile(path, zip);
	}

	async build(id: string): Promise<{ success: boolean; error?: string }> {
		const overlay = this.items.find((item) => item.id === id);

		if (!overlay) {
			throw new Error('Overlay not found');
		}

		this.buildingId = id;

		try {
			const projectPath = await this.getProjectPath(id);
			const result = await buildOverlayProject({
				overlayId: id,
				projectPath,
				framework: overlay.template as OverlayFrameworkId,
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
}
