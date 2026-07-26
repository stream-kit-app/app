/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export const Collections = {
	Authorigins: "_authOrigins",
	Externalauths: "_externalAuths",
	Mfas: "_mfas",
	Otps: "_otps",
	Superusers: "_superusers",
	Files: "files",
	PluginReviews: "plugin_reviews",
	PluginVersions: "plugin_versions",
	Plugins: "plugins",
	Subscriptions: "subscriptions",
	UserActionQueues: "user_action_queues",
	UserActions: "user_actions",
	UserFiles: "user_files",
	UserSubscriptions: "user_subscriptions",
	Users: "users",
} as const
export type Collections = typeof Collections[keyof typeof Collections]

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type FilesRecord = {
	createdAt: IsoAutoDateString
	file: FileNameString
	id: string
	mimeType?: string
	originalName?: string
	sha256?: string
	size?: number
	updatedAt: IsoAutoDateString
}

export type PluginReviewsRecord = {
	body?: string
	createdAt: IsoAutoDateString
	id: string
	plugin: RecordIdString
	rating: number
	updatedAt: IsoAutoDateString
	user: RecordIdString
}

export type PluginVersionsRecord = {
	changelog?: HTMLString
	createdAt: IsoAutoDateString
	entry: string
	file: RecordIdString
	id: string
	isLatest?: boolean
	plugin: RecordIdString
	publishedAt: IsoDateString
	streamKitVersion: string
	updatedAt: IsoAutoDateString
	version: string
}

export const PluginsCategoryOptions = {
	"core": "core",
	"platform": "platform",
	"streaming": "streaming",
	"chat": "chat",
	"audio": "audio",
	"hardware": "hardware",
	"utility": "utility",
} as const
export type PluginsCategoryOptions = typeof PluginsCategoryOptions[keyof typeof PluginsCategoryOptions]

export const PluginsTagsOptions = {
	"twitch": "twitch",
	"youtube": "youtube",
	"discord": "discord",
	"obs": "obs",
	"bot": "bot",
	"tts": "tts",
	"overlay": "overlay",
	"moderation": "moderation",
	"automation": "automation",
} as const
export type PluginsTagsOptions = typeof PluginsTagsOptions[keyof typeof PluginsTagsOptions]
export type PluginsRecord = {
	author: RecordIdString
	averageRating?: number
	category?: PluginsCategoryOptions
	content?: string
	createdAt: IsoAutoDateString
	description: string
	icon: string
	id: string
	key: string
	name: string
	ratingCount?: number
	tags?: PluginsTagsOptions[]
	updatedAt: IsoAutoDateString
}

export type SubscriptionsRecord<Tbullets = unknown> = {
	bullets?: null | Tbullets
	createdAt: IsoAutoDateString
	description: string
	enabled?: boolean
	icon: string
	id: string
	key: string
	maxFileBytes: number
	maxStorageBytes: number
	name: string
	updatedAt: IsoAutoDateString
}

export type UserActionQueuesRecord = {
	clientUpdatedAt?: number
	concurrency?: number
	createdAt: IsoAutoDateString
	deletedAt?: number
	id: string
	maxLength?: number
	name: string
	sortOrder?: number
	updatedAt: IsoAutoDateString
	user: RecordIdString
}

export type UserActionsRecord<Thandlers = unknown, Ttriggers = unknown> = {
	clientUpdatedAt?: number
	createdAt: IsoAutoDateString
	deletedAt?: number
	enabled?: boolean
	group: string
	groupSortOrder?: number
	handlers: null | Thandlers
	id: string
	name: string
	ownerPluginKey?: string
	queueSyncId?: string
	sortOrder?: number
	triggers: null | Ttriggers
	updatedAt: IsoAutoDateString
	user: RecordIdString
}

export type UserFilesRecord = {
	createdAt: IsoAutoDateString
	file: FileNameString
	id: string
	mimeType?: string
	originalName?: string
	size?: number
	updatedAt: IsoAutoDateString
	user: RecordIdString
}

export const UserSubscriptionsStatusOptions = {
	"active": "active",
	"cancelled": "cancelled",
	"expired": "expired",
} as const
export type UserSubscriptionsStatusOptions = typeof UserSubscriptionsStatusOptions[keyof typeof UserSubscriptionsStatusOptions]
export type UserSubscriptionsRecord = {
	cancelledAt?: IsoDateString
	createdAt: IsoAutoDateString
	id: string
	purchasedAt: IsoDateString
	status: UserSubscriptionsStatusOptions
	subscription: RecordIdString
	updatedAt: IsoAutoDateString
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type PluginReviewsResponse<Texpand = unknown> = Required<PluginReviewsRecord> & BaseSystemFields<Texpand>
export type PluginVersionsResponse<Texpand = unknown> = Required<PluginVersionsRecord> & BaseSystemFields<Texpand>
export type PluginsResponse<Texpand = unknown> = Required<PluginsRecord> & BaseSystemFields<Texpand>
export type SubscriptionsResponse<Tbullets = unknown, Texpand = unknown> = Required<SubscriptionsRecord<Tbullets>> & BaseSystemFields<Texpand>
export type UserActionQueuesResponse<Texpand = unknown> = Required<UserActionQueuesRecord> & BaseSystemFields<Texpand>
export type UserActionsResponse<Thandlers = unknown, Ttriggers = unknown, Texpand = unknown> = Required<UserActionsRecord<Thandlers, Ttriggers>> & BaseSystemFields<Texpand>
export type UserFilesResponse<Texpand = unknown> = Required<UserFilesRecord> & BaseSystemFields<Texpand>
export type UserSubscriptionsResponse<Texpand = unknown> = Required<UserSubscriptionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	files: FilesRecord
	plugin_reviews: PluginReviewsRecord
	plugin_versions: PluginVersionsRecord
	plugins: PluginsRecord
	subscriptions: SubscriptionsRecord
	user_action_queues: UserActionQueuesRecord
	user_actions: UserActionsRecord
	user_files: UserFilesRecord
	user_subscriptions: UserSubscriptionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	files: FilesResponse
	plugin_reviews: PluginReviewsResponse
	plugin_versions: PluginVersionsResponse
	plugins: PluginsResponse
	subscriptions: SubscriptionsResponse
	user_action_queues: UserActionQueuesResponse
	user_actions: UserActionsResponse
	user_files: UserFilesResponse
	user_subscriptions: UserSubscriptionsResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
