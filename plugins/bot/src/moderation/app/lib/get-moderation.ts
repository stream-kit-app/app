import { moderation } from '../../../lib/instances';
import type { ModerationRules } from './moderation-rules.svelte';

export function getModerationService(): ModerationRules {
	return moderation;
}

export function tryGetModerationService(): ModerationRules | undefined {
	return moderation;
}
