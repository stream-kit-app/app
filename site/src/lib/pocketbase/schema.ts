import { z } from 'zod'

const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?Z$/

export const usersSchema = z.object({
    collectionId: z.literal('_pb_users_auth_').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    password: z.string().min(8).max(71),
    tokenKey: z.string().min(30).max(60).optional(),
    email: z.string().email(),
    emailVisibility: z.boolean().optional(),
    verified: z.boolean().optional(),
    name: z.string().max(255).optional(),
    avatar: z.string().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const pluginsSchema = z.object({
    collectionId: z.literal('pbc_2111211931').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    name: z.string().min(1).max(5000),
    author: z.string().regex(/^[a-z0-9]+$/).length(15),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    key: z.string().regex(/^[a-z0-9-]+$/).min(1).max(5000),
    description: z.string().min(1).max(5000),
    icon: z.string().min(1).max(5000),
    content: z.string().max(5000).optional(),
    category: z.enum(['core', 'platform', 'streaming', 'chat', 'audio', 'hardware', 'utility']).optional(),
    tags: z.enum(['twitch', 'youtube', 'discord', 'obs', 'bot', 'tts', 'overlay', 'moderation', 'automation']).array().max(9).optional(),
    averageRating: z.number().min(0).max(5).optional(),
    ratingCount: z.number().int().min(0).optional(),
})

export const pluginVersionsSchema = z.object({
    collectionId: z.literal('pbc_4829103847').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    plugin: z.string().regex(/^[a-z0-9]+$/).length(15),
    version: z.string().min(1).max(5000),
    streamKitVersion: z.string().min(1).max(5000),
    entry: z.string().min(1).max(5000),
    changelog: z.string().optional(),
    isLatest: z.boolean().optional(),
    publishedAt: z.string().regex(DATETIME_REGEX),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    file: z.string().regex(/^[a-z0-9]+$/).length(15),
})

export const filesSchema = z.object({
    collectionId: z.literal('pbc_5829103848').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    file: z.string(),
    mimeType: z.string().max(255).optional(),
    size: z.number().min(0).optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/).max(64).optional(),
    originalName: z.string().max(5000).optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
})

export const pluginReviewsSchema = z.object({
    collectionId: z.literal('pbc_6929103849').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    plugin: z.string().regex(/^[a-z0-9]+$/).length(15),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    rating: z.number().int().min(1).max(5).refine((n) => n !== 0),
    body: z.string().max(5000).optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
})

export const subscriptionsSchema = z.object({
    collectionId: z.literal('pbc_7929103850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    key: z.string().regex(/^[a-z0-9-]+$/).min(1).max(5000),
    name: z.string().min(1).max(5000),
    description: z.string().min(1).max(5000),
    icon: z.string().min(1).max(5000),
    enabled: z.boolean().optional(),
    bullets: z.unknown().optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    maxFileBytes: z.number().int().min(0).refine((n) => n !== 0),
    maxStorageBytes: z.number().int().min(0).refine((n) => n !== 0),
})

export const userSubscriptionsSchema = z.object({
    collectionId: z.literal('pbc_8929103851').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    subscription: z.string().regex(/^[a-z0-9]+$/).length(15),
    purchasedAt: z.string().regex(DATETIME_REGEX),
    cancelledAt: z.string().regex(DATETIME_REGEX).optional(),
    status: z.enum(['active', 'cancelled', 'expired']),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    endsAt: z.string().regex(DATETIME_REGEX).optional(),
})

export const userFilesSchema = z.object({
    collectionId: z.literal('pbc_9929103852').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    file: z.string(),
    mimeType: z.string().max(5000).optional(),
    size: z.number().int().min(0).optional(),
    originalName: z.string().max(5000).optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
})

export const userActionQueuesSchema = z.object({
    collectionId: z.literal('pbc_8930103850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    name: z.string().min(1).max(5000),
    concurrency: z.number().int().optional(),
    maxLength: z.number().int().optional(),
    sortOrder: z.number().int().min(0).optional(),
    clientUpdatedAt: z.number().int().min(0).optional(),
    deletedAt: z.number().int().optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    revision: z.number().int().min(0).optional(),
})

export const userActionsSchema = z.object({
    collectionId: z.literal('pbc_8930103860').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    name: z.string().min(1).max(5000),
    group: z.string().min(1).max(5000),
    groupSortOrder: z.number().int().min(0).optional(),
    sortOrder: z.number().int().min(0).optional(),
    triggers: z.unknown(),
    handlers: z.unknown(),
    enabled: z.boolean().optional(),
    queueSyncId: z.string().regex(/^[a-z0-9]*$/).max(15).optional(),
    ownerPluginKey: z.string().max(5000).optional(),
    clientUpdatedAt: z.number().int().min(0).optional(),
    deletedAt: z.number().int().optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
    revision: z.number().int().min(0).optional(),
})

export const userOverlaysSchema = z.object({
    collectionId: z.literal('pbc_8940103850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    overlayId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/).length(36),
    name: z.string().min(1).max(5000),
    config: z.unknown().optional(),
    bundle: z.string(),
    published: z.boolean().optional(),
    revision: z.number().int().min(0).optional(),
    clientUpdatedAt: z.number().int().min(0).optional(),
    createdAt: z.string().regex(DATETIME_REGEX).optional(),
    updatedAt: z.string().regex(DATETIME_REGEX).optional(),
})

export const userPluginRecordsSchema = z.object({
    collectionId: z.literal('pbc_8940203850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    pluginKey: z.string().min(1).max(200),
    collection: z.string().min(1).max(200),
    payload: z.unknown().optional(),
    sortOrder: z.number().int().min(0).optional(),
    revision: z.number().int().min(0).optional(),
    clientUpdatedAt: z.number().optional(),
    deletedAt: z.number().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const userOverlayProjectsSchema = z.object({
    collectionId: z.literal('pbc_8950203850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    overlayId: z.string().min(1).max(64),
    name: z.string().min(1).max(5000),
    template: z.string().max(200).optional(),
    config: z.unknown().optional(),
    version: z.number().int().min(0).optional(),
    expectedEvents: z.unknown().optional(),
    requiredPlugins: z.unknown().optional(),
    installedActionKeys: z.unknown().optional(),
    source: z.string().optional(),
    sourceHash: z.string().max(128).optional(),
    revision: z.number().int().min(0).optional(),
    clientUpdatedAt: z.number().optional(),
    deletedAt: z.number().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const userDashboardWidgetsSchema = z.object({
    collectionId: z.literal('pbc_8960203850').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    definitionId: z.string().min(1).max(500),
    columns: z.number().int().min(1).optional(),
    sortOrder: z.number().int().min(0).optional(),
    revision: z.number().int().min(0).optional(),
    clientUpdatedAt: z.number().optional(),
    deletedAt: z.number().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

