import type { OverlayProjectFile } from './types';

export const OVERLAY_ENTRY_PATH = 'src/App.svelte';

const ALLOWED_FILE_PATTERN = /^[A-Za-z0-9_-]+(\.(svelte\.ts|svelte|ts|json))$/;

export type OverlaySourceLanguage = 'svelte' | 'typescript' | 'json';

export function isAllowedOverlayFileName(name: string): boolean {
	return ALLOWED_FILE_PATTERN.test(name);
}

export function isOverlayEntryFile(path: string): boolean {
	return path === OVERLAY_ENTRY_PATH;
}

export function overlayFileName(path: string): string {
	const parts = path.split('/');
	return parts[parts.length - 1] ?? path;
}

/** Whether the overlay editor should attach the in-browser language server. */
export function overlayFileSupportsLsp(path: string): boolean {
	return path.endsWith('.svelte') || path.endsWith('.ts') || path.endsWith('.svelte.ts');
}

/** @deprecated Use {@link overlayFileSupportsLsp} */
export function overlayFileSupportsSvelteLsp(path: string): boolean {
	return overlayFileSupportsLsp(path);
}

export function overlayFileLspLanguageId(path: string): 'svelte' | 'typescript' | null {
	if (path.endsWith('.svelte')) {
		return 'svelte';
	}

	if (path.endsWith('.ts') || path.endsWith('.svelte.ts')) {
		return 'typescript';
	}

	return null;
}

export function overlaySourceLanguage(path: string): OverlaySourceLanguage {
	if (path.endsWith('.json')) {
		return 'json';
	}

	if (path.endsWith('.svelte.ts')) {
		return 'typescript';
	}

	if (path.endsWith('.svelte')) {
		return 'svelte';
	}

	return 'typescript';
}

export function overlayFileIcon(path: string): string {
	if (path.endsWith('.json')) {
		return 'ri:braces-line';
	}

	if (path.endsWith('.svelte')) {
		return 'ri:svelte-fill';
	}

	return 'vscode-icons:file-type-typescript';
}

export function sortOverlaySourceFiles(files: OverlayProjectFile[]): OverlayProjectFile[] {
	return [...files].sort((left, right) => {
		if (left.path === OVERLAY_ENTRY_PATH) {
			return -1;
		}

		if (right.path === OVERLAY_ENTRY_PATH) {
			return 1;
		}

		return overlayFileName(left.path).localeCompare(overlayFileName(right.path));
	});
}

export function normalizeOverlayComponentFileName(name: string): string {
	const trimmed = name.trim();

	if (
		trimmed.endsWith('.svelte.ts') ||
		!trimmed.endsWith('.svelte') ||
		trimmed === 'App.svelte'
	) {
		return trimmed;
	}

	const stem = trimmed.slice(0, -'.svelte'.length);
	const pascalStem = stem
		.split(/[-_]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');

	return `${pascalStem || 'Component'}.svelte`;
}

export function overlaySourcePathsMatch(left: string, right: string): boolean {
	return left.toLowerCase() === right.toLowerCase();
}

export function validateOverlayFileName(name: string): string | null {
	const trimmed = name.trim();

	if (!trimmed) {
		return 'File name is required';
	}

	if (trimmed.includes('/') || trimmed.includes('\\')) {
		return 'File name cannot contain path separators';
	}

	if (trimmed === 'App.svelte') {
		return 'App.svelte already exists';
	}

	if (!isAllowedOverlayFileName(trimmed)) {
		return 'Allowed extensions: .svelte, .svelte.ts, .ts, .json';
	}

	return null;
}

export function toOverlaySourcePath(name: string): string {
	return `src/${normalizeOverlayComponentFileName(name)}`;
}

export function isTemporaryOverlayPath(path: string): boolean {
	return path.startsWith('__new__/');
}

export function createTemporaryOverlayPath(): string {
	return `__new__/${crypto.randomUUID()}`;
}

const OVERLAY_IMPORT_EXTENSIONS = ['.ts', '.svelte.ts', '.json', '.svelte'] as const;

export function normalizeOverlayProjectPath(path: string): string {
	const parts: string[] = [];

	for (const part of path.split('/')) {
		if (!part || part === '.') {
			continue;
		}

		if (part === '..') {
			parts.pop();
			continue;
		}

		parts.push(part);
	}

	return parts.join('/');
}

export function resolveRelativeOverlayImport(importer: string, specifier: string): string {
	if (specifier.startsWith('./') || specifier.startsWith('../')) {
		const baseDir = importer.includes('/') ? importer.slice(0, importer.lastIndexOf('/')) : '';
		return normalizeOverlayProjectPath([baseDir, specifier].filter(Boolean).join('/'));
	}

	return normalizeOverlayProjectPath(specifier);
}

export function toOverlayProjectPath(resolved: string): string {
	return resolved.startsWith('src/') ? resolved : normalizeOverlayProjectPath(`src/${resolved}`);
}

export function resolveOverlayImportPath(
	specifier: string,
	importer: string,
	availablePaths: Iterable<string>
): string | null {
	const files = new Set(availablePaths);
	const direct = toOverlayProjectPath(resolveRelativeOverlayImport(importer, specifier));

	if (files.has(direct)) {
		return direct;
	}

	const lastSegment = direct.split('/').pop() ?? '';

	if (lastSegment.includes('.')) {
		return null;
	}

	for (const extension of OVERLAY_IMPORT_EXTENSIONS) {
		const candidate = `${direct}${extension}`;

		if (files.has(candidate)) {
			return candidate;
		}
	}

	return null;
}
