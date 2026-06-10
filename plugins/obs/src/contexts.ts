export type SceneChangedContext = {
	sceneName: string;
	sceneUuid: string;
};

export type OutputStateContext = {
	outputActive: boolean;
	outputState: string;
};

export type TransitionContext = {
	transitionName: string;
	transitionUuid?: string;
};

export type InputStateContext = {
	inputName: string;
	inputUuid?: string;
	inputMuted?: boolean;
	inputEnabled?: boolean;
};

export type MediaContext = {
	inputName: string;
	inputUuid?: string;
};

export type ReplayBufferContext = OutputStateContext;

export type VirtualCamContext = OutputStateContext;

export type StudioModeContext = {
	studioModeEnabled: boolean;
};

export type ObsContext =
	| SceneChangedContext
	| OutputStateContext
	| TransitionContext
	| InputStateContext
	| MediaContext
	| ReplayBufferContext
	| VirtualCamContext
	| StudioModeContext;
