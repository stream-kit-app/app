<script lang="ts">
	import Icon from '@iconify/svelte';
	import { watch } from 'runed';
	import { onDestroy, onMount } from 'svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Eyebrow, Panel } from '@stream-kit/ui/blueprint';
	import { Button, buttonVariants } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';

	import { openLoginModal, UserAvatar } from '$lib/components/core/auth';
	import { CloudFileManager } from '$lib/components/core/user-files';
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
	let requestingVerification = $state(false);

	let oldPassword = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let savingPassword = $state(false);
	let cancellingSubscription = $state(false);

	let deletePassword = $state('');
	let deletingAccount = $state(false);

	const account = $derived(app.auth.account);
	const user = $derived(app.auth.user);
	const subscriptionEndsAt = $derived(user?.subscription?.endsAt ?? null);
	const subscriptionEndsAtLabel = $derived.by(() => {
		if (!subscriptionEndsAt) {
			return null;
		}
		const ms = Date.parse(subscriptionEndsAt);
		if (!Number.isFinite(ms)) {
			return subscriptionEndsAt;
		}
		return new Date(ms).toLocaleString();
	});
	const configSyncStatus = $derived(app.configSync.status);
	const configSyncBadge = $derived.by(() => {
		switch (configSyncStatus) {
			case 'restoring':
			case 'syncing':
				return { label: t('Syncing…'), variant: 'default' as const };
			case 'synced':
				return { label: t('Synced'), variant: 'success' as const };
			case 'offline':
				return { label: t('Offline'), variant: 'warning' as const };
			case 'error':
				return { label: t('Failed'), variant: 'destructive' as const };
			case 'disabled':
			case 'idle':
			default:
				return { label: t('Waiting'), variant: 'outline' as const };
		}
	});
	const configSyncDetail = $derived.by(() => {
		switch (configSyncStatus) {
			case 'restoring':
				return t('Restoring from cloud…');
			case 'syncing':
				return t('Syncing your setup…');
			case 'synced': {
				const at = app.configSync.lastSyncedAt;
				return at
					? t('Last synced {date}', { date: at.toLocaleString() })
					: t('Your setup is up to date.');
			}
			case 'offline':
				return t('Waiting for a network connection.');
			case 'error':
				return t('Could not sync. Try again when you are ready.');
			case 'disabled':
			case 'idle':
			default:
				return t('Waiting to sync');
		}
	});
	const configSyncBusy = $derived(
		configSyncStatus === 'syncing' || configSyncStatus === 'restoring'
	);
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
				...(avatarFile ? { avatar: avatarFile } : removeAvatar ? { avatar: null } : {})
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

	async function resendVerification(): Promise<void> {
		if (!account || requestingVerification) {
			return;
		}

		requestingVerification = true;
		try {
			await app.auth.requestVerification();
			app.toast.create({
				title: t('Check your inbox'),
				description: t('We sent a verification link to your email.'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Update failed'),
				description:
					error instanceof Error
						? error.message
						: t('Could not send a verification email.'),
				variant: 'error'
			});
		} finally {
			requestingVerification = false;
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
		if (!user?.subscription || user.subscription.endsAt || cancellingSubscription) {
			return;
		}

		const planName = user.subscription.name;
		const confirmed = await app.confirm.ask({
			title: t('Cancel subscription?'),
			description: t(
				'Cancel your {plan} plan? Cloud features stay available for 30 days, then access ends.',
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
			const endsLabel = app.auth.user?.subscription?.endsAt
				? new Date(app.auth.user.subscription.endsAt).toLocaleString()
				: null;
			app.toast.create({
				title: t('Subscription cancelled'),
				description: endsLabel
					? t('Your {plan} plan stays available until {date}.', {
							plan: planName,
							date: endsLabel
						})
					: t('Your {plan} plan has been cancelled.', { plan: planName }),
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

	async function deleteAccount(): Promise<void> {
		if (!account || deletingAccount || !deletePassword) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Delete account?'),
			description: t(
				'This permanently deletes your Stream Kit account and cloud data (files, synced actions, and queues). This cannot be undone.'
			),
			confirmLabel: t('Delete account'),
			cancelLabel: t('Cancel')
		});
		if (!confirmed) {
			return;
		}

		deletingAccount = true;
		try {
			await app.auth.deleteAccount(deletePassword);
			app.userFiles.clearFileToken();
			deletePassword = '';
			app.toast.create({
				title: t('Account deleted'),
				description: t('Your Stream Kit account has been deleted.'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Delete failed'),
				description:
					error instanceof Error ? error.message : t('Could not delete your account.'),
				variant: 'error'
			});
		} finally {
			deletingAccount = false;
		}
	}
</script>

{#if !account}
	<EmptyState
		icon="ri:user-line"
		title={t('Not signed in')}
		description={t('Log in to manage your Stream Kit account.')}
	>
		<Button class="relative" onclick={() => openLoginModal()}>{t('Log in')}</Button>
	</EmptyState>
{:else}
	<Container class="flex min-h-0 flex-1 flex-col overflow-y-auto py-8">
		<div class="grid max-w-xl gap-6">
			<Panel tone="solid">
				{#snippet header()}
					<div class="flex items-center justify-between gap-3">
						<Eyebrow>{t('Profile')}</Eyebrow>
						<Button
							size="sm"
							class="shrink-0"
							disabled={savingProfile}
							onclick={() => void saveProfile()}
						>
							{t('Save profile')}
						</Button>
					</div>
				{/snippet}
				<div class="grid gap-4 p-4">
					<div class="flex items-start gap-4">
						<UserAvatar {user} size="lg" avatarUrl={displayAvatarUrl} />
						<div class="grid min-w-0 flex-1 gap-2">
							<p class="text-sm font-medium text-dark-100">{t('Avatar')}</p>
							<div class="flex flex-wrap items-center gap-2">
								<input
									id="profile-avatar"
									type="file"
									accept="image/jpeg,image/png,image/webp,image/gif"
									class="sr-only"
									onchange={onAvatarSelected}
								/>
								<label
									for="profile-avatar"
									class={buttonVariants({ size: 'sm', variant: 'outline' })}
								>
									{t('Browse')}
								</label>
								{#if account.avatar || avatarFile || removeAvatar}
									<button
										type="button"
										class="cursor-pointer text-sm text-primary hover:underline"
										onclick={onRemoveAvatar}
									>
										{removeAvatar
											? t('Undo remove avatar')
											: t('Remove avatar')}
									</button>
								{/if}
							</div>
							<p class="text-xs text-dark-400">
								{t('JPEG, PNG, WebP, or GIF up to {size} MB.', {
									size: String(AUTH_AVATAR_MAX_BYTES / (1024 * 1024))
								})}
							</p>
						</div>
					</div>
					<InputText
						label={t('Name')}
						autocomplete="name"
						value={name}
						oninput={(event) => (name = event.currentTarget.value)}
					/>
				</div>
			</Panel>

			<Panel tone="solid">
				{#snippet header()}
					<div class="flex items-center justify-between gap-3">
						<Eyebrow>{t('Subscription')}</Eyebrow>
						{#if user?.subscription && !subscriptionEndsAt}
							<Button
								variant="destructive"
								size="sm"
								class="shrink-0"
								disabled={cancellingSubscription}
								onclick={() => void cancelSubscription()}
							>
								{t('Cancel subscription')}
							</Button>
						{/if}
					</div>
				{/snippet}
				<div class="grid gap-3 p-4">
					<div class="flex min-w-0 items-start gap-3">
						<span
							class="inline-flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
							aria-hidden="true"
						>
							<Icon icon="ri:vip-crown-line" class="size-5" />
						</span>
						<div class="min-w-0 flex-1">
							{#if user?.subscription}
								<div class="flex flex-wrap items-center gap-2">
									<p class="truncate text-sm font-medium text-dark-50">
										{user.subscription.name}
									</p>
									{#if subscriptionEndsAt}
										<Badge variant="warning" size="sm">{t('Cancelling')}</Badge>
									{:else}
										<Badge variant="success" size="sm">{t('Active')}</Badge>
									{/if}
								</div>
								<p class="mt-1 text-sm text-dark-400">
									{#if subscriptionEndsAtLabel}
										{t('Cloud features stay available until {date}.', {
											date: subscriptionEndsAtLabel
										})}
									{:else}
										{t('Your current Stream Kit plan.')}
									{/if}
								</p>
							{:else}
								<p class="text-sm font-medium text-dark-50">
									{t('No active subscription')}
								</p>
								<p class="mt-1 text-sm text-dark-400">
									{t('Plans unlock cloud features for your account.')}
								</p>
							{/if}
						</div>
					</div>
				</div>
			</Panel>

			{#if user?.subscription}
				<Panel tone="solid">
					{#snippet header()}
						<div class="flex items-center justify-between gap-3">
							<Eyebrow>{t('Cloud sync')}</Eyebrow>
							<Button
								size="sm"
								variant="outline"
								class="shrink-0"
								disabled={configSyncBusy}
								onclick={() => void app.configSync.sync()}
							>
								{configSyncStatus === 'restoring' ? t('Restoring…') : t('Sync now')}
							</Button>
						</div>
					{/snippet}
					<div class="grid gap-3 p-4">
						<div class="flex min-w-0 items-start gap-3">
							<span
								class="inline-flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
								aria-hidden="true"
							>
								<Icon
									icon={configSyncStatus === 'error'
										? 'ri:cloud-off-line'
										: configSyncBusy
											? 'ri:refresh-line'
											: 'ri:cloud-line'}
									class={configSyncBusy ? 'size-5 animate-spin' : 'size-5'}
								/>
							</span>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<p class="text-sm font-medium text-dark-50">
										{configSyncDetail}
									</p>
									<Badge variant={configSyncBadge.variant} size="sm">
										{configSyncBadge.label}
									</Badge>
								</div>
								<p class="mt-1 text-sm text-dark-400">
									{t(
										'Actions, queues, plugin data, overlays, and dashboard layout sync while your plan is active. Platform logins stay on this PC.'
									)}
								</p>
							</div>
						</div>
						{#if configSyncStatus === 'error' && app.configSync.lastError}
							<Alert
								variant="error"
								title={t('Sync failed')}
								description={app.configSync.lastError}
							/>
						{/if}
					</div>
				</Panel>

				<Panel tone="solid">
					{#snippet header()}
						<Eyebrow>{t('Cloud files')}</Eyebrow>
					{/snippet}
					<div class="grid gap-4 p-4">
						<p class="text-sm text-dark-400">
							{t(
								'Manage media stored in your Stream Kit account. Deleting a file may break actions that still reference it.'
							)}
						</p>
						<CloudFileManager />
					</div>
				</Panel>
			{/if}

			<Panel tone="solid">
				{#snippet header()}
					<div class="flex items-center justify-between gap-3">
						<Eyebrow>{t('Email')}</Eyebrow>
						<Button
							size="sm"
							class="shrink-0"
							disabled={requestingEmailChange || !newEmail.trim()}
							onclick={() => void requestEmailChange()}
						>
							{t('Change email')}
						</Button>
					</div>
				{/snippet}
				<div class="grid gap-4 p-4">
					<div class="flex flex-wrap items-center gap-2">
						<p class="text-sm text-dark-300">
							{t('Current email')}: <span class="text-dark-100">{account.email}</span>
						</p>
						{#if user && !user.verified}
							<Badge variant="warning" size="sm">{t('Unverified')}</Badge>
						{/if}
					</div>
					{#if user && !user.verified}
						<div class="flex flex-wrap items-center gap-3">
							<p class="text-sm text-dark-400">
								{t('Verify your email to confirm ownership of this address.')}
							</p>
							<Button
								size="sm"
								variant="outline"
								disabled={requestingVerification}
								onclick={() => void resendVerification()}
							>
								{t('Resend verification email')}
							</Button>
						</div>
					{/if}
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
				</div>
			</Panel>

			<Panel tone="solid">
				{#snippet header()}
					<div class="flex items-center justify-between gap-3">
						<Eyebrow>{t('Password')}</Eyebrow>
						<Button
							size="sm"
							class="shrink-0"
							disabled={savingPassword ||
								!oldPassword ||
								!password ||
								!passwordConfirm}
							onclick={() => void savePassword()}
						>
							{t('Update password')}
						</Button>
					</div>
				{/snippet}
				<div class="grid gap-4 p-4">
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
				</div>
			</Panel>

			<Panel tone="solid">
				{#snippet header()}
					<div class="flex items-center justify-between gap-3">
						<Eyebrow>{t('Delete account')}</Eyebrow>
						<Button
							variant="destructive"
							size="sm"
							class="shrink-0"
							disabled={deletingAccount || !deletePassword}
							onclick={() => void deleteAccount()}
						>
							{t('Delete account')}
						</Button>
					</div>
				{/snippet}
				<div class="grid gap-4 p-4">
					<p class="text-sm text-dark-400">
						{t(
							'Deleting your account permanently removes your profile and cloud data, including uploaded files and synced actions.'
						)}
					</p>
					<InputText
						label={t('Confirm with password')}
						type="password"
						autocomplete="current-password"
						value={deletePassword}
						oninput={(event) => (deletePassword = event.currentTarget.value)}
					/>
				</div>
			</Panel>
		</div>
	</Container>
{/if}
