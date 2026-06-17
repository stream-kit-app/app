import { defineEnvVars } from '@sveltejs/kit/hooks';

export const variables = defineEnvVars({
	PUBLIC_POCKETBASE_URL: {
		public: true
	}
});
