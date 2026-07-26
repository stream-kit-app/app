<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import { openRegisterModal } from './open-auth-modals';

	type Props = {
		modalId?: string;
	};

	let { modalId = 'auth-login' }: Props = $props();

	const { t } = useI18n();

	let email = $state('');
	let password = $state('');
	let submitting = $state(false);

	const canSubmit = $derived(email.trim().length > 0 && password.length > 0 && !submitting);

	function closeModal(): void {
		getApp().modals.get(modalId)?.close();
	}

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		if (!canSubmit) {
			return;
		}

		submitting = true;
		try {
			await getApp().auth.login({ email: email.trim(), password });
			getApp().toast.create({
				title: t('Logged in'),
				description: t('Welcome back.'),
				variant: 'success'
			});
			closeModal();
		} catch (error) {
			getApp().toast.create({
				title: t('Log in failed'),
				description: error instanceof Error ? error.message : t('Could not log in.'),
				variant: 'error'
			});
		} finally {
			submitting = false;
		}
	}
</script>

<form class="grid gap-5" onsubmit={handleSubmit}>
	<InputText
		label={t('Email')}
		type="email"
		autocomplete="email"
		required
		value={email}
		oninput={(event) => (email = event.currentTarget.value)}
	/>
	<InputText
		label={t('Password')}
		type="password"
		autocomplete="current-password"
		required
		value={password}
		oninput={(event) => (password = event.currentTarget.value)}
	/>
	<div class="flex flex-wrap items-center justify-between gap-2">
		<button
			type="button"
			class="cursor-pointer text-sm text-primary hover:underline"
			onclick={() => openRegisterModal()}
		>
			{t('Create account')}
		</button>
		<div class="flex flex-wrap justify-end gap-2">
			<Button variant="outline" disabled={submitting} onclick={closeModal}>{t('Cancel')}</Button>
			<Button type="submit" disabled={!canSubmit}>{t('Log in')}</Button>
		</div>
	</div>
</form>
