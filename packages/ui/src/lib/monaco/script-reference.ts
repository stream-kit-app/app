/** Must match the virtual project root used by script extra libs. */
export const MONACO_SCRIPT_PROJECT_ROOT = 'file:///project';

export const MONACO_SCRIPT_API_INDEX = `${MONACO_SCRIPT_PROJECT_ROOT}/node_modules/@stream-kit/script-api/index.d.ts`;

export function buildMonacoProjectReferenceDirective(modelUri: string): string {
	const prefix = `${MONACO_SCRIPT_PROJECT_ROOT}/`;

	if (!modelUri.startsWith(prefix)) {
		return '';
	}

	const relativePath = modelUri.slice(prefix.length);
	const depth = relativePath.split('/').length - 1;

	return `/// <reference path="${'../'.repeat(depth)}node_modules/@stream-kit/script-api/index.d.ts" />\n`;
}

export function withMonacoProjectReference(source: string, modelUri: string): string {
	const directive = buildMonacoProjectReferenceDirective(modelUri);

	if (!directive || source.includes('/// <reference path=')) {
		return source;
	}

	return `${directive}${source}`;
}
