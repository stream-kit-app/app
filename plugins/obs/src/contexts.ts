export type SceneChangedContext = {
	sceneName: string;
	sceneUuid: string;
};

export type OutputStateContext = {
	outputActive: boolean;
	outputState: string;
	outputPath?: string;
};

export type RecordFileChangedContext = {
	newOutputPath: string;
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

export type MediaActionContext = {
	inputName: string;
	inputUuid?: string;
	mediaAction: string;
};

export type FilterContext = {
	sourceName: string;
	filterName: string;
	filterEnabled: boolean;
};

export type ReplayBufferContext = OutputStateContext;

export type VirtualCamContext = OutputStateContext;

export type StudioModeContext = {
	studioModeEnabled: boolean;
};

export type ObsContext =
	| SceneChangedContext
	| OutputStateContext
	| RecordFileChangedContext
	| TransitionContext
	| InputStateContext
	| MediaContext
	| MediaActionContext
	| FilterContext
	| ReplayBufferContext
	| VirtualCamContext
	| StudioModeContext;
