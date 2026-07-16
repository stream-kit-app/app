<script lang="ts">
	import type { Role } from '../lib/role.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getRolesService } from '../lib/get-roles';

	type Props = {
		role: Role;
	};

	let { role }: Props = $props();
	const app = getRolesService().requireApp();
	const t = app.i18n.t;

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete role'),
			description: t('Delete {name}? Members will be removed from this role.', {
				name: role.name.trim() || t('this role')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await role.delete();
		}
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if role.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button variant="ghost" type="button" onclick={() => role.close()}>{t('Cancel')}</Button>
		<Button type="button" onclick={() => void role.save()}>{t('Save')}</Button>
	</div>
</div>
