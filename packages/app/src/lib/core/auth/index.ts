export { Auth } from './auth.svelte';
export {
	AuthCreatedButSignInFailedError,
	AUTH_AVATAR_MAX_BYTES,
	AUTH_AVATAR_MIME_TYPES,
	AUTH_MEMBERSHIP_EXPAND,
	isPocketBaseAutoCancelled,
	pocketBaseErrorMessage,
	resolvePocketBaseUrl,
	toAccount,
	toPublicSubscription,
	toPublicSubscriptionFromMembership,
	toPublicUser,
	validateAvatarFile
} from './auth-utils';
export type {
	AuthAccount,
	AuthLoginInput,
	AuthPublicSubscription,
	AuthPublicUser,
	AuthRegisterInput,
	AuthUpdatePasswordInput,
	AuthUpdateProfileInput
} from './types';
