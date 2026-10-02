import type { RankingsPlatform } from '../../lib/types';

const PODIUM_CLASSES: Record<number, string> = {
	1: 'text-yellow-400 light:text-yellow-700',
	2: 'text-dark-100',
	3: 'text-orange-400 light:text-orange-700'
};

/** Medal colour for leaderboard positions 1–3, `undefined` for everyone else. */
export function podiumClass(position: number): string | undefined {
	return PODIUM_CLASSES[position];
}

export function platformIcon(platform: RankingsPlatform): string {
	if (platform === 'twitch') {
		return 'ri:twitch-line';
	}

	if (platform === 'youtube') {
		return 'ri:youtube-line';
	}

	return 'ri:user-line';
}
