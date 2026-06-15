import type { OverlayBuildInput, OverlayBuildResult, OverlayProjectFile } from '../types';

import { OVERLAY_INDEX_HTML, OVERLAY_MAIN_JS } from './overlay-dist';
import { bundleOverlaySources } from './overlay-bundle';

export async function buildOverlayProject(input: OverlayBuildInput): Promise<OverlayBuildResult> {
	try {
		const bundled = await bundleOverlaySources(input.files);

		const distFiles: OverlayProjectFile[] = [
			{ path: 'index.html', content: OVERLAY_INDEX_HTML },
			{ path: 'main.js', content: OVERLAY_MAIN_JS },
			{ path: 'app.compiled.js', content: bundled.code },
			{ path: 'overlay.css', content: bundled.css }
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
