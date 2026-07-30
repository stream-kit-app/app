<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';
	import type { MonacoExtraLib } from '../../monaco';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';
	import { onDestroy } from 'svelte';

	import {
		configureMonacoTypescript,
		ensureMonacoEnvironment,
		streamKitMonacoTheme,
		warmupMonacoTypescript,
		withMonacoProjectReference
	} from '../../monaco';
	import { VariablePopover } from '../variable-popover';
	import { Button } from '../button';
	import { cn } from '../../utils';
	import { inputFieldErrorMessage } from './input-field-classes';
	import Label from './label.svelte';

	type Props = {
		id?: string;
		label?: string;
		error?: string;
		required?: boolean;
		placeholder?: string;
		value?: string;
		oninput?: HTMLTextareaAttributes['oninput'];
		language?: 'typescript' | 'javascript' | 'json';
		minHeight?: string;
		fillHeight?: boolean;
		formatOnBlur?: boolean;
		showFormatButton?: boolean;
		formatLabel?: string;
		showExpandButton?: boolean;
		expandLabel?: string;
		collapseLabel?: string;
		class?: string;
		extraLibs?: MonacoExtraLib[];
		/** Virtual file URI under `file:///project/` for TypeScript IntelliSense. */
		modelUri?: string;
		loadingLabel?: string;
		variables?: HandlerFieldVariable[];
		variablesTitle?: string;
		variablesAriaLabel?: string;
		toolbar?: Snippet;
	};

	let {
		label,
		id = useId(),
		error,
		placeholder,
		value = '',
		oninput,
		language = 'typescript',
		minHeight = '12rem',
		fillHeight = false,
		formatOnBlur = true,
		showFormatButton = true,
		formatLabel = 'Format',
		showExpandButton = true,
		expandLabel = 'Expand',
		collapseLabel = 'Close',
		class: className,
		extraLibs = [],
		modelUri,
		loadingLabel = 'Loading...',
		variables = [],
		variablesTitle = 'Variables',
		variablesAriaLabel = 'Insert variable',
		toolbar
	}: Props = $props();

	let expanded = $state(false);
	const fillsHeight = $derived(fillHeight || expanded);

	type MonacoEditor = import('monaco-editor').editor.IStandaloneCodeEditor;
	type MonacoModule = typeof import('monaco-editor');

	let container: HTMLDivElement | undefined = $state();
	let editor: MonacoEditor | undefined = $state();
	let monaco: MonacoModule | undefined = $state();
	let isReady = $state(false);
	let cancelled = false;
	let initializing = false;
	let syncingFromOutside = false;
	let extraLibsSignature = $state('');
	let ownsModel = false;
	let overflowWidgetsHost: HTMLDivElement | undefined;

	function createOverflowWidgetsHost(): HTMLDivElement {
		const host = document.createElement('div');
		// Monaco scopes suggest/hover CSS under `.monaco-editor` — same pattern as Monaco's multiDiffEditor.
		host.className = 'monaco-editor stream-kit-monaco-overflow-host';
		document.body.appendChild(host);
		return host;
	}

	function disposeOverflowWidgetsHost(): void {
		overflowWidgetsHost?.remove();
		overflowWidgetsHost = undefined;
	}

	function extraLibsKey(libs: MonacoExtraLib[]): string {
		return libs.map((lib) => `${lib.filePath ?? ''}\0${lib.content}`).join('\0');
	}

	function modelSource(source: string): string {
		if (!modelUri) {
			return source;
		}

		return withMonacoProjectReference(source, modelUri);
	}

	function stripModelReference(source: string): string {
		return source.replace(/^\/\/\/ <reference path="[^"]+" \/>\r?\n/gm, '');
	}

	function emitValueChange(next: string): void {
		if (!oninput) {
			return;
		}

		oninput({
			currentTarget: { value: stripModelReference(next) }
		} as Event & { currentTarget: HTMLTextAreaElement });
	}

	function insertVariableAtCursor(variableKey: string): void {
		const token = `{${variableKey}}`;

		if (!editor || !monaco) {
			emitValueChange(`${value}${token}`);
			return;
		}

		const selection = editor.getSelection();

		if (!selection) {
			emitValueChange(`${value}${token}`);
			return;
		}

		editor.executeEdits('insert-variable', [
			{
				range: selection,
				text: token,
				forceMoveMarkers: true
			}
		]);
		editor.focus();
	}

	async function applyTypescriptLibs(libs: MonacoExtraLib[], force = false): Promise<void> {
		if (libs.length === 0) {
			return;
		}

		await configureMonacoTypescript(libs, { force });
		extraLibsSignature = extraLibsKey(libs);
	}

	function createEditorModel(
		monacoModule: MonacoModule,
		source: string
	): import('monaco-editor').editor.ITextModel | undefined {
		if (!modelUri) {
			return undefined;
		}

		const uri = monacoModule.Uri.parse(modelUri);
		const editorLanguage = language === 'json' ? 'json' : 'typescript';
		const modelValue = modelSource(source);
		const existing = monacoModule.editor.getModel(uri);

		if (existing) {
			if (existing.getValue() !== modelValue) {
				existing.setValue(modelValue);
			}

			ownsModel = false;
			return existing;
		}

		ownsModel = true;
		return monacoModule.editor.createModel(modelValue, editorLanguage, uri);
	}

	async function initEditor(libs: MonacoExtraLib[], source: string): Promise<void> {
		if (!container || initializing || isReady) {
			return;
		}

		initializing = true;

		try {
			ensureMonacoEnvironment();

			const monacoModule = await import('monaco-editor');

			if (cancelled || !container) {
				return;
			}

			monaco = monacoModule;
			monaco.editor.defineTheme('stream-kit-dark', streamKitMonacoTheme);

			const editorLanguage = language === 'json' ? 'json' : 'typescript';
			const model = createEditorModel(monacoModule, source);
			const useOverflowHost = libs.length > 0;

			if (useOverflowHost) {
				overflowWidgetsHost = createOverflowWidgetsHost();
			}

			editor = monaco.editor.create(container, {
				model,
				value: model ? undefined : source,
				language: model ? undefined : editorLanguage,
				theme: 'stream-kit-dark',
				automaticLayout: true,
				...(useOverflowHost && overflowWidgetsHost
					? {
							fixedOverflowWidgets: true,
							allowOverflow: true,
							overflowWidgetsDomNode: overflowWidgetsHost
						}
					: {}),
				minimap: { enabled: false },
				fontSize: 13,
				lineNumbers: 'on',
				scrollBeyondLastLine: false,
				tabSize: 2,
				insertSpaces: true,
				wordWrap: 'on',
				padding: { top: 12, bottom: 12 },
				overviewRulerLanes: 0,
				hover: { enabled: true },
				parameterHints: { enabled: true },
				suggestOnTriggerCharacters: true,
				quickSuggestions: {
					other: true,
					comments: false,
					strings: false
				},
				quickSuggestionsDelay: 10,
				suggest: {
					showWords: language === 'json',
					preview: true,
					showMethods: true,
					showFunctions: true,
					showConstructors: true,
					showFields: true,
					showVariables: true,
					showClasses: true,
					showStructs: true,
					showInterfaces: true,
					showModules: true,
					showProperties: true,
					showEvents: true,
					showOperators: true,
					showUnits: true,
					showValues: true,
					showConstants: true,
					showEnums: true,
					showEnumMembers: true,
					showKeywords: true,
					showSnippets: true
				},
				scrollbar: {
					verticalScrollbarSize: 8,
					horizontalScrollbarSize: 8
				}
			});

			if (libs.length > 0) {
				await applyTypescriptLibs(libs);
			}

			editor.onDidChangeModelContent(() => {
				if (syncingFromOutside || !editor) {
					return;
				}

				emitValueChange(editor.getValue());
			});

			if (formatOnBlur) {
				editor.onDidBlurEditorText(() => {
					void formatDocument();
				});
			}

			if (model) {
				await warmupMonacoTypescript(monacoModule, model);
			}

			isReady = true;
		} finally {
			initializing = false;
		}
	}

	function replaceEditorText(next: string): void {
		if (!editor) {
			return;
		}

		const model = editor.getModel();

		if (!model || model.getValue() === next) {
			return;
		}

		editor.pushUndoStop();
		editor.executeEdits('format', [
			{ range: model.getFullModelRange(), text: next, forceMoveMarkers: true }
		]);
		editor.pushUndoStop();
	}

	async function formatDocument(): Promise<void> {
		if (!editor) {
			return;
		}

		const source = editor.getValue();

		if (stripModelReference(source).trim() === '') {
			return;
		}

		if (language === 'json') {
			try {
				replaceEditorText(JSON.stringify(JSON.parse(source), null, 2));
			} catch {
				// Invalid JSON (e.g. unresolved template placeholders) is left as-is.
			}
			return;
		}

		try {
			await editor.getAction('editor.action.formatDocument')?.run();
		} catch {
			// Best-effort: leave content as-is when no formatter is available.
		}
	}

	$effect(() => {
		const el = container;
		const libs = extraLibs;
		const source = value ?? '';
		const uri = modelUri;

		if (!el || isReady || cancelled) {
			return;
		}

		if (uri && libs.length === 0) {
			return;
		}

		void initEditor(libs, source);
	});

	$effect(() => {
		if (!editor || !isReady) {
			return;
		}

		const next = modelSource(value ?? '');

		if (editor.getValue() === next) {
			return;
		}

		syncingFromOutside = true;

		editor.pushUndoStop();
		editor.executeEdits('external-sync', [
			{
				range: editor.getModel()?.getFullModelRange() ?? {
					startLineNumber: 1,
					startColumn: 1,
					endLineNumber: 1,
					endColumn: 1
				},
				text: next,
				forceMoveMarkers: true
			}
		]);
		editor.pushUndoStop();
		syncingFromOutside = false;
	});

	function relayoutEditor(): void {
		if (!editor || !container) {
			return;
		}

		// Monaco sizes its internal DOM to the last layout. After leaving fullscreen,
		// those pixels become the flex/grid min-content width unless the host can
		// shrink (`min-w-0`) and we remeasure against the constrained parent.
		container.style.removeProperty('width');
		if (fillsHeight) {
			container.style.removeProperty('height');
		}

		const width = container.clientWidth;
		const height = container.clientHeight;

		if (width > 0 && height > 0) {
			editor.layout({ width, height });
		} else {
			editor.layout();
		}
	}

	$effect(() => {
		void expanded;
		void fillsHeight;

		if (!editor) {
			return;
		}

		// Wait until expand/collapse classes have been painted and min-w-0 has
		// allowed the host to shrink before measuring.
		let innerFrame = 0;
		const frame = requestAnimationFrame(() => {
			innerFrame = requestAnimationFrame(() => relayoutEditor());
		});

		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(innerFrame);
		};
	});

	$effect(() => {
		if (!isReady || !editor || !monaco || extraLibs.length === 0) {
			return;
		}

		const signature = extraLibsKey(extraLibs);

		if (signature === extraLibsSignature) {
			return;
		}

		void applyTypescriptLibs(extraLibs).then(() => {
			const model = editor?.getModel();

			if (monaco && model) {
				void warmupMonacoTypescript(monaco, model);
			}
		});
	});

	onDestroy(() => {
		cancelled = true;
		const model = editor?.getModel();
		editor?.dispose();
		editor = undefined;
		monaco = undefined;
		disposeOverflowWidgetsHost();

		if (ownsModel && model && !model.isDisposed()) {
			model.dispose();
		}
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (expanded && event.key === 'Escape') {
			expanded = false;
		}
	}}
/>

<div
	class={cn(
		'relative w-full min-w-0',
		expanded
			? 'fixed inset-0 z-60 flex flex-col gap-3 bg-dark-900 p-4'
			: fillHeight
				? 'flex h-full min-h-0 flex-1 flex-col'
				: 'grid gap-2'
	)}
>
	{#if label || variables.length > 0 || showFormatButton || showExpandButton}
		<div class="flex items-center justify-between gap-2">
			{#if label}
				<Label for={id}>{label}</Label>
			{:else}
				<span></span>
			{/if}
			<div class="flex items-center gap-1">
				{#if showFormatButton}
					<Button
						type="button"
						variant="ghost"
						size="xs"
						icon="ri:magic-line"
						onclick={() => void formatDocument()}
						class="text-dark-400 hover:text-dark-100"
					>
						{formatLabel}
					</Button>
				{/if}
				{#if showExpandButton}
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						icon={expanded ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'}
						aria-label={expanded ? collapseLabel : expandLabel}
						onclick={() => (expanded = !expanded)}
						class="size-7 text-dark-400 hover:text-dark-100"
					/>
				{/if}
				{#if variables.length > 0}
					<VariablePopover
						{variables}
						title={variablesTitle}
						ariaLabel={variablesAriaLabel}
						onInsert={insertVariableAtCursor}
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if toolbar}
		<div class="flex justify-end">
			{@render toolbar()}
		</div>
	{/if}
	<div
		{id}
		bind:this={container}
		role="textbox"
		aria-multiline="true"
		aria-busy={!isReady}
		aria-invalid={error ? true : undefined}
		aria-placeholder={placeholder}
		class={cn(
			'relative z-52 w-full min-w-0 max-w-full overflow-visible rounded-lg border bg-dark-900 focus-within:ring-2',
			fillsHeight ? 'flex min-h-0 flex-1 flex-col' : '',
			error
				? 'border-destructive focus-within:ring-destructive'
				: 'border-border focus-within:ring-ring',
			className
		)}
		style:height={fillsHeight ? undefined : minHeight}
	>
		{#if !isReady}
			<div
				class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85"
				role="status"
				aria-live="polite"
				aria-label={loadingLabel}
			>
				<Icon icon="gg:spinner" class="size-5 animate-spin text-primary" aria-hidden="true" />
				<p class="text-xs text-dark-300">{loadingLabel}</p>
			</div>
		{/if}
	</div>
	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
