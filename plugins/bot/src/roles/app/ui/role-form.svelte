<script lang="ts">
	import type { Role } from '../lib/role.svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText, Label } from '@stream-kit/ui/input';

	import { getRolesService } from '../lib/get-roles';

	type Props = {
		role: Role;
	};

	let { role }: Props = $props();
	const app = getRolesService().requireApp();
	const t = app.i18n.t;

	let memberDraft = $state('');

	function handleAddMember(): void {
		if (role.addMember(memberDraft)) {
			memberDraft = '';
		}
	}
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Name')}
		required
		value={role.name}
		error={role.formErrors?.name}
		oninput={(event) => {
			role.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<section class="grid gap-3">
		<Label>{t('Members')}</Label>
		<div class="flex flex-col gap-3 sm:flex-row">
			<div class="min-w-0 flex-1">
				<InputText
					label={t('Add member')}
					placeholder={t('Twitch username')}
					value={memberDraft}
					oninput={(event) => {
						memberDraft = (event.currentTarget as HTMLInputElement).value;
					}}
					onkeydown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							handleAddMember();
						}
					}}
				/>
			</div>
			<div class="flex items-end">
				<Button type="button" variant="outline" icon="ri:user-add-line" onclick={handleAddMember}>
					{t('Add')}
				</Button>
			</div>
		</div>

		{#if role.memberIds.length === 0}
			<EmptyState compact icon="ri:group-line" title={t('No members yet.')} />
		{:else}
			<ul class="divide-y divide-rule rounded-none border border-rule">
				{#each role.memberIds as memberId (memberId)}
					<li
						class="flex items-center justify-between gap-3 px-3 py-1.5 transition-colors hover:bg-dark-700/40"
					>
						<span class="min-w-0 truncate text-sm text-dark-50">
							{role.memberLabel(memberId)}
						</span>
						<Button
							variant="ghost"
							size="icon-sm"
							icon="ri:delete-bin-line"
							aria-label={t('Remove')}
							onclick={() => role.removeMember(memberId)}
							{@attach tooltip(() => t('Remove'))}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</form>
