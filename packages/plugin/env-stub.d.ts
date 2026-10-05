declare module '#lib/locales/en.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '#lib/locales/nl.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '$app/env/public' {
	export const PUBLIC_POCKETBASE_URL: string | undefined;
	export const PUBLIC_SITE_URL: string | undefined;
}

declare module '$app/env' {
	export const browser: boolean;
	export const dev: boolean;
	export const building: boolean;
	export const version: string;
}

export {};

declare global {
	interface ImportMetaEnv {
		readonly DEV: boolean;
		readonly PROD: boolean;
		readonly MODE: string;
		readonly SSR: boolean;
		readonly VITE_STREAM_KIT_WORKSPACE_ROOT?: string;
		readonly [key: string]: string | boolean | undefined;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}
