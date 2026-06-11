export type ScheduleRepeat = 'once' | 'daily' | 'weekly';

export type CronScheduleConfig = {
	kind: 'cron';
	expression: string;
};

export type ScheduledScheduleConfig = {
	kind: 'scheduled';
	date?: string;
	time?: string;
	repeat: ScheduleRepeat;
	weekday?: string;
};

export type ScheduleConfig = CronScheduleConfig | ScheduledScheduleConfig;

export type ParsedScheduleConfig =
	| { ok: true; config: ScheduleConfig }
	| { ok: false; error: string };
