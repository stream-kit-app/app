import type { OverlayFrameworkId } from './types';
import type {
	OverlayActionPresetJson,
	OverlayManifest,
	OverlaySettingsItemJson,
	OverlayTestHandlerDefinition
} from './overlay-manifest';
import { OVERLAY_SELF_FIELD_TOKEN } from './overlay-manifest';

const SVELTE_EXAMPLE_SETTINGS: OverlaySettingsItemJson[] = [
	{
		type: 'section',
		title: 'Appearance',
		fields: [
			{
				type: 'text',
				key: 'title',
				name: 'Title',
				defaultValue: 'Stream Kit Overlay'
			},
			{
				type: 'slider',
				key: 'fontSize',
				name: 'Font size',
				min: 12,
				max: 32,
				step: 1,
				defaultValue: 16
			}
		]
	}
];

const SVELTE_EXAMPLE_TEST_HANDLERS: OverlayTestHandlerDefinition[] = [
	{
		label: 'Sample event',
		event: 'test:sample',
		payload: { message: 'Hello from Stream Kit' }
	}
];

const SVELTE_EXAMPLE_ACTIONS: OverlayActionPresetJson[] = [
	{
		key: 'sample-to-overlay',
		name: 'Sample event → Overlay',
		enabled: true,
		triggers: [{ triggerTypeId: 'core:core:input:hotkey' }],
		handlers: [
			{
				handlerTypeId: 'overlay:overlay:send-to-overlay',
				fields: [
					{ key: 'overlay', value: OVERLAY_SELF_FIELD_TOKEN },
					{ key: 'event', value: 'test:sample' },
					{ key: 'payload', value: '{"message":"Hello from Stream Kit"}' }
				]
			}
		]
	}
];

export function getOverlayManifestExtras(
	framework: OverlayFrameworkId
): Pick<
	OverlayManifest,
	'settings' | 'testHandlers' | 'version' | 'expectedEvents' | 'requiredPlugins' | 'actions'
> | null {
	if (framework !== 'svelte') {
		return null;
	}

	return {
		version: 1,
		expectedEvents: ['event', 'test:sample'],
		settings: SVELTE_EXAMPLE_SETTINGS,
		testHandlers: SVELTE_EXAMPLE_TEST_HANDLERS,
		requiredPlugins: ['core'],
		actions: SVELTE_EXAMPLE_ACTIONS
	};
}

export function createOverlayManifest(input: {
	id: string;
	name: string;
	framework: OverlayFrameworkId;
	expectedEvents: string[];
}): OverlayManifest {
	const manifest: OverlayManifest = {
		id: input.id,
		name: input.name,
		framework: input.framework,
		expectedEvents: input.expectedEvents
	};

	if (input.framework === 'svelte') {
		const extras = getOverlayManifestExtras('svelte')!;

		return {
			...manifest,
			version: extras.version ?? 1,
			expectedEvents: extras.expectedEvents ?? input.expectedEvents,
			settings: extras.settings,
			testHandlers: extras.testHandlers,
			requiredPlugins: extras.requiredPlugins,
			actions: extras.actions
		};
	}

	return manifest;
}
