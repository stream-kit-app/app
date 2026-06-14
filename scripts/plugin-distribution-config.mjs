export const GITHUB_ORG = 'stream-kit-app';

export const PLUGIN_KEYS = [
	'bot',
	'core',
	'obs',
	'tts',
	'twitch',
	'websocket',
	'youtube'
];

export const PLUGIN_DESCRIPTIONS = {
	bot: 'Stream Kit Bot plugin distribution',
	core: 'Stream Kit Core Handlers plugin distribution',
	obs: 'Stream Kit OBS plugin distribution',
	tts: 'Stream Kit TTS plugin distribution',
	twitch: 'Stream Kit Twitch plugin distribution',
	websocket: 'Stream Kit WebSocket plugin distribution',
	youtube: 'Stream Kit YouTube plugin distribution'
};

export function getRepoName(key) {
	return `plugin-${key}`;
}

export function getRepoSlug(key) {
	return `${GITHUB_ORG}/${getRepoName(key)}`;
}

export function getUpdateManifestUrl(key) {
	return `https://raw.githubusercontent.com/${getRepoSlug(key)}/main/manifest.json`;
}

export function getDownloadUrl(key, version) {
	return `https://github.com/${getRepoSlug(key)}/releases/download/v${version}/plugin-${key}.zip`;
}

export function getPluginDir(root, key) {
	return `${root}/plugins/${key}`;
}

export function getZipFileName(key) {
	return `plugin-${key}.zip`;
}
