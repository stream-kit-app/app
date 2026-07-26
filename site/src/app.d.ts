// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces\
import type { TypedPocketBase } from '$lib/pocketbase/types';
import type { Services } from '$lib/server/services/services';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			services: Services;
			pocketbase: TypedPocketBase;
			/** Set by auth hook when wired; null until then. */
			user: { id: string; name?: string; email?: string } | null;
		}
		interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
