import type { Extension } from '@codemirror/state';
import { languageServerWithTransport, type Transport } from 'codemirror-languageserver';
import { WorkerRPC } from 'svelte-language-server-web';

import type { LanguageServerConfig } from '../types';

import { SVELTE_LSP_INITIALIZATION_OPTIONS, SVELTE_LSP_SETTINGS } from './svelte-settings';
import { suppressLegacyRuneDiagnostics } from './filter-diagnostics';
import { patchWorkerLanguageClient } from './patch-worker-language-client';
import { lspTooltipSyntaxHighlighting } from './tooltip-highlight';
import { pickWorkspaceFiles, uploadWorkspaceToWorker } from './workspace';
import SvelteLspWorker from '../workers/svelte-lsp.worker?worker';
import TsLspWorker from '../workers/ts-lsp.worker?worker';

const SVELTE_SETUP_PATHS = [
	'file:///package.json',
	'file:///.editorconfig',
	'file:///.prettierrc',
	'file:///tsconfig.json',
	'file:///svelte.config.js',
	'file:///node_modules/svelte/package.json',
	'file:///node_modules/svelte/types/index.d.ts',
	'file:///node_modules/@stream-kit/overlay-sdk/package.json',
	'file:///node_modules/@stream-kit/overlay-sdk/index.d.ts',
	'file:///node_modules/@stream-kit/overlay-sdk/index.js',
	'file:///src/app.d.ts'
] as const;

export type LanguageServerConnection = {
	extensions: Extension[];
	updateWorkspace: (workspace: Record<string, string>) => Promise<void>;
	destroy: () => void;
};

function resolveLanguageId(kind: LanguageServerConfig['kind']): string {
	return kind === 'svelte' ? 'svelte' : 'typescript';
}

function resolveWorker(kind: LanguageServerConfig['kind']): Worker {
	return kind === 'svelte' ? new SvelteLspWorker() : new TsLspWorker();
}

async function prepareWorkerWorkspace(
	workerRpc: WorkerRPC,
	config: LanguageServerConfig,
	isSvelte: boolean
): Promise<void> {
	if (config.packageJson) {
		await workerRpc.fetchTypes(
			config.packageJson as Parameters<WorkerRPC['fetchTypes']>[0]
		);
	}

	if (isSvelte) {
		const setupFiles = pickWorkspaceFiles(config.workspace, SVELTE_SETUP_PATHS);
		await uploadWorkspaceToWorker(workerRpc, setupFiles);
		await workerRpc.setup(setupFiles);
		await uploadWorkspaceToWorker(workerRpc, config.workspace);
		return;
	}

	await uploadWorkspaceToWorker(workerRpc, config.workspace);
	await workerRpc.setup(config.workspace);
}

export async function createLanguageServerConnection(
	config: LanguageServerConfig
): Promise<LanguageServerConnection> {
	const isSvelte = config.kind === 'svelte';

	const workerRpc = new WorkerRPC(resolveWorker(config.kind), {
		documentUri: config.documentUri,
		languageId: resolveLanguageId(config.kind),
		rootUri: config.rootUri,
		workspaceFolders: null,
		allowHTMLContent: isSvelte,
		autoClose: false
	});

	await prepareWorkerWorkspace(workerRpc, config, isSvelte);

	const languageClient = patchWorkerLanguageClient(
		workerRpc.client() as unknown as Parameters<typeof patchWorkerLanguageClient>[0]
	);

	if (isSvelte) {
		await languageClient.initializePromise;
		workerRpc.sendNotification('workspace/didChangeConfiguration', {
			settings: SVELTE_LSP_SETTINGS
		});
	}

	const extensions = [
		languageServerWithTransport({
			transport: workerRpc as unknown as Transport,
			documentUri: config.documentUri,
			languageId: resolveLanguageId(config.kind),
			rootUri: config.rootUri,
			workspaceFolders: null,
			allowHTMLContent: true,
			autoClose: false,
			initializationOptions: isSvelte ? SVELTE_LSP_INITIALIZATION_OPTIONS : undefined,
			client: languageClient as never
		}),
		lspTooltipSyntaxHighlighting(),
		...(isSvelte ? [suppressLegacyRuneDiagnostics()] : [])
	];

	return {
		extensions,
		updateWorkspace: async (workspace) => {
			await uploadWorkspaceToWorker(workerRpc, workspace);
		},
		destroy: () => {
			workerRpc.dispose();
		}
	};
}
