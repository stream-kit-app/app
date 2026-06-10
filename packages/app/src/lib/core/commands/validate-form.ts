import type { CommandSource } from './stored-command';
import type { HandlerFieldFormErrors } from '../action/action-handler.svelte';

export type CommandFormErrors = {
	name?: string;
	commandNames?: string;
	handlers?: string;
	sources?: string;
	handlerErrors: Record<string, HandlerFieldFormErrors>;
};

const COMMAND_NAME_PATTERN = /^[a-z0-9_-]+$/i;

export function validateCommandForm(input: {
	name: string;
	commandNames: string[];
	handlersCount: number;
	sources: CommandSource[];
}): CommandFormErrors | null {
	const errors: CommandFormErrors = {
		handlerErrors: {}
	};
	const name = input.name.trim();
	const normalizedNames = input.commandNames.map((value) => value.trim().replace(/^!+/, ''));

	if (!name) {
		errors.name = 'Name is required';
	}

	const filledNames = normalizedNames.filter(Boolean);

	if (filledNames.length === 0) {
		errors.commandNames = 'Add at least one command';
	} else if (filledNames.some((value) => !COMMAND_NAME_PATTERN.test(value))) {
		errors.commandNames =
			'Commands may only contain letters, numbers, underscores, and hyphens';
	} else if (new Set(filledNames.map((value) => value.toLowerCase())).size !== filledNames.length) {
		errors.commandNames = 'Command names must be unique';
	}

	if (input.handlersCount === 0) {
		errors.handlers = 'Add at least one handler';
	}

	if (input.sources.length === 0) {
		errors.sources = 'Select at least one platform';
	}

	const hasErrors =
		!!errors.name ||
		!!errors.commandNames ||
		!!errors.handlers ||
		!!errors.sources ||
		Object.keys(errors.handlerErrors).length > 0;

	return hasErrors ? errors : null;
}
