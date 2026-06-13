import type { I18nInstance } from '@svelte-i18n/core';
import { createContext } from 'svelte';

type LocaleDictionary = Record<string, string>;

export type I18nContext = I18nInstance<
	'en' | 'nl',
	{ en: () => Promise<LocaleDictionary>; nl: () => Promise<LocaleDictionary> }
>;

const [getContext, setContext] = createContext<I18nContext>();

let globalI18n: I18nContext | null = null;

export const SUPPORTED_LOCALES = ['en', 'nl'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const useI18n = getContext;

export const registerI18n = (i18n: () => I18nContext) => {
	const instance = i18n();
	globalI18n = instance;
	setContext(instance);
};

export type TranslationKey = Parameters<I18nContext['t']>[0];

export function getI18n(): I18nContext | null {
	return globalI18n;
}

export function translate(
	key: TranslationKey,
	params?: Record<string, string | number | null | undefined>
): string {
	if (!globalI18n) {
		return key;
	}

	return globalI18n.t(
		key,
		params as Record<string, string | number> | undefined
	);
}

const LOCALE_LABELS: Record<SupportedLocale, TranslationKey> = {
	en: 'English',
	nl: 'Dutch'
};

export function getLocaleLabel(locale: SupportedLocale): string {
	return translate(LOCALE_LABELS[locale]);
}
