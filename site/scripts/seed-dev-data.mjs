import { fileURLToPath } from 'node:url';

import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL ?? 'admin@stream-kit.local';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD ?? 'stream-kit-dev';

/** @typedef {'off' | 'plan' | 'full'} SeedMode */

const DEV_PLAN = {
	key: 'pro',
	name: 'Pro',
	description: 'Local development plan with cloud features enabled.',
	icon: 'ri:vip-crown-line',
	enabled: true,
	bullets: ['Cloud sync', 'Cloud files', 'Cloud overlays'],
	maxFileBytes: 25 * 1024 * 1024,
	maxStorageBytes: 500 * 1024 * 1024
};

/**
 * @param {string | undefined} raw
 * @returns {SeedMode}
 */
export function resolveSeedMode(raw = process.env.SK_DEV_SEED) {
	const value = (raw ?? 'full').trim().toLowerCase();
	if (value === '0' || value === 'off' || value === 'false' || value === 'no') {
		return 'off';
	}
	if (value === 'plan') {
		return 'plan';
	}
	return 'full';
}

/**
 * @param {string} rawUrl
 */
export function assertLocalPocketBaseUrl(rawUrl) {
	let parsed;
	try {
		parsed = new URL(rawUrl);
	} catch {
		throw new Error(`Invalid PUBLIC_POCKETBASE_URL: ${rawUrl}`);
	}

	const host = parsed.hostname.toLowerCase();
	if (host !== '127.0.0.1' && host !== 'localhost' && host !== '::1') {
		throw new Error(
			`Refusing to seed PocketBase at ${rawUrl} (not localhost). ` +
				`Dev seed only runs against 127.0.0.1 / localhost. Set SK_DEV_SEED=0 to skip.`
		);
	}

	return parsed;
}

function pocketBaseDate(date = new Date()) {
	return date.toISOString().replace('T', ' ');
}

async function ensurePlan(pb) {
	try {
		const existing = await pb.collection('subscriptions').getFirstListItem(`key="${DEV_PLAN.key}"`);
		console.log(`[seed-dev] Plan already exists: ${existing.key} (${existing.id})`);
		return existing;
	} catch {
		const created = await pb.collection('subscriptions').create({ ...DEV_PLAN });
		console.log(`[seed-dev] Created plan: ${created.key} (${created.id})`);
		return created;
	}
}

/**
 * @param {import('pocketbase').default} pb
 * @param {string} planId
 */
async function ensureMemberships(pb, planId) {
	const users = await pb.collection('users').getFullList({ fields: 'id,email' });
	let created = 0;

	for (const user of users) {
		const memberships = await pb.collection('user_subscriptions').getFullList({
			filter: `user="${user.id}"`,
			fields: 'id,status,endsAt'
		});

		const entitled = memberships.some((row) => {
			if (row.status === 'active') return true;
			if (row.status === 'cancelled' && row.endsAt) {
				const endsAtMs = Date.parse(String(row.endsAt).replace(' ', 'T'));
				return Number.isFinite(endsAtMs) && endsAtMs > Date.now();
			}
			return false;
		});

		if (entitled) continue;

		await pb.collection('user_subscriptions').create({
			user: user.id,
			subscription: planId,
			purchasedAt: pocketBaseDate(),
			status: 'active'
		});
		created += 1;
	}

	return { users: users.length, created };
}

async function main() {
	const mode = resolveSeedMode();
	if (mode === 'off') {
		console.log('[seed-dev] Skipped (SK_DEV_SEED=0)');
		return;
	}

	assertLocalPocketBaseUrl(POCKETBASE_URL);

	const pb = new PocketBase(POCKETBASE_URL);
	await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

	const plan = await ensurePlan(pb);

	if (mode === 'plan') {
		console.log('[seed-dev] Memberships skipped (SK_DEV_SEED=plan)');
		return;
	}

	const { users, created } = await ensureMemberships(pb, plan.id);
	console.log(`[seed-dev] Memberships: ${users} user(s), ${created} new active row(s)`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	main().catch((error) => {
		console.error('[seed-dev]', error.message ?? error);
		process.exit(1);
	});
}
