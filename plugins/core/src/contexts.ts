export type { ProcessEventContext, AppLifecycleContext, AppLifecycleEvent } from '@stream-kit/plugin';

export type ScheduleRepeat = 'once' | 'daily' | 'weekly';

export type ScheduleEventContext = {
	kind: 'cron' | 'scheduled';
	firedAt: string;
	scheduledAt: string;
	cronExpression?: string;
	date?: string;
	time?: string;
	repeat?: ScheduleRepeat;
	weekday?: string;
};
