export type TierFormErrors = {
	name?: string;
};

export function validateTierForm(
	input: { name: string },
	translate: (key: string, params?: Record<string, string | number | null | undefined>) => string
): TierFormErrors | null {
	if (!input.name.trim()) {
		return { name: translate('Tier name is required') };
	}

	return null;
}
