import type { OverlayFrameworkId, OverlayProjectFile } from '../types';

import { DEFAULT_OVERLAY_PORT } from '../types';

import { litScaffold } from './lit';
import { preactScaffold } from './preact';
import { reactScaffold } from './react';
import { solidScaffold } from './solid';
import { svelteScaffold } from './svelte';
import { vanillaScaffold } from './vanilla';
import { vueScaffold } from './vue';

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function overlayProjectSlug(name: string): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return slug || 'overlay';
}

export function overlayReadme(name: string, overlayId: string, framework: OverlayFrameworkId): string {
	const buildSection =
		framework === 'vanilla'
			? `This overlay uses plain HTML and JavaScript in \`dist/\`. Edit those files directly — no build step is required.

After editing, refresh the OBS browser source or reload the preview URL.`
			: `\`\`\`bash
pnpm install
pnpm run build
\`\`\`

The built files are written to \`dist/\`. Stream Kit serves that folder to OBS at the browser source URL.`;

	const devSection =
		framework === 'vanilla'
			? `Vanilla overlays are served directly from \`dist/\`. Use **Open in editor** in Stream Kit to edit \`dist/index.html\` and \`dist/app.js\`.`
			: `\`\`\`bash
pnpm install
pnpm run dev
\`\`\`

\`pnpm run dev\` proxies WebSocket traffic from \`/ws\` to the Stream Kit overlay server (default \`http://127.0.0.1:${DEFAULT_OVERLAY_PORT}\`). Keep Stream Kit running with the overlay server started while developing.`;

	return `# ${name}

Stream Kit overlay project (\`${overlayId}\`).

## OBS browser source

1. Keep Stream Kit running with the overlay server started.
2. Copy the browser source URL from the Overlays page in Stream Kit.
3. In OBS, add a **Browser** source and paste the URL.

${framework === 'vanilla' ? 'This vanilla overlay is ready to use immediately after creation.' : 'Run a production build before using the URL in OBS (see below).'}

## Develop locally

${devSection}

## Production build

${buildSection}

## WebSocket events

Stream Kit sends events over WebSocket. Connect with your overlay id (\`${overlayId}\`):

\`\`\`javascript
const OVERLAY_ID = '${overlayId}';
const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(\`\${protocol}//\${location.host}/ws?overlayId=\${OVERLAY_ID}\`);

ws.onmessage = (event) => {
	const { event: name, payload } = JSON.parse(event.data);
	console.log('Overlay event:', name, payload);
};
\`\`\`

Message shape:

\`\`\`json
{
	"overlayId": "${overlayId}",
	"event": "event",
	"payload": {},
	"timestamp": 1718380800000
}
\`\`\`

Each starter uses Vite with \`base: './'\` so built assets load correctly from Stream Kit's \`/o/<overlay-id>/\` URL.

Use the **Overlay → Send to Overlay** action handler in Stream Kit to push events from triggers.
`;
}

const GITIGNORE = `node_modules
dist
.DS_Store
.env.local
`;

const ENV_FILE = (overlayId: string): string => `VITE_OVERLAY_ID=${overlayId}
`;

type ScaffoldBuilder = (name: string, overlayId: string) => OverlayProjectFile[];

const SCAFFOLD_BUILDERS: Record<OverlayFrameworkId, ScaffoldBuilder> = {
	svelte: svelteScaffold,
	react: reactScaffold,
	vue: vueScaffold,
	preact: preactScaffold,
	solid: solidScaffold,
	lit: litScaffold,
	vanilla: vanillaScaffold
};

export function getOverlayScaffoldFiles(
	framework: OverlayFrameworkId,
	name: string,
	overlayId: string
): OverlayProjectFile[] {
	const builder = SCAFFOLD_BUILDERS[framework];
	const slug = overlayProjectSlug(name);
	const shared: OverlayProjectFile[] = [
		{ path: '.gitignore', content: GITIGNORE },
		{ path: 'README.md', content: overlayReadme(name, overlayId, framework) }
	];

	if (framework !== 'vanilla') {
		shared.push({ path: '.env', content: ENV_FILE(overlayId) });
	}

	const frameworkFiles = builder(slug, overlayId);

	return [...shared, ...frameworkFiles];
}

export function getOverlayScaffoldRefreshPaths(): string[] {
	return ['.env', 'README.md'];
}

export function getOverlayScaffoldMetadataPaths(): string[] {
	return ['README.md'];
}

export function getOverlayScaffoldFile(
	framework: OverlayFrameworkId,
	name: string,
	overlayId: string,
	path: string
): OverlayProjectFile | undefined {
	return getOverlayScaffoldFiles(framework, name, overlayId).find((file) => file.path === path);
}
