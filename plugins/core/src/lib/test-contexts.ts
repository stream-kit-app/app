import type { ProcessEventContext } from '../contexts';

export function createTestProcessEventContext(): ProcessEventContext {
	return {
		executable: 'notepad',
		fullPath: 'C:\\Windows\\System32\\notepad.exe',
		name: 'notepad',
		parentProcessId: 1234,
		path: 'C:\\Windows\\System32',
		processId: 5678
	};
}
