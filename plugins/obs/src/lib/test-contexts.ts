import type {
	InputStateContext,
	MediaContext,
	OutputStateContext,
	ReplayBufferContext,
	SceneChangedContext,
	StudioModeContext,
	TransitionContext,
	VirtualCamContext
} from '../contexts';

export function createTestOutputStateContext(): OutputStateContext {
	return {
		outputActive: true,
		outputState: 'OBS_WEBSOCKET_OUTPUT_STARTED'
	};
}

export function createTestSceneChangedContext(): SceneChangedContext {
	return {
		sceneName: 'Test Scene',
		sceneUuid: 'test-scene-uuid'
	};
}

export function createTestInputStateContext(): InputStateContext {
	return {
		inputName: 'Test Input',
		inputUuid: 'test-input-uuid',
		inputMuted: false,
		inputEnabled: true
	};
}

export function createTestMediaContext(): MediaContext {
	return {
		inputName: 'Test Media Source',
		inputUuid: 'test-media-uuid'
	};
}

export function createTestTransitionContext(): TransitionContext {
	return {
		transitionName: 'Fade',
		transitionUuid: 'test-transition-uuid'
	};
}

export function createTestStudioModeContext(): StudioModeContext {
	return {
		studioModeEnabled: true
	};
}

export function createTestReplayBufferContext(): ReplayBufferContext {
	return createTestOutputStateContext();
}

export function createTestVirtualCamContext(): VirtualCamContext {
	return createTestOutputStateContext();
}
