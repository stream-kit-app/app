import type { App } from '../app.svelte';

import { getOverlays, updateOverlaySourceHash } from '$db/repositories/overlays';
import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { buildOverlayProjectZip } from '../overlay/overlay-export';
import { importOverlayProjectFromZip } from '../overlay/overlay-import';
import { isOverlayBuilt, overlayDir } from '../overlay/overlay-project';

async function sha256Hex(bytes: Uint8Array): Promise<string> {
	const digest = await crypto.subtle.digest('SHA-256', bytes.slice());
	return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Slow path after metadata LWW: upload/download overlay project zips when hashes diverge.
 */
export async function syncOverlayProjectBundles(app: App): Promise<void> {
	if (!app.auth.isAuthenticated || !app.auth.user?.subscription) {
		return;
	}

	const pb = app.auth.client;
	const userId = app.auth.user.id;
	const locals = await getOverlays();
	const remotes = await pb.collection('user_overlay_projects').getFullList({
		filter: pb.filter('user={:id} && deletedAt=null', { id: userId }),
		requestKey: null
	});
	const remoteBySyncId = new Map(remotes.map((row) => [row.id, row]));

	for (const local of locals) {
		const remote = remoteBySyncId.get(local.syncId);
		if (!remote || remote.deletedAt) {
			continue;
		}

		const remoteHash = typeof remote.sourceHash === 'string' ? remote.sourceHash : '';
		const { exists } = await import('@tauri-apps/plugin-fs');
		const projectExists = await exists(overlayDir(local.id), {
			baseDir: BaseDirectory.AppData
		});

		if (!projectExists && remote.source) {
			try {
				const url = pb.files.getURL(remote, remote.source as string);
				const token = await pb.files.getToken();
				const response = await fetch(`${url}${url.includes('?') ? '&' : '?'}token=${token}`);
				if (!response.ok) {
					continue;
				}
				const buffer = new Uint8Array(await response.arrayBuffer());
				await importOverlayProjectFromZip(app.fs, buffer, {
					replaceExisting: true
				});
				if (remoteHash) {
					await updateOverlaySourceHash(local.id, remoteHash);
				}
			} catch (error) {
				console.warn('Failed to download overlay project bundle', local.id, error);
			}
			continue;
		}

		if (!projectExists) {
			continue;
		}

		try {
			const zip = await buildOverlayProjectZip(local.id);
			const hash = await sha256Hex(zip);
			if (hash === remoteHash && hash === local.sourceHash) {
				continue;
			}

					const blob = new Blob([zip.buffer.slice(zip.byteOffset, zip.byteOffset + zip.byteLength) as ArrayBuffer], {
						type: 'application/zip'
					});
			const form = new FormData();
			form.append('source', blob, `${local.id}.zip`);
			form.append('sourceHash', hash);
			form.append('revision', String((Number(remote.revision) || local.revision || 1) + 1));
			form.append('clientUpdatedAt', String(Date.now()));
			await pb.collection('user_overlay_projects').update(local.syncId, form, {
				requestKey: null
			});
			await updateOverlaySourceHash(local.id, hash);
		} catch (error) {
			console.warn('Failed to upload overlay project bundle', local.id, error);
		}
	}

	await app.overlay.refresh();
	await app.overlay.refreshBuiltStatus();
}

export async function overlayNeedsBuild(overlayId: string): Promise<boolean> {
	return !(await isOverlayBuilt(overlayId));
}
