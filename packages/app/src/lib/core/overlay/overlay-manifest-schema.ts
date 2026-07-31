import type { OverlayManifest } from './overlay-manifest';

import overlayManifestSchema from './overlay-manifest.schema.json';

export const OVERLAY_MANIFEST_SCHEMA_FILE = 'overlay-manifest.schema.json';

/** Public schema URL for editor `$schema` and external overlay authors. */
export const OVERLAY_MANIFEST_SCHEMA_URL =
	'https://stream-kit.app/schemas/overlay-manifest.schema.json';

export function getOverlayManifestSchemaContent(): string {
	return `${JSON.stringify(overlayManifestSchema, null, 2)}\n`;
}

export function serializeOverlayManifest(manifest: OverlayManifest): string {
	return JSON.stringify(
		{
			$schema: OVERLAY_MANIFEST_SCHEMA_URL,
			...manifest
		},
		null,
		2
	);
}
