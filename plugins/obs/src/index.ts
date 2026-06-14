import type { ObsPluginApi, ObsPluginController } from './lib/obs';
import type { Plugin } from '@stream-kit/plugin';

import {
	createPauseRecordHandler,
	createResumeRecordHandler,
	createSplitRecordHandler,
	createStartRecordingHandler,
	createStopRecordingHandler,
	createToggleRecordHandler
} from './handler/recording/index';
import {
	createStartReplayBufferHandler,
	createStopReplayBufferHandler,
	createSaveReplayBufferHandler,
	createToggleReplayBufferHandler
} from './handler/replay-buffer/index';
import { createSetPreviewSceneHandler } from './handler/scene/preview';
import { createSwitchSceneHandler } from './handler/scene/switch';
import {
	createHideSceneItemHandler,
	createMuteInputHandler,
	createSetInputTextHandler,
	createSetInputVolumeHandler,
	createShowSceneItemHandler,
	createToggleFilterHandler,
	createToggleInputMuteHandler,
	createTriggerMediaActionHandler,
	createUnmuteInputHandler
} from './handler/source/index';
import {
	createStartStreamHandler,
	createStopStreamHandler,
	createToggleStreamHandler
} from './handler/stream/index';
import {
	createSetTransitionDurationHandler,
	createSetTransitionHandler,
	createTriggerStudioTransitionHandler
} from './handler/transition/index';
import {
	createDisableStudioModeHandler,
	createEnableStudioModeHandler
} from './handler/studio-mode/index';
import { createTriggerHotkeyHandler } from './handler/hotkey/trigger';
import {
	createStartVirtualCamHandler,
	createStopVirtualCamHandler,
	createToggleVirtualCamHandler
} from './handler/virtualcam/index';
import { createObsPluginApi } from './lib/obs';
import { configureFieldValueResolver } from './get-field-value';
import { createRecordingStartedTrigger } from './trigger/recording/started';
import { createRecordingStoppedTrigger } from './trigger/recording/stopped';
import {
	createReplayBufferSavedTrigger,
	createReplayBufferStartedTrigger,
	createReplayBufferStoppedTrigger
} from './trigger/replay-buffer/index';
import {
	createSceneChangedTrigger,
	createPreviewSceneChangedTrigger
} from './trigger/scene/changed';
import {
	createInputHiddenTrigger,
	createInputMutedTrigger,
	createInputShownTrigger,
	createInputUnmutedTrigger,
	createMediaEndedTrigger,
	createMediaStartedTrigger
} from './trigger/source/index';
import { createStreamStartedTrigger } from './trigger/stream/started';
import { createStreamStoppedTrigger } from './trigger/stream/stopped';
import {
	createStudioModeDisabledTrigger,
	createStudioModeEnabledTrigger
} from './trigger/studio-mode/index';
import {
	createTransitionEndedTrigger,
	createTransitionStartedTrigger
} from './trigger/transition/index';
import {
	createVirtualCamStartedTrigger,
	createVirtualCamStoppedTrigger
} from './trigger/virtualcam/index';

export type {
	ObsContext,
	InputStateContext,
	MediaContext,
	OutputStateContext,
	SceneChangedContext,
	StudioModeContext,
	TransitionContext
} from './contexts';
export type { ObsPluginApi } from './lib/obs';

const plugin: Plugin = (app) => {
	configureFieldValueResolver(app);
	let obsApi: ObsPluginController | undefined;
	const warnUnavailable = () => {
		app.toast.create({
			title: 'OBS plugin unavailable',
			description: 'The OBS plugin is disabled or could not be started.',
			variant: 'warning'
		});
	};
	const publicApi: ObsPluginApi = {
		get isConnected() {
			return obsApi?.isConnected ?? false;
		},
		get isConnecting() {
			return obsApi?.isConnecting ?? false;
		},
		get connectionError() {
			return obsApi?.connectionError;
		},
		get obsVersion() {
			return obsApi?.obsVersion;
		},
		get client() {
			return obsApi?.client;
		},
		connect: async () => {
			if (!obsApi) {
				warnUnavailable();
				return;
			}

			await obsApi.connect();
		},
		disconnect: async () => {
			if (!obsApi) {
				return;
			}

			await obsApi.disconnect();
		},
		testConnection: async () => {
			if (!obsApi) {
				warnUnavailable();
				return false;
			}

			return obsApi.testConnection();
		},
		subscribe: (listener) => obsApi?.subscribe(listener) ?? (() => {})
	};

	const syncGetValue = (getValue: (key: string) => string | boolean | number | undefined) => {
		obsApi?.setGetValue(getValue);
	};

	return {
		name: 'OBS',
		description: 'Connect and control OBS Studio via WebSocket.',
		icon: 'ri:live-line',
		api: publicApi,
		isConfigured: () => publicApi.isConnected,
		settings: [
			{
				type: 'alert',
				name: 'Connected',
				description: 'OBS Studio is connected via WebSocket.',
				variant: 'success',
				visible: () => publicApi.isConnected
			},
			{
				type: 'alert',
				name: 'Not connected',
				description: 'Connect to OBS Studio to use OBS triggers and handlers.',
				variant: 'warning',
				visible: () => !publicApi.isConnected && !publicApi.isConnecting
			},
			{
				type: 'alert',
				name: 'Connecting',
				description: 'Connecting to OBS Studio...',
				variant: 'default',
				visible: () => publicApi.isConnecting
			},
			{
				type: 'alert',
				name: 'Connection error',
				description: 'Failed to connect to OBS Studio. Check host, port, and password.',
				variant: 'error',
				visible: () => Boolean(publicApi.connectionError)
			},
			{
				type: 'text',
				name: 'Host',
				placeholder: '127.0.0.1',
				defaultValue: '127.0.0.1'
			},
			{
				type: 'text',
				name: 'Port',
				placeholder: '4455',
				defaultValue: '4455'
			},
			{
				type: 'text',
				inputType: 'password',
				name: 'Password',
				placeholder: 'OBS WebSocket password'
			},
			{
				type: 'button',
				name: 'Test connection',
				variant: 'outline',
				onClick: async () => {
					const connected = await publicApi.testConnection();

					if (connected) {
						app.toast.create({
							title: 'Connection successful',
							description: publicApi.obsVersion
								? `Connected to OBS WebSocket ${publicApi.obsVersion}.`
								: 'Connected to OBS Studio.',
							variant: 'success'
						});
					} else {
						app.toast.create({
							title: 'Connection failed',
							description:
								publicApi.connectionError ??
								'Could not connect to OBS Studio. Check host, port, and password.',
							variant: 'error'
						});
					}
				}
			},
			{
				type: 'button',
				name: 'Connect',
				variant: 'outline',
				visible: () => !publicApi.isConnected,
				onClick: async () => {
					try {
						await publicApi.connect();

						app.toast.create({
							title: 'Connected',
							description: 'OBS Studio is now connected.',
							variant: 'success'
						});
					} catch {
						app.toast.create({
							title: 'Connection failed',
							description:
								publicApi.connectionError ??
								'Could not connect to OBS Studio. Check host, port, and password.',
							variant: 'error'
						});
					}
				}
			},
			{
				type: 'button',
				name: 'Disconnect',
				variant: 'outline',
				visible: () => publicApi.isConnected,
				onClick: async () => {
					await publicApi.disconnect();

					app.toast.create({
						title: 'Disconnected',
						description: 'OBS Studio connection closed.',
						variant: 'default'
					});
				}
			}
		],
		triggers: [
			{
				name: 'OBS',
				children: [
					{
						name: 'Scene',
						children: [
							createSceneChangedTrigger(app),
							createPreviewSceneChangedTrigger(app)
						]
					},
					{
						name: 'Transition',
						children: [
							createTransitionStartedTrigger(app),
							createTransitionEndedTrigger(app)
						]
					},
					{
						name: 'Stream',
						children: [createStreamStartedTrigger(app), createStreamStoppedTrigger(app)]
					},
					{
						name: 'Recording',
						children: [
							createRecordingStartedTrigger(app),
							createRecordingStoppedTrigger(app)
						]
					},
					{
						name: 'Replay Buffer',
						children: [
							createReplayBufferStartedTrigger(app),
							createReplayBufferStoppedTrigger(app),
							createReplayBufferSavedTrigger(app)
						]
					},
					{
						name: 'Virtual Cam',
						children: [
							createVirtualCamStartedTrigger(app),
							createVirtualCamStoppedTrigger(app)
						]
					},
					{
						name: 'Source',
						children: [
							createInputMutedTrigger(app),
							createInputUnmutedTrigger(app),
							createInputShownTrigger(app),
							createInputHiddenTrigger(app),
							createMediaStartedTrigger(app),
							createMediaEndedTrigger(app)
						]
					},
					{
						name: 'Studio Mode',
						children: [
							createStudioModeEnabledTrigger(app),
							createStudioModeDisabledTrigger(app)
						]
					}
				]
			}
		],
		handlers: [
			{
				name: 'OBS',
				children: [
					{
						name: 'Scene',
						children: [createSwitchSceneHandler(app), createSetPreviewSceneHandler(app)]
					},
					{
						name: 'Transition',
						children: [
							createSetTransitionHandler(app),
							createSetTransitionDurationHandler(app),
							createTriggerStudioTransitionHandler(app)
						]
					},
					{
						name: 'Stream',
						children: [
							createStartStreamHandler(app),
							createStopStreamHandler(app),
							createToggleStreamHandler(app)
						]
					},
					{
						name: 'Recording',
						children: [
							createStartRecordingHandler(app),
							createStopRecordingHandler(app),
							createToggleRecordHandler(app),
							createPauseRecordHandler(app),
							createResumeRecordHandler(app),
							createSplitRecordHandler(app)
						]
					},
					{
						name: 'Replay Buffer',
						children: [
							createStartReplayBufferHandler(app),
							createStopReplayBufferHandler(app),
							createToggleReplayBufferHandler(app),
							createSaveReplayBufferHandler(app)
						]
					},
					{
						name: 'Virtual Cam',
						children: [
							createStartVirtualCamHandler(app),
							createStopVirtualCamHandler(app),
							createToggleVirtualCamHandler(app)
						]
					},
					{
						name: 'Source',
						children: [
							createMuteInputHandler(app),
							createUnmuteInputHandler(app),
							createToggleInputMuteHandler(app),
							createSetInputVolumeHandler(app),
							createSetInputTextHandler(app),
							createTriggerMediaActionHandler(app),
							createShowSceneItemHandler(app),
							createHideSceneItemHandler(app)
						]
					},
					{
						name: 'Filter',
						children: [createToggleFilterHandler(app)]
					},
					{
						name: 'Studio Mode',
						children: [
							createEnableStudioModeHandler(app),
							createDisableStudioModeHandler(app)
						]
					},
					{
						name: 'Hotkey',
						children: [createTriggerHotkeyHandler(app)]
					}
				]
			}
		],
		onEnable: async ({ getValue }) => {
			obsApi = createObsPluginApi(app);
			syncGetValue(getValue);
			await obsApi.boot();
		},
		onSave: async ({ getValue }) => {
			syncGetValue(getValue);
			await obsApi?.reconnectFromSettings();
		},
		onDisable: async () => {
			await obsApi?.disconnect();
		}
	};
};

export default plugin;
