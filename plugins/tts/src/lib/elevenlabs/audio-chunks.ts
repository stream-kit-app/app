/** Max upload size per sample accepted by ElevenLabs instant cloning. */
export const MAX_CLONE_SAMPLE_BYTES = 10 * 1024 * 1024;
/** More audio barely improves an instant clone; longer recordings are trimmed. */
export const MAX_CLONE_SECONDS = 5 * 60;
/** Mono 16-bit at 22.05 kHz ≈ 44 KB/s, so 3 minutes stays well under 10 MB. */
const CHUNK_SECONDS = 3 * 60;
const SAMPLE_RATE = 22_050;

export type PreparedCloneAudio = {
	files: File[];
	/** Length of the audio that is sent, in seconds (only known when processed). */
	durationSeconds?: number;
	/** The recording was split into several samples. */
	chunked: boolean;
	/** The recording was longer than {@link MAX_CLONE_SECONDS} and was cut. */
	trimmed: boolean;
};

/**
 * Keep small files as-is. Larger files are decoded, converted to mono 22.05 kHz,
 * trimmed to {@link MAX_CLONE_SECONDS} and split into WAV chunks under the size limit.
 */
export async function prepareCloneAudio(file: File): Promise<PreparedCloneAudio> {
	if (file.size <= MAX_CLONE_SAMPLE_BYTES) {
		return { files: [file], chunked: false, trimmed: false };
	}

	const decoded = await decodeAudio(file);
	const trimmed = decoded.duration > MAX_CLONE_SECONDS;
	const samples = await toMono(decoded, Math.min(decoded.duration, MAX_CLONE_SECONDS));
	const chunkLength = CHUNK_SECONDS * SAMPLE_RATE;
	const baseName = file.name.replace(/\.[^.]+$/, '') || 'sample';
	const files: File[] = [];

	for (let start = 0, part = 1; start < samples.length; start += chunkLength, part++) {
		const chunk = samples.subarray(start, Math.min(samples.length, start + chunkLength));
		const name =
			samples.length > chunkLength ? `${baseName}-part${part}.wav` : `${baseName}.wav`;

		files.push(new File([encodeWav(chunk, SAMPLE_RATE)], name, { type: 'audio/wav' }));
	}

	return {
		files,
		durationSeconds: samples.length / SAMPLE_RATE,
		chunked: files.length > 1,
		trimmed
	};
}

async function decodeAudio(file: File): Promise<AudioBuffer> {
	const context = new AudioContext();

	try {
		return await context.decodeAudioData(await file.arrayBuffer());
	} finally {
		void context.close();
	}
}

/** Downmix + resample with an offline context, limited to `seconds`. */
async function toMono(buffer: AudioBuffer, seconds: number): Promise<Float32Array> {
	const length = Math.max(1, Math.ceil(seconds * SAMPLE_RATE));
	const context = new OfflineAudioContext(1, length, SAMPLE_RATE);
	const source = context.createBufferSource();

	source.buffer = buffer;
	source.connect(context.destination);
	source.start(0, 0, seconds);

	const rendered = await context.startRendering();

	return rendered.getChannelData(0);
}

/** 16-bit PCM mono WAV. */
function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
	const dataBytes = samples.length * 2;
	const buffer = new ArrayBuffer(44 + dataBytes);
	const view = new DataView(buffer);
	const writeText = (offset: number, text: string) => {
		for (let index = 0; index < text.length; index++) {
			view.setUint8(offset + index, text.charCodeAt(index));
		}
	};

	writeText(0, 'RIFF');
	view.setUint32(4, 36 + dataBytes, true);
	writeText(8, 'WAVE');
	writeText(12, 'fmt ');
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true); // PCM
	view.setUint16(22, 1, true); // mono
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, sampleRate * 2, true);
	view.setUint16(32, 2, true);
	view.setUint16(34, 16, true);
	writeText(36, 'data');
	view.setUint32(40, dataBytes, true);

	for (let index = 0; index < samples.length; index++) {
		const clamped = Math.max(-1, Math.min(1, samples[index]));
		view.setInt16(44 + index * 2, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
	}

	return buffer;
}
