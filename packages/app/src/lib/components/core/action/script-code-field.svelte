<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
	import type { Action } from '$lib/core/action/action.svelte';
	import type { HandlerFieldInstance } from '$lib/core/action/handler/field';
	import type { FormEventHandler } from 'svelte/elements';

	import { Button } from '@stream-kit/ui/button';
	import { InputCode } from '@stream-kit/ui/input';

	import { buildScriptExtraLibs, buildScriptHandlerUri } from '$lib/core/script/build-script-extra-libs';
	import {
		openScriptProjectInEditor,
		syncScriptProjectToDisk,
		watchScriptProject
	} from '$lib/core/script/script-project-service';

	type Props = {
		action?: Action;

		handler: ActionHandler;

		field: HandlerFieldInstance;

		contextVariables?: HandlerFieldVariable[];

		app: PluginAppApi;

		t: TranslateFn;

		error?: string;

		label?: string;

		required?: boolean;

		placeholder?: string;

		language?: 'typescript' | 'javascript' | 'json';

		oninput: FormEventHandler<HTMLTextAreaElement>;
	};

	let {
		action,

		handler,

		field,

		contextVariables = [],

		app,

		t,

		error,

		label,

		required,

		placeholder,

		language = 'typescript',

		oninput
	}: Props = $props();

	let openingEditor = $state(false);

	let syncingFromDisk = $state(false);

	const handlerId = $derived(handler.id);

	const actionTriggers = $derived(
		action?.triggers.map((trigger) => ({ id: trigger.definition.id })) ?? []
	);

	const extraLibs = $derived(buildScriptExtraLibs({ actionTriggers, handlerId }));
	const modelUri = $derived(buildScriptHandlerUri(handlerId));

	async function openInEditor(): Promise<void> {
		openingEditor = true;

		try {
			const result = await openScriptProjectInEditor(app, {
				handlerId,

				source: String(field.value ?? ''),

				actionTriggers
			});

			if (result.opened === 'editor') {
				app.toast.create({
					title: t('Opened in editor'),

					variant: 'success'
				});

				return;
			}

			app.toast.create({
				title: t('Opened project folder'),

				description: t(
					'No code editor found. The folder was opened in your file manager and the path was copied. You can also edit the project at vscode.dev — open the folder there manually or drag it into the browser.'
				),

				variant: 'warning'
			});
		} catch (openError) {
			app.toast.create({
				title: t('Could not open in editor'),

				description: openError instanceof Error ? openError.message : String(openError),

				variant: 'error'
			});
		} finally {
			openingEditor = false;
		}
	}

	$effect(() => {
		const currentHandlerId = handlerId;

		const source = String(field.value ?? '');

		let unwatch: (() => void) | undefined;

		let cancelled = false;

		void syncScriptProjectToDisk(app, {
			handlerId: currentHandlerId,

			source,

			actionTriggers
		})
			.then(() =>
				watchScriptProject(currentHandlerId, (nextSource) => {
					if (cancelled || syncingFromDisk) {
						return;
					}

					syncingFromDisk = true;

					field.value = nextSource;

					syncingFromDisk = false;
				})
			)

			.then((stop) => {
				if (!cancelled) {
					unwatch = stop;
				} else {
					stop();
				}
			})

			.catch(() => {
				// Best-effort disk sync and polling when the project path is not writable yet.
			});

		return () => {
			cancelled = true;

			unwatch?.();
		};
	});

	$effect(() => {
		if (syncingFromDisk) {
			return;
		}

		const source = String(field.value ?? '');

		void syncScriptProjectToDisk(app, {
			handlerId,

			source,

			actionTriggers
		}).catch(() => {
			// Best-effort sync; project files are created once directories are writable.
		});
	});
</script>

<InputCode
	{label}
	{placeholder}
	{required}
	value={String(field.value ?? '')}
	{oninput}
	{language}
	{extraLibs}
	{modelUri}
	variables={contextVariables}
	variablesTitle={t('Variables')}
	variablesAriaLabel={t('Insert variable')}
	formatLabel={t('Format')}
	expandLabel={t('Expand')}
	collapseLabel={t('Close')}
	loadingLabel={t('Loading editor...')}
	{error}
>
	{#snippet toolbar()}
		<Button
			type="button"
			variant="outline"
			size="sm"
			disabled={openingEditor}
			isLoading={openingEditor}
			onclick={() => void openInEditor()}
			icon="ri:external-link-line"
		>
			<span class="truncate">{t('Open in editor')}</span>
		</Button>
	{/snippet}
</InputCode>
