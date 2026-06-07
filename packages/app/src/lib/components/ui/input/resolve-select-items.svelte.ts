import type { SelectItem, SelectItemsSource } from '$lib/core/action/trigger';

export function resolveSelectItems(
	getSource: () => SelectItemsSource,
	getReloadKey?: () => unknown
) {
	let asyncItems = $state<SelectItem[]>([]);
	let loading = $state(false);
	let asyncVersion = $state(0);

	const items = $derived.by(() => {
		const source = getSource();

		if (typeof source === 'function') {
			void asyncVersion;
			return asyncItems;
		}

		return source;
	});

	const isLoading = $derived.by(() => {
		const source = getSource();

		if (typeof source === 'function') {
			void asyncVersion;
			return loading;
		}

		return false;
	});

	$effect(() => {
		if (getReloadKey) {
			void getReloadKey();
		}

		const source = getSource();

		if (typeof source !== 'function') {
			return;
		}

		loading = true;
		let cancelled = false;

		Promise.resolve(source()).then(
			(result) => {
				if (!cancelled) {
					asyncItems = result;
					loading = false;
					asyncVersion++;
				}
			},
			() => {
				if (!cancelled) {
					asyncItems = [];
					loading = false;
					asyncVersion++;
				}
			}
		);

		return () => {
			cancelled = true;
		};
	});

	return {
		get items() {
			return items;
		},
		get loading() {
			return isLoading;
		}
	};
}
