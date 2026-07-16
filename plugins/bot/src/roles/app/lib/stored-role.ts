export type RolePlatform = 'twitch' | 'youtube' | 'unknown';

export type RoleRecord = {
	id: string;
	name: string;
	memberIds: string[];
	memberNames: Record<string, string>;
	createdAt: string;
	updatedAt: string;
};
