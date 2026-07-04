<script lang="ts">
	import type { OverlaySettingsDefinition } from '$lib/core/overlay/overlay-settings.svelte';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { app } from '$lib/core';
	import { getSettingsFieldInstance } from '$lib/core/settings/settings-field';
	import { useI18n } from '$lib/i18n';

	type Props = {
		settings: OverlaySettingsDefinition;
		debounceMs?: number;
	};

	let { settings, debounceMs = 500 }: Props = $props();

	const { t } = useI18n();

	let saveStatus = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let lastSavedSnapshot = $state<string | null>(null);
	let saveTimer: ReturnType<typeof setTimeout> | undefined;
	let pendingSaveSnapshot: string | null = null;
	let saveSeq = 0;
	let inFlightSave: Promise<void> | null = null;

	const context = $derived.by(() => {
		for (const field of settings.fields) {
			void field.value;
		}

		return settings.createContext(app);
	});

	const getField = $derived.by(() => {
		for (const field of settings.fields) {
			void field.value;
		}

		return (key: string) => getSettingsFieldInstance(settings.fields, key);
	});

	const configSnapshot = $derived(JSON.stringify(settings.mergedConfigValues()));

	$effect(() => {
		const snapshot = configSnapshot;

		if (lastSavedSnapshot === null) {
			lastSavedSnapshot = snapshot;
			return;
		}

		if (snapshot === lastSavedSnapshot) {
			pendingSaveSnapshot = null;
			return;
		}

		clearTimeout(saveTimer);
		saveStatus = 'idle';
		pendingSaveSnapshot = snapshot;

		saveTimer = setTimeout(() => {
			pendingSaveSnapshot = null;
			void persistSettings();
		}, debounceMs);

		return () => {
			clearTimeout(saveTimer);

			if (pendingSaveSnapshot !== null && pendingSaveSnapshot !== lastSavedSnapshot) {
				void persistSettings();
				pendingSaveSnapshot = null;
			}
		};
	});

	export async function flushPendingSave(): Promise<void> {
		clearTimeout(saveTimer);
		saveTimer = undefined;
		pendingSaveSnapshot = null;

		if (inFlightSave) {
			await inFlightSave;
		}

		if (configSnapshot !== lastSavedSnapshot) {
			await persistSettings();
		}
	}

	async function persistSettings(): Promise<void> {
		const seq = ++saveSeq;
		const errors = settings.validate(context);

		if (errors) {
			if (seq === saveSeq) {
				saveStatus = 'error';
			}

			return;
		}

		if (seq === saveSeq) {
			saveStatus = 'saving';
		}

		const savePromise = (async () => {
			await app.overlay.saveConfig(settings);

			if (seq !== saveSeq) {
				return;
			}

			lastSavedSnapshot = JSON.stringify(settings.mergedConfigValues());
			saveStatus = 'saved';
		})();

		inFlightSave = savePromise;

		try {
			await savePromise;
		} catch (error) {
			if (seq !== saveSeq) {
				return;
			}

			saveStatus = 'error';
			app.toast.create({
				title: t('Could not save overlay settings'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'error'
			});
		} finally {
			if (inFlightSave === savePromise) {
				inFlightSave = null;
			}
		}
	}
</script>

<div class="flex w-full flex-col gap-4">
	<SettingsFieldGroup
		{context}
		items={settings.fieldItems}
		{getField}
		getFieldError={(fieldId) => settings.getFieldError(fieldId, settings.formErrors)}
	/>

	<p class="min-h-5 text-xs text-dark-400" aria-live="polite">
		{#if saveStatus === 'saving'}
			{t('Saving…')}
		{:else if saveStatus === 'saved'}
			{t('Saved')}
		{:else if saveStatus === 'error'}
			{t('Please fix the highlighted fields and try again.')}
		{/if}
	</p>
</div>
