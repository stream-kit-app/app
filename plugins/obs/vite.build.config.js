import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createPluginViteBuildConfig } from '../create-vite-build-config.js';

const root = path.dirname(fileURLToPath(import.meta.url));

export default createPluginViteBuildConfig({ root });
