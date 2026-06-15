import type { Extension } from '@codemirror/state';

import { Compartment } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { languageServerWithTransport, formattingOptions, type Transport } from 'codemirror-languageserver';

import { WorkerRPC } from 'svelte-language-server-web';



import type { LanguageServerConfig } from '../types';



import { SVELTE_LSP_INITIALIZATION_OPTIONS, SVELTE_LSP_SETTINGS } from './svelte-settings';

import { suppressLegacyRuneDiagnostics } from './filter-diagnostics';

import { patchWorkerLanguageClient } from './patch-worker-language-client';

import { lspTooltipSyntaxHighlighting } from './tooltip-highlight';

import { syncWorkspaceChangesToWorker } from './workspace';

import SvelteLspWorker from '../workers/svelte-lsp.worker?worker';

import TsLspWorker from '../workers/ts-lsp.worker?worker';

import { EDITOR_TAB_SIZE, EDITOR_USE_TABS } from '../editor-indent';



export type LanguageServerConnection = {
	extensions: Extension[];
	updateWorkspace: (workspace: Record<string, string>) => Promise<void>;
	setActiveEditor: (
		view: EditorView,
		compartment: Compartment,
		documentUri: string,
		languageId: string
	) => void;
	clearActiveEditor: (view?: EditorView, compartment?: Compartment) => void;
	destroy: () => void;
};

export type CreateLanguageServerConnectionOptions = {
	/** Keep the worker alive and bind LSP extensions per editor via setActiveEditor. */
	shared?: boolean;
};



function resolveLanguageId(kind: LanguageServerConfig['kind']): string {

	return kind === 'svelte' ? 'svelte' : 'typescript';

}



function resolveWorker(kind: LanguageServerConfig['kind']): Worker {

	return kind === 'svelte' ? new SvelteLspWorker() : new TsLspWorker();

}



function shouldNotifyDocumentOpen(languageId: string, documentUri: string): boolean {
	if (languageId === 'svelte') {
		return documentUri.endsWith('.svelte');
	}

	if (languageId === 'typescript') {
		return documentUri.endsWith('.ts') || documentUri.endsWith('.svelte.ts');
	}

	return false;
}

function notifyDocumentOpen(
	workerRpc: WorkerRPC,
	documentUri: string,
	languageId: string,
	text: string,
	version = 0
): void {
	if (!shouldNotifyDocumentOpen(languageId, documentUri)) {
		return;
	}

	workerRpc.sendNotification('textDocument/didOpen', {
		textDocument: {
			uri: documentUri,
			languageId,
			text,
			version
		}
	});
}



async function prepareWorkerWorkspace(

	workerRpc: WorkerRPC,

	workspace: Record<string, string>

): Promise<Map<string, string>> {

	await syncWorkspaceChangesToWorker(workerRpc, workspace, new Map());

	return new Map(Object.entries(workspace));

}



function buildLanguageServerPluginExtensions(
	config: LanguageServerConfig,
	workerRpc: WorkerRPC,
	languageClient: ReturnType<typeof patchWorkerLanguageClient>,
	documentUri: string,
	languageId: string
): Extension[] {
	const isSvelte = config.kind === 'svelte';

	return [
		formattingOptions.of({
			tabSize: EDITOR_TAB_SIZE,
			insertSpaces: !EDITOR_USE_TABS
		}),
		languageServerWithTransport({
			transport: workerRpc as unknown as Transport,
			documentUri,
			languageId,
			rootUri: config.rootUri,
			workspaceFolders: null,
			allowHTMLContent: true,
			autoClose: false,
			initializationOptions: isSvelte ? SVELTE_LSP_INITIALIZATION_OPTIONS : undefined,
			client: languageClient as never
		})
	];
}

export async function createLanguageServerConnection(
	config: LanguageServerConfig,
	options: CreateLanguageServerConnectionOptions = {}
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



	if (config.packageJson) {

		await workerRpc.fetchTypes(

			config.packageJson as Parameters<WorkerRPC['fetchTypes']>[0]

		);

	}



	let knownWorkspaceContent = await prepareWorkerWorkspace(workerRpc, config.workspace);

	await workerRpc.setup(config.workspace);



	const languageClient = patchWorkerLanguageClient(

		workerRpc.client() as unknown as Parameters<typeof patchWorkerLanguageClient>[0]

	);



	if (isSvelte) {

		await languageClient.initializePromise;

		workerRpc.sendNotification('workspace/didChangeConfiguration', {

			settings: SVELTE_LSP_SETTINGS

		});

	}



	let knownWorkspaceKeys = new Set(Object.keys(config.workspace));
	let boundView: EditorView | undefined;
	let boundCompartment: Compartment | undefined;
	let boundDocumentUri = '';
	let boundLanguageId = '';

	const staticExtensions = [
		lspTooltipSyntaxHighlighting(),
		...(isSvelte ? [suppressLegacyRuneDiagnostics()] : [])
	];

	const extensions = options.shared
		? staticExtensions
		: [
				...buildLanguageServerPluginExtensions(
					config,
					workerRpc,
					languageClient,
					config.documentUri,
					resolveLanguageId(config.kind)
				),
				...staticExtensions
			];

	const setActiveEditor = options.shared
		? (
				view: EditorView,
				compartment: Compartment,
				documentUri: string,
				languageId: string
			): void => {
				if (boundView === view && boundDocumentUri === documentUri && boundLanguageId === languageId) {
					return;
				}

				if (boundView && boundCompartment && boundView !== view) {
					boundView.dispatch({ effects: boundCompartment.reconfigure([]) });
				}

				boundView = view;
				boundCompartment = compartment;
				boundDocumentUri = documentUri;
				boundLanguageId = languageId;

				notifyDocumentOpen(
					workerRpc,
					documentUri,
					languageId,
					view.state.doc.toString()
				);

				view.dispatch({
					effects: compartment.reconfigure(
						buildLanguageServerPluginExtensions(
							config,
							workerRpc,
							languageClient,
							documentUri,
							languageId
						)
					)
				});
			}
		: (): void => {};

	const clearActiveEditor = options.shared
		? (view?: EditorView, compartment?: Compartment): void => {
				if (!boundView || !boundCompartment) {
					return;
				}

				if (view && boundView !== view) {
					return;
				}

				if (compartment && boundCompartment !== compartment) {
					return;
				}

				boundView.dispatch({ effects: boundCompartment.reconfigure([]) });
				boundView = undefined;
				boundCompartment = undefined;
				boundDocumentUri = '';
				boundLanguageId = '';
			}
		: (): void => {};

	return {
		extensions,
		setActiveEditor,
		clearActiveEditor,
		updateWorkspace: async (workspace) => {

			const previousKeys = knownWorkspaceKeys;

			const nextKeys = new Set(Object.keys(workspace));



			knownWorkspaceContent = await syncWorkspaceChangesToWorker(

				workerRpc,

				workspace,

				knownWorkspaceContent

			);



			if (isSvelte) {

				const changes: Array<{ uri: string; type: number }> = [];



				for (const uri of nextKeys) {

					changes.push({ uri, type: previousKeys.has(uri) ? 2 : 1 });

				}



				for (const uri of previousKeys) {

					if (!nextKeys.has(uri)) {

						changes.push({ uri, type: 3 });

					}

				}



				if (changes.length > 0) {

					workerRpc.sendNotification('workspace/didChangeWatchedFiles', { changes });

				}



				const sourceListChanged =

					[...nextKeys].some(

						(uri) => uri.includes('/src/') && !previousKeys.has(uri)

					) ||

					[...previousKeys].some(

						(uri) => uri.includes('/src/') && !nextKeys.has(uri)

					);



				if (sourceListChanged) {

					await workerRpc.setup(workspace);

					if (boundView && boundDocumentUri && boundLanguageId) {

						notifyDocumentOpen(
							workerRpc,
							boundDocumentUri,
							boundLanguageId,
							boundView.state.doc.toString()
						);

					}

				}

			}



			knownWorkspaceKeys = nextKeys;

		},

		destroy: () => {
			clearActiveEditor();
			workerRpc.dispose();
		}
	};
}


