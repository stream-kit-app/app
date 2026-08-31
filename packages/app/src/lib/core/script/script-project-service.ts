import { invoke } from '@tauri-apps/api/core';

import type { PluginAppApi } from '@stream-kit/plugin';

import { buildScriptProjectTypeFiles } from './build-script-extra-libs';
import { openProjectInEditor } from '../opener/open-in-editor';
import { getApp } from '../registry';
import { BaseDirectory } from '../filesystem/base-directory';
import type { UnwatchFn } from '../filesystem/types';

const HANDLER_FILE = 'handler.ts';
const POLL_INTERVAL_MS = 1_000;
const SCRIPT_API_DIR = 'node_modules/@stream-kit/script-api';

const preparedProjectDirs = new Set<string>();
const lastTypesFingerprint = new Map<string, string>();

function stripEditorReferenceDirectives(source: string): string {
	return source.replace(/^\/\/\/\s*<reference\s+path=(["'])[^"']+\1\s*\/>\s*\r?\n?/gm, '');
}

const PACKAGE_JSON = {
	name: 'stream-kit-action-script',
	private: true,
	type: 'module'
} as const;

const TSCONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'bundler',
		strict: true,
		skipLibCheck: true,
		allowJs: true,
		isolatedModules: true,
		noEmit: true
	},
	include: ['handler.ts', 'node_modules/@stream-kit/script-api/**/*.d.ts']
} as const;

const SCRIPT_API_PACKAGE_JSON = {
	name: '@stream-kit/script-api',
	version: '0.0.0',
	exports: {
		'.': {
			types: './index.d.ts'
		}
	}
} as const;

export type ScriptProjectSyncOptions = {
	handlerId: string;
	source: string;
	actionTriggers?: { id: string }[];
};

function projectRelativePath(handlerId: string, file = ''): string {
	const base = `scripts/handlers/${handlerId}`;
	return file ? `${base}/${file}` : base;
}

function getFilesystem() {
	return getApp().fs;
}

async function ensureProjectDirs(handlerId: string): Promise<void> {
	if (preparedProjectDirs.has(handlerId)) {
		return;
	}

	const fs = getFilesystem();

	try {
		await fs.mkdir(projectRelativePath(handlerId, SCRIPT_API_DIR), {
			baseDir: BaseDirectory.AppData,
			recursive: true
		});
	} catch {
		// Directory may already exist.
	}
	preparedProjectDirs.add(handlerId);
}

function typesFingerprint(triggerIds: string[]): string {
	return triggerIds.join('\0');
}

async function writeText(path: string, contents: string): Promise<void> {
	await getFilesystem().writeTextFile(path, contents, {
		baseDir: BaseDirectory.AppData,
		create: true
	});
}

async function writeProjectFiles(options: ScriptProjectSyncOptions): Promise<void> {
	const { handlerId, source, actionTriggers = [] } = options;
	const triggerIds = actionTriggers.map((trigger) => trigger.id);
	await ensureProjectDirs(handlerId);
	await writeText(projectRelativePath(handlerId, HANDLER_FILE), stripEditorReferenceDirectives(source));

	const fingerprint = typesFingerprint(triggerIds);
	if (lastTypesFingerprint.get(handlerId) === fingerprint) {
		return;
	}

	const projectTypes = buildScriptProjectTypeFiles(triggerIds);
	await Promise.all([
		writeText(projectRelativePath(handlerId, 'package.json'), JSON.stringify(PACKAGE_JSON, null, 2)),
		writeText(projectRelativePath(handlerId, 'tsconfig.json'), JSON.stringify(TSCONFIG, null, 2)),
		writeText(
			projectRelativePath(handlerId, `${SCRIPT_API_DIR}/package.json`),
			JSON.stringify(SCRIPT_API_PACKAGE_JSON, null, 2)
		),
		writeText(projectRelativePath(handlerId, `${SCRIPT_API_DIR}/index.d.ts`), projectTypes.indexDts),
		writeText(
			projectRelativePath(handlerId, `${SCRIPT_API_DIR}/plugin-app-api.d.ts`),
			projectTypes.pluginAppApiDts
		),
		writeText(
			projectRelativePath(handlerId, `${SCRIPT_API_DIR}/plugin-apis.d.ts`),
			projectTypes.pluginApisDts
		),
		writeText(
			projectRelativePath(handlerId, `${SCRIPT_API_DIR}/trigger-data.d.ts`),
			projectTypes.triggerDataDts
		),
		writeText(
			projectRelativePath(handlerId, `${SCRIPT_API_DIR}/handler-context.d.ts`),
			projectTypes.handlerContextDts
		)
	]);
	lastTypesFingerprint.set(handlerId, fingerprint);
}

export async function getScriptProjectPath(handlerId: string): Promise<string> {
	return invoke<string>('script_get_project_dir', {
		handlerId
	});
}

export async function syncScriptProjectToDisk(
	_options: PluginAppApi,
	options: ScriptProjectSyncOptions
): Promise<string> {
	await writeProjectFiles(options);
	return getScriptProjectPath(options.handlerId);
}

export async function openScriptProjectInEditor(
	app: PluginAppApi,
	options: ScriptProjectSyncOptions
): Promise<Awaited<ReturnType<typeof openProjectInEditor>>> {
	const projectPath = await syncScriptProjectToDisk(app, options);

	return openProjectInEditor(projectPath, {
		onOpenFolder: (folderPath) => getApp().opener.openPath(folderPath),
		onCopyPath: (folderPath) => navigator.clipboard.writeText(folderPath),
		onOpenUrl: (url) => app.opener.openUrl(url)
	});
}

export async function watchScriptProject(
	handlerId: string,
	onChange: (source: string) => void
): Promise<UnwatchFn> {
	const relativePath = projectRelativePath(handlerId, HANDLER_FILE);
	const fs = getFilesystem();
	let lastMtime: number | null = null;
	let cancelled = false;

	const poll = async (): Promise<void> => {
		if (cancelled) {
			return;
		}

		try {
			const info = await fs.stat(relativePath, { baseDir: BaseDirectory.AppData });
			const mtime = info.mtime?.getTime() ?? 0;

			if (lastMtime !== null && mtime !== lastMtime) {
				const source = await fs.readTextFile(relativePath, {
					baseDir: BaseDirectory.AppData
				});
				onChange(source);
			}

			lastMtime = mtime;
		} catch {
			// File may not exist until the first sync completes.
		}
	};

	await poll();
	const interval = setInterval(() => {
		void poll();
	}, POLL_INTERVAL_MS);

	return () => {
		cancelled = true;
		clearInterval(interval);
	};
}

export async function readScriptProjectSource(handlerId: string): Promise<string | null> {
	const relativePath = projectRelativePath(handlerId, HANDLER_FILE);

	try {
		return await getFilesystem().readTextFile(relativePath, {
			baseDir: BaseDirectory.AppData
		});
	} catch {
		return null;
	}
}
