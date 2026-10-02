import { useIntersectionObserver } from 'runed';

/**
 * Tracks whether a `sticky top-0` header is stuck. Place `sentinel` as an absolutely positioned
 * element at the top of the header's (relative) section: once it scrolls out of view, the header
 * is stuck.
 */
export class StickyHeaderState {
	sentinel = $state<HTMLElement | null>(null);
	isStuck = $state(false);

	constructor() {
		useIntersectionObserver(
			() => this.sentinel,
			([entry]) => {
				this.isStuck = entry ? !entry.isIntersecting : false;
			}
		);
	}
}
