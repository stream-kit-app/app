import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export type MonacoModule = typeof import('monaco-editor');
export type MonacoConfigurator = (monaco: MonacoModule) => void;

let monacoInstance: MonacoModule | null = null;
let configured = false;

function configureTypescript(monaco: MonacoModule): void {
	if (configured) {
		return;
	}

	const { typescript: ts } = monaco;

	ts.typescriptDefaults.setCompilerOptions({
		target: ts.ScriptTarget.ES2020,
		allowNonTsExtensions: true,
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.NodeJs,
		noEmit: true,
		esModuleInterop: true,
		allowJs: true
	});

	ts.typescriptDefaults.setDiagnosticsOptions({
		noSemanticValidation: false,
		noSyntaxValidation: false
	});

	ts.typescriptDefaults.setEagerModelSync(true);

	ts.javascriptDefaults.setCompilerOptions({
		target: ts.ScriptTarget.ES2020,
		allowNonTsExtensions: true,
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.NodeJs,
		noEmit: true,
		allowJs: true
	});

	configured = true;
}

export async function ensureMonaco(configure?: MonacoConfigurator): Promise<MonacoModule> {
	if (monacoInstance) {
		configure?.(monacoInstance);
		return monacoInstance;
	}

	globalThis.MonacoEnvironment = {
		getWorker(_workerId, label) {
			switch (label) {
				case 'json':
					return new jsonWorker();
				case 'css':
				case 'scss':
				case 'less':
					return new cssWorker();
				case 'html':
				case 'handlebars':
				case 'razor':
					return new htmlWorker();
				case 'typescript':
				case 'javascript':
					return new tsWorker();
				default:
					return new editorWorker();
			}
		}
	};

	monacoInstance = await import('monaco-editor');
	configureTypescript(monacoInstance);
	configure?.(monacoInstance);

	return monacoInstance;
}
