import type { StreamElementsVoice, StreamElementsVoicesResponse } from './types';

const BASE_URL = 'https://api.streamelements.com/kappa/v2';

const defaultHeaders = (): HeadersInit => ({
	Referer: 'https://streamelements.com/'
});

async function fetchWithAuth(
	apiKey: string,
	path: string,
	params?: Record<string, string>
): Promise<Response> {
	const url = new URL(`${BASE_URL}${path}`);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.set(key, value);
		}
	}

	url.searchParams.set('key', apiKey);

	return fetch(url, { headers: defaultHeaders() });
}

export async function fetchStreamElementsVoices(apiKey: string): Promise<StreamElementsVoice[]> {
	const response = await fetchWithAuth(apiKey, '/speech/voices');

	if (!response.ok) {
		throw new Error(`Failed to fetch voices (${response.status})`);
	}

	const data = (await response.json()) as StreamElementsVoicesResponse;

	return Object.values(data.voices).sort(
		(a, b) => a.languageName.localeCompare(b.languageName) || a.name.localeCompare(b.name)
	);
}

export async function fetchStreamElementsSpeech(
	apiKey: string,
	voiceId: string,
	text: string
): Promise<Blob> {
	const response = await fetchWithAuth(apiKey, '/speech', {
		voice: voiceId,
		text
	});

	if (!response.ok) {
		throw new Error(`Failed to generate speech (${response.status})`);
	}

	return response.blob();
}
