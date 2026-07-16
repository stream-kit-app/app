/**
 * Shared field chrome — semantic tokens (border, ring, destructive)
 * aligned with button focus/border conventions.
 *
 * Multi-segment fields (prepend/append) use `inputFieldGroup` on the
 * shell so hover/disabled borders stay in sync across all pieces.
 */

export const inputFieldSurface = 'bg-dark-700 text-dark-50';

/** Put on the field shell when it has multiple bordered segments. */
export const inputFieldGroup = 'group';

/** Default field border; own hover + parent `group` hover for multi-segment chrome. */
export const inputFieldBorderDefault =
	'border-border hover:border-dark-400 group-hover:border-dark-400 disabled:hover:border-border group-has-[:disabled]:border-border';

export const inputFieldBorderError = 'border-destructive';

export function inputFieldBorder(error: boolean | string | undefined | null): string {
	return error ? inputFieldBorderError : inputFieldBorderDefault;
}

/** Adornment border — same hover/error as the field so chrome stays unified. */
export function inputFieldAdornmentBorder(error: boolean | string | undefined | null): string {
	return inputFieldBorder(error);
}

/** Parent wrapper focus ring (covers adornments). */
export function inputFieldFocusRing(error: boolean | string | undefined | null): string {
	return error
		? 'has-focus:ring-2 has-focus:ring-destructive'
		: 'has-focus:ring-2 has-focus:ring-ring';
}

/** Focus-within on the field shell (e.g. wrapped inputs). */
export function inputFieldFocusWithinRing(error: boolean | string | undefined | null): string {
	return error
		? 'focus-within:ring-2 focus-within:ring-destructive'
		: 'focus-within:ring-2 focus-within:ring-ring';
}

export const inputFieldErrorMessage = 'text-sm text-destructive-100';

export const inputFieldRequiredMark = 'text-destructive-100';

export const inputFieldDisabled = 'disabled:cursor-not-allowed disabled:opacity-50';

/** Checkbox / switch focus — matches button ring + offset. */
export const inputToggleFocusRing =
	'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';
