<script lang="ts">
	import type { LanguageServerConfig, LanguageServerConnection } from '../../codemirror';
	import type { Extension } from '@codemirror/state';
	import type { EditorView } from '@codemirror/view';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import { useId } from 'bits-ui';
	import { onDestroy, onMount } from 'svelte';

	import {
		createEditorView,
		createLanguageServerConnection,
		syncEditorDocument
	} from '../../codemirror';
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
		language?: 'typescript' | 'javascript' | 'svelte' | 'json';
		minHeight?: string;
		class?: string;
		extensions?: Extension[];
		languageServer?: LanguageServerConfig | null;
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
		extensions = [],
		languageServer = null
	}: Props = $props();

	let container: HTMLDivElement | undefined = $state();
	let view: EditorView | undefined = $state();
	let lspConnection: LanguageServerConnection | undefined = $state();
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

	async function buildExtraExtensions(): Promise<Extension[]> {
		lspConnection?.destroy();
		lspConnection = undefined;

		if (!languageServer) {
			return [...extensions];
		}

		const connection = await createLanguageServerConnection(languageServer);
		lspConnection = connection;

		return [...extensions, ...connection.extensions];
	}

	onMount(async () => {
		if (!container) {
			return;
		}

		const extraExtensions = await buildExtraExtensions();

		if (cancelled || !container) {
			lspConnection?.destroy();
			lspConnection = undefined;
			return;
		}

		view = createEditorView({
			parent: container,
			doc: value,
			language,
			placeholder,
			extensions: extraExtensions,
			onChange: emitValueChange
		});

		isReady = true;
	});

	$effect(() => {
		if (!view || !isReady) {
			return;
		}

		syncEditorDocument(view, value);
	});

	onDestroy(() => {
		cancelled = true;
		lspConnection?.destroy();
		lspConnection = undefined;
		view?.destroy();
		view = undefined;
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
			'overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2 [&_.cm-editor]:min-h-[inherit] [&_.cm-editor]:outline-none [&_.cm-scroller]:min-h-[inherit]',
			error
				? 'border-red-500 focus-within:ring-red-500'
				: 'border-dark-600 focus-within:ring-primary',
			className
		)}
		style:min-height={minHeight}
	></div>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
