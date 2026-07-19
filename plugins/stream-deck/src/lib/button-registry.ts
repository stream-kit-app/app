import type { RegisteredButton, StreamDeckCoordinates } from './types';

export class ButtonRegistry {
	#byContext = new Map<string, RegisteredButton>();
	#byAlias = new Map<string, string>();

	register(input: {
		context: string;
		device?: string;
		actionUUID?: string;
		alias?: string;
		coordinates?: StreamDeckCoordinates;
		settings?: Record<string, unknown>;
	}): RegisteredButton {
		const context = input.context.trim();
		const existing = this.#byContext.get(context);
		const previousAlias = existing?.alias?.trim();
		const alias = input.alias?.trim() || undefined;

		if (previousAlias && previousAlias !== alias) {
			this.#byAlias.delete(previousAlias.toLowerCase());
		}

		const record: RegisteredButton = {
			context,
			device: input.device ?? existing?.device,
			actionUUID: input.actionUUID ?? existing?.actionUUID,
			alias,
			coordinates: input.coordinates ?? existing?.coordinates,
			settings: input.settings ?? existing?.settings,
			updatedAt: new Date().toISOString()
		};

		this.#byContext.set(context, record);

		if (alias) {
			this.#byAlias.set(alias.toLowerCase(), context);
		}

		return record;
	}

	unregister(context: string): boolean {
		const trimmed = context.trim();
		const existing = this.#byContext.get(trimmed);

		if (!existing) {
			return false;
		}

		if (existing.alias) {
			this.#byAlias.delete(existing.alias.toLowerCase());
		}

		this.#byContext.delete(trimmed);
		return true;
	}

	getByContext(context: string): RegisteredButton | undefined {
		return this.#byContext.get(context.trim());
	}

	getByAlias(alias: string): RegisteredButton | undefined {
		const context = this.#byAlias.get(alias.trim().toLowerCase());

		if (!context) {
			return undefined;
		}

		return this.#byContext.get(context);
	}

	list(): RegisteredButton[] {
		return [...this.#byContext.values()].sort((a, b) => {
			const aliasA = a.alias ?? '';
			const aliasB = b.alias ?? '';

			if (aliasA !== aliasB) {
				return aliasA.localeCompare(aliasB);
			}

			return a.context.localeCompare(b.context);
		});
	}

	get size(): number {
		return this.#byContext.size;
	}

	clear(): void {
		this.#byContext.clear();
		this.#byAlias.clear();
	}
}
