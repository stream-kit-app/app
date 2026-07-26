declare module '$lib/locales/en.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '$lib/locales/nl.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '$env/dynamic/public' {
	export const env: {
		readonly PUBLIC_POCKETBASE_URL?: string;
		readonly [key: string]: string | undefined;
	};
}

declare module '$env/static/public' {
	export const PUBLIC_POCKETBASE_URL: string | undefined;
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
