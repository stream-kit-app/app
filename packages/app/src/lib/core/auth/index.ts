export { Auth } from './auth.svelte';
export {
	AuthCreatedButSignInFailedError,
	AUTH_AVATAR_MAX_BYTES,
	AUTH_AVATAR_MIME_TYPES,
	AUTH_MEMBERSHIP_EXPAND,
	isPocketBaseAutoCancelled,
	isPocketBaseNotFound,
	isPocketBaseUnauthorized,
	pocketBaseErrorMessage,
	resolvePocketBaseUrl,
	toAccount,
	toPublicSubscription,
	toPublicSubscriptionFromMembership,
	toPublicUser,
	validateAvatarFile
} from './auth-utils';
export {
	SUBSCRIPTION_GRACE_MS,
	formatEndsAtIso,
	isMembershipEntitled,
	parsePbDateToMs
} from './subscription-entitlement';
export type {
	AuthAccount,
	AuthLoginInput,
	AuthPublicSubscription,
	AuthPublicUser,
	AuthRegisterInput,
	AuthUpdatePasswordInput,
	AuthUpdateProfileInput
} from './types';
