import type { HandlerFieldVariable } from '../../types';
import type { VariableToken } from './variable-token';
import type { Attachment } from 'svelte/attachments';

import { tick } from 'svelte';

import { applyVariableCompletion, findVariableToken, rankVariables } from './variable-token';

type TextElement = HTMLInputElement | HTMLTextAreaElement;

export type VariableAutocompleteOptions = {
	/** Variables offered in the popup. An empty list disables the autocomplete. */
	variables: () => HandlerFieldVariable[];
	/** Write the completed text back to the bound value. */
	onChange: (value: string) => void;
};

/** DOM id of a popup option, for the input's `aria-activedescendant`. */
export function variableOptionId(listId: string, index: number): string {
	return `${listId}-option-${index}`;
}

const GROUP_ORDER = ['Trigger', 'Action', 'Global'];

function groupRank(group: string | undefined): number {
	const index = group ? GROUP_ORDER.indexOf(group) : -1;

	return index === -1 ? GROUP_ORDER.length : index;
}

/**
 * `{variable}` autocomplete for one text input or textarea. Attach with
 * `{@attach autocomplete.attach}` and render `<VariableAutocompletePopup {autocomplete} />`.
 */
export class VariableAutocomplete {
	element: TextElement | null = $state(null);
	highlightedIndex = $state(0);

	#token: VariableToken | null = $state(null);
	/** Start of the placeholder the user dismissed with Escape; stays closed until they leave it. */
	#dismissedStart: number | null = null;
	#options: VariableAutocompleteOptions;

	readonly matches: HandlerFieldVariable[] = $derived.by(() => {
		const token = this.#token;

		if (!token) {
			return [];
		}

		const ranked = rankVariables(this.#options.variables(), token.query);

		if (token.query) {
			return ranked;
		}

		return [...ranked].sort(
			(left, right) =>
				groupRank(left.group) - groupRank(right.group) || left.key.localeCompare(right.key)
		);
	});

	readonly isOpen: boolean = $derived(this.#token !== null && this.matches.length > 0);

	constructor(options: VariableAutocompleteOptions) {
		this.#options = options;
	}

	get query(): string {
		return this.#token?.query ?? '';
	}

	/** Re-reads value and caret from the element and opens or closes the popup. */
	refresh = (): void => {
		const element = this.element;

		if (!element || document.activeElement !== element) {
			this.close();
			return;
		}

		const caret = element.selectionStart ?? element.value.length;
		const caretEnd = element.selectionEnd ?? caret;
		const found = caret === caretEnd ? findVariableToken(element.value, caret) : null;

		if (found?.start !== this.#dismissedStart) {
			this.#dismissedStart = null;
		}

		const token = this.#dismissedStart === null ? found : null;

		if (token?.start !== this.#token?.start || token?.query !== this.#token?.query) {
			this.highlightedIndex = 0;
		}

		this.#token = token;
	};

	close = (): void => {
		this.#token = null;
		this.highlightedIndex = 0;
	};

	select = (key: string): void => {
		const element = this.element;
		const token = this.#token;

		if (!element || !token) {
			return;
		}

		const result = applyVariableCompletion(element.value, token, key);
		this.close();
		this.#options.onChange(result.text);

		void tick().then(() => {
			element.focus();
			element.setSelectionRange(result.caret, result.caret);
		});
	};

	#handleKeydown = (event: Event): void => {
		if (!(event instanceof KeyboardEvent) || !this.isOpen) {
			return;
		}

		const count = this.matches.length;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				this.highlightedIndex = (this.highlightedIndex + 1) % count;
				return;
			case 'ArrowUp':
				event.preventDefault();
				this.highlightedIndex = (this.highlightedIndex - 1 + count) % count;
				return;
			case 'Enter':
			case 'Tab': {
				const variable = this.matches[this.highlightedIndex];

				if (variable) {
					event.preventDefault();
					this.select(variable.key);
				}
				return;
			}
			case 'Escape':
				// Close only the popup, not a surrounding dialog or sheet.
				event.preventDefault();
				event.stopPropagation();
				this.#dismissedStart = this.#token?.start ?? null;
				this.close();
				return;
		}
	};

	#handleKeyup = (event: Event): void => {
		// Caret moves (arrows, Home/End) do not fire `input`.
		if (!(event instanceof KeyboardEvent)) {
			return;
		}

		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
			this.refresh();
		}
	};

	attach: Attachment<TextElement> = (element) => {
		this.element = element;

		const onSelectionChange = () => {
			if (document.activeElement === element) {
				this.refresh();
			}
		};

		element.addEventListener('input', this.refresh);
		element.addEventListener('focus', this.refresh);
		element.addEventListener('pointerup', this.refresh);
		element.addEventListener('keydown', this.#handleKeydown);
		element.addEventListener('keyup', this.#handleKeyup);
		element.addEventListener('blur', this.close);
		document.addEventListener('selectionchange', onSelectionChange);

		return () => {
			element.removeEventListener('input', this.refresh);
			element.removeEventListener('focus', this.refresh);
			element.removeEventListener('pointerup', this.refresh);
			element.removeEventListener('keydown', this.#handleKeydown);
			element.removeEventListener('keyup', this.#handleKeyup);
			element.removeEventListener('blur', this.close);
			document.removeEventListener('selectionchange', onSelectionChange);

			if (this.element === element) {
				this.element = null;
				this.close();
			}
		};
	};
}
