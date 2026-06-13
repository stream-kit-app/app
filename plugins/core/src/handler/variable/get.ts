import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import type { VariableScope } from '../../lib/plugin-api';



import { getFieldValue } from '../../get-field-value';

import type { CorePluginContext } from '../../lib/core-context';



const SCOPES = [

	{ value: 'global', label: 'Global' },

	{ value: 'user', label: 'User' },

	{ value: 'action', label: 'Action' }

] as const;



function parseScope(value: unknown): VariableScope {

	if (value === 'user' || value === 'action') {

		return value;

	}



	return 'global';

}



export const createGetVariableHandler = ({ app, variables }: CorePluginContext) =>

	({

		name: 'Get variable',

		fields: [

			{

				type: 'select',

				name: 'From scope',

				items: SCOPES.map((scope) => ({ value: scope.value, label: scope.label })),

				defaultValue: 'global'

			},

			{

				type: 'text',

				name: 'Variable name',

				placeholder: 'myVariable',

				required: true

			},

			{

				type: 'text',

				name: 'Target name',

				placeholder: 'Action variable name',

				required: true

			}

		],

		execute: async (_action, handler, context, next) => {

			const fromScope = parseScope(getFieldValue(handler.fields, 'from-scope'));

			const variableName = getFieldValue(handler.fields, 'variable-name');

			const targetName = getFieldValue(handler.fields, 'target-name');



			if (

				typeof variableName !== 'string' ||

				!variableName.trim() ||

				typeof targetName !== 'string' ||

				!targetName.trim()

			) {

				next();

				return;

			}



			const value = variables.get(fromScope, variableName, context);



			if (value === undefined && fromScope === 'user') {

				app.toast.create({

					title: 'Get variable failed',

					description: 'User scope requires a username in the trigger context.',

					variant: 'warning'

				});

				next();

				return;

			}



			if (!context.actionVariables) {

				context.actionVariables = {};

			}



			context.actionVariables[targetName.trim()] = value ?? '';



			next();

		}

	}) satisfies HandlerDefinitionProps;

