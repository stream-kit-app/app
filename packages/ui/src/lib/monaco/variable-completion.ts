import type { HandlerFieldVariable } from '../types';
import type * as Monaco from 'monaco-editor';

import {
	findVariableToken,
	rankVariables
} from '../components/variable-autocomplete/variable-token';

type VariableSource = () => HandlerFieldVariable[];

/** Languages whose text is interpolated with `{key}` placeholders at runtime. */
const VARIABLE_LANGUAGES = ['json'];

const sources = new WeakMap<Monaco.editor.ITextModel, VariableSource>();
let registered = false;

/**
 * Offers `{variable}` completions in `model` while it is open. Returns a disposer that stops
 * offering them. The completion provider itself is registered once per Monaco instance.
 */
export function registerModelVariables(
	monaco: typeof Monaco,
	model: Monaco.editor.ITextModel,
	getVariables: VariableSource
): () => void {
	ensureVariableCompletionProvider(monaco);
	sources.set(model, getVariables);

	return () => {
		if (sources.get(model) === getVariables) {
			sources.delete(model);
		}
	};
}

function ensureVariableCompletionProvider(monaco: typeof Monaco): void {
	if (registered) {
		return;
	}

	registered = true;

	for (const language of VARIABLE_LANGUAGES) {
		monaco.languages.registerCompletionItemProvider(language, {
			triggerCharacters: ['{'],
			provideCompletionItems(model, position) {
				const getVariables = sources.get(model);

				if (!getVariables) {
					return { suggestions: [] };
				}

				const line = model.getLineContent(position.lineNumber);
				const token = findVariableToken(line, position.column - 1);

				if (!token) {
					return { suggestions: [] };
				}

				// Replace the typed key plus any existing key remainder and closing brace.
				const rest = /^[a-zA-Z0-9_]*\}?/.exec(line.slice(token.end))?.[0] ?? '';
				const range = new monaco.Range(
					position.lineNumber,
					token.start + 2,
					position.lineNumber,
					position.column + rest.length
				);

				return {
					suggestions: rankVariables(getVariables(), token.query).map(
						(variable, index) => ({
							label: { label: `{${variable.key}}`, description: variable.label },
							kind: monaco.languages.CompletionItemKind.Variable,
							detail: variable.maybe
								? `${variable.group ?? ''} (maybe)`.trim()
								: variable.group,
							documentation: variable.description,
							insertText: `${variable.key}}`,
							filterText: variable.key,
							sortText: String(index).padStart(4, '0'),
							range
						})
					)
				};
			}
		});
	}
}
