import type {
	FilterContext,
	InputStateContext,
	MediaActionContext,
	MediaContext,
	OutputStateContext,
	RecordFileChangedContext,
	ReplayBufferContext,
	SceneChangedContext,
	StudioModeContext,
	TransitionContext,
	VirtualCamContext
} from '../contexts';
import { OBS_OUTPUT_STATES } from './event-hub';

export function createTestOutputStateContext(): OutputStateContext {
	return {
		outputActive: true,
		outputState: OBS_OUTPUT_STATES.STARTED
	};
}

export function createTestRecordingStoppedContext(): OutputStateContext {
	return {
		outputActive: false,
		outputState: OBS_OUTPUT_STATES.STOPPED,
		outputPath: 'C:/Videos/recording.mp4'
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

export function createTestMediaActionContext(): MediaActionContext {
	return {
		inputName: 'Test Media Source',
		inputUuid: 'test-media-uuid',
		mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY'
	};
}

export function createTestFilterContext(): FilterContext {
	return {
		sourceName: 'Test Input',
		filterName: 'Color Correction',
		filterEnabled: true
	};
}

export function createTestRecordFileChangedContext(): RecordFileChangedContext {
	return {
		newOutputPath: 'C:/Videos/recording-001.mp4'
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
