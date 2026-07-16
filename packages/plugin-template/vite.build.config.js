import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import { createPluginViteBuildConfig } from '../../plugins/create-vite-build-config.js';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => createPluginViteBuildConfig({ root, svelte }));
