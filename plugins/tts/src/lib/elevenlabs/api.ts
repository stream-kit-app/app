import type {
	ElevenLabsAccount,
	ElevenLabsModel,
	ElevenLabsRetention,
	ElevenLabsVoice,
	ElevenLabsVoiceSettings
} from './types';

import { ElevenLabsClient, ElevenLabsError } from '@elevenlabs/elevenlabs-js';

import { DEFAULT_ELEVENLABS_MODEL_ID } from './types';

const SPEECH_FETCH_TIMEOUT_MS = 30_000;
const OUTPUT_FORMAT = 'mp3_44100_128';
const HISTORY_ITEM_HEADER = 'history-item-id';
const HISTORY_LOOKUP_PAGE_SIZE = 5;

let cachedClient: { apiKey: string; client: ElevenLabsClient } | undefined;

function getClient(apiKey: string): ElevenLabsClient {
	const key = apiKey.trim();

	if (cachedClient?.apiKey !== key) {
		cachedClient = { apiKey: key, client: new ElevenLabsClient({ apiKey: key }) };
	}

	return cachedClient.client;
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

/** True when ElevenLabs refused `enable_logging=false` (zero retention is enterprise-only). */
export function isZeroRetentionRejected(error: unknown): boolean {
	if (!(error instanceof ElevenLabsError)) {
		return false;
	}

	if (error.statusCode !== 400 && error.statusCode !== 401 && error.statusCode !== 403) {
		return false;
	}

	const body = JSON.stringify(error.body ?? '').toLowerCase();

	return /logging|retention|enterprise/.test(body);
}

/** Account + subscription for the key. Needs the `user_read` permission on restricted keys. */
export async function fetchElevenLabsAccount(apiKey: string): Promise<ElevenLabsAccount> {
	try {
		const user = await getClient(apiKey).user.get();
		const { subscription } = user;

		return {
			userId: user.userId,
			firstName: user.firstName || undefined,
			apiKeyPreview: user.xiApiKeyPreview || undefined,
			tier: subscription.tier,
			status: subscription.status,
			characterCount: subscription.characterCount,
			characterLimit: subscription.characterLimit,
			nextResetUnix: subscription.nextCharacterCountResetUnix,
			voiceSlotsUsed: subscription.voiceSlotsUsed,
			voiceLimit: subscription.voiceLimit
		};
	} catch (error) {
		if (error instanceof ElevenLabsError && error.statusCode === 401) {
			const body = JSON.stringify(error.body ?? '').toLowerCase();

			throw new Error(
				body.includes('permission')
					? 'This API key is missing the "User: Read" permission.'
					: 'ElevenLabs rejected this API key.'
			);
		}

		throw error;
	}
}

export async function fetchElevenLabsModels(apiKey: string): Promise<ElevenLabsModel[]> {
	const models = await getClient(apiKey).models.list();

	return models
		.filter((model) => model.canDoTextToSpeech && model.modelId)
		.map((model) => ({
			id: model.modelId,
			name: model.name ?? model.modelId
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchElevenLabsVoices(apiKey: string): Promise<ElevenLabsVoice[]> {
	const response = await getClient(apiKey).voices.getAll();

	return response.voices
		.map((voice) => ({
			id: voice.voiceId,
			name: voice.name ?? voice.voiceId,
			language: voice.labels?.language ?? voice.verifiedLanguages?.[0]?.language,
			category: voice.category,
			description: voice.description || undefined,
			previewUrl: voice.previewUrl || undefined,
			labels: voice.labels
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export type ElevenLabsVoiceCloneRequest = {
	name: string;
	description?: string;
	files: File[];
	removeBackgroundNoise?: boolean;
};

/** Instant voice clone from audio samples. Returns the new voice id. */
export async function cloneElevenLabsVoice(
	apiKey: string,
	request: ElevenLabsVoiceCloneRequest
): Promise<string> {
	const response = await getClient(apiKey).voices.ivc.create({
		name: request.name,
		description: request.description || undefined,
		files: request.files,
		removeBackgroundNoise: request.removeBackgroundNoise
	});

	return response.voiceId;
}

export async function deleteElevenLabsVoice(apiKey: string, voiceId: string): Promise<void> {
	await getClient(apiKey).voices.delete(voiceId);
}

/** Download a voice's hosted preview clip. */
export async function fetchElevenLabsPreviewClip(previewUrl: string): Promise<Blob> {
	const response = await withTimeout(
		fetch(previewUrl),
		SPEECH_FETCH_TIMEOUT_MS,
		'Voice preview request timed out'
	);

	if (!response.ok) {
		throw new Error(`Voice preview failed (${response.status})`);
	}

	return response.blob();
}

type SpeechRequest = {
	voiceId: string;
	text: string;
	modelId: string;
	voiceSettings?: ElevenLabsVoiceSettings;
	enableLogging: boolean;
};

async function requestSpeech(
	client: ElevenLabsClient,
	request: SpeechRequest
): Promise<{ blob: Blob; historyItemId?: string }> {
	const { data, rawResponse } = await withTimeout(
		client.textToSpeech
			.convert(request.voiceId, {
				text: request.text,
				modelId: request.modelId,
				outputFormat: OUTPUT_FORMAT,
				voiceSettings: request.voiceSettings,
				enableLogging: request.enableLogging
			})
			.withRawResponse(),
		SPEECH_FETCH_TIMEOUT_MS,
		'ElevenLabs speech request timed out'
	);

	const blob = await withTimeout(
		streamToBlob(data),
		SPEECH_FETCH_TIMEOUT_MS,
		'ElevenLabs speech stream timed out'
	);

	return {
		blob,
		historyItemId: rawResponse.headers.get(HISTORY_ITEM_HEADER) ?? undefined
	};
}

async function findHistoryItemId(
	client: ElevenLabsClient,
	voiceId: string,
	text: string
): Promise<string | undefined> {
	const response = await client.history.list({ pageSize: HISTORY_LOOKUP_PAGE_SIZE, voiceId });

	return response.history.find((item) => item.text === text)?.historyItemId;
}

/** Removes the generated clip (text + audio) from the account's history. */
async function deleteHistoryItem(
	client: ElevenLabsClient,
	request: SpeechRequest,
	historyItemId: string | undefined
): Promise<boolean> {
	try {
		const id =
			historyItemId ?? (await findHistoryItemId(client, request.voiceId, request.text));

		if (!id) {
			console.warn('[tts/elevenlabs] Could not find the history item to delete');
			return false;
		}

		await client.history.delete(id);
		return true;
	} catch (error: unknown) {
		console.warn('[tts/elevenlabs] Failed to delete history item', error);
		return false;
	}
}

export type ElevenLabsSpeechOptions = {
	modelId?: string;
	voiceSettings?: ElevenLabsVoiceSettings;
	/** Keep the text and audio out of the ElevenLabs history. */
	privacy?: boolean;
	/** Skip the zero-retention attempt when it is known to be rejected for this key. */
	zeroRetentionSupported?: boolean;
};

export type ElevenLabsSpeechResult = {
	blob: Blob;
	retention: ElevenLabsRetention;
	/** Resolves `false` when the history item could not be removed. Only set for `deleted`. */
	historyCleanup?: Promise<boolean>;
};

export async function fetchElevenLabsSpeech(
	apiKey: string,
	voiceId: string,
	text: string,
	options: ElevenLabsSpeechOptions = {}
): Promise<ElevenLabsSpeechResult> {
	const client = getClient(apiKey);
	const request: SpeechRequest = {
		voiceId,
		text,
		modelId: options.modelId || DEFAULT_ELEVENLABS_MODEL_ID,
		voiceSettings: options.voiceSettings,
		enableLogging: true
	};

	if (!options.privacy) {
		const { blob } = await requestSpeech(client, request);

		return { blob, retention: 'kept' };
	}

	if (options.zeroRetentionSupported !== false) {
		try {
			const { blob } = await requestSpeech(client, { ...request, enableLogging: false });

			return { blob, retention: 'zero' };
		} catch (error: unknown) {
			if (!isZeroRetentionRejected(error)) {
				throw error;
			}
		}
	}

	const { blob, historyItemId } = await requestSpeech(client, request);

	// Don't hold playback hostage to the cleanup round trip.
	return {
		blob,
		retention: 'deleted',
		historyCleanup: deleteHistoryItem(client, request, historyItemId)
	};
}
