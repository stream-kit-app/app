/** Cast app filesystem options to the platform backend representation. */
export function asTauriFsOptions<T>(options: unknown): T | undefined {
	return options as T | undefined;
}
