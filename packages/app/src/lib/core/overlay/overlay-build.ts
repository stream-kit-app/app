import type { OverlayFrameworkId } from './types';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { runProgram } from '../process/run-program';
import { ensureOverlayScaffold, isOverlayBuilt, overlayDir } from './overlay-project';

const BUILD_TIMEOUT_SECONDS = 600;

export type OverlayBuildResult = {
	success: boolean;
	error?: string;
};

async function projectHasNodeModules(overlayId: string): Promise<boolean> {
	const { exists } = await import('@tauri-apps/plugin-fs');

	return exists(`${overlayDir(overlayId)}/node_modules`, { baseDir: BaseDirectory.AppData });
}

async function projectHasPackageJson(overlayId: string): Promise<boolean> {
	const { exists } = await import('@tauri-apps/plugin-fs');

	return exists(`${overlayDir(overlayId)}/package.json`, { baseDir: BaseDirectory.AppData });
}

function formatCommandFailure(label: string, result: {
	exitCode: number | null;
	stderr: string;
	stdout: string;
}): string {
	const detail = result.stderr.trim() || result.stdout.trim();

	if (detail) {
		const lines = detail.split('\n').filter(Boolean);
		const tail = lines.slice(-5).join('\n');

		return `${label} failed (exit ${result.exitCode ?? '?'}):\n${tail}`;
	}

	return `${label} failed with exit code ${result.exitCode ?? 'unknown'}`;
}

async function runProjectCommand(
	projectPath: string,
	commandArgs: string
): Promise<{ exitCode: number | null; stderr: string; stdout: string }> {
	return runProgram({
		command: 'pnpm',
		workingDirectory: projectPath,
		arguments: commandArgs,
		waitSeconds: BUILD_TIMEOUT_SECONDS,
		hideWindow: true,
		useShell: true
	});
}

export async function buildOverlayProject(input: {
	overlayId: string;
	projectPath: string;
	framework: OverlayFrameworkId;
	overlayName: string;
}): Promise<OverlayBuildResult> {
	if (input.framework === 'vanilla') {
		if (await isOverlayBuilt(input.overlayId)) {
			return { success: true };
		}

		return {
			success: false,
			error: 'Vanilla overlay is missing dist/index.html'
		};
	}

	if (!(await projectHasPackageJson(input.overlayId))) {
		return {
			success: false,
			error: 'Overlay project is missing package.json'
		};
	}

	await ensureOverlayScaffold(input.overlayId, input.overlayName, input.framework);

	if (!(await projectHasNodeModules(input.overlayId))) {
		const install = await runProjectCommand(input.projectPath, 'install');

		if (install.exitCode !== 0) {
			return {
				success: false,
				error: formatCommandFailure('pnpm install', install)
			};
		}
	}

	const build = await runProjectCommand(input.projectPath, 'run build');

	if (build.exitCode !== 0) {
		return {
			success: false,
			error: formatCommandFailure('pnpm run build', build)
		};
	}

	if (!(await isOverlayBuilt(input.overlayId))) {
		return {
			success: false,
			error: 'Build finished but dist/index.html was not created'
		};
	}

	return { success: true };
}
