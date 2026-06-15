const LSP_REQUEST_TIMEOUT_MS = 10_000;

type WorkerLanguageClient = {
	request: (method: string, params: unknown, timeout?: number) => Promise<unknown>;
	initializePromise?: Promise<unknown>;
	[key: string]: unknown;
};

const UNOPENED_DOCUMENT_ERROR = 'unopened document';

const MISSING_LSP_REQUEST_METHODS = [
	['textDocumentDefinition', 'textDocument/definition'],
	['textDocumentDeclaration', 'textDocument/declaration'],
	['textDocumentTypeDefinition', 'textDocument/typeDefinition'],
	['textDocumentDocumentHighlight', 'textDocument/documentHighlight'],
	['textDocumentFormatting', 'textDocument/formatting'],
	['textDocumentRangeFormatting', 'textDocument/rangeFormatting'],
	['textDocumentPrepareRename', 'textDocument/prepareRename'],
	['textDocumentRename', 'textDocument/rename'],
	['completionItemResolve', 'completionItem/resolve']
] as const;

/**
 * svelte-language-server-web's bundled language client only implements a subset of LSP
 * requests. codemirror-languageserver expects the full surface (e.g. completion resolve).
 */
function wrapHoverRequest(client: WorkerLanguageClient): void {
	const hover = (params: unknown) =>
		client.request('textDocument/hover', params, LSP_REQUEST_TIMEOUT_MS).catch((error: unknown) => {
			if (error instanceof Error && error.message.includes(UNOPENED_DOCUMENT_ERROR)) {
				return null;
			}

			throw error;
		});

	if (typeof client.textDocumentHover === 'function') {
		const original = client.textDocumentHover.bind(client);

		client.textDocumentHover = async (params: unknown) => {
			try {
				return await original(params);
			} catch (error) {
				if (error instanceof Error && error.message.includes(UNOPENED_DOCUMENT_ERROR)) {
					return null;
				}

				throw error;
			}
		};

		return;
	}

	client.textDocumentHover = hover;
}

export function patchWorkerLanguageClient(client: WorkerLanguageClient): WorkerLanguageClient {
	for (const [methodName, lspMethod] of MISSING_LSP_REQUEST_METHODS) {
		if (typeof client[methodName] === 'function') {
			continue;
		}

		client[methodName] = (params: unknown) =>
			client.request(lspMethod, params, LSP_REQUEST_TIMEOUT_MS);
	}

	wrapHoverRequest(client);

	return client;
}
