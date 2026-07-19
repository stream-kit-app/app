import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { streamDeckFilterConditions, validateStreamDeckEvent } from '../lib/conditions';
import { streamDeck } from '../lib/instances';
import { createTestEventContext } from '../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest } from '../lib/trigger-helpers';
import type { StreamDeckEventContext, StreamDeckEventType } from '../lib/types';

function activateFor(eventType: StreamDeckEventType) {
	return createActivate<StreamDeckEventContext>(
		(listener) => streamDeck.subscribe(eventType, listener),
		(conditions, context) => validateStreamDeckEvent(conditions, context)
	);
}

export function createKeyDownTrigger(): TriggerDefinitionProps {
	return {
		name: 'Key Down',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('keyDown'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('keyDown'))
	};
}

export function createKeyUpTrigger(): TriggerDefinitionProps {
	return {
		name: 'Key Up',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('keyUp'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('keyUp'))
	};
}

export function createDialRotateTrigger(): TriggerDefinitionProps {
	return {
		name: 'Dial Rotate',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('dialRotate'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('dialRotate'))
	};
}

export function createDialDownTrigger(): TriggerDefinitionProps {
	return {
		name: 'Dial Down',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('dialDown'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('dialDown'))
	};
}

export function createDialUpTrigger(): TriggerDefinitionProps {
	return {
		name: 'Dial Up',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('dialUp'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('dialUp'))
	};
}

export function createTouchTapTrigger(): TriggerDefinitionProps {
	return {
		name: 'Touch Tap',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('touchTap'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('touchTap'))
	};
}

export function createWillAppearTrigger(): TriggerDefinitionProps {
	return {
		name: 'Will Appear',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('willAppear'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('willAppear'))
	};
}

export function createWillDisappearTrigger(): TriggerDefinitionProps {
	return {
		name: 'Will Disappear',
		conditions: streamDeckFilterConditions(),
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('willDisappear'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('willDisappear'))
	};
}

export function createConnectedTrigger(): TriggerDefinitionProps {
	return {
		name: 'Connected',
		conditions: [],
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('connected'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('connected'))
	};
}

export function createDisconnectedTrigger(): TriggerDefinitionProps {
	return {
		name: 'Disconnected',
		conditions: [],
		validate: (conditions, context) => validateStreamDeckEvent(conditions, context),
		activate: activateFor('disconnected'),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestEventContext('disconnected'))
	};
}
