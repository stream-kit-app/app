import type { OBSWebSocket } from 'obs-websocket-js';

import type { OutputStateContext, SceneChangedContext } from '../contexts';
import { OBS_EVENTS } from './event-hub';

const OUTPUT_STARTED = 'OBS_WEBSOCKET_OUTPUT_STARTED';
const OUTPUT_STOPPED = 'OBS_WEBSOCKET_OUTPUT_STOPPED';

type ObsEventHandler = (context: unknown) => void;

const eventHandlers = new Map<string, Set<ObsEventHandler>>();

function emit(eventKey: string, context: unknown): void {
	const handlers = eventHandlers.get(eventKey);

	if (!handlers) {
		return;
	}

	for (const handler of handlers) {
		handler(context);
	}
}

export function subscribeObsEvent<TContext>(
	eventKey: string,
	handler: (context: TContext) => void
): () => void {
	let handlers = eventHandlers.get(eventKey);

	if (!handlers) {
		handlers = new Set();
		eventHandlers.set(eventKey, handlers);
	}

	const wrapped: ObsEventHandler = (context) => {
		handler(context as TContext);
	};

	handlers.add(wrapped);

	return () => {
		handlers?.delete(wrapped);

		if (handlers?.size === 0) {
			eventHandlers.delete(eventKey);
		}
	};
}

export function bindObsWebSocket(obs: OBSWebSocket): () => void {
	const onSceneChanged = (data: { sceneName: string; sceneUuid: string }) => {
		const context: SceneChangedContext = {
			sceneName: data.sceneName,
			sceneUuid: data.sceneUuid
		};

		emit(OBS_EVENTS.SCENE_CHANGED, context);
	};

	const onStreamStateChanged = (data: { outputActive: boolean; outputState: string }) => {
		const context: OutputStateContext = {
			outputActive: data.outputActive,
			outputState: data.outputState
		};

		if (data.outputState === OUTPUT_STARTED) {
			emit(OBS_EVENTS.STREAM_STARTED, context);
		} else if (data.outputState === OUTPUT_STOPPED) {
			emit(OBS_EVENTS.STREAM_STOPPED, context);
		}
	};

	const onRecordStateChanged = (data: { outputActive: boolean; outputState: string }) => {
		const context: OutputStateContext = {
			outputActive: data.outputActive,
			outputState: data.outputState
		};

		if (data.outputState === OUTPUT_STARTED) {
			emit(OBS_EVENTS.RECORDING_STARTED, context);
		} else if (data.outputState === OUTPUT_STOPPED) {
			emit(OBS_EVENTS.RECORDING_STOPPED, context);
		}
	};

	obs.on('CurrentProgramSceneChanged', onSceneChanged);
	obs.on('StreamStateChanged', onStreamStateChanged);
	obs.on('RecordStateChanged', onRecordStateChanged);

	return () => {
		obs.off('CurrentProgramSceneChanged', onSceneChanged);
		obs.off('StreamStateChanged', onStreamStateChanged);
		obs.off('RecordStateChanged', onRecordStateChanged);
	};
}
