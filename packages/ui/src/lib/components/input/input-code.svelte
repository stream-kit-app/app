<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { editor as MonacoEditor } from 'monaco-editor';

	import { useId } from 'bits-ui';
	import { onDestroy, onMount } from 'svelte';

	import { ensureMonaco, type MonacoConfigurator } from '../../monaco/setup';
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
		language?: 'typescript';
		minHeight?: string;
		class?: string;
		configureMonaco?: MonacoConfigurator;
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
		class: className,
		configureMonaco
	}: Props = $props();

	let container: HTMLDivElement | undefined = $state();
	let editor: MonacoEditor.IStandaloneCodeEditor | undefined = $state();
	let isReady = $state(false);
	let cancelled = false;

	function emitValueChange(next: string): void {
		if (!oninput) {
			return;
		}

		oninput({
			currentTarget: { value: next }
		} as Event & { currentTarget: HTMLTextAreaElement });
	}

	onMount(async () => {
		if (!container) {
			return;
		}

		const monaco = await ensureMonaco(configureMonaco);

		// The component may have been destroyed while Monaco was loading; don't
		// create an editor on a detached node.
		if (cancelled || !container) {
			return;
		}

		const editorLanguage = language === 'typescript' ? 'typescript' : 'javascript';
		const modelUri = monaco.Uri.parse(`inmemory://model/${id}.${editorLanguage === 'typescript' ? 'ts' : 'js'}`);
		const model =
			monaco.editor.getModel(modelUri) ??
			monaco.editor.createModel(value, editorLanguage, modelUri);

		editor = monaco.editor.create(container, {
			model,
			theme: 'vs-dark',
			automaticLayout: true,
			fixedOverflowWidgets: true,
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			fontSize: 13,
			fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
			lineNumbers: 'on',
			tabSize: 2,
			insertSpaces: true,
			wordWrap: 'on',
			padding: { top: 12, bottom: 12 },
			scrollbar: {
				verticalScrollbarSize: 8,
				horizontalScrollbarSize: 8
			},
			placeholder
		});

		editor.onDidChangeModelContent(() => {
			emitValueChange(editor?.getValue() ?? '');
		});

		isReady = true;
	});

	$effect(() => {
		if (!editor || !isReady) {
			return;
		}

		const current = editor.getValue();

		if (current !== value) {
			const position = editor.getPosition();
			const selection = editor.getSelection();
			editor.setValue(value);

			if (position) {
				editor.setPosition(position);
			}

			if (selection) {
				editor.setSelection(selection);
			}
		}
	});

	onDestroy(() => {
		cancelled = true;
		const model = editor?.getModel();
		editor?.dispose();
		model?.dispose();
		editor = undefined;
	});
</script>

<div class={cn('relative grid w-full gap-2')}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		{id}
		bind:this={container}
		role="textbox"
		aria-multiline="true"
		aria-invalid={error ? true : undefined}
		class={cn(
			'overflow-hidden rounded-xl border focus-within:ring-2',
			error ? 'border-red-500 focus-within:ring-red-500' : 'border-dark-500 focus-within:ring-primary',
			className
		)}
		style:min-height={minHeight}
	></div>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
