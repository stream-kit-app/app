<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';
	import type { ActionHandler } from '#lib/core/action/action-handler.svelte.js';
	import type { Action } from '#lib/core/action/action.svelte.js';
	import type { HandlerFieldInstance } from '#lib/core/action/handler/field.js';
	import type { FormEventHandler } from 'svelte/elements';

	import { Debounced, watch } from 'runed';
	import { Button } from '@stream-kit/ui/button';
	import { InputCode } from '@stream-kit/ui/input';

	import { buildScriptExtraLibs, buildScriptHandlerUri } from '#lib/core/script/build-script-extra-libs.js';
	import {
		openScriptProjectInEditor,
		syncScriptProjectToDisk,
		watchScriptProject
	} from '#lib/core/script/script-project-service.js';

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
		fillHeight?: boolean;
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
		oninput,
		fillHeight = false
	}: Props = $props();

	let openingEditor = $state(false);

	const handlerId = $derived(handler.id);
	const actionTriggers = $derived(
		action?.triggers.map((trigger) => ({ id: trigger.definition.id })) ?? []
	);
	const triggerFingerprint = $derived(actionTriggers.map((trigger) => trigger.id).join('\0'));
	const extraLibs = $derived(buildScriptExtraLibs({ actionTriggers, handlerId }));
	const modelUri = $derived(buildScriptHandlerUri(handlerId));
	const sourceValue = $derived(String(field.value ?? ''));
	const debouncedSource = new Debounced(() => sourceValue, 400);

	async function openInEditor(): Promise<void> {
		openingEditor = true;

		try {
			const result = await openScriptProjectInEditor(app, {
				handlerId,
				source: sourceValue,
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

	// Start polling per handler; the service ignores the app's own writes, so only
	// external edits (e.g. from "Open in editor") flow back into the field.
	watch(
		() => handlerId,
		(currentHandlerId) => {
			const source = sourceValue;
			const triggers = actionTriggers;
			let unwatch: (() => void) | undefined;
			let cancelled = false;

			void syncScriptProjectToDisk(app, {
				handlerId: currentHandlerId,
				source,
				actionTriggers: triggers
			})
				.then(() =>
					watchScriptProject(currentHandlerId, (nextSource) => {
						if (!cancelled) {
							field.value = nextSource;
						}
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
		}
	);

	watch(
		() => [debouncedSource.current, triggerFingerprint] as const,
		([source]) => {
			void syncScriptProjectToDisk(app, {
				handlerId,
				source,
				actionTriggers
			}).catch(() => {
				// Best-effort sync; project files are created once directories are writable.
			});
		},
		{ lazy: true }
	);
</script>

<InputCode
	{label}
	{placeholder}
	{required}
	value={sourceValue}
	{oninput}
	{language}
	{extraLibs}
	{modelUri}
	{fillHeight}
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
