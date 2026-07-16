import type { Modal } from '@stream-kit/plugin/action';
import { normalizeConditionGroupOperators } from '@stream-kit/plugin/action';
import type {
	ModRuleAction,
	ModRuleParameters,
	ModRulePlatform,
	ModRuleRecord
} from './stored-mod-rule';
import { DEFAULT_MOD_PLATFORMS } from './stored-mod-rule';

import ModRuleForm from '../ui/mod-rule-form.svelte';
import ModRuleFormFooter from '../ui/mod-rule-form-footer.svelte';
import { getModerationService } from './get-moderation';
import { createDefaultConditionGroup } from '../../../lib/moderation-conditions';
import { modRuleConditionEditor } from './mod-rule-condition-editor';
import { validateModRuleForm } from './validate-form';

export type ModRuleProps = {
	id?: string;
	name?: string;
	enabled?: boolean;
	action?: ModRuleAction;
	parameters?: ModRuleParameters;
	platforms?: ModRulePlatform[];
	priority?: number;
	createdAt?: Date;
	updatedAt?: Date;
};

function defaultParameters(): ModRuleParameters {
	return {
		conditions: createDefaultConditionGroup(),
		exemptRoles: undefined
	};
}

export class ModRule {
	id?: string;
	modalId?: string;
	name: string = $state('');
	enabled: boolean = $state(true);
	action: ModRuleAction = $state('delete');
	parameters: ModRuleParameters = $state(defaultParameters());
	platforms: ModRulePlatform[] = $state([...DEFAULT_MOD_PLATFORMS]);
	priority: number = $state(0);
	createdAt?: Date;
	updatedAt?: Date;
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
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createDraft(): ModRule {
		return new ModRule();
	}

	static createFrom(source: ModRule): ModRule {
		const app = getModerationService().requireApp();
		const sourceName = source.name.trim() || app.i18n.translate('Untitled rule');
		const parameters = structuredClone(source.parameters);
		normalizeConditionGroupOperators(parameters.conditions);

		return new ModRule({
			name: app.i18n.translate('Copy of {name}', { name: sourceName }),
			enabled: source.enabled,
			action: source.action,
			parameters,
			platforms: [...source.platforms],
			priority: source.priority
		});
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
			priority: record.priority ?? 0,
			createdAt: record.createdAt,
			updatedAt: record.updatedAt
		});
	}

	toRecord(): ModRuleRecord {
		if (this.id == null) {
			throw new Error('Mod rule must be saved before converting to a record');
		}

		const now = new Date();

		return {
			id: this.id,
			name: this.name.trim(),
			type: 'custom',
			enabled: this.enabled,
			action: this.action,
			parameters: this.parameters,
			platforms: this.platforms,
			priority: this.priority,
			createdAt: this.createdAt ?? now,
			updatedAt: this.updatedAt ?? now
		};
	}

	open(): Modal {
		normalizeConditionGroupOperators(this.parameters.conditions);
		const app = getModerationService().requireApp();
		this.modalId =
			this.id != null ? `mod-rule-${this.id}` : `mod-rule-draft-${crypto.randomUUID()}`;

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', { name: this.name })
						: app.i18n.translate('New Moderation Rule'),
				content: ModRuleForm,
				footer: ModRuleFormFooter,
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

		getModerationService().requireApp().modal.get(this.modalId)?.close();
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getModerationService().deleteBulk([this.id]);
		this.close();
	}

	validateForm(): boolean {
		const app = getModerationService().requireApp();
		this.formErrors = validateModRuleForm(
			{
				name: this.name,
				conditions: this.parameters.conditions
			},
			app.i18n.translate
		);

		return this.formErrors == null;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		normalizeConditionGroupOperators(this.parameters.conditions);

		const app = getModerationService().requireApp();

		await getModerationService().upsert(this);

		app.toast.create({
			title: app.i18n.translate('Rule saved'),
			description: app.i18n.translate('The moderation rule has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}
}
