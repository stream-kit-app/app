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

