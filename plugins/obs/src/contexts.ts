export type SceneChangedContext = {
	sceneName: string;
	sceneUuid: string;
};

export type OutputStateContext = {
	outputActive: boolean;
	outputState: string;
};

export type ObsContext = SceneChangedContext | OutputStateContext;
