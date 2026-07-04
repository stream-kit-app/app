import type { OverlayManifest } from './overlay-manifest';

import overlayManifestSchema from './overlay-manifest.schema.json';

export const OVERLAY_MANIFEST_SCHEMA_FILE = 'overlay-manifest.schema.json';

export function getOverlayManifestSchemaContent(): string {
	return `${JSON.stringify(overlayManifestSchema, null, 2)}\n`;
}

export function serializeOverlayManifest(manifest: OverlayManifest): string {
	return JSON.stringify(
		{
			$schema: `./${OVERLAY_MANIFEST_SCHEMA_FILE}`,
			...manifest
		},
		null,
		2
	);
}
