<script lang="ts">
	import type { AuthModalForm } from './auth-modal-form.svelte';

	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import { openPasswordResetModal, openRegisterModal } from './open-auth-modals';

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
			await getApp().auth.login({ email: form.email.trim(), password: form.password });
			getApp().toast.create({
				title: t('Logged in'),
				description: t('Welcome back.'),
				variant: 'success'
			});
			form.close();
		} catch (error) {
			getApp().toast.create({
				title: t('Log in failed'),
				description: error instanceof Error ? error.message : t('Could not log in.'),
				variant: 'error'
			});
		} finally {
			form.submitting = false;
		}
	}
</script>

<form id={form.formId} class="grid gap-5" onsubmit={handleSubmit}>
	<InputText
		label={t('Email')}
		type="email"
		autocomplete="email"
		required
		value={form.email}
		oninput={(event) => (form.email = event.currentTarget.value)}
	/>
	<InputText
		label={t('Password')}
		type="password"
		autocomplete="current-password"
		required
		value={form.password}
		oninput={(event) => (form.password = event.currentTarget.value)}
	/>
	<div class="flex flex-col items-start gap-1">
		<Button
			variant="link"
			size="sm"
			class="h-auto px-0"
			onclick={() => openRegisterModal()}
		>
			{t('Create account')}
		</Button>
		<Button
			variant="link"
			size="sm"
			class="h-auto px-0"
			onclick={() => openPasswordResetModal()}
		>
			{t('Forgot password?')}
		</Button>
	</div>
</form>
