<script lang="ts">
	import type { AuthModalForm } from './auth-modal-form.svelte';

	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import { openLoginModal } from './open-auth-modals';

	type Props = {
		form: AuthModalForm;
	};

	let { form }: Props = $props();

	const { t } = useI18n();

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		if (!form.canSubmit) {
			return;
		}

		form.submitting = true;
		try {
			await getApp().auth.requestPasswordReset(form.email.trim());
			getApp().toast.create({
				title: t('Check your inbox'),
				description: t(
					'If an account exists for that email, we sent a password reset link.'
				),
				variant: 'success'
			});
			form.close();
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
			form.submitting = false;
		}
	}
</script>

<form id={form.formId} class="grid gap-5" onsubmit={handleSubmit}>
	<p class="text-sm text-dark-300">
		{t('Enter your account email and we will send you a link to reset your password.')}
	</p>
	<InputText
		label={t('Email')}
		type="email"
		autocomplete="email"
		required
		value={form.email}
		oninput={(event) => (form.email = event.currentTarget.value)}
	/>
	<div>
		<Button variant="link" size="sm" class="h-auto px-0" onclick={() => openLoginModal()}>
			{t('Back to log in')}
		</Button>
	</div>
</form>
