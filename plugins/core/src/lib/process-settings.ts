import type { PluginSettingsContext } from '@stream-kit/plugin';

export function isProcessWatcherEnabled(getValue: PluginSettingsContext['getValue']): boolean {
	return getValue('process-watcher') === true;
}

export function shouldRunProcessWatcher(context: PluginSettingsContext): boolean {
	return (
		isProcessWatcherEnabled(context.getValue) ||
		context.app.actions.hasEnabledProcessTrigger()
	);
}
