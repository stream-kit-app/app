export type InputSize = 'sm' | 'md' | 'lg';

export const inputSizeClasses: Record<InputSize, string> = {
	sm: 'px-3 py-2 text-xs',
	md: 'px-4 py-2 text-sm',
	lg: 'px-5 py-3 text-base'
};
