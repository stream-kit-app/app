<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { Role } from '../lib/role.svelte';
	import { tryGetRolesService } from '../lib/get-roles';
	import RoleCard from './role-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const rolesService = $derived(tryGetRolesService());
	const roles = $derived(
		(rolesService?.roles ?? [])
			.slice()
			.sort((left, right) => left.name.localeCompare(right.name))
	);
	const totalCount = $derived(roles.length);

	$effect(() => {
		app.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:shield-user-line',
								label: t('{count} roles', { count: totalCount })
							}
						]
					: [],
			primaryActions: [
				{
					id: 'add-role',
					label: t('Add Role'),
					icon: 'ri:add-fill',
					onClick: () => Role.createDraft().open()
				}
			]
		});
	});
</script>

{#if !rolesService}
	<EmptyState
		icon="ri:shield-user-line"
		title={t('Roles unavailable')}
		description={t('Enable the Bot plugin to manage custom roles.')}
	/>
{:else if roles.length === 0}
	<EmptyState
		icon="ri:shield-user-line"
		title={t('No roles yet')}
		description={t('Create a role to organize viewers for command permissions.')}
		actionLabel={t('Add Role')}
		onAction={() => Role.createDraft().open()}
	/>
{:else}
	<Container class="px-6 py-6" size="md">
		<ul class="divide-y divide-rule rounded-none border border-rule">
			{#each roles as role (role.id)}
				<li class="px-4 py-2 transition-colors hover:bg-dark-700/40">
					<RoleCard {role} />
				</li>
			{/each}
		</ul>
	</Container>
{/if}
