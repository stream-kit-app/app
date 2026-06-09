import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	clean: true,
	external: ['@stream-kit/app/api', '@stream-kit/core', '@stream-kit/plugin-tts/settings'],
	dts: {
		compilerOptions: {
			ignoreDeprecations: '6.0',
			skipLibCheck: true
		}
	}
});
