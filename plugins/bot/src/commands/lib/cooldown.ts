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

export function isOnCooldown(
	state: CooldownState,
	commandId: string,
	userId: string,
	cooldownGlobalMs: number | null,
	cooldownUserMs: number | null
): boolean {
	const now = Date.now();

	if (cooldownGlobalMs != null && cooldownGlobalMs > 0) {
		const lastGlobal = state.globalLastRun.get(commandId) ?? 0;

		if (now - lastGlobal < cooldownGlobalMs) {
			return true;
		}
	}

	if (cooldownUserMs != null && cooldownUserMs > 0 && userId) {
		const userKey = `${commandId}:${userId}`;
		const lastUser = state.userLastRun.get(userKey) ?? 0;

		if (now - lastUser < cooldownUserMs) {
			return true;
		}
	}

	return false;
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
