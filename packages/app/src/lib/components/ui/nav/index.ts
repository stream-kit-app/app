import type { PathnameWithSearchOrHash } from '$app/types';
import type { RouteIdWithSearchOrHash } from '$app/types';
import NavLink from './nav-link.svelte';
import Nav from './nav.svelte';

export type NavRoute = {
	path: RouteIdWithSearchOrHash | PathnameWithSearchOrHash;
	title: string;
	icon: string;
};

export { Nav as Root, NavLink as Link };
