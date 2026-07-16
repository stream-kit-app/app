import type { CommandPermissions } from '@stream-kit/plugin';

const ROLE_ALIASES: Record<string, string[]> = {
	mod: ['mod', 'moderator'],
	broadcaster: ['broadcaster', 'owner'],
	vip: ['vip'],
	subscriber: ['subscriber', 'sponsor'],
	artist: ['artist'],
	founder: ['founder']
};

export const CUSTOM_ROLE_PERMISSION_PREFIX = 'role:';
/** @deprecated Use CUSTOM_ROLE_PERMISSION_PREFIX. Kept for migrating saved commands. */
export const GROUP_PERMISSION_PREFIX = 'group:';

function normalizeRole(role: string): string {
	return role.trim().toLowerCase();
}

function roleMatchesAllowed(actualRole: string, allowedRole: string): boolean {
	const normalizedActual = normalizeRole(actualRole);
	const normalizedAllowed = normalizeRole(allowedRole);
	const aliases = ROLE_ALIASES[normalizedAllowed] ?? [normalizedAllowed];

	return aliases.includes(normalizedActual);
}

export function parseCustomRolePermission(permission: string): string | null {
	if (permission.startsWith(CUSTOM_ROLE_PERMISSION_PREFIX)) {
		const roleId = permission.slice(CUSTOM_ROLE_PERMISSION_PREFIX.length).trim();
		return roleId || null;
	}

	if (permission.startsWith(GROUP_PERMISSION_PREFIX)) {
		const roleId = permission.slice(GROUP_PERMISSION_PREFIX.length).trim();
		return roleId || null;
	}

	return null;
}

export function hasPermission(
	permissions: CommandPermissions,
	role: string,
	options?: {
		isInCustomRole?: (roleId: string) => boolean;
	}
): boolean {
	if (!permissions.roles.length || permissions.roles.includes('everyone')) {
		return true;
	}

	return permissions.roles.some((allowedRole) => {
		const customRoleId = parseCustomRolePermission(allowedRole);

		if (customRoleId) {
			return options?.isInCustomRole?.(customRoleId) ?? false;
		}

		return roleMatchesAllowed(role, allowedRole);
	});
}
