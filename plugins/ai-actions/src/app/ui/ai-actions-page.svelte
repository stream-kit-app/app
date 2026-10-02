<script lang="ts">
	import type { PluginAppApi, PluginCustomViewProps } from '@stream-kit/plugin';

	import { Alert } from '@stream-kit/ui/alert';
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { DataTable } from '@stream-kit/ui/data-table';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputTextarea } from '@stream-kit/ui/input';

	import { openDraftInEditor, openDrafts, type AiDraft } from '../../lib/drafts';
	import { generateAction } from '../../lib/generate';

	let { app }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);

	const examples = $derived([
		t('When someone types !hug in chat, play hug.mp3 and reply with a hug message'),
		t('When someone follows: if their name is bob, say hi bob, otherwise welcome them by name'),
		t('When a raid has more than 10 viewers, switch to the OBS scene Raid')
	]);

	// Filled immediately by the onChange subscription below.
	let user = $state<PluginAppApi['auth']['user']>(null);
	let prompt = $state('');
	let isGenerating = $state(false);
	let error = $state<string | null>(null);
	let notes = $state<string[]>([]);
	let remaining = $state<number | null>(null);
	let controller: AbortController | null = null;
	let draftList = $state<AiDraft[]>([]);

	const drafts = $derived(openDrafts(app));

	const hasSubscription = $derived(user?.subscription != null);
	const canGenerate = $derived(hasSubscription && prompt.trim().length > 0 && !isGenerating);

	// Auth state lives in the app runtime; mirror it through the callback API.
	$effect(() => app.auth.onChange((next) => (user = next)));

	$effect(() => () => controller?.abort());

	async function loadDrafts(): Promise<void> {
		try {
			draftList = await drafts.list();
		} catch (cause) {
			console.error('Could not load AI drafts', cause);
		}
	}

	$effect(() => {
		void loadDrafts();
		return drafts.onChange(() => void loadDrafts());
	});

	function formatDate(value: string): string {
		try {
			return new Date(value).toLocaleString();
		} catch {
			return value;
		}
	}

	async function deleteDraft(draft: AiDraft): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Delete draft {name}?', { name: draft.name }),
			description: t('This cannot be undone.'),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await drafts.delete(draft.id);
		} catch (cause) {
			app.toast.create({
				title: t('Could not delete draft'),
				description: cause instanceof Error ? cause.message : String(cause),
				variant: 'warning'
			});
		}
	}

	function errorMessage(cause: unknown): string {
		const status = (cause as { status?: number }).status;

		if (status === 401) {
			return t('Sign in to your Stream Kit account to use AI actions.');
		}

		if (status === 403) {
			return t('AI actions require an active Stream Kit subscription.');
		}

		if (status === 429) {
			return t('Daily AI limit reached. Try again tomorrow.');
		}

		return cause instanceof Error && cause.message
			? cause.message
			: t('Something went wrong while generating the action.');
	}

	async function generate(): Promise<void> {
		if (!canGenerate) {
			return;
		}

		controller = new AbortController();
		isGenerating = true;
		error = null;
		notes = [];

		try {
			const description = prompt.trim();
			const result = await generateAction(app, description, controller.signal);
			const draft = await drafts.create(description, result.record, result.notes);

			notes = result.notes;
			remaining = result.remaining;
			prompt = '';
			openDraftInEditor(app, drafts, draft);
		} catch (cause) {
			if (!controller.signal.aborted) {
				error = errorMessage(cause);
			}
		} finally {
			isGenerating = false;
			controller = null;
		}
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			void generate();
		}
	}
</script>

{#snippet nameCell(draft: AiDraft)}
	<button
		type="button"
		class="cursor-pointer text-left text-dark-100 hover:text-primary"
		onclick={() => openDraftInEditor(app, drafts, draft)}
	>
		<span class="font-medium">{draft.name}</span>
		<span class="line-clamp-1 text-sm text-dark-400">{draft.prompt}</span>
	</button>
{/snippet}

{#snippet dateCell(draft: AiDraft)}
	<span class="tabular-nums text-dark-400">{formatDate(draft.createdAt)}</span>
{/snippet}

{#snippet actionsCell(draft: AiDraft)}
	<div class="flex items-center justify-end gap-1">
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:edit-line"
			aria-label={t('Open draft')}
			onclick={() => openDraftInEditor(app, drafts, draft)}
			{@attach tooltip(() => t('Open'))}
		/>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:delete-bin-line"
			aria-label={t('Delete draft')}
			onclick={() => void deleteDraft(draft)}
			{@attach tooltip(() => t('Delete'))}
		/>
	</div>
{/snippet}

<Container size="sm" class="grid gap-6 py-6">
	{#if !user}
		<Alert
			variant="warning"
			title={t('Sign in required')}
			description={t('Sign in to your Stream Kit account to use AI actions.')}
		/>
	{:else if !hasSubscription}
		<Alert
			variant="warning"
			title={t('Subscription required')}
			description={t('AI actions require an active Stream Kit subscription.')}
		/>
	{/if}

	<Alert
		icon="ri:sparkling-2-line"
		description={t(
			'Describe what should happen and when. AI builds a draft action that opens in the editor, so you can check it before saving.'
		)}
	/>

	<InputTextarea
		label={t('Describe your action')}
		placeholder={t('When someone types !hug in chat, play a sound and send a chat message')}
		rows={5}
		maxlength={2000}
		disabled={!hasSubscription || isGenerating}
		bind:value={prompt}
		onkeydown={onKeydown}
	/>

	<div class="flex flex-wrap gap-2">
		{#each examples as example (example)}
			<Button
				variant="outline"
				size="sm"
				disabled={!hasSubscription || isGenerating}
				onclick={() => (prompt = example)}
			>
				{example}
			</Button>
		{/each}
	</div>

	<div class="flex items-center gap-4">
		<Button
			icon="ri:sparkling-2-line"
			isLoading={isGenerating}
			disabled={!canGenerate}
			onclick={() => void generate()}
		>
			{isGenerating ? t('Generating…') : t('Generate action')}
		</Button>
		{#if remaining != null}
			<span class="text-sm text-muted-foreground">
				{t('{count} generations left today', { count: remaining })}
			</span>
		{/if}
	</div>

	{#if error}
		<Alert variant="error" description={error} />
	{/if}

	{#if notes.length > 0}
		<Alert variant="warning" title={t('Check the draft')}>
			<ul class="list-disc pl-4">
				{#each notes as note, index (index)}
					<li>{note}</li>
				{/each}
			</ul>
		</Alert>
	{/if}

	<div class="grid gap-3">
		<Heading level={2}>{t('Drafts')}</Heading>
		<p class="text-sm text-muted-foreground">
			{t('Generated actions stay here until you save them in the editor.')}
		</p>
		<DataTable
			data={draftList}
			getRowKey={(draft) => draft.id}
			empty={t('No drafts yet')}
			columns={[
				{ id: 'name', header: t('Action'), cell: nameCell },
				{ id: 'date', header: t('Created'), cell: dateCell, class: 'w-44' },
				{ id: 'actions', header: '', align: 'right', cell: actionsCell, class: 'w-24' }
			]}
		/>
	</div>
</Container>
