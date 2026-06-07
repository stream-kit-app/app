import type { ChatMessage } from '@twurple/chat';

export function resolveUserRole(msg: ChatMessage): string {
	if (msg.userInfo.isArtist) {
		return 'artist';
	}

	if (msg.userInfo.isFounder) {
		return 'founder';
	}

	if (msg.userInfo.isMod) {
		return 'mod';
	}

	if (msg.userInfo.isBroadcaster) {
		return 'broadcaster';
	}

	if (msg.userInfo.isVip) {
		return 'vip';
	}

	if (msg.userInfo.isSubscriber) {
		return 'subscriber';
	}

	return 'user';
}
