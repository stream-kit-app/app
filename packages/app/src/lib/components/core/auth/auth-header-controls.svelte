<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '@stream-kit/ui/button';
	import * as Dropdown from '@stream-kit/ui/dropdown';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import UserAvatar from './user-avatar.svelte';
	import { openLoginModal } from './open-auth-modals';

	const { t } = useI18n();
	const app = getApp();
	const user = $derived(app.auth.user);

	async function handleLogout(): Promise<void> {
		await app.auth.logout();
		app.toast.create({
			title: t('Logged out'),
			description: t('You have been signed out.'),
			variant: 'success'
		});
	}
</script>

{#if user}
	<Dropdown.Root>
		{#snippet trigger({ props })}
			<button
				type="button"
				class="inline-flex cursor-pointer items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
				aria-label={t('Account menu')}
				{...props}
			>
				<UserAvatar {user} size="sm" />
			</button>
		{/snippet}
		<Dropdown.Content align="end" class="min-w-40">
			<Dropdown.Item onclick={() => goto('/profile')}>{t('Profile')}</Dropdown.Item>
			<Dropdown.Item onclick={handleLogout}>{t('Log out')}</Dropdown.Item>
		</Dropdown.Content>
	</Dropdown.Root>
{:else}
	<Button size="sm" variant="outline" onclick={() => openLoginModal()}>{t('Log in')}</Button>
{/if}
