export type ColorScheme = 'light' | 'dark';

/** Active scheme from `data-theme` on <html> (set by the host app); defaults to dark. */
export function getColorScheme(): ColorScheme {
	if (typeof document === 'undefined') {
		return 'dark';
	}

	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/** Calls `callback` whenever the host switches `data-theme`. Returns an unsubscribe. */
export function onColorSchemeChange(callback: (scheme: ColorScheme) => void): () => void {
	if (typeof document === 'undefined') {
		return () => {};
	}

	let current = getColorScheme();
	const observer = new MutationObserver(() => {
		const next = getColorScheme();

		if (next !== current) {
			current = next;
			callback(next);
		}
	});

	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

	return () => observer.disconnect();
}
