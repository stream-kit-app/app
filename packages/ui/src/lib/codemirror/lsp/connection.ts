import type { LanguageServerConfig } from '../types';
import type { Extension } from '@codemirror/state';
import type { Transport } from 'codemirror-languageserver';

import { languageServerWithTransport } from 'codemirror-languageserver';
import { WorkerRPC } from 'svelte-language-server-web';

import TsLspWorker from '../workers/ts-lsp.worker?worker';
import { patchWorkerLanguageClient } from './patch-worker-language-client';
import { lspTooltipSyntaxHighlighting } from './tooltip-highlight';
import { syncWorkspaceChangesToWorker } from './workspace';

export type LanguageServerConnection = {
	extensions: Extension[];
	updateWorkspace: (workspace: Record<string, string>) => Promise<void>;
	destroy: () => void;
};

async function prepareWorkerWorkspace(
	workerRpc: WorkerRPC,
	workspace: Record<string, string>
): Promise<Map<string, string>> {
	await syncWorkspaceChangesToWorker(workerRpc, workspace, new Map());

	return new Map(Object.entries(workspace));
}

export async function createLanguageServerConnection(
	config: LanguageServerConfig
): Promise<LanguageServerConnection> {
	const workerRpc = new WorkerRPC(new TsLspWorker(), {
		documentUri: config.documentUri,
		languageId: 'typescript',
		rootUri: config.rootUri,
		workspaceFolders: null,
		allowHTMLContent: true,
		autoClose: false
	});

	if (config.packageJson) {
		await workerRpc.fetchTypes(config.packageJson as Parameters<WorkerRPC['fetchTypes']>[0]);
	}

	let knownWorkspaceContent = await prepareWorkerWorkspace(workerRpc, config.workspace);

	await workerRpc.setup(config.workspace);

	const languageClient = patchWorkerLanguageClient(
		workerRpc.client() as unknown as Parameters<typeof patchWorkerLanguageClient>[0]
	);

	await languageClient.initializePromise;

	const extensions: Extension[] = [
		languageServerWithTransport({
			transport: workerRpc as unknown as Transport,
			documentUri: config.documentUri,
			languageId: 'typescript',
			rootUri: config.rootUri,
			workspaceFolders: null,
			allowHTMLContent: true,
			autoClose: false,
			client: languageClient as never
		}),
		lspTooltipSyntaxHighlighting()
	];

	return {
		extensions,
		updateWorkspace: async (workspace) => {
			knownWorkspaceContent = await syncWorkspaceChangesToWorker(
				workerRpc,
				workspace,
				knownWorkspaceContent
			);
		},
		destroy: () => {
			workerRpc.dispose();
		}
	};
}
