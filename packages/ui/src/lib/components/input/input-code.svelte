<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';
	import type { LanguageServerConfig, LanguageServerConnection } from '../../codemirror';
	import type { Extension } from '@codemirror/state';
	import type { EditorView } from '@codemirror/view';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Compartment } from '@codemirror/state';
	import { useId } from 'bits-ui';
	import { onDestroy, onMount } from 'svelte';

	import {
		createEditorView,
		createLanguageServerConnection,
		syncEditorDocument
	} from '../../codemirror';
	import { VariablePopover } from '../variable-popover';
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
		fillHeight?: boolean;
		class?: string;
		extensions?: Extension[];
		languageServer?: LanguageServerConfig | null;
		sharedLanguageServer?: LanguageServerConnection | null;
		languageServerActive?: boolean;
		activeDocumentUri?: string;
		activeLanguageId?: string;
		loadingLabel?: string;
		variables?: HandlerFieldVariable[];
		variablesTitle?: string;
		variablesAriaLabel?: string;
		onEditorReady?: (view: EditorView | null) => void;
	};

	const WORKSPACE_SYNC_DELAY_MS = 450;
	const lspCompartment = new Compartment();

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
		class: className,
		extensions = [],
		languageServer = null,
		sharedLanguageServer = null,
		languageServerActive = false,
		activeDocumentUri = '',
		activeLanguageId = 'typescript',
		loadingLabel = 'Loading...',
		variables = [],
		variablesTitle = 'Variables',
		variablesAriaLabel = 'Insert variable',
		onEditorReady
	}: Props = $props();

	let container: HTMLDivElement | undefined = $state();
	let view: EditorView | undefined = $state();
	let lspConnection: LanguageServerConnection | undefined = $state();
	let isReady = $state(false);
	let cancelled = false;
	let syncedPathSignature = $state('');
	let syncedSourceSignature = $state('');
	let workspaceSyncTimer: ReturnType<typeof setTimeout> | undefined;

	function workspacePathSignature(workspace: Record<string, string>): string {
		return Object.keys(workspace).sort().join('\0');
	}

	function workspaceSourceSignature(workspace: Record<string, string>): string {
		return Object.entries(workspace)
			.filter(([path]) => path.includes('/src/'))
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([path, content]) => `${path}\0${content}`)
			.join('\0');
	}

	function clearWorkspaceSyncTimer(): void {
		if (!workspaceSyncTimer) {
			return;
		}

		clearTimeout(workspaceSyncTimer);
		workspaceSyncTimer = undefined;
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

		if (!view) {
			emitValueChange(`${value}${token}`);
			return;
		}

		const { from, to } = view.state.selection.main;

		view.dispatch({
			changes: { from, to, insert: token },
			selection: { anchor: from + token.length }
		});
		view.focus();
	}

	async function buildExtraExtensions(): Promise<Extension[]> {
		lspConnection?.destroy();
		lspConnection = undefined;
		syncedPathSignature = '';
		syncedSourceSignature = '';
		clearWorkspaceSyncTimer();

		if (sharedLanguageServer) {
			return [...extensions, lspCompartment.of([]), ...sharedLanguageServer.extensions];
		}

		if (!languageServer) {
			return [...extensions];
		}

		const connection = await createLanguageServerConnection(languageServer);
		lspConnection = connection;
		syncedPathSignature = workspacePathSignature(languageServer.workspace);
		syncedSourceSignature = workspaceSourceSignature(languageServer.workspace);

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
		onEditorReady?.(view);
	});

	$effect(() => {
		if (!view || !isReady) {
			return;
		}

		syncEditorDocument(view, value);
	});

	$effect(() => {
		if (!view || !isReady || !sharedLanguageServer) {
			return;
		}

		if (languageServerActive && activeDocumentUri && activeLanguageId) {
			sharedLanguageServer.setActiveEditor(
				view,
				lspCompartment,
				activeDocumentUri,
				activeLanguageId
			);
			return;
		}

		sharedLanguageServer.clearActiveEditor(view, lspCompartment);
	});

	$effect(() => {
		if (!isReady || !lspConnection || !languageServer || sharedLanguageServer) {
			return;
		}

		const workspace = languageServer.workspace;
		const pathSignature = workspacePathSignature(workspace);
		const sourceSignature = workspaceSourceSignature(workspace);
		const pathsChanged = pathSignature !== syncedPathSignature;

		if (pathsChanged) {
			clearWorkspaceSyncTimer();
			syncedPathSignature = pathSignature;
			syncedSourceSignature = sourceSignature;
			void lspConnection.updateWorkspace(workspace);
			return;
		}

		if (sourceSignature === syncedSourceSignature) {
			return;
		}

		clearWorkspaceSyncTimer();
		workspaceSyncTimer = setTimeout(() => {
			workspaceSyncTimer = undefined;
			syncedSourceSignature = sourceSignature;
			void lspConnection?.updateWorkspace(workspace);
		}, WORKSPACE_SYNC_DELAY_MS);
	});

	onDestroy(() => {
		cancelled = true;
		clearWorkspaceSyncTimer();
		if (sharedLanguageServer && view) {
			sharedLanguageServer.clearActiveEditor(view, lspCompartment);
		}
		lspConnection?.destroy();
		lspConnection = undefined;
		onEditorReady?.(null);
		view?.destroy();
		view = undefined;
	});
</script>

<div class={cn('relative flex w-full flex-col', fillHeight ? 'h-full min-h-0 flex-1' : 'grid gap-2')}>
	{#if label || variables.length > 0}
		<div class="flex items-center justify-between gap-2">
			{#if label}
				<Label for={id}>{label}</Label>
			{:else}
				<span></span>
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
	{/if}
	<div
		{id}
		bind:this={container}
		role="textbox"
		aria-multiline="true"
		aria-busy={!isReady}
		aria-invalid={error ? true : undefined}
		class={cn(
			'relative',
			'overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2 [&_.cm-editor]:outline-none',
			fillHeight
				? 'flex min-h-0 flex-1 flex-col [&_.cm-editor]:!flex [&_.cm-editor]:!h-full [&_.cm-editor]:!max-h-full [&_.cm-editor]:!min-h-0 [&_.cm-editor]:!flex-col [&_.cm-scroller]:!min-h-0 [&_.cm-scroller]:!flex-1'
				: '[&_.cm-editor]:min-h-[inherit] [&_.cm-scroller]:min-h-[inherit]',
			error
				? 'border-red-500 focus-within:ring-red-500'
				: 'border-dark-600 focus-within:ring-primary',
			className
		)}
		style:min-height={fillHeight ? undefined : minHeight}
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
