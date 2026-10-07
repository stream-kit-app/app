/** Sync bookkeeping fields; everything else in a payload is entity content. */
const META_KEYS = new Set(['id', 'user', 'revision', 'clientUpdatedAt', 'deletedAt']);

function stableStringify(value: unknown): string {
	if (Array.isArray(value)) {
		return `[${value.map(stableStringify).join(',')}]`;
	}

	if (value && typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>)
			.filter(([, entry]) => entry !== undefined)
			.sort(([left], [right]) => left.localeCompare(right));
		return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`).join(',')}}`;
	}

	return JSON.stringify(value ?? null);
}

function sameValue(left: unknown, right: unknown): boolean {
	return stableStringify(left) === stableStringify(right);
}

/** The synced fields of a remote row or remote payload, with `undefined` read as `null`. */
export function contentOf(row: Record<string, unknown>): Record<string, unknown> {
	const content: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(row)) {
		if (!META_KEYS.has(key)) {
			content[key] = value ?? null;
		}
	}
	return content;
}

export type FieldMergeResult = {
	merged: Record<string, unknown>;
	/** Fields both sides changed to different values; the LWW winner's value was kept. */
	conflictedFields: string[];
};

/**
 * Three-way merge against the last synced `base`: a field changed on one side only takes
 * that side's value, so e.g. a reorder on one device and a handler edit on another both
 * survive. Only a field changed differently on both sides falls back to `winner`.
 */
export function mergeFields(
	base: Record<string, unknown>,
	local: Record<string, unknown>,
	remote: Record<string, unknown>,
	winner: 'local' | 'remote'
): FieldMergeResult {
	const merged: Record<string, unknown> = {};
	const conflictedFields: string[] = [];
	const keys = new Set([...Object.keys(base), ...Object.keys(local), ...Object.keys(remote)]);

	for (const key of keys) {
		const localValue = local[key] ?? null;
		const remoteValue = remote[key] ?? null;
		const baseValue = base[key] ?? null;

		if (sameValue(localValue, remoteValue)) {
			merged[key] = localValue;
		} else if (sameValue(localValue, baseValue)) {
			merged[key] = remoteValue;
		} else if (sameValue(remoteValue, baseValue)) {
			merged[key] = localValue;
		} else {
			merged[key] = winner === 'remote' ? remoteValue : localValue;
			conflictedFields.push(key);
		}
	}

	return { merged, conflictedFields };
}
