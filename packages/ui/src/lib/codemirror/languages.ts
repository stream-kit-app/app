import { json, jsonParseLinter } from '@codemirror/lang-json';
import { javascript, typescriptLanguage } from '@codemirror/lang-javascript';
import { linter } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';
import { svelte } from 'codemirror-lang-svelte';

import type { CodeLanguage } from './types';

export function getLanguageExtensions(language: CodeLanguage): Extension[] {
	switch (language) {
		case 'json':
			return [json(), linter(jsonParseLinter())];
		case 'javascript':
			return [javascript()];
		case 'typescript':
			return [javascript({ typescript: true })];
		case 'svelte':
			return [
				svelte({
					tsParser: typescriptLanguage.parser
				})
			];
		default:
			return [javascript({ typescript: true })];
	}
}