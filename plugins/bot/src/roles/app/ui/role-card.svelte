<script lang="ts">
	import type { RoleRecord } from '../lib/stored-role';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';

	import { Role } from '../lib/role.svelte';
	import { getRolesService } from '../lib/get-roles';

	type Props = {
		role: RoleRecord;
	};

	let { role }: Props = $props();
	const t = getRolesService().requireApp().i18n.t;

	function openRole(): void {
		Role.fromRecord(role).open();
	}
</script>

<div class="group/card flex min-w-0 flex-1 items-center gap-3 transition-colors">
	<div
		class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
		aria-hidden="true"
	>
		<Icon icon="ri:shield-user-line" class="size-5" />
	</div>

	<button
		type="button"
		class="flex min-w-0 flex-1 cursor-pointer flex-col gap-1 text-left"
		onclick={openRole}
	>
		<span class="truncate text-base font-semibold text-dark-50">
			{role.name.trim() || t('Untitled role')}
		</span>
		<span class="flex flex-wrap items-center gap-1.5">
			<Badge size="sm" variant="secondary">
				<Icon icon="ri:group-line" />
				{t('{count} members', { count: role.memberIds.length })}
			</Badge>
		</span>
	</button>

	<div class="flex shrink-0 items-center gap-1">
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-500 transition-[color,transform] group-hover/card:translate-x-0.5 group-hover/card:text-dark-300"
			aria-hidden="true"
		/>
	</div>
</div>
