const SOURCE_LABELS: Record<string, string> = {
	'watch-time': 'Watch time',
	follow: 'Follow',
	subscription: 'Subscription',
	cheer: 'Cheer',
	raid: 'Raid',
	manual: 'Manual adjustment',
	command: 'Command'
};

export function formatSourceLabel(source: string): string {
	return SOURCE_LABELS[source] ?? source;
}
