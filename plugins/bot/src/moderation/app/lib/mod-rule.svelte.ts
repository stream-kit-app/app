import type { Modal } from '$lib/core/modal';
import type {
	ModRuleAction,
	ModRuleParameters,
	ModRulePlatform,
	ModRuleRecord
} from './stored-mod-rule';
import { DEFAULT_MOD_PLATFORMS } from './stored-mod-rule';

import { saveModRule } from '../db/repository';

import ModRuleForm from '../ui/mod-rule-form.svelte';
import { translate } from '$lib/i18n';

import { normalizeConditionGroupOperators } from '$lib/core/action/condition-tree';
import { getApp } from '$lib/core/registry';
import { getModerationService } from './get-moderation';
import { createDefaultConditionGroup } from '../../../lib/moderation-conditions';
import { modRuleConditionEditor } from './mod-rule-condition-editor';
import { validateModRuleForm } from './validate-form';

export type ModRuleProps = {
	id?: number;
	name?: string;
	enabled?: boolean;
	action?: ModRuleAction;
	parameters?: ModRuleParameters;
	platforms?: ModRulePlatform[];
	priority?: number;
};

function defaultParameters(): ModRuleParameters {
	return {
		conditions: createDefaultConditionGroup(),
		exemptRoles: undefined
	};
}

export class ModRule {
	id?: number;
	modalId?: string;
	name: string = $state('');
	enabled: boolean = $state(true);
	action: ModRuleAction = $state('delete');
	parameters: ModRuleParameters = $state(defaultParameters());
	platforms: ModRulePlatform[] = $state([...DEFAULT_MOD_PLATFORMS]);
	priority: number = $state(0);
	formErrors: ReturnType<typeof validateModRuleForm> = $state(null);
	readonly conditionEditor = modRuleConditionEditor;

	constructor(props: ModRuleProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.enabled = props.enabled ?? true;
		this.action = props.action ?? 'delete';
		this.parameters = props.parameters ?? defaultParameters();
		this.platforms = props.platforms?.length ? [...props.platforms] : [...DEFAULT_MOD_PLATFORMS];
		this.priority = props.priority ?? 0;
	}

	static createDraft(): ModRule {
		return new ModRule();
	}

	static fromRecord(record: ModRuleRecord): ModRule {
		const parameters = record.parameters?.conditions
			? { ...record.parameters, conditions: structuredClone(record.parameters.conditions) }
			: { conditions: createDefaultConditionGroup() };

		normalizeConditionGroupOperators(parameters.conditions);

		return new ModRule({
			id: record.id,
			name: record.name,
			enabled: record.enabled,
			action: record.action,
			parameters,
			platforms: record.platforms,
			priority: record.priority ?? 0
		});
	}

	toRecord(): ModRuleRecord {
		if (this.id == null) {
			throw new Error('Mod rule must be saved before converting to a record');
		}

		return {
			id: this.id,
			name: this.name.trim(),
			type: 'custom',
			enabled: this.enabled,
			action: this.action,
			parameters: this.parameters,
			platforms: this.platforms,
			priority: this.priority,
			createdAt: new Date(),
			updatedAt: new Date()
		};
	}

	open(): Modal {
		normalizeConditionGroupOperators(this.parameters.conditions);
		this.modalId =
			this.id != null ? `mod-rule-${this.id}` : `mod-rule-draft-${crypto.randomUUID()}`;
		const app = getApp();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title:
					this.id != null
						? translate('Edit {name}', { name: this.name })
						: translate('New Moderation Rule'),
				content: ModRuleForm,
				props: { rule: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getApp().modals.get(this.modalId)?.close();
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getModerationService().deleteBulk([this.id]);
		this.close();
	}

	validateForm(): boolean {
		this.formErrors = validateModRuleForm({
			name: this.name,
			conditions: this.parameters.conditions
		});

		return this.formErrors == null;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		normalizeConditionGroupOperators(this.parameters.conditions);

		const app = getApp();
		const moderation = getModerationService();
		const wasNew = this.id == null;
		const row = await saveModRule(
			{
				name: this.name.trim(),
				type: 'custom',
				enabled: this.enabled,
				action: this.action,
				parameters: this.parameters,
				platforms: this.platforms,
				priority: this.priority
			},
			this.id
		);

		if (row) {
			this.id = row.id;
			this.enabled = row.enabled;
			this.priority = row.priority;
		}

		if (wasNew && row) {
			moderation.add(this);
		} else if (row) {
			moderation.items = moderation.items.map((item) => (item.id === row.id ? this : item));
		}

		app.toast.create({
			title: translate('Rule saved'),
			description: translate('The moderation rule has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}
}
