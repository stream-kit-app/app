const ROLE_ALIASES: Record<string, string[]> = {
	mod: ['mod', 'moderator'],
	broadcaster: ['broadcaster', 'owner'],
	vip: ['vip'],
	subscriber: ['subscriber', 'sponsor'],
	artist: ['artist'],
	founder: ['founder'],
	user: ['user', 'viewer']
};

export function normalizeRole(role: string): string {
	return role.trim().toLowerCase();
}

export function roleMatches(actualRole: string, expectedRole: string): boolean {
	const normalizedExpected = normalizeRole(expectedRole);
	const aliases = ROLE_ALIASES[normalizedExpected] ?? [normalizedExpected];

	return aliases.includes(normalizeRole(actualRole));
}

export const moderationRoleItems = [
	{ value: 'mod', label: 'Mod' },
	{ value: 'broadcaster', label: 'Broadcaster' },
	{ value: 'vip', label: 'VIP' },
	{ value: 'subscriber', label: 'Subscriber' },
	{ value: 'user', label: 'Viewer' }
] as const;

export const DEFAULT_EXEMPT_ROLES = ['mod', 'broadcaster'];
