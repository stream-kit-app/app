import { getScrollTopForIndex } from './select-dropdown-limits';

export class DropdownScroll {
	scrollTop = $state(0);
	viewportRef = $state<HTMLDivElement | null>(null);

	handleViewportScroll = (event: Event & { currentTarget: HTMLDivElement }) => {
		this.scrollTop = event.currentTarget.scrollTop;
	};

	resetScroll() {
		this.scrollTop = 0;

		if (this.viewportRef) {
			this.viewportRef.scrollTop = 0;
		}
	}

	scrollToIndex(index: number) {
		if (index < 0) {
			return;
		}

		const top = getScrollTopForIndex(index);
		this.scrollTop = top;

		if (this.viewportRef) {
			this.viewportRef.scrollTop = top;
		}
	}

	scrollToValue(items: { value: string }[], value: string | undefined) {
		if (!value) {
			return;
		}

		const index = items.findIndex((item) => item.value === value);

		if (index >= 0) {
			this.scrollToIndex(index);
		}
	}
}
