import type { YouTubeAuthorDetails } from './types';

export function resolveUserRole(author?: YouTubeAuthorDetails): string {
	if (!author) {
		return 'viewer';
	}

	if (author.isChatOwner) {
		return 'owner';
	}

	if (author.isChatModerator) {
		return 'moderator';
	}

	if (author.isChatSponsor) {
		return 'sponsor';
	}

	return 'viewer';
}
