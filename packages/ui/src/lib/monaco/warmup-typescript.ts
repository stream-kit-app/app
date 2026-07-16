type MonacoTsWorkerClient = {
	getSemanticDiagnostics(filePath: string): Promise<unknown>;
};

type MonacoTsWorkerAccessor = {
	(uri: import('monaco-editor').Uri): Promise<MonacoTsWorkerClient>;
};

type MonacoTsLanguage = {
	getTypeScriptWorker(): Promise<MonacoTsWorkerAccessor>;
};

function getTypeScriptWorkerAccessor(
	monaco: typeof import('monaco-editor')
): MonacoTsLanguage['getTypeScriptWorker'] {
	return (monaco.languages as unknown as { typescript: MonacoTsLanguage }).typescript
		.getTypeScriptWorker;
}

async function waitForTypeScriptWorker(
	monaco: typeof import('monaco-editor'),
	maxAttempts = 40
): Promise<void> {
	const getTypeScriptWorker = getTypeScriptWorkerAccessor(monaco);

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		try {
			await getTypeScriptWorker();
			return;
		} catch {
			await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
		}
	}

	throw new Error('TypeScript not registered after wait');
}

/** Kick the TypeScript worker so completions/hover are ready on first keystroke. */
export async function warmupMonacoTypescript(
	monaco: typeof import('monaco-editor'),
	model: import('monaco-editor').editor.ITextModel
): Promise<void> {
	try {
		await waitForTypeScriptWorker(monaco);

		const getTypeScriptWorker = getTypeScriptWorkerAccessor(monaco);
		const worker = await getTypeScriptWorker();
		const client = await worker(model.uri);
		await client.getSemanticDiagnostics(model.uri.toString());
	} catch (error) {
		console.warn('[monaco] TypeScript warmup failed:', error);
	}
}
