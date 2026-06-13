import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { interpolateVariables } from '@stream-kit/core';



import { getFieldValue } from '../get-field-value';

import type { CorePluginContext } from '../lib/core-context';



const LOG_LEVELS = [

	{ value: 'info', label: 'Info' },

	{ value: 'warn', label: 'Warning' },

	{ value: 'error', label: 'Error' },

	{ value: 'debug', label: 'Debug' }

] as const;



export const createLogHandler = ({ app, variables, logs }: CorePluginContext) =>

	({

		name: 'Log',

		fields: [

			{
				type: 'text',
				name: 'Message',
				placeholder: 'e.g. {username} joined',
				required: true,
				useContextVariables: true
			},

			{

				type: 'select',

				name: 'Level',

				items: LOG_LEVELS.map((level) => ({ value: level.value, label: level.label })),

				defaultValue: 'info'

			}

		],

		execute: async (action, handler, context, next) => {

			const messageTemplate = getFieldValue(handler.fields, 'message');



			if (typeof messageTemplate !== 'string' || !messageTemplate.trim()) {

				next();

				return;

			}



			const levelValue = getFieldValue(handler.fields, 'level');

			const level =

				levelValue === 'warn' || levelValue === 'error' || levelValue === 'debug'

					? levelValue

					: 'info';



			const message = interpolateVariables(messageTemplate, variables.resolve(context));



			await logs.append(app.fs, {
				level,
				message,
				actionId: action.id,
				actionName: action.name,
				trigger: context.trigger
			});



			next();

		}

	}) satisfies HandlerDefinitionProps;

