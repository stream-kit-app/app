/** Public Stream Kit account profile exposed to UI and plugins. */
export type AuthPublicSubscription = {
	key: string;
	name: string;
	/** Max bytes per uploaded file on this plan. */
	maxFileBytes: number;
	/** Total cloud storage quota for `user_files` on this plan. */
	maxStorageBytes: number;
};

export type AuthPublicUser = {
	id: string;
	name: string | null;
	avatarUrl: string | null;
	verified: boolean;
	/** Current plan from the latest active `user_subscriptions` row, when present. */
	subscription: AuthPublicSubscription | null;
};

/** Full account record for the signed-in user (app profile UI only). */
export type AuthAccount = AuthPublicUser & {
	email: string;
	/** PocketBase avatar filename when set. */
	avatar: string | null;
};

export type AuthLoginInput = {
	email: string;
	password: string;
};

export type AuthRegisterInput = {
	email: string;
	password: string;
	passwordConfirm: string;
	name?: string;
};

export type AuthUpdateProfileInput = {
	name?: string;
	/** Pass a File to upload, or `null` to clear the avatar. */
	avatar?: File | null;
};

export type AuthUpdatePasswordInput = {
	oldPassword: string;
	password: string;
	passwordConfirm: string;
};
