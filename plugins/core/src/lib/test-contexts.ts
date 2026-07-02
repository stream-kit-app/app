import type { AppLifecycleContext, AppLifecycleEvent, ProcessEventContext } from '../contexts';
import type { ActionQueueEvent, ActionQueueEventContext, HotkeyEventContext } from '@stream-kit/plugin';
import type { ScheduleEventContext } from '../contexts';

export function createTestAppLifecycleContext(
	event: AppLifecycleEvent = 'started'
): AppLifecycleContext {
	return {
		event,
		timestamp: new Date().toISOString()
	};
}

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

export function createTestHotkeyContext(): HotkeyEventContext {
	return {
		shortcut: 'Shift+P',
		modifiers: ['Shift'],
		key: 'P'
	};
}

export function createTestQueueEventContext(
	event: ActionQueueEvent = 'job_started'
): ActionQueueEventContext {
	return {
		queueId: 1,
		queueName: 'default',
		pending: event === 'job_enqueued' ? 2 : event === 'idle' ? 0 : 1,
		active: event === 'job_started' || event === 'job_completed' ? 1 : 0,
		paused: event === 'paused',
		job:
			event === 'idle' || event === 'paused' || event === 'resumed'
				? undefined
				: {
						jobId: 'test-job',
						actionId: 1,
						actionName: 'Test action'
					}
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
