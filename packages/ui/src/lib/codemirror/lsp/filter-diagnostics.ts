import { forEachDiagnostic, setDiagnostics, setDiagnosticsEffect, type Diagnostic } from '@codemirror/lint';
import type { Extension, Text } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const LEGACY_RUNE_DIAGNOSTIC =
	/'state' is not defined|Cannot find name 'state'|Cannot find name '\$state'/;

const EACH_ITERATOR_DIAGNOSTIC =
	/must have a '\[Symbol\.iterator\]\(\)' method that returns an iterator/;

function isLegacyRuneFalsePositive(message: string, doc: Text, from: number): boolean {
	if (!LEGACY_RUNE_DIAGNOSTIC.test(message)) {
		return false;
	}

	const line = doc.lineAt(from);

	return /\$state\b/.test(line.text);
}

function isEachBlockFalsePositive(message: string, doc: Text, from: number): boolean {
	if (!EACH_ITERATOR_DIAGNOSTIC.test(message)) {
		return false;
	}

	const line = doc.lineAt(from);

	return /\{#each\s+/.test(line.text);
}

function isSvelteLspFalsePositive(message: string, doc: Text, from: number): boolean {
	return (
		isLegacyRuneFalsePositive(message, doc, from) ||
		isEachBlockFalsePositive(message, doc, from)
	);
}

/**
 * The in-browser Svelte language server can emit false positives when runes mode or
 * svelte2tsx versions drift. Drop known-bad diagnostics for `$state` and `{#each}`.
 */
export function suppressLegacyRuneDiagnostics(): Extension {
	return EditorView.updateListener.of((update) => {
		const diagnosticsChanged = update.transactions.some((transaction) =>
			transaction.effects.some((effect) => effect.is(setDiagnosticsEffect))
		);

		if (!diagnosticsChanged) {
			return;
		}

		const kept: Diagnostic[] = [];
		let removed = false;

		forEachDiagnostic(update.state, (diagnostic) => {
			if (isSvelteLspFalsePositive(diagnostic.message, update.state.doc, diagnostic.from)) {
				removed = true;
				return;
			}

			kept.push(diagnostic);
		});

		if (removed) {
			update.view.dispatch(setDiagnostics(update.state, kept));
		}
	});
}
