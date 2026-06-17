export type ContextVariableEnricher = (data: unknown) => Record<string, string>;

const enrichers = new Set<ContextVariableEnricher>();

export function registerContextVariableEnricher(enricher: ContextVariableEnricher): () => void {
	enrichers.add(enricher);

	return () => {
		enrichers.delete(enricher);
	};
}

export function applyContextVariableEnrichers(
	data: unknown,
	base: Record<string, string>
): Record<string, string> {
	let variables = { ...base };

	for (const enrich of enrichers) {
		variables = { ...variables, ...enrich(data) };
	}

	return variables;
}
