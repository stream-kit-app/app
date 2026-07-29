export type LwwSide = {
	revision: number;
	clientUpdatedAt: number;
	present: boolean;
};

/**
 * Last-write-wins using monotone `revision` first, then `clientUpdatedAt`,
 * then prefer a present remote over an absent local when still tied.
 */
export function remoteWinsLww(local: LwwSide, remote: LwwSide): boolean {
	if (remote.revision > local.revision) return true;
	if (remote.revision < local.revision) return false;
	if (remote.clientUpdatedAt > local.clientUpdatedAt) return true;
	if (remote.clientUpdatedAt < local.clientUpdatedAt) return false;
	return remote.present && !local.present;
}

export function decideLww(local: LwwSide, remote: LwwSide): 'remote' | 'local' {
	return remoteWinsLww(local, remote) ? 'remote' : 'local';
}

export function toLwwSide(input: {
	revision?: number | null;
	clientUpdatedAt?: number | null;
	present: boolean;
}): LwwSide {
	return {
		revision: Number(input.revision) || 0,
		clientUpdatedAt: Number(input.clientUpdatedAt) || 0,
		present: input.present
	};
}
