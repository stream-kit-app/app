import type { ProcessEventContext } from '../contexts';

export function contextToVariables(context: unknown): Record<string, string> {
	const variables: Record<string, string> = {};

	if (context && typeof context === 'object') {
		for (const [key, value] of Object.entries(context as Record<string, unknown>)) {
			if (typeof value === 'string') {
				variables[key] = value;
				continue;
			}

			if (typeof value === 'number' || typeof value === 'boolean') {
				variables[key] = String(value);
			}
		}
	}

	const processContext = context as Partial<ProcessEventContext>;

	if (typeof processContext.executable === 'string' && !variables.executable) {
		variables.executable = processContext.executable;
	}

	if (typeof processContext.fullPath === 'string' && !variables.fullPath) {
		variables.fullPath = processContext.fullPath;
	}

	if (typeof processContext.name === 'string' && !variables.name) {
		variables.name = processContext.name;
	}

	if (typeof processContext.parentProcessId === 'number' && !variables.parentProcessId) {
		variables.parentProcessId = String(processContext.parentProcessId);
	}

	if (typeof processContext.path === 'string' && !variables.path) {
		variables.path = processContext.path;
	}

	if (typeof processContext.processId === 'number' && !variables.processId) {
		variables.processId = String(processContext.processId);
	}

	return variables;
}
