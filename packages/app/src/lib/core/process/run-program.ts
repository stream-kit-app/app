import { invoke } from '@tauri-apps/api/core';

export type RunProgramOptions = {
	command: string;
	workingDirectory?: string;
	arguments?: string;
	waitSeconds?: number;
	environment?: Record<string, string>;
	hideWindow?: boolean;
	useShell?: boolean;
};

export type RunProgramResult = {
	exitCode: number | null;
	stdout: string;
	stderr: string;
	outputLines: string[];
};

const URL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

export function isUrlCommand(command: string): boolean {
	return URL_SCHEME_PATTERN.test(command.trim());
}

export async function runProgram(options: RunProgramOptions): Promise<RunProgramResult> {
	return invoke<RunProgramResult>('run_program', {
		request: {
			command: options.command,
			workingDirectory: options.workingDirectory,
			arguments: options.arguments,
			waitSeconds: options.waitSeconds,
			environment: options.environment,
			hideWindow: options.hideWindow,
			useShell: options.useShell
		}
	});
}
