import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';
import { build as viteBuild } from 'vite';

import { syncDevPluginsJson, syncPluginHostModules } from '../plugin-host-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.resolve(root, 'static/plugin-host');

const { uiSubpaths, generatedPath } = syncPluginHostModules(root);
const devPluginsPath = syncDevPluginsJson();

mkdirSync(outDir, { recursive: true });

console.log(`Synced plugin host modules (${uiSubpaths.length} UI subpaths) → ${generatedPath}`);
if (devPluginsPath) {
	console.log(`Synced dev plugin list → ${devPluginsPath}`);
}

await viteBuild({
	configFile: path.resolve(root, 'vite.plugin-host.config.js'),
	logLevel: 'info'
});

const shared = {
	bundle: true,
	format: 'esm',
	platform: 'browser',
	target: 'es2022'
};

await esbuild.build({
	...shared,
	entryPoints: [path.resolve(root, 'src/lib/core/plugins/host/core.ts')],
	outfile: path.resolve(outDir, 'core.js')
});

await esbuild.build({
	...shared,
	entryPoints: [path.resolve(root, 'src/lib/core/plugins/host/plugin.ts')],
	outfile: path.resolve(outDir, 'plugin.js')
});

await esbuild.build({
	...shared,
	entryPoints: [path.resolve(root, 'src/lib/core/plugins/host/action.ts')],
	outfile: path.resolve(outDir, 'action.js')
});

console.log(`Built plugin host assets in ${outDir}`);
