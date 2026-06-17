const LSP_REQUEST_TIMEOUT_MS = 10_000;

type WorkerLanguageClient = {
	request: (method: string, params: unknown, timeout?: number) => Promise<unknown>;
	initializePromise?: Promise<unknown>;
	[key: string]: unknown;
};

const UNOPENED_DOCUMENT_ERROR = 'unopened document';

function isMarkupContent(value: unknown): value is { kind: string; value: string } {
	return (
		typeof value === 'object' &&
		value !== null &&
		'kind' in value &&
		'value' in value &&
		typeof (value as { kind: unknown }).kind === 'string' &&
		typeof (value as { value: unknown }).value === 'string'
	);
}

function looksLikeHtml(value: string): boolean {
	return /<\/?(?:pre|code|p|span|div|br)\b/i.test(value);
}

function plainTextFromHtml(value: string): string {
	if (typeof DOMParser === 'undefined') {
		return value.replace(/<[^>]+>/g, '');
	}

	const doc = new DOMParser().parseFromString(value, 'text/html');
	const code = doc.body.querySelector('pre code, code');

	if (code?.textContent) {
		return code.textContent;
	}

	return doc.body.textContent?.trim() ?? value;
}

/**
 * TypeScript hover responses often use LSP MarkedString ({ language, value }) or HTML
 * embedded in MarkupContent. codemirror-languageserver only handles strings and
 * MarkupContent reliably; keep hover text plain so tooltips never show raw tags.
 */
function normalizeHoverContents(contents: unknown): unknown {
	if (contents == null) {
		return '';
	}

	if (typeof contents === 'string') {
		return looksLikeHtml(contents) ? plainTextFromHtml(contents) : contents;
	}

	if (isMarkupContent(contents)) {
		if (contents.kind === 'markdown' && looksLikeHtml(contents.value)) {
			return plainTextFromHtml(contents.value);
		}

		return contents;
	}

	if (Array.isArray(contents)) {
		const parts = contents.map(normalizeHoverContents).filter((part) => part !== '');

		if (parts.length === 0) {
			return '';
		}

		if (parts.length === 1) {
			return parts[0];
		}

		return parts.map((part) => (typeof part === 'string' ? part : String(part))).join('\n\n');
	}

	if (typeof contents === 'object' && 'value' in contents) {
		const marked = contents as { language?: unknown; value: unknown };

		if (typeof marked.value !== 'string') {
			return '';
		}

		return looksLikeHtml(marked.value) ? plainTextFromHtml(marked.value) : marked.value;
	}

	return String(contents);
}

function normalizeHoverResult(result: unknown): unknown {
	if (!result || typeof result !== 'object' || !('contents' in result)) {
		return result;
	}

	const hover = result as { contents: unknown };

	return {
		...hover,
		contents: normalizeHoverContents(hover.contents)
	};
}

const MISSING_LSP_REQUEST_METHODS = [
	['textDocumentDefinition', 'textDocument/definition'],
	['textDocumentDeclaration', 'textDocument/declaration'],
	['textDocumentTypeDefinition', 'textDocument/typeDefinition'],
	['textDocumentDocumentHighlight', 'textDocument/documentHighlight'],
	['textDocumentPrepareRename', 'textDocument/prepareRename'],
	['textDocumentRename', 'textDocument/rename'],
	['completionItemResolve', 'completionItem/resolve']
] as const;

/**
 * svelte-language-server-web's bundled language client only implements a subset of LSP
 * requests. codemirror-languageserver expects the full surface (e.g. completion resolve).
 */
function wrapUnopenedDocumentRequest(
	client: WorkerLanguageClient,
	methodName: string,
	lspMethod: string
): void {
	const request = (params: unknown) =>
		client.request(lspMethod, params, LSP_REQUEST_TIMEOUT_MS).catch((error: unknown) => {
			if (error instanceof Error && error.message.includes(UNOPENED_DOCUMENT_ERROR)) {
				return null;
			}

			throw error;
		});

	if (typeof client[methodName] === 'function') {
		const original = (client[methodName] as (params: unknown) => Promise<unknown>).bind(client);

		client[methodName] = async (params: unknown) => {
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

	client[methodName] = request;
}

function wrapHoverRequest(client: WorkerLanguageClient): void {
	const normalizeResult = (result: unknown) => (result ? normalizeHoverResult(result) : result);

	if (typeof client.textDocumentHover === 'function') {
		const original = (client.textDocumentHover as (params: unknown) => Promise<unknown>).bind(client);

		client.textDocumentHover = async (params: unknown) => {
			try {
				return normalizeResult(await original(params));
			} catch (error) {
				if (error instanceof Error && error.message.includes(UNOPENED_DOCUMENT_ERROR)) {
					return null;
				}

				throw error;
			}
		};

		return;
	}

	client.textDocumentHover = async (params: unknown) => {
		try {
			const result = await client.request(
				'textDocument/hover',
				params,
				LSP_REQUEST_TIMEOUT_MS
			);

			return normalizeResult(result);
		} catch (error) {
			if (error instanceof Error && error.message.includes(UNOPENED_DOCUMENT_ERROR)) {
				return null;
			}

			throw error;
		}
	};
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
	wrapUnopenedDocumentRequest(client, 'textDocumentCompletion', 'textDocument/completion');

	return client;
}
