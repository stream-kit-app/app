/** Context passed to handler `execute` functions and script handlers. */
export type HandlerTriggerContext = {
	/** Stable trigger definition ID that fired (for example `twitch:twitch:chat:chat-message`). */
	trigger: string;
	/** Trigger-specific payload. Shape depends on the trigger that fired. */
	data: unknown;
};
