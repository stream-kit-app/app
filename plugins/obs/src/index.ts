import type { ObsPluginApi, ObsPluginController } from './lib/obs';
import type { Plugin } from '@stream-kit/app/api';

import { createStartRecordingHandler } from './handler/recording/start';
import { createStopRecordingHandler } from './handler/recording/stop';
import { createSwitchSceneHandler } from './handler/scene/switch';
import { createStartStreamHandler } from './handler/stream/start';
import { createStopStreamHandler } from './handler/stream/stop';
import { createObsPluginApi } from './lib/obs';
import { createRecordingStartedTrigger } from './trigger/recording/started';
import { createRecordingStoppedTrigger } from './trigger/recording/stopped';
import { createSceneChangedTrigger } from './trigger/scene/changed';
import { createStreamStartedTrigger } from './trigger/stream/started';
import { createStreamStoppedTrigger } from './trigger/stream/stopped';

export type { ObsContext, OutputStateContext, SceneChangedContext } from './contexts';
export type { ObsPluginApi } from './lib/obs';

const plugin: Plugin = (app) => {
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
						children: [createSceneChangedTrigger(app)]
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
						children: [createSwitchSceneHandler(app)]
					},
					{
						name: 'Stream',
						children: [createStartStreamHandler(app), createStopStreamHandler(app)]
					},
					{
						name: 'Recording',
						children: [createStartRecordingHandler(app), createStopRecordingHandler(app)]
					}
				]
			}
		],
		onBoot: async ({ getValue }) => {
			obsApi = createObsPluginApi(app);
			syncGetValue(getValue);
			await obsApi.boot();
		},
		onSave: async ({ getValue }) => {
			syncGetValue(getValue);
			await obsApi?.reconnectFromSettings();
		},
		onEnable: async ({ getValue }) => {
			syncGetValue(getValue);
			await obsApi?.connect();
		},
		onDisable: async () => {
			await obsApi?.disconnect();
		}
	};
};

export default plugin;
