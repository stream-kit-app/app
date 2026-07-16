import { Commands } from '../commands/app/lib/commands.svelte';
import { ModerationRules } from '../moderation/app/lib/moderation-rules.svelte';
import { Roles } from '../roles/app/lib/roles.svelte';
import { BotSettings } from '../settings/bot-settings';
import { Timers } from '../timers/app/lib/timers.svelte';

export const commands = new Commands();
export const timers = new Timers();
export const moderation = new ModerationRules();
export const roles = new Roles();
export const botSettings = new BotSettings();
