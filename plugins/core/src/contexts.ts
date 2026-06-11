export type { ProcessEventContext } from '@stream-kit/app/api';

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
