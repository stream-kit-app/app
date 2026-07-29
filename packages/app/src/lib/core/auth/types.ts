/** Public Stream Kit account profile exposed to UI and plugins. */
export type AuthPublicSubscription = {
	key: string;
	name: string;
	/** Max bytes per uploaded file on this plan. */
	maxFileBytes: number;
	/** Total cloud storage quota for `user_files` on this plan. */
	maxStorageBytes: number;
	/**
	 * When the membership is cancelled but still in the grace period,
	 * ISO date string for when cloud access ends. Otherwise omitted/null.
	 */
	endsAt?: string | null;
};

export type AuthPublicUser = {
	id: string;
	name: string | null;
	avatarUrl: string | null;
	verified: boolean;
	/** Current plan from the latest entitled `user_subscriptions` row (active or cancelled-in-grace). */
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
