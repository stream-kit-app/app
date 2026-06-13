declare module '@stream-kit/core' {
	export function interpolateVariables(
		template: string,
		variables: Record<string, unknown>
	): string;
}

declare module '$lib/locales/en.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}

declare module '$lib/locales/nl.json' {
	const dictionary: Record<string, string>;
	export default dictionary;
}
