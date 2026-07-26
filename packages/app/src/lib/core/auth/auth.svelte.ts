import PocketBase, { type RecordModel } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

import { translate } from '$lib/i18n';

import {
	AUTH_MEMBERSHIP_EXPAND,
	AuthCreatedButSignInFailedError,
	isPocketBaseAutoCancelled,
	pocketBaseErrorMessage,
	resolvePocketBaseUrl,
	toAccount,
	toPublicSubscriptionFromMembership,
	toPublicUser,
	validateAvatarFile
} from './auth-utils';
import { createTauriAuthStore } from './tauri-auth-store';
import type {
	AuthAccount,
	AuthLoginInput,
	AuthPublicSubscription,
	AuthPublicUser,
	AuthRegisterInput,
	AuthUpdatePasswordInput,
	AuthUpdateProfileInput
} from './types';

type AuthChangeHandler = (user: AuthPublicUser | null) => void;

const membershipExpandOptions = { expand: AUTH_MEMBERSHIP_EXPAND } as const;

export class Auth {
	#pb: PocketBase | null = null;
	#unsubscribe: (() => void) | null = null;
	#listeners = new Set<AuthChangeHandler>();
	#subscriptionRequestId = 0;
	#activeMembershipId: string | null = null;

	user = $state.raw<AuthPublicUser | null>(null);
	account = $state.raw<AuthAccount | null>(null);
	isAuthenticated = $derived(this.user != null);
	/** False when `PUBLIC_POCKETBASE_URL` is missing. */
	isConfigured = $state(false);

	get client(): PocketBase {
		if (!this.#pb) {
			throw new Error(
				translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.')
			);
		}
		return this.#pb;
	}

	async boot(): Promise<this> {
		if (this.#pb) {
			return this;
		}

		const url = resolvePocketBaseUrl(PUBLIC_POCKETBASE_URL);
		if (!url) {
			console.warn('PUBLIC_POCKETBASE_URL is not set; Stream Kit account auth is disabled.');
			this.isConfigured = false;
			return this;
		}

		const pb = new PocketBase(url, await createTauriAuthStore());
		this.#pb = pb;
		this.isConfigured = true;

		this.#unsubscribe = pb.authStore.onChange(() => {
			this.#syncFromStore();
		}, true);

		if (pb.authStore.isValid) {
			try {
				await pb.collection('users').authRefresh();
			} catch (error) {
				console.warn('Failed to refresh Stream Kit account session', error);
				pb.authStore.clear();
			}
		}

		return this;
	}

	destroy(): void {
		this.#unsubscribe?.();
		this.#unsubscribe = null;
		this.#listeners.clear();
		this.#subscriptionRequestId += 1;
		this.#activeMembershipId = null;
		this.#pb = null;
		this.isConfigured = false;
		this.user = null;
		this.account = null;
	}

	async login(input: AuthLoginInput): Promise<void> {
		const email = input.email.trim();
		const password = input.password;
		if (!email || !password) {
			throw new Error(translate('Email and password are required.'));
		}

		try {
			await this.client.collection('users').authWithPassword(email, password);
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not log in. Check your credentials.'))
			);
		}
	}

	async register(input: AuthRegisterInput): Promise<void> {
		const email = input.email.trim();
		const password = input.password;
		const passwordConfirm = input.passwordConfirm;
		const name = input.name?.trim();

		if (!email || !password || !passwordConfirm) {
			throw new Error(translate('Email and password are required.'));
		}
		if (password !== passwordConfirm) {
			throw new Error(translate('Passwords do not match.'));
		}

		try {
			await this.client.collection('users').create({
				email,
				password,
				passwordConfirm,
				...(name ? { name } : {})
			});
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not create your account.'))
			);
		}

		try {
			await this.client.collection('users').authWithPassword(email, password);
		} catch (error) {
			throw new AuthCreatedButSignInFailedError(
				email,
				pocketBaseErrorMessage(
					error,
					translate(
						'Your account was created, but automatic sign-in failed. Please log in.'
					)
				)
			);
		}
	}

	async logout(): Promise<void> {
		if (!this.#pb) {
			return;
		}
		this.#pb.authStore.clear();
	}

	async updateProfile(input: AuthUpdateProfileInput): Promise<void> {
		const record = this.client.authStore.record;
		if (!record?.id) {
			throw new Error(translate('You must be logged in to update your profile.'));
		}

		if (input.avatar instanceof File) {
			const avatarError = validateAvatarFile(input.avatar);
			if (avatarError) {
				throw new Error(translate(avatarError));
			}
		}

		const body = new FormData();
		if (input.name !== undefined) {
			body.set('name', input.name.trim());
		}
		if (input.avatar instanceof File) {
			body.set('avatar', input.avatar);
		} else if (input.avatar === null) {
			body.set('avatar', '');
		}

		try {
			const updated = await this.client.collection('users').update(record.id, body);
			this.client.authStore.save(this.client.authStore.token, updated);
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not update your profile.'))
			);
		}
	}

	/**
	 * Request an email change. PocketBase sends a confirmation link to the new address;
	 * the email is not updated until the user confirms.
	 */
	async requestEmailChange(newEmail: string): Promise<void> {
		const email = newEmail.trim();
		if (!email) {
			throw new Error(translate('Email is required.'));
		}

		const record = this.client.authStore.record;
		if (!record?.id) {
			throw new Error(translate('You must be logged in to change your email.'));
		}

		const current =
			typeof record.email === 'string' ? record.email.trim().toLowerCase() : '';
		if (email.toLowerCase() === current) {
			throw new Error(translate('Enter a different email address.'));
		}

		try {
			await this.client.collection('users').requestEmailChange(email);
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not request an email change.'))
			);
		}
	}

	async updatePassword(input: AuthUpdatePasswordInput): Promise<void> {
		const record = this.client.authStore.record;
		if (!record?.id) {
			throw new Error(translate('You must be logged in to change your password.'));
		}
		if (!input.oldPassword || !input.password || !input.passwordConfirm) {
			throw new Error(translate('All password fields are required.'));
		}
		if (input.password !== input.passwordConfirm) {
			throw new Error(translate('Passwords do not match.'));
		}

		const email = typeof record.email === 'string' ? record.email : '';
		if (!email) {
			throw new Error(translate('Could not change your password.'));
		}

		try {
			await this.client.collection('users').update(record.id, {
				oldPassword: input.oldPassword,
				password: input.password,
				passwordConfirm: input.passwordConfirm
			});
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not change your password.'))
			);
		}

		try {
			// Password changes invalidate the previous tokenKey; re-authenticate.
			await this.client.collection('users').authWithPassword(email, input.password);
		} catch (error) {
			this.client.authStore.clear();
			throw new Error(
				pocketBaseErrorMessage(
					error,
					translate('Password was changed, but sign-in failed. Please log in again.')
				)
			);
		}
	}

	async cancelSubscription(): Promise<void> {
		const membershipId = this.#activeMembershipId;
		if (!this.user?.subscription || !membershipId) {
			throw new Error(translate('No active subscription to cancel.'));
		}

		try {
			await this.client.collection('user_subscriptions').update(membershipId, {
				status: 'cancelled',
				cancelledAt: new Date().toISOString().replace('T', ' ')
			});
		} catch (error) {
			throw new Error(
				pocketBaseErrorMessage(error, translate('Could not cancel your subscription.'))
			);
		}

		this.#activeMembershipId = null;
		if (this.user) {
			this.user = { ...this.user, subscription: null };
		}
		if (this.account) {
			this.account = { ...this.account, subscription: null };
		}
		this.#emit();
	}

	onChange(handler: AuthChangeHandler): () => void {
		this.#listeners.add(handler);
		handler(this.user);
		return () => {
			this.#listeners.delete(handler);
		};
	}

	#syncFromStore(): void {
		const pb = this.#pb;
		if (!pb) {
			this.#subscriptionRequestId += 1;
			this.#activeMembershipId = null;
			this.user = null;
			this.account = null;
			this.#emit();
			return;
		}

		const getFileUrl = (record: RecordModel, filename: string) =>
			pb.files.getURL(record, filename);
		const record = pb.authStore.record;
		if (!record?.id) {
			this.#subscriptionRequestId += 1;
			this.#activeMembershipId = null;
		}
		const previous = this.user;
		const keepSubscription =
			previous && record?.id === previous.id ? previous.subscription : null;
		if (!keepSubscription) {
			this.#activeMembershipId = null;
		}

		this.user = toPublicUser(getFileUrl, record, keepSubscription);
		this.account = toAccount(getFileUrl, record, keepSubscription);
		this.#emit();
		void this.#refreshSubscription(record?.id ?? null);
	}

	async #refreshSubscription(userId: string | null): Promise<void> {
		const requestId = ++this.#subscriptionRequestId;
		if (!userId || !this.#pb) {
			return;
		}

		try {
			const subscription = await this.#fetchActiveSubscription(userId);
			if (requestId !== this.#subscriptionRequestId || this.user?.id !== userId) {
				return;
			}

			this.user = { ...this.user, subscription };
			if (this.account?.id === userId) {
				this.account = { ...this.account, subscription };
			}
			this.#emit();
		} catch (error) {
			if (requestId !== this.#subscriptionRequestId) {
				return;
			}
			if (isPocketBaseAutoCancelled(error)) {
				return;
			}
			console.warn('Failed to load Stream Kit account subscription', error);
		}
	}

	async #fetchActiveSubscription(userId: string): Promise<AuthPublicSubscription | null> {
		const result = await this.client.collection('user_subscriptions').getList(1, 1, {
			filter: `user="${userId}" && status="active"`,
			sort: '-purchasedAt',
			// Avoid PB SDK auto-cancel when authStore sync fires multiple times quickly.
			requestKey: null,
			...membershipExpandOptions
		});

		const membership = result.items[0] ?? null;
		this.#activeMembershipId =
			membership && typeof membership.id === 'string' ? membership.id : null;

		return toPublicSubscriptionFromMembership(membership);
	}

	#emit(): void {
		for (const handler of this.#listeners) {
			try {
				handler(this.user);
			} catch (error) {
				console.error('app.auth.onChange listener failed', error);
			}
		}
	}
}
