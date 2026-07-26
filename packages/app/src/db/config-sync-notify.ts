type ConfigSyncLocalChangeHandler = () => void;

let handler: ConfigSyncLocalChangeHandler | null = null;

export function setConfigSyncLocalChangeHandler(
	next: ConfigSyncLocalChangeHandler | null
): void {
	handler = next;
}

/** Notify that local actions/queues changed and cloud sync should run. */
export function notifyConfigLocalChange(): void {
	handler?.();
}
