import type { Component } from 'svelte';

export type ToolbarMetaItem = {
	icon?: string;
	label: string;
};

export type ToolbarAction = {
	id: string;
	label: string;
	icon?: string;
	variant?: 'default' | 'outline' | 'destructive' | 'ghost';
	size?: 'default' | 'sm' | 'lg' | 'xs';
	disabled?: boolean;
	onClick: () => void | Promise<void>;
};

export type ToolbarComponent = {
	id: string;
	component: Component<any>;
	props?: Record<string, unknown>;
};

export type ToolbarSelectAll = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export type ToolbarConfig = {
	meta?: ToolbarMetaItem[];
	primaryActions?: ToolbarAction[];
	primaryComponents?: ToolbarComponent[];
	selectAll?: ToolbarSelectAll | null;
	actions?: ToolbarAction[];
};

export class Toolbar {
	public meta = $state<ToolbarMetaItem[]>([]);
	public primaryActions = $state<ToolbarAction[]>([]);
	public primaryComponents = $state<ToolbarComponent[]>([]);
	public selectAll = $state<ToolbarSelectAll | null>(null);
	public actions = $state<ToolbarAction[]>([]);

	public hasToolbarRow = $derived(
		this.primaryActions.length > 0 ||
			this.primaryComponents.length > 0 ||
			this.selectAll != null ||
			this.actions.length > 0
	);

	public hasContent = $derived(this.meta.length > 0 || this.hasToolbarRow);

	set(config: ToolbarConfig): void {
		if (config.meta !== undefined) {
			this.meta = config.meta;
		}

		if (config.primaryActions !== undefined) {
			this.primaryActions = config.primaryActions;
		}

		if (config.primaryComponents !== undefined) {
			this.primaryComponents = config.primaryComponents;
		}

		if (config.selectAll !== undefined) {
			this.selectAll = config.selectAll;
		}

		if (config.actions !== undefined) {
			this.actions = config.actions;
		}
	}

	reset(): void {
		this.meta = [];
		this.primaryActions = [];
		this.primaryComponents = [];
		this.selectAll = null;
		this.actions = [];
	}
}
