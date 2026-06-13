import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { InputStateContext, MediaContext, TransitionContext } from '../contexts';
import {
	evaluateInputMatch,
	evaluateTransitionMatch,
	inputMatchCondition,
	transitionMatchCondition
} from './conditions';
import {
	createTestInputStateContext,
	createTestMediaContext,
	createTestTransitionContext
} from './test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from './trigger-helpers';
import { subscribeObsEvent } from './websocket-setup';

export function createInputMatchTrigger(
	_app: PluginAppApi,
	options: { name: string; eventKey: string }
): TriggerDefinitionProps {
	const validateInput = (conditions: Parameters<typeof evaluateWith>[0], context: unknown) => {
		const ctx = context as InputStateContext;

		return evaluateWith(conditions, context, {
			'input-name': (value) => evaluateInputMatch(ctx.inputName, value)
		});
	};

	return {
		name: options.name,
		conditions: [inputMatchCondition()],
		validate: validateInput,
		activate: createActivate(
			_app,
			(handler) => subscribeObsEvent<InputStateContext>(options.eventKey, handler),
			validateInput
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestInputStateContext())
	};
}

export function createMediaMatchTrigger(
	_app: PluginAppApi,
	options: { name: string; eventKey: string }
): TriggerDefinitionProps {
	const validateInput = (conditions: Parameters<typeof evaluateWith>[0], context: unknown) => {
		const ctx = context as MediaContext;

		return evaluateWith(conditions, context, {
			'input-name': (value) => evaluateInputMatch(ctx.inputName, value)
		});
	};

	return {
		name: options.name,
		conditions: [inputMatchCondition()],
		validate: validateInput,
		activate: createActivate(
			_app,
			(handler) => subscribeObsEvent<MediaContext>(options.eventKey, handler),
			validateInput
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestMediaContext())
	};
}

export function createTransitionMatchTrigger(
	_app: PluginAppApi,
	options: { name: string; eventKey: string }
): TriggerDefinitionProps {
	const validateTransition = (conditions: Parameters<typeof evaluateWith>[0], context: unknown) => {
		const ctx = context as TransitionContext;

		return evaluateWith(conditions, context, {
			'transition-name': (value) => evaluateTransitionMatch(ctx.transitionName, value)
		});
	};

	return {
		name: options.name,
		conditions: [transitionMatchCondition()],
		validate: validateTransition,
		activate: createActivate(
			_app,
			(handler) => subscribeObsEvent<TransitionContext>(options.eventKey, handler),
			validateTransition
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestTransitionContext())
	};
}
