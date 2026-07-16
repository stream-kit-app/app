import { roles } from '../../../lib/instances';
import type { Roles } from './roles.svelte';

export function getRolesService(): Roles {
	return roles;
}

export function tryGetRolesService(): Roles | undefined {
	return roles.isReady ? roles : undefined;
}
