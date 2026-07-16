export type RankFormErrors = {
	name?: string;
	pointsRequired?: string;
};

export function validateRankForm(
	input: { name: string; pointsRequired: number | string },
	translate: (key: string, params?: Record<string, string | number | null | undefined>) => string
): RankFormErrors | null {
	const errors: RankFormErrors = {};

	if (!input.name.trim()) {
		errors.name = translate('Rank name is required');
	}

	const pointsRequired = Number(input.pointsRequired);

	if (!Number.isFinite(pointsRequired) || pointsRequired < 0) {
		errors.pointsRequired = translate('Points required must be a valid number');
	}

	return Object.keys(errors).length > 0 ? errors : null;
}
