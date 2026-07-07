<script lang="ts">
	import type { ModRule } from '../lib/mod-rule.svelte';
	import type { ModRuleAction, ModRulePlatform } from '../lib/stored-mod-rule';

	import {
		InputCheckbox,
		InputSelect,
		InputSwitch,
		InputText,
		Label
	} from '@stream-kit/ui/input';

	import ConditionGroup from '@stream-kit/plugin/action-ui/condition-group.svelte';
	import { DEFAULT_EXEMPT_ROLES, moderationRoleItems } from '../../../lib/role-utils';
	import { getModerationService } from '../lib/get-moderation';

	type Props = {
		rule: ModRule;
	};

	let { rule }: Props = $props();
	const app = getModerationService().requireApp();
	const t = app.i18n.t;

	const actionItems = [
		{ value: 'delete', label: t('Delete message') },
		{ value: 'timeout', label: t('Timeout (10 min)') },
		{ value: 'warn', label: t('Warn (Twitch only)') }
	];

	function exemptRoles(): string[] {
		return rule.parameters.exemptRoles ?? DEFAULT_EXEMPT_ROLES;
	}

	function isExemptRole(role: string): boolean {
		return exemptRoles().includes(role);
	}

	function setExemptRole(role: string, checked: boolean): void {
		const current = [...exemptRoles()];

		rule.parameters = {
			...rule.parameters,
			exemptRoles: checked
				? current.includes(role)
					? current
					: [...current, role]
				: current.filter((item) => item !== role)
		};
	}
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Name')}
		required
		value={rule.name}
		error={rule.formErrors?.name}
		oninput={(event) => {
			rule.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<section class="grid gap-3">
		<Label>{t('Conditions')}</Label>
		<ConditionGroup
			editor={rule.conditionEditor}
			group={rule.parameters.conditions}
			fieldErrors={rule.formErrors ?? undefined}
			root
			{t}
		/>
		{#if rule.formErrors?.conditions}
			<p class="text-sm text-destructive">{rule.formErrors.conditions}</p>
		{/if}
	</section>

	<InputSelect
		type="single"
		label={t('Action')}
		items={actionItems}
		value={rule.action}
		onValueChange={(value) => (rule.action = (value ?? rule.action) as ModRuleAction)}
	/>

	<InputText
		label={t('Priority')}
		type="number"
		value={String(rule.priority)}
		oninput={(event) => {
			rule.priority = Number((event.currentTarget as HTMLInputElement).value) || 0;
		}}
	/>

	<section class="grid gap-3">
		<Label>{t('Exempt roles')}</Label>
		<p class="text-sm text-dark-300">
			{t('These roles skip this rule. Uncheck Broadcaster to test on your own channel.')}
		</p>
		<div class="flex flex-wrap gap-4">
			{#each moderationRoleItems as roleItem (roleItem.value)}
				<InputCheckbox
					inline
					label={t(roleItem.label)}
					bind:checked={() => isExemptRole(roleItem.value), (checked) => setExemptRole(roleItem.value, checked)}
				/>
			{/each}
		</div>
	</section>

	<section class="grid gap-3">
		<Label>{t('Platforms')}</Label>
		<div class="flex flex-wrap gap-4">
			<InputCheckbox
				inline
				label={t('Twitch')}
				bind:checked={
					() => rule.platforms.includes('twitch'),
					(checked) => {
						if (checked) {
							rule.platforms = [...new Set<ModRulePlatform>([...rule.platforms, 'twitch'])];
						} else {
							rule.platforms = rule.platforms.filter((p) => p !== 'twitch');
						}
					}
				}
			/>
			<InputCheckbox
				inline
				label={t('YouTube')}
				bind:checked={
					() => rule.platforms.includes('youtube'),
					(checked) => {
						if (checked) {
							rule.platforms = [...new Set<ModRulePlatform>([...rule.platforms, 'youtube'])];
						} else {
							rule.platforms = rule.platforms.filter((p) => p !== 'youtube');
						}
					}
				}
			/>
		</div>
	</section>

	<InputSwitch label={t('Enabled')} bind:checked={rule.enabled} />
</form>
