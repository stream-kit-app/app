import { invoke } from '@tauri-apps/api/core';

import type { PluginAppApi } from '@stream-kit/plugin';

import { buildScriptProjectTypeFiles } from './build-script-extra-libs';
import { openProjectInEditor } from '../opener/open-in-editor';
import { getApp } from '../registry';
import { BaseDirectory } from '../filesystem/base-directory';
import type { UnwatchFn } from '../filesystem/types';

const HANDLER_FILE = 'handler.ts';
const POLL_INTERVAL_MS = 1_000;

function stripEditorReferenceDirectives(source: string): string {
	return source.replace(/^\/\/\/ <reference path="[^"]+" \/>\r?\n/gm, '');
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

async function ensureParentDirs(relativePath: string): Promise<void> {
	const fs = getFilesystem();
	const parts = relativePath.split('/').filter(Boolean);

	if (parts.length <= 1) {
		return;
	}

	let current = '';

	for (let index = 0; index < parts.length - 1; index++) {
		current = current ? `${current}/${parts[index]}` : parts[index];

		try {
			await fs.mkdir(current, { baseDir: BaseDirectory.AppData, recursive: true });
		} catch {
			// Directory may already exist.
		}
	}
}

async function writeProjectFiles(options: ScriptProjectSyncOptions): Promise<void> {
	const { handlerId, source, actionTriggers = [] } = options;
	const fs = getFilesystem();
	const triggerIds = actionTriggers.map((trigger) => trigger.id);
	const projectTypes = buildScriptProjectTypeFiles(triggerIds);

	const files: Array<{ path: string; contents: string }> = [
		{
			path: projectRelativePath(handlerId, HANDLER_FILE),
			contents: stripEditorReferenceDirectives(source)
		},
		{
			path: projectRelativePath(handlerId, 'package.json'),
			contents: JSON.stringify(PACKAGE_JSON, null, 2)
		},
		{
			path: projectRelativePath(handlerId, 'tsconfig.json'),
			contents: JSON.stringify(TSCONFIG, null, 2)
		},
		{
			path: projectRelativePath(handlerId, 'node_modules/@stream-kit/script-api/package.json'),
			contents: JSON.stringify(SCRIPT_API_PACKAGE_JSON, null, 2)
		},
		{
			path: projectRelativePath(handlerId, 'node_modules/@stream-kit/script-api/index.d.ts'),
			contents: projectTypes.indexDts
		},
		{
			path: projectRelativePath(
				handlerId,
				'node_modules/@stream-kit/script-api/plugin-app-api.d.ts'
			),
			contents: projectTypes.pluginAppApiDts
		},
		{
			path: projectRelativePath(
				handlerId,
				'node_modules/@stream-kit/script-api/trigger-data.d.ts'
			),
			contents: projectTypes.triggerDataDts
		},
		{
			path: projectRelativePath(
				handlerId,
				'node_modules/@stream-kit/script-api/handler-context.d.ts'
			),
			contents: projectTypes.handlerContextDts
		}
	];

	for (const file of files) {
		await ensureParentDirs(file.path);
		await fs.writeTextFile(file.path, file.contents, {
			baseDir: BaseDirectory.AppData,
			create: true
		});
	}
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
