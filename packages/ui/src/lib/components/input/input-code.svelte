<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';
	import type { MonacoExtraLib } from '../../monaco';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';
	import { onDestroy, onMount } from 'svelte';

	import {
		configureMonacoTypescript,
		ensureMonacoEnvironment,
		streamKitMonacoTheme
	} from '../../monaco';
	import { VariablePopover } from '../variable-popover';
	import { Button } from '../button';
	import { cn } from '../../utils';
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
	let syncingFromOutside = false;
	let extraLibsSignature = $state('');

	function extraLibsKey(libs: MonacoExtraLib[]): string {
		return libs.map((lib) => `${lib.filePath ?? ''}\0${lib.content}`).join('\0');
	}

	function emitValueChange(next: string): void {
		if (!oninput) {
			return;
		}

		oninput({
			currentTarget: { value: next }
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

	async function initEditor(): Promise<void> {
		if (!container) {
			return;
		}

		ensureMonacoEnvironment();

		const monacoModule = await import('monaco-editor');

		if (cancelled || !container) {
			return;
		}

		monaco = monacoModule;
		monaco.editor.defineTheme('stream-kit-dark', streamKitMonacoTheme);
		await configureMonacoTypescript(extraLibs);
		extraLibsSignature = extraLibsKey(extraLibs);

		editor = monaco.editor.create(container, {
			value,
			language: language === 'json' ? 'json' : 'typescript',
			theme: 'stream-kit-dark',
			automaticLayout: true,
			fixedOverflowWidgets: true,
			minimap: { enabled: false },
			fontSize: 13,
			lineNumbers: 'on',
			scrollBeyondLastLine: false,
			tabSize: 2,
			insertSpaces: true,
			wordWrap: 'on',
			padding: { top: 12, bottom: 12 },
			overviewRulerLanes: 0,
			suggestOnTriggerCharacters: true,
			quickSuggestions: {
				other: true,
				comments: false,
				strings: false
			},
			quickSuggestionsDelay: 10,
			suggest: {
				showWords: language === 'json',
				preview: true
			},
			scrollbar: {
				verticalScrollbarSize: 8,
				horizontalScrollbarSize: 8
			}
		});

		if (placeholder) {
			editor.onDidFocusEditorText(() => {
				if (editor?.getValue() === '' && placeholder) {
					// Monaco has no built-in placeholder; keep empty state styling via aria.
				}
			});
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

		isReady = true;
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

		if (source.trim() === '') {
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

	onMount(() => {
		void initEditor();
	});

	$effect(() => {
		if (!editor || !isReady) {
			return;
		}

		const next = value ?? '';

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

	$effect(() => {
		// Re-layout Monaco right after the container resizes on expand/collapse,
		// so it never keeps the stale (fullscreen) dimensions.
		void expanded;

		if (!editor) {
			return;
		}

		const frame = requestAnimationFrame(() => editor?.layout());

		return () => cancelAnimationFrame(frame);
	});

	$effect(() => {
		if (!isReady) {
			return;
		}

		const signature = extraLibsKey(extraLibs);

		if (signature === extraLibsSignature) {
			return;
		}

		extraLibsSignature = signature;
		void configureMonacoTypescript(extraLibs);
	});

	onDestroy(() => {
		cancelled = true;
		editor?.dispose();
		editor = undefined;
		monaco = undefined;
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
		'relative flex w-full flex-col',
		expanded
			? 'fixed inset-0 z-60 gap-3 bg-dark-900 p-4'
			: fillHeight
				? 'h-full min-h-0 flex-1'
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
			'relative overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2',
			fillsHeight ? 'flex min-h-0 flex-1 flex-col' : '',
			error
				? 'border-red-500 focus-within:ring-red-500'
				: 'border-dark-600 focus-within:ring-primary',
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
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
