import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function slugify(value: string | undefined, fallback = 'item'): string {
	const slug = (value ?? fallback)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return slug || fallback;
}

export function uniqueSlug(value: string | undefined, used: Set<string>, fallback = 'item'): string {
	const base = slugify(value, fallback);
	let slug = base;
	let suffix = 2;

	while (used.has(slug)) {
		slug = `${base}-${suffix}`;
		suffix += 1;
	}

	used.add(slug);
	return slug;
}

export function scopedSlug(scope: string, parts: string[], fallback = 'item'): string {
	return `${scope}:${parts.map((part) => slugify(part, fallback)).join('.')}`;
}
