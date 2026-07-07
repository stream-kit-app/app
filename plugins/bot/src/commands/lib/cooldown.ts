export type CooldownScope = 'global' | 'user';

export type CooldownBlock = {
	scope: CooldownScope;
	remainingMs: number;
};

export type CooldownState = {
	globalLastRun: Map<string, number>;
	userLastRun: Map<string, number>;
};

export function createCooldownTracker(): CooldownState {
	return {
		globalLastRun: new Map(),
		userLastRun: new Map()
	};
}

export function formatCooldownDuration(remainingMs: number): string {
	const totalSeconds = Math.ceil(remainingMs / 1000);

	if (totalSeconds < 60) {
		return `${totalSeconds}s`;
	}

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		if (seconds > 0) {
			return `${hours}h ${minutes}m ${seconds}s`;
		}

		return `${hours}h ${minutes}m`;
	}

	if (seconds > 0) {
		return `${minutes}m ${seconds}s`;
	}

	return `${minutes}m`;
}

export function formatCooldownChatMessage(
	commandName: string,
	prefix: string,
	block: CooldownBlock
): string {
	const duration = formatCooldownDuration(block.remainingMs);
	const command = `${prefix}${commandName}`;

	if (block.scope === 'global') {
		return `${command} is on global cooldown. Try again in ${duration}.`;
	}

	return `${command} is on cooldown for you. Try again in ${duration}.`;
}

export function getCooldownBlock(
	state: CooldownState,
	commandId: string,
	userId: string,
	cooldownGlobalMs: number | null,
	cooldownUserMs: number | null
): CooldownBlock | null {
	const now = Date.now();

	if (cooldownGlobalMs != null && cooldownGlobalMs > 0) {
		const lastGlobal = state.globalLastRun.get(commandId) ?? 0;
		const elapsed = now - lastGlobal;

		if (elapsed < cooldownGlobalMs) {
			return {
				scope: 'global',
				remainingMs: cooldownGlobalMs - elapsed
			};
		}
	}

	if (cooldownUserMs != null && cooldownUserMs > 0 && userId) {
		const userKey = `${commandId}:${userId}`;
		const lastUser = state.userLastRun.get(userKey) ?? 0;
		const elapsed = now - lastUser;

		if (elapsed < cooldownUserMs) {
			return {
				scope: 'user',
				remainingMs: cooldownUserMs - elapsed
			};
		}
	}

	return null;
}

export function isOnCooldown(
	state: CooldownState,
	commandId: string,
	userId: string,
	cooldownGlobalMs: number | null,
	cooldownUserMs: number | null
): boolean {
	return (
		getCooldownBlock(state, commandId, userId, cooldownGlobalMs, cooldownUserMs) != null
	);
}

export function markCooldown(
	state: CooldownState,
	commandId: string,
	userId: string,
	cooldownGlobalMs: number | null,
	cooldownUserMs: number | null
): void {
	const now = Date.now();

	if (cooldownGlobalMs != null && cooldownGlobalMs > 0) {
		state.globalLastRun.set(commandId, now);
	}

	if (cooldownUserMs != null && cooldownUserMs > 0 && userId) {
		state.userLastRun.set(`${commandId}:${userId}`, now);
	}
}
