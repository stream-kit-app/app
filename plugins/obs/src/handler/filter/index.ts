import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps, HandlerFieldInstance, HandlerTriggerContext } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import {
	filterKindSelectField,
	filterNameTextField,
	filterSelectField,
	filterSettingsField,
	inputSelectField
} from '../../lib/field-builders';
import { callObs, callObsWithResponse } from '../../lib/obs-call';
import { getObs } from '../../lib/plugin-api';
import { resolveKeyValueField } from '../../lib/resolve-key-value-field';

function resolveInputAndFilter(
	handler: { fields: HandlerFieldInstance[] },
	context: HandlerTriggerContext
): { inputName?: string; filterName?: string } {
	const inputName = resolveFieldText(handler.fields, 'input', context);
	const filterName =
		resolveFieldText(handler.fields, 'filter', context) ??
		resolveFieldText(handler.fields, 'filter-name', context);

	if (typeof inputName !== 'string' || !inputName.trim()) {
		return {};
	}

	if (typeof filterName !== 'string' || !filterName.trim()) {
		return { inputName: inputName.trim() };
	}

	return {
		inputName: inputName.trim(),
		filterName: filterName.trim()
	};
}

export const createEnableFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Enable Filter',
		fields: [inputSelectField(app, { name: 'Input' }), filterSelectField(app)],
		execute: (_action, handler, context, next) => {
			const { inputName, filterName } = resolveInputAndFilter(handler, context);

			if (!inputName || !filterName) {
				return;
			}

			void callObs(
				app,
				'SetSourceFilterEnabled',
				{
					sourceName: inputName,
					filterName,
					filterEnabled: true
				},
				{ label: 'Enable Filter' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createDisableFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Disable Filter',
		fields: [inputSelectField(app, { name: 'Input' }), filterSelectField(app)],
		execute: (_action, handler, context, next) => {
			const { inputName, filterName } = resolveInputAndFilter(handler, context);

			if (!inputName || !filterName) {
				return;
			}

			void callObs(
				app,
				'SetSourceFilterEnabled',
				{
					sourceName: inputName,
					filterName,
					filterEnabled: false
				},
				{ label: 'Disable Filter' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSetFilterSettingsHandler = (app: PluginAppApi) =>
	({
		name: 'Set Filter Settings',
		fields: [
			inputSelectField(app, { name: 'Input' }),
			filterSelectField(app),
			filterSettingsField()
		],
		execute: (_action, handler, context, next) => {
			const { inputName, filterName } = resolveInputAndFilter(handler, context);

			if (!inputName || !filterName) {
				return;
			}

			const filterSettings = resolveKeyValueField(handler.fields, 'filter-settings', context, {
				resolveValues: true
			});

			void callObs(
				app,
				'SetSourceFilterSettings',
				{
					sourceName: inputName,
					filterName,
					filterSettings,
					overlay: true
				},
				{ label: 'Set Filter Settings' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createCreateFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Create Filter',
		fields: [
			inputSelectField(app, { name: 'Input' }),
			filterNameTextField(),
			filterKindSelectField(app),
			filterSettingsField()
		],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);
			const filterName = resolveFieldText(handler.fields, 'filter-name', context);
			const filterKind = getFieldValue(handler.fields, 'filter-kind');

			if (
				typeof inputName !== 'string' ||
				!inputName.trim() ||
				typeof filterName !== 'string' ||
				!filterName.trim() ||
				typeof filterKind !== 'string' ||
				!filterKind.trim()
			) {
				return;
			}

			const filterSettings = resolveKeyValueField(handler.fields, 'filter-settings', context, {
				resolveValues: true
			});

			void callObs(
				app,
				'CreateSourceFilter',
				{
					sourceName: inputName.trim(),
					filterName: filterName.trim(),
					filterKind: filterKind.trim(),
					filterSettings
				},
				{ label: 'Create Filter' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createRemoveFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Remove Filter',
		fields: [inputSelectField(app, { name: 'Input' }), filterSelectField(app)],
		execute: (_action, handler, context, next) => {
			const { inputName, filterName } = resolveInputAndFilter(handler, context);

			if (!inputName || !filterName) {
				return;
			}

			void callObs(
				app,
				'RemoveSourceFilter',
				{
					sourceName: inputName,
					filterName
				},
				{ label: 'Remove Filter' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Filter',
		fields: [inputSelectField(app, { name: 'Input' }), filterSelectField(app)],
		execute: async (_action, handler, context, next) => {
			const { inputName, filterName } = resolveInputAndFilter(handler, context);

			if (!inputName || !filterName) {
				return;
			}

			const client = getObs(app).client;

			if (!client) {
				app.toast.create({
					title: 'Toggle Filter failed',
					description: 'OBS Studio is not connected.',
					variant: 'warning'
				});
				return;
			}

			const response = await callObsWithResponse<{ filterEnabled?: boolean }>(
				app,
				'GetSourceFilter',
				{
					sourceName: inputName,
					filterName
				},
				{ label: 'Toggle Filter' }
			);

			if (response === undefined) {
				return;
			}

			const toggled = await callObs(
				app,
				'SetSourceFilterEnabled',
				{
					sourceName: inputName,
					filterName,
					filterEnabled: !response.filterEnabled
				},
				{ label: 'Toggle Filter' }
			);

			if (toggled) {
				next();
			}
		}
	}) satisfies HandlerDefinitionProps;
