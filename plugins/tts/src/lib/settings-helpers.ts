type GetValue = (key: string) => unknown;

export function getTrimmedValue(getValue: GetValue, key: string): string {
	return String(getValue(key) ?? '').trim();
}

export function hasValue(getValue: GetValue, key: string): boolean {
	return getTrimmedValue(getValue, key).length > 0;
}

export function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
