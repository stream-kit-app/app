import type { Component } from 'svelte';

import { getApp } from '$lib/core/registry';
import { translate } from '$lib/i18n';

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
	content: Component;
}): void {
	getApp()
		.createModal({
			id: options.id,
			title: options.title,
			description: options.description,
			content: options.content,
			props: { modalId: options.id },
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
		content: AuthLoginForm
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
		content: AuthRegisterForm
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
		content: AuthPasswordResetForm
	});
}
