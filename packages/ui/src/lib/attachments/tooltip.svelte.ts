import type { Attachment } from 'svelte/attachments';

import { untrack } from 'svelte';

import { tether } from '../tooltip';

export type TooltipAttachmentOptions = {
	disabled?: boolean | (() => boolean);
	delayDuration?: number;
};

function resolve<T>(value: T | (() => T)): T {
	return typeof value === 'function' ? (value as () => T)() : value;
}

let idCounter = 0;

const staticAttachmentCache = new Map<string, Attachment<HTMLElement>>();

function isNaturallyFocusable(element: HTMLElement): boolean {
	const tag = element.tagName;

	if (
		tag === 'A' ||
		tag === 'BUTTON' ||
		tag === 'INPUT' ||
		tag === 'SELECT' ||
		tag === 'TEXTAREA'
	) {
		return true;
	}

	return element.hasAttribute('href') || element.hasAttribute('contenteditable');
}

function syncRegistry(fn: () => void) {
	untrack(fn);
}

function createAttachment(
	getContent: () => string,
	options?: TooltipAttachmentOptions
): Attachment<HTMLElement> {
	return (element) => {
		const id = `tooltip-${++idCounter}`;
		const delayDuration = options?.delayDuration ?? 200;
		const getDisabled = () => resolve(options?.disabled ?? false);

		let showTimeout: ReturnType<typeof setTimeout> | null = null;
		let registered = false;

		const register = () => {
			tether.state.registry.register({
				id,
				node: element,
				payload: getContent(),
				disabled: getDisabled()
			});
			registered = true;
		};

		const update = () => {
			if (!registered) return;

			tether.state.registry.update({
				id,
				node: element,
				payload: getContent(),
				disabled: getDisabled()
			});
		};

		const ensureRegistered = () => {
			if (registered) {
				syncRegistry(update);
				return;
			}

			syncRegistry(register);
		};

		const clearShowTimeout = () => {
			if (showTimeout === null) return;
			clearTimeout(showTimeout);
			showTimeout = null;
		};

		const show = (immediate = false) => {
			if (getDisabled()) return;

			ensureRegistered();
			clearShowTimeout();

			if (immediate) {
				syncRegistry(() => tether.open(id));
				return;
			}

			showTimeout = setTimeout(() => {
				syncRegistry(() => tether.open(id));
				showTimeout = null;
			}, delayDuration);
		};

		const hide = () => {
			clearShowTimeout();

			syncRegistry(() => {
				if (untrack(() => tether.state.registry.activeTriggerId) === id) {
					tether.close();
				}
			});
		};

		const onPointerEnter = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return;
			show();
		};

		const onPointerLeave = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return;
			hide();
		};

		const onFocus = () => {
			show(true);
		};

		const onBlur = () => {
			hide();
		};

		if (
			!element.hasAttribute('tabindex') &&
			!isNaturallyFocusable(element) &&
			!element.hasAttribute('disabled')
		) {
			element.setAttribute('tabindex', '0');
		}

		element.addEventListener('pointerenter', onPointerEnter);
		element.addEventListener('pointerleave', onPointerLeave);
		element.addEventListener('focus', onFocus);
		element.addEventListener('blur', onBlur);

		return () => {
			clearShowTimeout();
			element.removeEventListener('pointerenter', onPointerEnter);
			element.removeEventListener('pointerleave', onPointerLeave);
			element.removeEventListener('focus', onFocus);
			element.removeEventListener('blur', onBlur);

			syncRegistry(() => {
				if (registered) {
					tether.state.registry.unregister(id);
				}
			});
		};
	};
}

function staticCacheKey(content: string, options?: TooltipAttachmentOptions): string {
	const disabled = typeof options?.disabled === 'boolean' ? String(options.disabled) : 'dynamic';
	return `${content}\0${options?.delayDuration ?? 700}\0${disabled}`;
}

function canCache(options?: TooltipAttachmentOptions): boolean {
	return options?.disabled === undefined || typeof options?.disabled === 'boolean';
}

/**
 * Attachment factory for showing a tooltip on hover or keyboard focus.
 *
 * @example
 * <button {@attach tooltip('Save changes')}>Save</button>
 * <Button {@attach tooltip(() => `Triggers: ${summary}`)}>...</Button>
 */
export function tooltip(
	content: string | (() => string),
	options?: TooltipAttachmentOptions
): Attachment<HTMLElement> {
	if (typeof content === 'string' && canCache(options)) {
		const key = staticCacheKey(content, options);
		const cached = staticAttachmentCache.get(key);

		if (cached) return cached;

		const attachment = createAttachment(() => content, options);
		staticAttachmentCache.set(key, attachment);
		return attachment;
	}

	const getContent = typeof content === 'function' ? content : () => content;
	return createAttachment(getContent, options);
}
