import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	external: ['$env/static/public'],
	clean: true,
	dts: {
		compilerOptions: {
			ignoreDeprecations: '6.0',
			skipLibCheck: true
		}
	}
});
