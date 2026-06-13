import type { CommandPermissions } from '@stream-kit/plugin';

const ROLE_ALIASES: Record<string, string[]> = {
	mod: ['mod', 'moderator'],
	broadcaster: ['broadcaster', 'owner'],
	vip: ['vip'],
	subscriber: ['subscriber', 'sponsor'],
	artist: ['artist'],
	founder: ['founder']
};

function normalizeRole(role: string): string {
	return role.trim().toLowerCase();
}

function roleMatchesAllowed(actualRole: string, allowedRole: string): boolean {
	const normalizedActual = normalizeRole(actualRole);
	const normalizedAllowed = normalizeRole(allowedRole);
	const aliases = ROLE_ALIASES[normalizedAllowed] ?? [normalizedAllowed];

	return aliases.includes(normalizedActual);
}

export function hasPermission(permissions: CommandPermissions, role: string): boolean {
	if (!permissions.roles.length || permissions.roles.includes('everyone')) {
		return true;
	}

	return permissions.roles.some((allowedRole) => roleMatchesAllowed(role, allowedRole));
}
