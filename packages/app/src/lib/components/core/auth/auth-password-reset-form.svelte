<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import { openLoginModal } from './open-auth-modals';

	type Props = {
		modalId?: string;
	};

	let { modalId = 'auth-password-reset' }: Props = $props();

	const { t } = useI18n();

	let email = $state('');
	let submitting = $state(false);

	const canSubmit = $derived(email.trim().length > 0 && !submitting);

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
			await getApp().auth.requestPasswordReset(email.trim());
			getApp().toast.create({
				title: t('Check your inbox'),
				description: t(
					'If an account exists for that email, we sent a password reset link.'
				),
				variant: 'success'
			});
			closeModal();
			openLoginModal();
		} catch (error) {
			getApp().toast.create({
				title: t('Password reset failed'),
				description:
					error instanceof Error
						? error.message
						: t('Could not send a password reset email.'),
				variant: 'error'
			});
		} finally {
			submitting = false;
		}
	}
</script>

<form class="grid gap-5" onsubmit={handleSubmit}>
	<p class="text-sm text-dark-300">
		{t('Enter your account email and we will send you a link to reset your password.')}
	</p>
	<InputText
		label={t('Email')}
		type="email"
		autocomplete="email"
		required
		value={email}
		oninput={(event) => (email = event.currentTarget.value)}
	/>
	<div class="flex flex-wrap items-center justify-between gap-2">
		<button
			type="button"
			class="cursor-pointer text-sm text-primary hover:underline"
			onclick={() => openLoginModal()}
		>
			{t('Back to log in')}
		</button>
		<div class="flex flex-wrap justify-end gap-2">
			<Button variant="outline" disabled={submitting} onclick={closeModal}>{t('Cancel')}</Button>
			<Button type="submit" disabled={!canSubmit}>{t('Send reset link')}</Button>
		</div>
	</div>
</form>
