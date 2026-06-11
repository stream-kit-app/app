import type { ProcessEventContext } from '../contexts';
import type { ScheduleEventContext } from '../contexts';

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

export function createTestScheduleEventContext(
	kind: ScheduleEventContext['kind'] = 'scheduled'
): ScheduleEventContext {
	const now = new Date().toISOString();

	if (kind === 'cron') {
		return {
			kind: 'cron',
			firedAt: now,
			scheduledAt: now,
			cronExpression: '0 9 * * *'
		};
	}

	return {
		kind: 'scheduled',
		firedAt: now,
		scheduledAt: now,
		date: '2026-06-11',
		time: '09:00',
		repeat: 'daily'
	};
}
