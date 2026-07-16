export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

/** Outer control height — matches `@stream-kit/ui` button sizes exactly. */
export const inputShellSizeClasses: Record<InputSize, string> = {
	xs: 'h-7',
	sm: 'h-8',
	md: 'h-10',
	lg: 'h-12'
};

/** Horizontal padding + type — used inside a sized shell (`InputText`). */
export const inputPaddingClasses: Record<InputSize, string> = {
	xs: 'px-3 text-xs leading-none',
	sm: 'px-3.5 text-xs leading-none',
	md: 'px-4 text-sm leading-none',
	lg: 'px-5 text-base leading-none'
};

/**
 * Standalone field sizing (selects, etc.). `box-border` keeps outer height
 * aligned with buttons when a 1px border is present.
 */
export const inputSizeClasses: Record<InputSize, string> = {
	xs: `box-border ${inputShellSizeClasses.xs} ${inputPaddingClasses.xs}`,
	sm: `box-border ${inputShellSizeClasses.sm} ${inputPaddingClasses.sm}`,
	md: `box-border ${inputShellSizeClasses.md} ${inputPaddingClasses.md}`,
	lg: `box-border ${inputShellSizeClasses.lg} ${inputPaddingClasses.lg}`
};

export const inputIconSizeClasses: Record<InputSize, string> = {
	xs: 'size-3',
	sm: 'size-3.5',
	md: 'size-4',
	lg: 'size-5'
};

export const inputAdornmentSizeClasses: Record<InputSize, string> = {
	xs: 'min-w-7',
	sm: 'min-w-8',
	md: 'min-w-10',
	lg: 'min-w-12'
};
