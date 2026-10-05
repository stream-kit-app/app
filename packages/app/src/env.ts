import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_POCKETBASE_URL: {
		public: true,
		static: true
	},
	PUBLIC_SITE_URL: {
		public: true,
		// Optional: cloud publishing is disabled when unset (see `resolveSiteUrl`).
		schema: (value) => value
	}
});
