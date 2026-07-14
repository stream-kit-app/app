export type PageHeaderConfig = {
	title?: string;
	segments?: string[];
};

export class PageHeader {
	public title = $state<string | null>(null);
	public segments = $state<string[]>([]);

	set(config: PageHeaderConfig): void {
		if (config.title !== undefined) {
			this.title = config.title;
		}

		if (config.segments !== undefined) {
			this.segments = config.segments;
		}
	}

	reset(): void {
		this.title = null;
		this.segments = [];
	}
}
