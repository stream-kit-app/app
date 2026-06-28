import type {
	FilterContext,
	InputStateContext,
	MediaActionContext,
	MediaContext,
	OutputStateContext,
	RecordFileChangedContext,
	SceneChangedContext,
	StudioModeContext,
	TransitionContext
} from '../contexts';
import type { OBSWebSocket } from 'obs-websocket-js';

import { OBS_EVENTS, OBS_OUTPUT_STATES } from './event-hub';

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

function outputStateContext(data: {
	outputActive: boolean;
	outputState: string;
	outputPath?: string | null;
}): OutputStateContext {
	return {
		outputActive: data.outputActive,
		outputState: data.outputState,
		outputPath: data.outputPath ?? undefined
	};
}

function bindOutputStateChanged(
	obs: OBSWebSocket,
	eventName:
		| 'StreamStateChanged'
		| 'RecordStateChanged'
		| 'ReplayBufferStateChanged'
		| 'VirtualcamStateChanged',
	stateEventMap: Record<string, string>
): () => void {
	const listener = (data: {
		outputActive: boolean;
		outputState: string;
		outputPath?: string | null;
	}) => {
		const eventKey = stateEventMap[data.outputState];

		if (!eventKey) {
			return;
		}

		emit(eventKey, outputStateContext(data));
	};

	obs.on(eventName, listener);

	return () => {
		obs.off(eventName, listener);
	};
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
	const disposers: Array<() => void> = [];

	const onSceneChanged = (data: { sceneName: string; sceneUuid: string }) => {
		const context: SceneChangedContext = {
			sceneName: data.sceneName,
			sceneUuid: data.sceneUuid
		};

		emit(OBS_EVENTS.SCENE_CHANGED, context);
	};

	const onPreviewSceneChanged = (data: { sceneName: string; sceneUuid: string }) => {
		const context: SceneChangedContext = {
			sceneName: data.sceneName,
			sceneUuid: data.sceneUuid
		};

		emit(OBS_EVENTS.PREVIEW_SCENE_CHANGED, context);
	};

	const onTransitionStarted = (data: { transitionName: string; transitionUuid?: string }) => {
		const context: TransitionContext = {
			transitionName: data.transitionName,
			transitionUuid: data.transitionUuid
		};

		emit(OBS_EVENTS.TRANSITION_STARTED, context);
	};

	const onTransitionEnded = (data: { transitionName: string; transitionUuid?: string }) => {
		const context: TransitionContext = {
			transitionName: data.transitionName,
			transitionUuid: data.transitionUuid
		};

		emit(OBS_EVENTS.TRANSITION_ENDED, context);
	};

	const onReplayBufferSaved = () => {
		emit(
			OBS_EVENTS.REPLAY_BUFFER_SAVED,
			outputStateContext({
				outputActive: true,
				outputState: OBS_OUTPUT_STATES.STARTED
			})
		);
	};

	const onInputMuteStateChanged = (data: {
		inputName: string;
		inputUuid?: string;
		inputMuted: boolean;
	}) => {
		const context: InputStateContext = {
			inputName: data.inputName,
			inputUuid: data.inputUuid,
			inputMuted: data.inputMuted
		};

		emit(data.inputMuted ? OBS_EVENTS.INPUT_MUTED : OBS_EVENTS.INPUT_UNMUTED, context);
	};

	const onInputShowStateChanged = (data: {
		inputName: string;
		inputUuid?: string;
		videoShowing: boolean;
	}) => {
		const context: InputStateContext = {
			inputName: data.inputName,
			inputUuid: data.inputUuid,
			inputEnabled: data.videoShowing
		};

		emit(data.videoShowing ? OBS_EVENTS.INPUT_SHOWN : OBS_EVENTS.INPUT_HIDDEN, context);
	};

	const onMediaStarted = (data: { inputName: string; inputUuid?: string }) => {
		const context: MediaContext = {
			inputName: data.inputName,
			inputUuid: data.inputUuid
		};

		emit(OBS_EVENTS.MEDIA_STARTED, context);
	};

	const onMediaEnded = (data: { inputName: string; inputUuid?: string }) => {
		const context: MediaContext = {
			inputName: data.inputName,
			inputUuid: data.inputUuid
		};

		emit(OBS_EVENTS.MEDIA_ENDED, context);
	};

	const onMediaActionTriggered = (data: {
		inputName: string;
		inputUuid?: string;
		mediaAction: string;
	}) => {
		const context: MediaActionContext = {
			inputName: data.inputName,
			inputUuid: data.inputUuid,
			mediaAction: data.mediaAction
		};

		emit(OBS_EVENTS.MEDIA_ACTION_TRIGGERED, context);
	};

	const onFilterEnableStateChanged = (data: {
		sourceName: string;
		filterName: string;
		filterEnabled: boolean;
	}) => {
		const context: FilterContext = {
			sourceName: data.sourceName,
			filterName: data.filterName,
			filterEnabled: data.filterEnabled
		};

		emit(data.filterEnabled ? OBS_EVENTS.FILTER_ENABLED : OBS_EVENTS.FILTER_DISABLED, context);
	};

	const onRecordFileChanged = (data: { newOutputPath: string }) => {
		const context: RecordFileChangedContext = {
			newOutputPath: data.newOutputPath
		};

		emit(OBS_EVENTS.RECORD_FILE_CHANGED, context);
	};

	const onStudioModeStateChanged = (data: { studioModeEnabled: boolean }) => {
		const context: StudioModeContext = {
			studioModeEnabled: data.studioModeEnabled
		};

		emit(
			data.studioModeEnabled
				? OBS_EVENTS.STUDIO_MODE_ENABLED
				: OBS_EVENTS.STUDIO_MODE_DISABLED,
			context
		);
	};

	obs.on('CurrentProgramSceneChanged', onSceneChanged);
	obs.on('CurrentPreviewSceneChanged', onPreviewSceneChanged);
	obs.on('SceneTransitionStarted', onTransitionStarted);
	obs.on('SceneTransitionEnded', onTransitionEnded);
	obs.on('ReplayBufferSaved', onReplayBufferSaved);
	obs.on('InputMuteStateChanged', onInputMuteStateChanged);
	obs.on('InputShowStateChanged', onInputShowStateChanged);
	obs.on('MediaInputPlaybackStarted', onMediaStarted);
	obs.on('MediaInputPlaybackEnded', onMediaEnded);
	obs.on('MediaInputActionTriggered', onMediaActionTriggered);
	obs.on('SourceFilterEnableStateChanged', onFilterEnableStateChanged);
	obs.on('RecordFileChanged', onRecordFileChanged);
	obs.on('StudioModeStateChanged', onStudioModeStateChanged);

	disposers.push(
		bindOutputStateChanged(obs, 'StreamStateChanged', {
			[OBS_OUTPUT_STATES.STARTING]: OBS_EVENTS.STREAM_STARTING,
			[OBS_OUTPUT_STATES.STARTED]: OBS_EVENTS.STREAM_STARTED,
			[OBS_OUTPUT_STATES.STOPPING]: OBS_EVENTS.STREAM_STOPPING,
			[OBS_OUTPUT_STATES.STOPPED]: OBS_EVENTS.STREAM_STOPPED,
			[OBS_OUTPUT_STATES.RECONNECTING]: OBS_EVENTS.STREAM_RECONNECTING
		}),
		bindOutputStateChanged(obs, 'RecordStateChanged', {
			[OBS_OUTPUT_STATES.STARTED]: OBS_EVENTS.RECORDING_STARTED,
			[OBS_OUTPUT_STATES.STOPPED]: OBS_EVENTS.RECORDING_STOPPED,
			[OBS_OUTPUT_STATES.PAUSED]: OBS_EVENTS.RECORDING_PAUSED,
			[OBS_OUTPUT_STATES.RESUMED]: OBS_EVENTS.RECORDING_RESUMED
		}),
		bindOutputStateChanged(obs, 'ReplayBufferStateChanged', {
			[OBS_OUTPUT_STATES.STARTED]: OBS_EVENTS.REPLAY_BUFFER_STARTED,
			[OBS_OUTPUT_STATES.STOPPED]: OBS_EVENTS.REPLAY_BUFFER_STOPPED
		}),
		bindOutputStateChanged(obs, 'VirtualcamStateChanged', {
			[OBS_OUTPUT_STATES.STARTED]: OBS_EVENTS.VIRTUALCAM_STARTED,
			[OBS_OUTPUT_STATES.STOPPED]: OBS_EVENTS.VIRTUALCAM_STOPPED
		})
	);

	return () => {
		obs.off('CurrentProgramSceneChanged', onSceneChanged);
		obs.off('CurrentPreviewSceneChanged', onPreviewSceneChanged);
		obs.off('SceneTransitionStarted', onTransitionStarted);
		obs.off('SceneTransitionEnded', onTransitionEnded);
		obs.off('ReplayBufferSaved', onReplayBufferSaved);
		obs.off('InputMuteStateChanged', onInputMuteStateChanged);
		obs.off('InputShowStateChanged', onInputShowStateChanged);
		obs.off('MediaInputPlaybackStarted', onMediaStarted);
		obs.off('MediaInputPlaybackEnded', onMediaEnded);
		obs.off('MediaInputActionTriggered', onMediaActionTriggered);
		obs.off('SourceFilterEnableStateChanged', onFilterEnableStateChanged);
		obs.off('RecordFileChanged', onRecordFileChanged);
		obs.off('StudioModeStateChanged', onStudioModeStateChanged);

		for (const dispose of disposers) {
			dispose();
		}
	};
}
