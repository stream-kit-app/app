/// <reference types="@cloudflare/workers-types" />
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { TypedPocketBase } from '#lib/pocketbase/types.js';
import type { Services } from '#lib/server/services/services.js';

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
	}

	/** Worker bindings, read via `import { env } from 'cloudflare:workers'`. */
	namespace Cloudflare {
		interface Env {
			ASSETS: Fetcher;
			OVERLAY_ROOMS: DurableObjectNamespace;
			PUBLIC_POCKETBASE_URL: string;
		}
	}
}

export {};
