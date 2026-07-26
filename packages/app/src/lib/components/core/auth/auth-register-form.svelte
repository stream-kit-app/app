<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	import { AuthCreatedButSignInFailedError } from '$lib/core/auth/auth-utils';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';

	import { openLoginModal } from './open-auth-modals';

	type Props = {
		modalId?: string;
	};

	let { modalId = 'auth-register' }: Props = $props();

	const { t } = useI18n();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let submitting = $state(false);

	const canSubmit = $derived(
		email.trim().length > 0 &&
			password.length > 0 &&
			passwordConfirm.length > 0 &&
			!submitting
	);

	function closeModal(): void {
		getApp().modals.get(modalId)?.close();
	}

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		if (!canSubmit) {
			return;
		}

		if (password !== passwordConfirm) {
			getApp().toast.create({
				title: t('Create account'),
				description: t('Passwords do not match.'),
				variant: 'warning'
			});
			return;
		}

		submitting = true;
		try {
			await getApp().auth.register({
				email: email.trim(),
				password,
				passwordConfirm,
				name: name.trim() || undefined
			});
			getApp().toast.create({
				title: t('Account created'),
				description: t('You are now signed in.'),
				variant: 'success'
			});
			closeModal();
		} catch (error) {
			if (error instanceof AuthCreatedButSignInFailedError) {
				getApp().toast.create({
					title: t('Account created'),
					description: t(
						'Your account was created, but automatic sign-in failed. Please log in.'
					),
					variant: 'warning'
				});
				closeModal();
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
			submitting = false;
		}
	}
</script>

<form class="grid gap-5" onsubmit={handleSubmit}>
	<InputText
		label={t('Name')}
		autocomplete="name"
		value={name}
		oninput={(event) => (name = event.currentTarget.value)}
	/>
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
		autocomplete="new-password"
		required
		value={password}
		oninput={(event) => (password = event.currentTarget.value)}
	/>
	<InputText
		label={t('Confirm password')}
		type="password"
		autocomplete="new-password"
		required
		value={passwordConfirm}
		oninput={(event) => (passwordConfirm = event.currentTarget.value)}
	/>
	<div class="flex flex-wrap items-center justify-between gap-2">
		<button
			type="button"
			class="cursor-pointer text-sm text-primary hover:underline"
			onclick={() => openLoginModal()}
		>
			{t('Already have an account? Log in')}
		</button>
		<div class="flex flex-wrap justify-end gap-2">
			<Button variant="outline" disabled={submitting} onclick={closeModal}>{t('Cancel')}</Button>
			<Button type="submit" disabled={!canSubmit}>{t('Create account')}</Button>
		</div>
	</div>
</form>
