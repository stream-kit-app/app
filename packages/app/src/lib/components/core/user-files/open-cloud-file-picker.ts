import CloudFilePickerFooter from './cloud-file-picker-footer.svelte';
import CloudFilePickerModal from './cloud-file-picker-modal.svelte';

import { getApp } from '$lib/core/registry';
import type { UserFileRecord } from '$lib/core/user-files';
import { translate } from '$lib/i18n';

export type OpenCloudFilePickerOptions = {
	filters?: { name: string; extensions: string[] }[];
	mimePrefix?: string;
};

const CLOUD_FILE_PICKER_MODAL_ID = 'cloud-file-picker';

/**
 * Open a modal to pick one of the signed-in user's cloud files.
 * Resolves with the selected record, or `null` if cancelled.
 */
export function openCloudFilePicker(
	options: OpenCloudFilePickerOptions = {}
): Promise<UserFileRecord | null> {
	return new Promise((resolve) => {
		const app = getApp();
		let settled = false;

		const finish = (value: UserFileRecord | null) => {
			if (settled) {
				return;
			}
			settled = true;
			app.modals.get(CLOUD_FILE_PICKER_MODAL_ID)?.close();
			resolve(value);
		};

		app.modals.get(CLOUD_FILE_PICKER_MODAL_ID)?.close();

		const modal = app.createModal({
			id: CLOUD_FILE_PICKER_MODAL_ID,
			title: translate('Cloud files'),
			description: translate('Choose a file from your Stream Kit account.'),
			size: 'md',
			scrollBody: false,
			content: CloudFilePickerModal,
			footer: CloudFilePickerFooter,
			props: {
				filters: options.filters,
				mimePrefix: options.mimePrefix,
				onSelect: (file: UserFileRecord) => finish(file),
				onCancel: () => finish(null)
			},
			onClose: () => finish(null)
		});

		modal.open();
	});
}
