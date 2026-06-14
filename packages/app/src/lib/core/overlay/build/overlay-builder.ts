import type { OverlayBuildInput, OverlayBuildResult, OverlayProjectFile } from '../types';

import { compile } from 'svelte/compiler';

import { OVERLAY_INDEX_HTML, OVERLAY_MAIN_JS } from './overlay-dist';
function findEntryFile(files: OverlayProjectFile[]): OverlayProjectFile {
	const appEntry = files.find((file) => file.path === 'src/App.svelte');

	if (!appEntry) {
		throw new Error('Overlay project must include src/App.svelte');
	}

	return appEntry;
}

function createIndexHtml(): string {
	return OVERLAY_INDEX_HTML;
}

export async function buildOverlayProject(input: OverlayBuildInput): Promise<OverlayBuildResult> {
	try {
		const entry = findEntryFile(input.files);
		const compiled = compile(entry.content, {
			filename: entry.path,
			generate: 'client',
			css: 'external',
			dev: false
		});

		const distFiles: OverlayProjectFile[] = [
			{ path: 'index.html', content: createIndexHtml() },
			{ path: 'main.js', content: OVERLAY_MAIN_JS },			{ path: 'app.compiled.js', content: compiled.js.code },
			{ path: 'overlay.css', content: compiled.css?.code ?? '' }
		];

		return {
			success: true,
			files: distFiles
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error)
		};
	}
}
