import NavLink from './nav-link.svelte';
import Nav from './nav.svelte';

export type NavRoute = {
	path: string;
	title: string;
	icon: string;
};

export { Nav as Root, NavLink as Link };
