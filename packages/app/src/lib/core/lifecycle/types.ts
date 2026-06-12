export type AppLifecycleEvent = 'started' | 'exit';

export type AppLifecycleContext = {
	event: AppLifecycleEvent;
	timestamp: string;
};
