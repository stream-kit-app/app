import type { HandlerDefinitionProps, HandlerFieldInstance } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';
import { resolveKeyValueField } from '../../lib/resolve-key-value-field';

/** Extra time on top of the wait before the action aborts the handler. */
const TIMEOUT_MARGIN_MS = 5_000;

/** Seconds to wait for the command to exit; 0 starts it without waiting. */
function readWaitSeconds(fields: HandlerFieldInstance[]): number {
	const value = Number(getFieldValue(fields, 'wait-for-exit-seconds') ?? 0);

	return Number.isFinite(value) && value > 0 ? value : 0;
}

export const createRunCommandHandler = ({ app, variables }: CorePluginContext) =>
	({
		name: 'Run command',
		fields: [
			{
				type: 'text',
				name: 'Command',
				placeholder: 'e.g. pnpm run start or node script.js {user}',
				description: 'Runs in the system shell (cmd on Windows, sh elsewhere).',
				required: true
			},
			{
				type: 'select-file-or-folder',
				mode: 'folder' as const,
				name: 'Working directory',
				storage: 'local' as const
			},
			{
				type: 'key-value-list',
				name: 'Environment variables',
				keyPlaceholder: 'KEY',
				valuePlaceholder: '{variable}'
			},
			{
				type: 'text',
				name: 'Wait for exit (seconds)',
				placeholder: '0',
				description:
					'0 starts the command and continues. Above 0 waits for it to exit, kills it after that many seconds and exposes its output.'
			},
			{
				type: 'switch',
				name: 'Hide window'
			}
		],
		outputs: [
			{ key: 'commandExitCode', description: 'Exit code (only when waiting for exit)' },
			{ key: 'commandOutput', description: 'Standard output (only when waiting for exit)' },
			{ key: 'commandError', description: 'Standard error (only when waiting for exit)' }
		],
		timeout: (handler) => readWaitSeconds(handler.fields) * 1_000 + TIMEOUT_MARGIN_MS,
		execute: async (_action, handler, context, next) => {
			const command = resolveFieldText(variables, handler.fields, 'command', context)?.trim();

			if (!command) {
				return;
			}

			const workingDirectory = getFieldValue(handler.fields, 'working-directory');
			const waitSeconds = readWaitSeconds(handler.fields);

			try {
				const result = await app.process.run({
					command,
					workingDirectory:
						typeof workingDirectory === 'string' && workingDirectory.trim()
							? workingDirectory.trim()
							: undefined,
					waitSeconds,
					environment: resolveKeyValueField(
						variables,
						handler.fields,
						'environment-variables',
						context,
						{ resolveValues: true }
					),
					hideWindow: getFieldValue(handler.fields, 'hide-window') === true,
					useShell: true
				});

				if (waitSeconds > 0) {
					context.actionVariables ??= {};
					context.actionVariables.commandExitCode = result.exitCode === null ? '' : String(result.exitCode);
					context.actionVariables.commandOutput = result.stdout.trimEnd();
					context.actionVariables.commandError = result.stderr.trimEnd();
				}

				next();
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				console.error('Run command failed', error);
				app.toast.create({
					title: 'Run command failed',
					description: message,
					variant: 'error'
				});
			}
		}
	}) satisfies HandlerDefinitionProps;
