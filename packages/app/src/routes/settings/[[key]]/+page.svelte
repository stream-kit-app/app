<script lang="ts">
	import type { SupportedLocale } from '$lib/i18n';

	import { Container } from '@stream-kit/ui/container';
	import { SettingsFieldGroup } from '$lib/components/core/settings';
	import { app } from '$lib/core';
	import { saveLocale } from '$lib/core/locale/store';
	import type { SettingsFieldItem } from '$lib/core/settings/field';
	import {
		stopAllPluginDevWatchers,
		syncPluginDevWatchers
	} from '$lib/core/plugins/plugin-dev-watcher';
	import { useI18n } from '$lib/i18n';

	const { t, getLocale, setLocale } = useI18n();

	const localeItems = $derived([
		{ value: 'en', label: t('English') },
		{ value: 'nl', label: t('Dutch') }
	]);

	const appearanceFields = $derived<SettingsFieldItem[]>([
		{
			type: 'section',
			title: t('Appearance'),
			fields: [
				{
					key: 'locale',
					name: t('Language'),
					type: 'select',
					items: localeItems
				}
			]
		},
		{
			type: 'section',
			title: t('Developer'),
			fields: [
				{
					key: 'developerMode',
					name: t('Developer mode'),
					type: 'checkbox'
				},
				{
					type: 'alert',
					key: 'developerModeHelp',
					name: t('Enable developer tools and plugin hot-reload')
				}
			]
		}
	]);

	let fieldValues = $state<Record<string, string | boolean>>({
		locale: getLocale(),
		developerMode: false
	});
	let hasLoadedSettings = $state(false);
	let hasInteracted = false;

	const settingsContext = $derived({
		app,
		settings: app.settings,
		getValue: (key: string) => fieldValues[key]
	});

	$effect(() => {
		void app.settings.ensureLoaded().then(() => {
			// Don't overwrite a value the user already changed during the load.
			if (!hasInteracted) {
				fieldValues = {
					locale: getLocale(),
					developerMode: app.settings.developerMode
				};
			}

			hasLoadedSettings = true;
		});
	});

	$effect(() => {
		const locale = fieldValues.locale as SupportedLocale | undefined;

		if (!locale || locale === getLocale()) {
			return;
		}

		setLocale(locale);
		void saveLocale(locale);
	});

	$effect(() => {
		if (!hasLoadedSettings) {
			return;
		}

		const enabled = Boolean(fieldValues.developerMode);

		if (enabled === app.settings.developerMode) {
			return;
		}

		void (async () => {
			await app.settings.setDeveloperMode(enabled);

			if (!enabled) {
				await stopAllPluginDevWatchers(app);
				return;
			}

			await syncPluginDevWatchers(app);
		})();
	});

	function getField(key: string) {
		return {
			id: key,
			key,
			get value() {
				return fieldValues[key];
			},
			set value(next: string | boolean) {
				hasInteracted = true;
				fieldValues = { ...fieldValues, [key]: next };
			}
		};
	}
</script>

<Container class="px-6 py-6" size="md">
	<SettingsFieldGroup
		class="max-w-xl"
		context={settingsContext}
		items={appearanceFields}
		getField={(key) => getField(key)}
	/>
</Container>
