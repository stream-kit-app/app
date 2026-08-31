import type { ElevenLabsModel, ElevenLabsVoice } from './types';

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
const SPEECH_FETCH_TIMEOUT_MS = 30_000;

function createClient(apiKey: string): ElevenLabsClient {
	return new ElevenLabsClient({ apiKey: apiKey.trim() });
}

function withTimeout<T>(work: Promise<T>, ms: number, message: string): Promise<T> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error(message));
		}, ms);

		work.then(
			(value) => {
				clearTimeout(timer);
				resolve(value);
			},
			(error: unknown) => {
				clearTimeout(timer);
				reject(error);
			}
		);
	});
}

async function streamToBlob(stream: ReadableStream<Uint8Array>): Promise<Blob> {
	const reader = stream.getReader();
	const chunks: Uint8Array[] = [];

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		if (value) {
			chunks.push(value);
		}
	}

	return new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
}

export async function fetchElevenLabsModels(apiKey: string): Promise<ElevenLabsModel[]> {
	const client = createClient(apiKey);
	const models = await client.models.list();

	return models
		.filter((model) => model.canDoTextToSpeech && model.modelId)
		.map((model) => ({
			id: model.modelId,
			name: model.name ?? model.modelId
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchElevenLabsVoices(apiKey: string): Promise<ElevenLabsVoice[]> {
	const client = createClient(apiKey);
	const response = await client.voices.getAll();

	return response.voices
		.map((voice) => ({
			id: voice.voiceId,
			name: voice.name ?? voice.voiceId,
			language: voice.labels?.language ?? voice.verifiedLanguages?.[0]?.language
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchElevenLabsSpeech(
	apiKey: string,
	voiceId: string,
	text: string,
	modelId = DEFAULT_MODEL_ID
): Promise<Blob> {
	const client = createClient(apiKey);
	const stream = await withTimeout(
		client.textToSpeech.convert(voiceId, {
			text,
			modelId,
			outputFormat: 'mp3_44100_128'
		}),
		SPEECH_FETCH_TIMEOUT_MS,
		'ElevenLabs speech request timed out'
	);

	return withTimeout(
		streamToBlob(stream),
		SPEECH_FETCH_TIMEOUT_MS,
		'ElevenLabs speech stream timed out'
	);
}
