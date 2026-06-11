export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

export const inputSizeClasses: Record<InputSize, string> = {
	xs: 'px-2 py-1 text-xs',
	sm: 'px-3 py-2 text-xs',
	md: 'px-4 py-2 text-sm',
	lg: 'px-5 py-3 text-base'
};

export const inputIconSizeClasses: Record<InputSize, string> = {
	xs: 'size-3',
	sm: 'size-4',
	md: 'size-5',
	lg: 'size-6'
};

export const inputAdornmentSizeClasses: Record<InputSize, string> = {
	xs: 'min-w-8',
	sm: 'min-w-9',
	md: 'min-w-10',
	lg: 'min-w-10'
};
