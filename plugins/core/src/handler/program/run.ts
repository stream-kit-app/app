import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';
import { resolveKeyValueField } from '../../lib/resolve-key-value-field';

const PROGRAM_FILTERS = [
	{ name: 'Programs', extensions: ['exe', 'bat', 'cmd', 'ps1', 'com', 'msi'] },
	{ name: 'All files', extensions: ['*'] }
];

export const createRunProgramHandler = ({ app, variables }: CorePluginContext) =>
	({
		name: 'Run program',
		fields: [
			{
				type: 'select-file-or-folder',
				mode: 'file' as const,
				name: 'Program',
				filters: PROGRAM_FILTERS,
				required: true
			},
			{
				type: 'select-file-or-folder',
				mode: 'folder' as const,
				name: 'Working directory'
			},
			{
				type: 'text',
				name: 'Arguments',
				placeholder: 'Optional, e.g. script.js {user}'
			},
			{
				type: 'key-value-list',
				name: 'Environment variables',
				keyPlaceholder: 'KEY',
				valuePlaceholder: '{variable}'
			},
			{
				type: 'switch',
				name: 'Hide window'
			},
			{
				type: 'checkbox',
				name: 'Run in shell'
			}
		],
		execute: async (_action, handler, context, next) => {
			const command = getFieldValue(handler.fields, 'program');

			if (typeof command !== 'string' || !command.trim()) {
				return;
			}

			const workingDirectory = getFieldValue(handler.fields, 'working-directory');
			const argumentsText = resolveFieldText(variables, handler.fields, 'arguments', context)?.trim();
			const hideWindow = getFieldValue(handler.fields, 'hide-window') === true;
			const useShell = getFieldValue(handler.fields, 'run-in-shell') === true;

			try {
				await app.process.run({
					command: command.trim(),
					workingDirectory:
						typeof workingDirectory === 'string' && workingDirectory.trim()
							? workingDirectory.trim()
							: undefined,
					arguments: argumentsText || undefined,
					waitSeconds: 0,
					environment: resolveKeyValueField(
						variables,
						handler.fields,
						'environment-variables',
						context,
						{ resolveValues: true }
					),
					hideWindow,
					useShell
				});

				next();
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				console.error('Run program failed', error);
				app.toast.create({
					title: 'Run program failed',
					description: message,
					variant: 'error'
				});
			}
		}
	}) satisfies HandlerDefinitionProps;
