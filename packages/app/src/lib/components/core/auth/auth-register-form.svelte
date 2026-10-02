<script lang="ts">
	import type { AuthModalForm } from './auth-modal-form.svelte';

	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { AuthCreatedButSignInFailedError } from '$lib/core/auth/auth-utils';
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

		if (form.password !== form.passwordConfirm) {
			getApp().toast.create({
				title: t('Create account'),
				description: t('Passwords do not match.'),
				variant: 'warning'
			});
			return;
		}

		form.submitting = true;
		try {
			await getApp().auth.register({
				email: form.email.trim(),
				password: form.password,
				passwordConfirm: form.passwordConfirm,
				name: form.name.trim() || undefined
			});
			getApp().toast.create({
				title: t('Account created'),
				description: t('You are now signed in.'),
				variant: 'success'
			});
			form.close();
		} catch (error) {
			if (error instanceof AuthCreatedButSignInFailedError) {
				getApp().toast.create({
					title: t('Account created'),
					description: t(
						'Your account was created, but automatic sign-in failed. Please log in.'
					),
					variant: 'warning'
				});
				form.close();
				openLoginModal();
				return;
			}

			getApp().toast.create({
				title: t('Registration failed'),
				description:
					error instanceof Error ? error.message : t('Could not create your account.'),
				variant: 'error'
			});
		} finally {
			form.submitting = false;
		}
	}
</script>

<form id={form.formId} class="grid gap-5" onsubmit={handleSubmit}>
	<InputText
		label={t('Name')}
		autocomplete="name"
		value={form.name}
		oninput={(event) => (form.name = event.currentTarget.value)}
	/>
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
		autocomplete="new-password"
		required
		value={form.password}
		oninput={(event) => (form.password = event.currentTarget.value)}
	/>
	<InputText
		label={t('Confirm password')}
		type="password"
		autocomplete="new-password"
		required
		value={form.passwordConfirm}
		oninput={(event) => (form.passwordConfirm = event.currentTarget.value)}
	/>
	<div>
		<Button variant="link" size="sm" class="h-auto px-0" onclick={() => openLoginModal()}>
			{t('Already have an account? Log in')}
		</Button>
	</div>
</form>
