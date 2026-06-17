import type { App } from '../app.svelte';
import type {
	OverlayBuildResult,
	OverlayProjectFile,
	OverlayServerStatus,
	OverlayTemplateId
} from './types';

import { invoke } from '@tauri-apps/api/core';
import { join } from '@tauri-apps/api/path';

import type { SaveOverlayInput } from '$db/repositories/overlays';

import { openProjectInEditor } from '../opener/open-in-editor';
import { buildOverlayProject } from './build/overlay-builder';
import {
	createOverlayProject,
	ensureOverlayScaffold,
	listOverlayProjects,
	migrateAllOverlayProjects,
	readOverlaySourceFiles,
	removeOverlayProject,
	removeOverlaySourceFile,
	renameOverlaySourceFile,
	updateOverlayMetadata,
	writeOverlayDistFiles,
	writeOverlaySourceFile
} from './overlay-project';
import { DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';

export class OverlayService {
	items: SaveOverlayInput[] = $state.raw([]);
	status: OverlayServerStatus = $state({
		running: false,
		port: 0,
		baseUrl: ''
	});
	buildingId: string | null = $state(null);
	lastBuildError: string | null = $state(null);
	port = DEFAULT_OVERLAY_PORT;

	constructor(private readonly getApp: () => App) {}

	async init(): Promise<void> {
		await this.refresh();
		await migrateAllOverlayProjects(this.items);
		await this.startServer();
	}

	async refresh(): Promise<void> {
		this.items = await listOverlayProjects();
		this.status = await invoke<OverlayServerStatus>('overlay_server_status');
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
		template: OverlayTemplateId;
	}): Promise<SaveOverlayInput> {
		const record = await createOverlayProject(this.getApp().fs, input);
		await this.build(record.id);
		await this.refresh();

		return record;
	}

	async saveMetadata(record: SaveOverlayInput): Promise<void> {
		await updateOverlayMetadata(record);
		await this.refresh();
	}

	async saveSourceFile(id: string, path: string, content: string): Promise<void> {
		await writeOverlaySourceFile(id, path, content);
	}

	async removeSourceFile(id: string, path: string): Promise<void> {
		await removeOverlaySourceFile(id, path);
	}

	async renameSourceFile(id: string, fromPath: string, toPath: string): Promise<void> {
		await renameOverlaySourceFile(id, fromPath, toPath);
	}

	async build(id: string, files?: OverlayProjectFile[]): Promise<OverlayBuildResult> {
		this.buildingId = id;
		this.lastBuildError = null;

		try {
			const sourceFiles = files ?? (await readOverlaySourceFiles(id));
			const result = await buildOverlayProject({ overlayId: id, files: sourceFiles });

			if (!result.success || !result.files) {
				this.lastBuildError = result.error ?? 'Overlay build failed';
				return result;
			}

			await writeOverlayDistFiles(id, result.files);

			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.lastBuildError = message;

			return { success: false, error: message };
		} finally {
			this.buildingId = null;
		}
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

	async openInExternalEditor(id: string, name: string): Promise<void> {
		await ensureOverlayScaffold(id, name);

		const overlaysDir = await invoke<string>('overlay_get_overlays_dir');
		const projectPath = await join(overlaysDir, id.trim());

		await openProjectInEditor(projectPath);
	}
}
