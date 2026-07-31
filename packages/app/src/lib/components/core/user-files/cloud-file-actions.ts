import { openCloudFilePicker } from './open-cloud-file-picker';

import { openLoginModal } from '$lib/components/core/auth/open-auth-modals';
import { getApp } from '$lib/core/registry';
import {
	hasCloudFileAccess,
	isLocalFilePath,
	usesCloudFileStorage
} from '$lib/core/user-files/cloud-file-path';
import { toRelativeCloudFilePath } from '$lib/core/user-files';
import { translate } from '$lib/i18n';

export {
	hasCloudFileAccess,
	isLocalFilePath,
	usesCloudFileStorage
} from '$lib/core/user-files/cloud-file-path';

type FileFilter = { name: string; extensions: string[] };

type CloudFilePathApp = {
	auth?: { isAuthenticated: boolean };
	userFiles: {
		isCloudUrl(value: string | null | undefined): boolean;
		resolveUrl(value: string): string;
		isOfflineMirrorEnabled(): boolean;
		getCachedPath(value: string): string | null;
		/** Reactive cache ticks so the UI refreshes when sync finishes. */
		cache: { cachedCount: number; status: string };
	};
};

/**
 * Display value for file fields.
 * When offline mirror is on and the file is cached, shows the local AppData path
 * (including while signed out). Otherwise relative /api/files paths become absolute
 * on the current PB host — unless signed out, then the host-independent ref is kept.
 */
export function toDisplayCloudFileValue(app: CloudFilePathApp, value: string): string {
	// Depend on reactive cache state so fields update after offline sync.
	void app.userFiles.cache.cachedCount;
	void app.userFiles.cache.status;
	const trimmed = value.trim();
	if (!trimmed || !app.userFiles.isCloudUrl(trimmed)) {
		return value;
	}
	if (app.userFiles.isOfflineMirrorEnabled()) {
		const local = app.userFiles.getCachedPath(trimmed);
		if (local) {
			return local;
		}
	}
	if (app.auth && !app.auth.isAuthenticated) {
		return toRelativeCloudFilePath(trimmed) ?? trimmed;
	}
	return app.userFiles.resolveUrl(trimmed);
}

/** Persist value: absolute PB file URLs become host-independent relative paths. */
export function toStoredCloudFileValue(value: string): string {
	return toRelativeCloudFilePath(value) ?? value.trim();
}

function requireCloudAccess(): boolean {
	const app = getApp();

	if (!app.auth.isConfigured) {
		app.toast.create({
			title: translate('Cloud files'),
			description: translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.'),
			variant: 'warning'
		});
		return false;
	}

	if (!app.auth.isAuthenticated) {
		app.toast.create({
			title: translate('Sign in required'),
			description: translate('Log in to upload or browse cloud files.'),
			variant: 'warning'
		});
		openLoginModal();
		return false;
	}

	if (!hasCloudFileAccess(app.auth)) {
		app.toast.create({
			title: translate('Subscription required'),
			description: translate('An active subscription is required to use cloud files.'),
			variant: 'warning'
		});
		return false;
	}

	return true;
}

/**
 * Upload a file to `user_files`.
 * When `existingPath` is a local filesystem path, uploads that file (no OS picker).
 * Otherwise opens a local file picker, then uploads.
 */
export async function uploadLocalFileToCloud(
	filters?: FileFilter[],
	existingPath?: string | null
): Promise<string | null> {
	if (!requireCloudAccess()) {
		return null;
	}

	const app = getApp();
	let path = isLocalFilePath(existingPath) ? existingPath!.trim() : '';

	if (!path) {
		const selected = await app.fs.select({
			type: 'file',
			filters
		});
		if (!selected) {
			return null;
		}
		path = selected;
	}

	try {
		const bytes = await app.fs.readFile(path);
		const originalName = path.split(/[/\\]/).pop() || 'upload.bin';
		const uploaded = await app.userFiles.upload(new Blob([Uint8Array.from(bytes)]), {
			originalName
		});
		return uploaded.url;
	} catch (error) {
		getApp().toast.create({
			title: translate('Upload failed'),
			description: error instanceof Error ? error.message : translate('Could not upload file.'),
			variant: 'error'
		});
		return null;
	}
}

/** Browse existing `user_files` → returns relative cloud file path. */
export async function pickCloudFileUrl(filters?: FileFilter[]): Promise<string | null> {
	if (!requireCloudAccess()) {
		return null;
	}

	try {
		const selected = await openCloudFilePicker({ filters });
		return selected?.url ?? null;
	} catch (error) {
		getApp().toast.create({
			title: translate('Cloud files'),
			description:
				error instanceof Error ? error.message : translate('Could not load cloud files.'),
			variant: 'error'
		});
		return null;
	}
}
