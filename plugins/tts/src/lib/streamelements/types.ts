export type StreamElementsVoice = {
	id: string;
	name: string;
	languageCode: string;
	languageName: string;
	gender: string;
	provider: string;
};

export type StreamElementsVoicesResponse = {
	voices: Record<string, StreamElementsVoice>;
};
