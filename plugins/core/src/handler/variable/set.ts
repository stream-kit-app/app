import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import type { VariableScope } from '../../lib/plugin-api';

import { interpolateVariables } from '@stream-kit/core';



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



export const createSetVariableHandler = ({ app, variables }: CorePluginContext) =>

	({

		name: 'Set variable',

		fields: [

			{

				type: 'select',

				name: 'Scope',

				items: SCOPES.map((scope) => ({ value: scope.value, label: scope.label })),

				defaultValue: 'action'

			},

			{

				type: 'text',

				name: 'Variable name',

				placeholder: 'myVariable',

				required: true

			},

			{

				type: 'text',

				name: 'Value',

				placeholder: 'e.g. {username}'

			}

		],

		execute: async (_action, handler, context, next) => {

			const scope = parseScope(getFieldValue(handler.fields, 'scope'));

			const name = getFieldValue(handler.fields, 'variable-name');

			const valueTemplate = getFieldValue(handler.fields, 'value');



			if (typeof name !== 'string' || !name.trim()) {

				next();

				return;

			}



			const resolvedValue = interpolateVariables(

				typeof valueTemplate === 'string' ? valueTemplate : '',

				variables.resolve(context)

			);



			const result = await variables.set(scope, name, resolvedValue, context);



			if (!result.ok) {

				app.toast.create({

					title: 'Set variable failed',

					description: 'User scope requires a username in the trigger context.',

					variant: 'warning'

				});

			}



			next();

		}

	}) satisfies HandlerDefinitionProps;

