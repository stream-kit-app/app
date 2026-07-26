<script lang="ts">
	import type { AuthPublicUser } from '$lib/core/auth/types';

	import { cn } from '$lib/utils';

	type Props = {
		user: AuthPublicUser | null;
		size?: 'sm' | 'md' | 'lg';
		/** Overrides `user.avatarUrl` (e.g. local file preview). */
		avatarUrl?: string | null;
		class?: string;
	};

	let { user, size = 'md', avatarUrl, class: className }: Props = $props();

	const sizeClass = $derived(
		size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-16 text-xl' : 'size-9 text-sm'
	);

	const ringClass = $derived(
		size === 'lg' ? 'ring-2 ring-primary ring-offset-2' : 'ring-2 ring-primary ring-offset-1'
	);

	const resolvedAvatarUrl = $derived(avatarUrl ?? user?.avatarUrl ?? null);
	const hasSubscription = $derived(Boolean(user?.subscription?.name?.trim()));

	const initials = $derived.by(() => {
		const name = user?.name?.trim();
		if (name) {
			const parts = name.split(/\s+/).filter(Boolean);
			if (parts.length >= 2) {
				return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
			}
			return name.slice(0, 2).toUpperCase();
		}
		return '?';
	});
</script>

<span
	class={cn('relative inline-flex shrink-0 rounded-full', className)}
	title={hasSubscription ? user?.subscription?.name : undefined}
>
	{#if resolvedAvatarUrl}
		<img
			src={resolvedAvatarUrl}
			alt=""
			class={cn(
				'rounded-full object-cover ring-offset-dark-950',
				sizeClass,
				hasSubscription && ringClass
			)}
		/>
	{:else}
		<span
			aria-hidden="true"
			class={cn(
				'inline-flex items-center justify-center rounded-full bg-dark-600 font-medium text-dark-100 ring-offset-dark-950',
				sizeClass,
				hasSubscription && ringClass
			)}
		>
			{initials}
		</span>
	{/if}
</span>
