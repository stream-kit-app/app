import type { SettingsContext } from './context';
import type { SettingsTableRow, SettingsTableRowsSource } from './field';

export function toSettingsTableRowsSource(
	rows: SettingsTableRowsSource,
	context: SettingsContext
): SettingsTableRow[] | (() => SettingsTableRow[] | Promise<SettingsTableRow[]>) {
	if (Array.isArray(rows)) {
		return rows;
	}

	return () => rows(context);
}

export function resolveTableRows(
	getSource: () => SettingsTableRow[] | (() => SettingsTableRow[] | Promise<SettingsTableRow[]>),
	getReloadKey?: () => unknown
) {
	let asyncRows = $state<SettingsTableRow[]>([]);
	let loading = $state(false);
	let asyncVersion = $state(0);

	const rows = $derived.by(() => {
		const source = getSource();

		if (typeof source === 'function') {
			void asyncVersion;
			return asyncRows;
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
					asyncRows = result;
					loading = false;
					asyncVersion++;
				}
			},
			() => {
				if (!cancelled) {
					asyncRows = [];
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
		get rows() {
			return rows;
		},
		get loading() {
			return isLoading;
		}
	};
}
