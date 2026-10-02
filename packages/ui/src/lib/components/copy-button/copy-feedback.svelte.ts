/** Icon shown on copy buttons before copying. */
export const COPY_ICON = 'ri:file-copy-line';

/** Icon shown on copy buttons right after a successful copy. */
export const COPIED_ICON = 'ri:check-double-line';

/** How long the copied state stays visible. */
export const COPY_FEEDBACK_MS = 2000;

/** Copy text to the clipboard; resolves `false` when the clipboard is unavailable or denied. */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

/**
 * Copied state for copy buttons. Tracks which key was copied last, so a list can share one
 * instance and only highlight the row that was copied.
 */
export class CopyFeedback {
	copiedKey = $state<string>();

	#timer: ReturnType<typeof setTimeout> | undefined;

	/** Whether `key` (or anything, when omitted) was copied within the feedback window. */
	isCopied(key?: string): boolean {
		return key === undefined ? this.copiedKey !== undefined : this.copiedKey === key;
	}

	/** Copy `text`; on success marks `key` (defaults to `text`) as copied. */
	async copy(text: string, key: string = text): Promise<boolean> {
		const copied = await copyToClipboard(text);

		if (copied) {
			this.mark(key);
		}

		return copied;
	}

	/** Show the copied state for `key` without touching the clipboard. */
	mark(key: string): void {
		clearTimeout(this.#timer);
		this.copiedKey = key;
		this.#timer = setTimeout(() => {
			this.copiedKey = undefined;
		}, COPY_FEEDBACK_MS);
	}

	destroy(): void {
		clearTimeout(this.#timer);
	}
}
