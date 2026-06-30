import type { I18nContext } from '$lib/i18n';
import { getI18n, useI18n } from '$lib/i18n';

export type TranslateFn = I18nContext['t'];

export function resolveTranslate(prop?: TranslateFn): TranslateFn {
	if (prop) {
		return prop;
	}

	const global = getI18n();

	if (global) {
		return global.t;
	}

	try {
		return useI18n().t;
	} catch {
		return (key) => key;
	}
}
