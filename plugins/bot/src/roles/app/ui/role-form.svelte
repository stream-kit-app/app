<script lang="ts">
	import type { Role } from '../lib/role.svelte';

	import { Button } from '@stream-kit/ui/button';
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
			<p class="text-sm text-dark-400">{t('No members yet.')}</p>
		{:else}
			<ul class="flex flex-col gap-1">
				{#each role.memberIds as memberId (memberId)}
					<li class="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-dark-700/40">
						<span class="min-w-0 truncate text-sm text-dark-50">
							{role.memberLabel(memberId)}
						</span>
						<button
							type="button"
							class="cursor-pointer text-sm text-dark-300 hover:text-destructive-50"
							onclick={() => role.removeMember(memberId)}
						>
							{t('Remove')}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</form>
