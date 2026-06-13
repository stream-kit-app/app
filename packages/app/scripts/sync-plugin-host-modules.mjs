import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { syncDevPluginsJson, syncPluginHostModules } from '../plugin-host-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const { uiSubpaths, generatedPath } = syncPluginHostModules(root);
const devPluginsPath = syncDevPluginsJson();

console.log(`Synced plugin host modules (${uiSubpaths.length} UI subpaths) → ${generatedPath}`);
if (devPluginsPath) {
	console.log(`Synced dev plugin list → ${devPluginsPath}`);
}
