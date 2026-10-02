import type { PluginAppApi } from '@stream-kit/plugin';

type DraftRecord = Parameters<PluginAppApi['actions']['openDraft']>[0];

/** A generated action that has not been published (saved from the editor) yet. */
export type AiDraft = {
	id: string;
	prompt: string;
	name: string;
	record: DraftRecord;
	notes: string[];
	createdAt: string;
};

type AiDraftStorage = Omit<AiDraft, 'id'>;

const COLLECTION = 'drafts';

function isDraft(value: Record<string, unknown>): value is AiDraft {
	return (
		typeof value.id === 'string' &&
		typeof value.prompt === 'string' &&
		value.record != null &&
		typeof value.record === 'object'
	);
}

export function openDrafts(app: PluginAppApi) {
	const collection = app.records.open<AiDraftStorage>(COLLECTION);

	return {
		/** Newest first. */
		async list(): Promise<AiDraft[]> {
			const rows = await collection.list<AiDraftStorage>();

			return rows
				.filter(isDraft)
				.map((row) => ({ ...row, notes: Array.isArray(row.notes) ? row.notes : [] }))
				.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
		},

		create(prompt: string, record: DraftRecord, notes: string[]): Promise<AiDraft> {
			return collection.create<AiDraftStorage>({
				prompt,
				name: record.name,
				record,
				notes,
				createdAt: new Date().toISOString()
			});
		},

		delete(id: string): Promise<void> {
			return collection.delete(id);
		},

		onChange(listener: () => void): () => void {
			return collection.onChange(listener);
		}
	};
}

export type AiDrafts = ReturnType<typeof openDrafts>;

/**
 * Opens a draft in the action editor. Publishing (saving) it removes the draft,
 * so only unpublished drafts stay listed.
 */
export function openDraftInEditor(app: PluginAppApi, drafts: AiDrafts, draft: AiDraft): void {
	app.actions.openDraft(draft.record, {
		onSaved: () => {
			void drafts.delete(draft.id).catch((error) => {
				console.error('Could not remove published AI draft', error);
			});
		}
	});
}
