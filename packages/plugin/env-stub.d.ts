declare module '$lib/locales/en.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '$lib/locales/nl.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

interface ImportMetaEnv {
	readonly DEV: boolean;
	readonly VITE_STREAM_KIT_WORKSPACE_ROOT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
