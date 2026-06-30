import { DEFAULT_OVERLAY_PORT } from '../types';

export function viteWsProxyConfig(): string {
	return `		proxy: {
			'/ws': {
				target: 'http://127.0.0.1:${DEFAULT_OVERLAY_PORT}',
				ws: true,
				changeOrigin: true
			}
		}`;
}

/** Relative asset paths so OBS can load overlays from /o/<id>/ */
export function viteBuildConfig(): string {
	return `	base: './',
	build: {
		outDir: 'dist',
		emptyOutDir: true
	},`;
}
