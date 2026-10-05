import type { Component } from 'svelte';

import { getApp } from '#lib/core/registry.js';
import { translate } from '#lib/i18n.js';

import { AuthModalForm } from './auth-modal-form.svelte';
import AuthModalFooter from './auth-modal-footer.svelte';
import AuthLoginForm from './auth-login-form.svelte';
import AuthPasswordResetForm from './auth-password-reset-form.svelte';
import AuthRegisterForm from './auth-register-form.svelte';

export const AUTH_LOGIN_MODAL_ID = 'auth-login';
export const AUTH_REGISTER_MODAL_ID = 'auth-register';
export const AUTH_PASSWORD_RESET_MODAL_ID = 'auth-password-reset';

function openAuthModal(options: {
	id: string;
	title: string;
	description: string;
	content: Component<any>;
	submitLabel: string;
	isValid: (form: AuthModalForm) => boolean;
}): void {
	getApp()
		.createModal({
			id: options.id,
			title: options.title,
			description: options.description,
			content: options.content,
			footer: AuthModalFooter,
			props: {
				form: new AuthModalForm(options.id, options.isValid),
				submitLabel: options.submitLabel
			},
			size: 'sm'
		})
		.open();
}

function closeOtherAuthModals(exceptId: string): void {
	const app = getApp();
	for (const id of [AUTH_LOGIN_MODAL_ID, AUTH_REGISTER_MODAL_ID, AUTH_PASSWORD_RESET_MODAL_ID]) {
		if (id !== exceptId) {
			app.modals.get(id)?.close();
		}
	}
}

export function openLoginModal(): void {
	const app = getApp();
	if (!app.auth.isConfigured) {
		app.toast.create({
			title: translate('Log in'),
			description: translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.'),
			variant: 'warning'
		});
		return;
	}
	closeOtherAuthModals(AUTH_LOGIN_MODAL_ID);
	openAuthModal({
		id: AUTH_LOGIN_MODAL_ID,
		title: translate('Log in'),
		description: translate('Sign in to your Stream Kit account.'),
		content: AuthLoginForm,
		submitLabel: translate('Log in'),
		isValid: (form) => form.email.trim().length > 0 && form.password.length > 0
	});
}

export function openRegisterModal(): void {
	const app = getApp();
	if (!app.auth.isConfigured) {
		app.toast.create({
			title: translate('Create account'),
			description: translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.'),
			variant: 'warning'
		});
		return;
	}
	closeOtherAuthModals(AUTH_REGISTER_MODAL_ID);
	openAuthModal({
		id: AUTH_REGISTER_MODAL_ID,
		title: translate('Create account'),
		description: translate('Register a Stream Kit account to sync your profile.'),
		content: AuthRegisterForm,
		submitLabel: translate('Create account'),
		isValid: (form) =>
			form.email.trim().length > 0 && form.password.length > 0 && form.passwordConfirm.length > 0
	});
}

export function openPasswordResetModal(): void {
	const app = getApp();
	if (!app.auth.isConfigured) {
		app.toast.create({
			title: translate('Reset password'),
			description: translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.'),
			variant: 'warning'
		});
		return;
	}
	closeOtherAuthModals(AUTH_PASSWORD_RESET_MODAL_ID);
	openAuthModal({
		id: AUTH_PASSWORD_RESET_MODAL_ID,
		title: translate('Reset password'),
		description: translate('We will email you a link to choose a new password.'),
		content: AuthPasswordResetForm,
		submitLabel: translate('Send reset link'),
		isValid: (form) => form.email.trim().length > 0
	});
}
