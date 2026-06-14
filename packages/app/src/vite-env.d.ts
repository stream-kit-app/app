/// <reference types="vite/client" />

declare module '*?worker' {
	const WorkerFactory: new () => Worker;
	export default WorkerFactory;
}

declare module '*?raw' {
	const content: string;
	export default content;
}

declare module 'svelte-language-server-web/svelteWorker' {
	export function SvelteLanguageWorker(): new () => void;
}
