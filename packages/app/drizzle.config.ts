import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/schemas/index.ts',
	out: './drizzle',
	dbCredentials: {
		url: 'file:C:/Users/Richa/AppData/Roaming/app.stream-kit/app.db'
	}
});
