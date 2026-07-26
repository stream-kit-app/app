<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputText } from '@stream-kit/ui/input';
	import { watch } from 'runed';

	import { UserAvatar, openLoginModal } from '$lib/components/core/auth';
	import { app } from '$lib/core';
	import { AUTH_AVATAR_MAX_BYTES, validateAvatarFile } from '$lib/core/auth';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let name = $state('');
	let avatarFile = $state<File | null>(null);
	let avatarPreviewUrl = $state<string | null>(null);
	let removeAvatar = $state(false);
	let savingProfile = $state(false);

	let newEmail = $state('');
	let requestingEmailChange = $state(false);

	let oldPassword = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let savingPassword = $state(false);
	let cancellingSubscription = $state(false);
	let migratingCloudFiles = $state(false);

	const account = $derived(app.auth.account);
	const user = $derived(app.auth.user);
	const configSyncStatus = $derived(app.configSync.status);
	const configSyncLabel = $derived.by(() => {
		switch (configSyncStatus) {
			case 'syncing':
				return t('Syncing…');
			case 'synced': {
				const at = app.configSync.lastSyncedAt;
				return at ? `${t('Synced')} · ${at.toLocaleString()}` : t('Synced');
			}
			case 'offline':
				return t('Offline');
			case 'error':
				return t('Sync failed');
			case 'disabled':
			case 'idle':
			default:
				return t('Waiting to sync');
		}
	});

	const displayAvatarUrl = $derived(
		removeAvatar ? null : (avatarPreviewUrl ?? user?.avatarUrl ?? null)
	);

	onMount(() => {
		app.pageHeader.set({ title: t('Profile'), segments: [] });
		return () => app.pageHeader.reset();
	});

	onDestroy(() => {
		if (avatarPreviewUrl) {
			URL.revokeObjectURL(avatarPreviewUrl);
		}
	});

	watch(
		() => account?.id ?? null,
		(id) => {
			const current = app.auth.account;
			if (!id || !current) {
				name = '';
				newEmail = '';
				return;
			}
			name = current.name ?? '';
			newEmail = '';
		}
	);

	function clearAvatarPreview(): void {
		if (avatarPreviewUrl) {
			URL.revokeObjectURL(avatarPreviewUrl);
			avatarPreviewUrl = null;
		}
	}

	function onAvatarSelected(event: Event): void {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0] ?? null;
		clearAvatarPreview();
		avatarFile = null;
		removeAvatar = false;

		if (!file) {
			return;
		}

		const validationError = validateAvatarFile(file);
		if (validationError) {
			input.value = '';
			app.toast.create({
				title: t('Avatar'),
				description: t(validationError),
				variant: 'warning'
			});
			return;
		}

		avatarFile = file;
		avatarPreviewUrl = URL.createObjectURL(file);
	}

	function onRemoveAvatar(): void {
		if (removeAvatar) {
			removeAvatar = false;
			return;
		}
		if (avatarFile) {
			clearAvatarPreview();
			avatarFile = null;
			return;
		}
		clearAvatarPreview();
		avatarFile = null;
		removeAvatar = true;
	}

	async function saveProfile(): Promise<void> {
		if (!account || savingProfile) {
			return;
		}

		savingProfile = true;
		try {
			await app.auth.updateProfile({
				name: name.trim(),
				...(avatarFile
					? { avatar: avatarFile }
					: removeAvatar
						? { avatar: null }
						: {})
			});
			clearAvatarPreview();
			avatarFile = null;
			removeAvatar = false;
			app.toast.create({
				title: t('Profile updated'),
				description: t('Your account details were saved.'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Update failed'),
				description:
					error instanceof Error ? error.message : t('Could not update your profile.'),
				variant: 'error'
			});
		} finally {
			savingProfile = false;
		}
	}

	async function requestEmailChange(): Promise<void> {
		if (!account || requestingEmailChange) {
			return;
		}

		requestingEmailChange = true;
		try {
			await app.auth.requestEmailChange(newEmail);
			newEmail = '';
			app.toast.create({
				title: t('Check your inbox'),
				description: t(
					'We sent a confirmation link to your new email. Your address updates after you confirm.'
				),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Update failed'),
				description:
					error instanceof Error
						? error.message
						: t('Could not request an email change.'),
				variant: 'error'
			});
		} finally {
			requestingEmailChange = false;
		}
	}

	async function savePassword(): Promise<void> {
		if (!account || savingPassword) {
			return;
		}

		if (password !== passwordConfirm) {
			app.toast.create({
				title: t('Change password'),
				description: t('Passwords do not match.'),
				variant: 'warning'
			});
			return;
		}

		savingPassword = true;
		try {
			await app.auth.updatePassword({
				oldPassword,
				password,
				passwordConfirm
			});
			oldPassword = '';
			password = '';
			passwordConfirm = '';
			app.toast.create({
				title: t('Password updated'),
				description: t('Your password was changed.'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Update failed'),
				description:
					error instanceof Error ? error.message : t('Could not change your password.'),
				variant: 'error'
			});
		} finally {
			savingPassword = false;
		}
	}

	async function cancelSubscription(): Promise<void> {
		if (!user?.subscription || cancellingSubscription) {
			return;
		}

		const planName = user.subscription.name;
		const confirmed = await app.confirm.ask({
			title: t('Cancel subscription?'),
			description: t(
				'Cancel your {plan} plan? Cloud features for this plan will stop after cancellation.',
				{ plan: planName }
			),
			confirmLabel: t('Cancel subscription'),
			cancelLabel: t('Keep subscription')
		});
		if (!confirmed) {
			return;
		}

		cancellingSubscription = true;
		try {
			await app.auth.cancelSubscription();
			app.toast.create({
				title: t('Subscription cancelled'),
				description: t('Your {plan} plan has been cancelled.', { plan: planName }),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Cancel failed'),
				description:
					error instanceof Error
						? error.message
						: t('Could not cancel your subscription.'),
				variant: 'error'
			});
		} finally {
			cancellingSubscription = false;
		}
	}

	async function migrateCloudFiles(): Promise<void> {
		if (!user?.subscription || migratingCloudFiles) {
			return;
		}

		migratingCloudFiles = true;
		try {
			const { runCloudFileMigration } = await import(
				'$lib/core/user-files/cloud-file-migration'
			);
			await runCloudFileMigration(app);
		} finally {
			migratingCloudFiles = false;
		}
	}
</script>

{#if !account}
	<Container class="flex min-h-0 flex-1 flex-col py-8">
		<EmptyState
			icon="ri:user-line"
			title={t('Not signed in')}
			description={t('Log in to manage your Stream Kit account.')}
		>
			<Button onclick={() => openLoginModal()}>{t('Log in')}</Button>
		</EmptyState>
	</Container>
{:else}
	<Container class="flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto py-8">
		<section class="grid max-w-xl gap-6">
			<Heading level="2">{t('Profile')}</Heading>
			<div class="flex items-center gap-4">
				<UserAvatar {user} size="lg" avatarUrl={displayAvatarUrl} />
				<div class="grid gap-2">
					<label class="text-sm font-medium text-dark-100" for="profile-avatar">
						{t('Avatar')}
					</label>
					<input
						id="profile-avatar"
						type="file"
						accept="image/jpeg,image/png,image/webp,image/gif"
						class="cursor-pointer text-sm text-dark-200 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-dark-700 file:px-3 file:py-1.5 file:text-sm file:text-dark-100"
						onchange={onAvatarSelected}
					/>
					<p class="text-xs text-dark-400">
						{t('JPEG, PNG, WebP, or GIF up to {size} MB.', {
							size: String(AUTH_AVATAR_MAX_BYTES / (1024 * 1024))
						})}
					</p>
					{#if account.avatar || avatarFile || removeAvatar}
						<button
							type="button"
							class="cursor-pointer justify-self-start text-sm text-primary hover:underline"
							onclick={onRemoveAvatar}
						>
							{removeAvatar ? t('Undo remove avatar') : t('Remove avatar')}
						</button>
					{/if}
				</div>
			</div>
			<div
				class="flex flex-col gap-4 rounded-xl border border-dark-600 bg-dark-800 p-4 sm:flex-row sm:items-center sm:justify-between"
			>
				<div class="flex min-w-0 items-start gap-3">
					<span
						class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/15 text-primary"
						aria-hidden="true"
					>
						<Icon icon="ri:vip-crown-line" class="size-5" />
					</span>
					<div class="min-w-0">
						<p class="text-xs font-medium tracking-wide text-dark-400 uppercase">
							{t('Subscription')}
						</p>
						{#if user?.subscription}
							<div class="mt-1 flex flex-wrap items-center gap-2">
								<p class="truncate text-base font-semibold text-dark-50">
									{user.subscription.name}
								</p>
								<Badge variant="success" size="sm">{t('Active')}</Badge>
							</div>
							<p class="mt-0.5 text-sm text-dark-400">
								{t('Your current Stream Kit plan.')}
							</p>
						{:else}
							<p class="mt-1 text-sm text-dark-200">{t('No active subscription')}</p>
							<p class="mt-0.5 text-sm text-dark-400">
								{t('Plans unlock cloud features for your account.')}
							</p>
						{/if}
					</div>
				</div>
				{#if user?.subscription}
					<Button
						variant="destructive"
						size="sm"
						class="shrink-0 self-start sm:self-center"
						disabled={cancellingSubscription}
						onclick={() => void cancelSubscription()}
					>
						{t('Cancel subscription')}
					</Button>
				{/if}
			</div>
			{#if user?.subscription}
				<div
					class="flex flex-col gap-4 rounded-xl border border-dark-600 bg-dark-800 p-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div class="flex min-w-0 items-start gap-3">
						<span
							class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/15 text-primary"
							aria-hidden="true"
						>
							<Icon icon="ri:cloud-line" class="size-5" />
						</span>
						<div class="min-w-0">
							<p class="text-xs font-medium tracking-wide text-dark-400 uppercase">
								{t('Cloud sync')}
							</p>
							<p class="mt-1 text-base font-semibold text-dark-50">{configSyncLabel}</p>
							{#if configSyncStatus === 'error' && app.configSync.lastError}
								<p class="mt-0.5 text-sm text-destructive-100">{app.configSync.lastError}</p>
							{/if}
							<p class="mt-0.5 text-sm text-dark-400">
								{t(
									'Actions and queues sync to your Stream Kit account while your plan is active.'
								)}
							</p>
						</div>
					</div>
					<Button
						size="sm"
						class="shrink-0 self-start sm:self-center"
						disabled={configSyncStatus === 'syncing'}
						onclick={() => void app.configSync.sync()}
					>
						{t('Sync now')}
					</Button>
				</div>
				<div
					class="flex flex-col gap-4 rounded-xl border border-dark-600 bg-dark-800 p-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div class="flex min-w-0 items-start gap-3">
						<span
							class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/15 text-primary"
							aria-hidden="true"
						>
							<Icon icon="ri:folder-cloud-line" class="size-5" />
						</span>
						<div class="min-w-0">
							<p class="text-xs font-medium tracking-wide text-dark-400 uppercase">
								{t('Cloud files')}
							</p>
							<p class="mt-1 text-sm text-dark-200">
								{t(
									'Re-upload files referenced by actions from a previous PocketBase host (e.g. localhost) into this account.'
								)}
							</p>
						</div>
					</div>
					<Button
						size="sm"
						class="shrink-0 self-start sm:self-center"
						disabled={migratingCloudFiles}
						onclick={() => void migrateCloudFiles()}
					>
						{t('Migrate cloud files')}
					</Button>
				</div>
			{/if}
			<InputText
				label={t('Name')}
				autocomplete="name"
				value={name}
				oninput={(event) => (name = event.currentTarget.value)}
			/>
			<div class="flex justify-end">
				<Button disabled={savingProfile} onclick={saveProfile}>{t('Save profile')}</Button>
			</div>
		</section>

		<section class="grid max-w-xl gap-6 border-t border-dark-600 pt-10">
			<Heading level="2">{t('Email')}</Heading>
			<p class="text-sm text-dark-300">
				{t('Current email')}: <span class="text-dark-100">{account.email}</span>
			</p>
			<p class="text-sm text-dark-400">
				{t(
					'Changing your email sends a confirmation link to the new address. Your login email updates after you confirm.'
				)}
			</p>
			<InputText
				label={t('New email')}
				type="email"
				autocomplete="email"
				value={newEmail}
				oninput={(event) => (newEmail = event.currentTarget.value)}
			/>
			<div class="flex justify-end">
				<Button
					disabled={requestingEmailChange || !newEmail.trim()}
					onclick={requestEmailChange}
				>
					{t('Change email')}
				</Button>
			</div>
		</section>

		<section class="grid max-w-xl gap-6 border-t border-dark-600 pt-10">
			<Heading level="2">{t('Change password')}</Heading>
			<InputText
				label={t('Current password')}
				type="password"
				autocomplete="current-password"
				value={oldPassword}
				oninput={(event) => (oldPassword = event.currentTarget.value)}
			/>
			<InputText
				label={t('New password')}
				type="password"
				autocomplete="new-password"
				value={password}
				oninput={(event) => (password = event.currentTarget.value)}
			/>
			<InputText
				label={t('Confirm password')}
				type="password"
				autocomplete="new-password"
				value={passwordConfirm}
				oninput={(event) => (passwordConfirm = event.currentTarget.value)}
			/>
			<div class="flex justify-end">
				<Button
					disabled={savingPassword || !oldPassword || !password || !passwordConfirm}
					onclick={savePassword}
				>
					{t('Update password')}
				</Button>
			</div>
		</section>
	</Container>
{/if}
