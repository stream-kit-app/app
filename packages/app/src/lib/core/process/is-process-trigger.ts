type ProcessTriggerDefinition = {
	id: string;
	name: string;
};

export function isProcessTriggerDefinition(definition: ProcessTriggerDefinition): boolean {
	const id = definition.id.toLowerCase();
	const name = definition.name.toLowerCase();

	return (
		id.includes('process-started') ||
		id.includes('process-stopped') ||
		name === 'process started' ||
		name === 'process stopped'
	);
}

export function hasEnabledProcessTrigger(
	actions: Array<{
		enabled: boolean;
		triggers: Array<{ definition: ProcessTriggerDefinition }>;
	}>
): boolean {
	for (const action of actions) {
		if (!action.enabled) {
			continue;
		}

		for (const trigger of action.triggers) {
			if (isProcessTriggerDefinition(trigger.definition)) {
				return true;
			}
		}
	}

	return false;
}
