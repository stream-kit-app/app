import type { HandlerFieldDefinition, HandlerOneOfInnerFieldDefinition } from '@stream-kit/plugin';

type VoiceOneOfOptions = {
	name?: string;
	required?: boolean;
};

export function createVoiceOneOfField(
	selectField: Extract<HandlerOneOfInnerFieldDefinition, { type: 'select' }>,
	options: VoiceOneOfOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'one-of',
		name: options.name ?? 'Voice',
		required: options.required ?? false,
		defaultVariant: 'select',
		migrateFrom: [
			{
				keys: ['voice'],
				variantMap: {
					voice: 'select'
				}
			}
		],
		variants: [
			{
				id: 'select',
				label: 'Select',
				field: selectField
			},
			{
				id: 'variable',
				label: 'Variable',
				field: {
					type: 'text',
					name: 'Voice ID',
					placeholder: '{voiceId}',
					useContextVariables: true
				}
			}
		]
	};
}
