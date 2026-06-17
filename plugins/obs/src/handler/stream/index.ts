import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { setActionVariables } from '../../lib/action-variables';
import { captionTextField, chapterNameField } from '../../lib/field-builders';
import { callObs, callObsWithResponse } from '../../lib/obs-call';

export const createStartStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StartStream', undefined, { label: 'Start Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createStopStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StopStream', undefined, { label: 'Stop Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ToggleStream', undefined, { label: 'Toggle Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSendStreamCaptionHandler = (app: PluginAppApi) =>
	({
		name: 'Send Stream Caption',
		fields: [captionTextField()],
		execute: (_action, handler, context, next) => {
			const captionText = resolveFieldText(handler.fields, 'caption-text', context);

			if (typeof captionText !== 'string' || !captionText.trim()) {
				return;
			}

			void callObs(
				app,
				'SendStreamCaption',
				{ captionText: captionText.trim() },
				{ label: 'Send Stream Caption' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createGetStreamStatusHandler = (app: PluginAppApi) =>
	({
		name: 'Get Stream Status',
		execute: async (_action, _handler, context, next) => {
			const response = await callObsWithResponse<{
				outputActive?: boolean;
				outputReconnecting?: boolean;
				outputTimecode?: string;
				outputDuration?: number;
				outputCongestion?: number;
				outputBytes?: number;
				outputSkippedFrames?: number;
				outputTotalFrames?: number;
			}>(app, 'GetStreamStatus', undefined, { label: 'Get Stream Status' });

			if (!response) {
				return;
			}

			setActionVariables(context, {
				streamActive: response.outputActive,
				streamReconnecting: response.outputReconnecting,
				streamTimecode: response.outputTimecode,
				streamDuration: response.outputDuration,
				streamCongestion: response.outputCongestion,
				streamBytes: response.outputBytes,
				streamSkippedFrames: response.outputSkippedFrames,
				streamTotalFrames: response.outputTotalFrames
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createGetRecordStatusHandler = (app: PluginAppApi) =>
	({
		name: 'Get Record Status',
		execute: async (_action, _handler, context, next) => {
			const response = await callObsWithResponse<{
				outputActive?: boolean;
				outputPaused?: boolean;
				outputTimecode?: string;
				outputDuration?: number;
				outputBytes?: number;
			}>(app, 'GetRecordStatus', undefined, { label: 'Get Record Status' });

			if (!response) {
				return;
			}

			setActionVariables(context, {
				recordActive: response.outputActive,
				recordPaused: response.outputPaused,
				recordTimecode: response.outputTimecode,
				recordDuration: response.outputDuration,
				recordBytes: response.outputBytes
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createCreateRecordChapterHandler = (app: PluginAppApi) =>
	({
		name: 'Create Record Chapter',
		fields: [chapterNameField()],
		execute: (_action, handler, context, next) => {
			const chapterName = resolveFieldText(handler.fields, 'chapter-name', context);
			const requestData =
				typeof chapterName === 'string' && chapterName.trim()
					? { chapterName: chapterName.trim() }
					: undefined;

			void callObs(app, 'CreateRecordChapter', requestData, {
				label: 'Create Record Chapter'
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;
