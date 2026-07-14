export function getOwnedCommandIds(
	commands: Array<{ id?: string; ownerPluginKey?: string }>,
	ownerPluginKey: string
): string[] {
	return commands
		.filter((command) => command.id != null && command.ownerPluginKey === ownerPluginKey)
		.map((command) => command.id as string);
}
