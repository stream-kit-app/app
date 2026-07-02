/** Access-related watch event kinds. */
export type WatchEventKindAccess =
	| { kind: 'any' }
	| { kind: 'close'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' }
	| { kind: 'open'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' }
	| { kind: 'other' };

/** Create-related watch event kinds. */
export type WatchEventKindCreate =
	| { kind: 'any' }
	| { kind: 'file' }
	| { kind: 'folder' }
	| { kind: 'other' };

/** Modify-related watch event kinds. */
export type WatchEventKindModify =
	| { kind: 'any' }
	| { kind: 'data'; mode: 'any' | 'size' | 'content' | 'other' }
	| {
			kind: 'metadata';
			mode: 'any' | 'access-time' | 'write-time' | 'permissions' | 'ownership' | 'extended' | 'other';
	  }
	| { kind: 'rename'; mode: 'any' | 'to' | 'from' | 'both' | 'other' }
	| { kind: 'other' };

/** Remove-related watch event kinds. */
export type WatchEventKindRemove =
	| { kind: 'any' }
	| { kind: 'file' }
	| { kind: 'folder' }
	| { kind: 'other' };

/** Discriminated watch event type. */
export type WatchEventKind =
	| 'any'
	| { access: WatchEventKindAccess }
	| { create: WatchEventKindCreate }
	| { modify: WatchEventKindModify }
	| { remove: WatchEventKindRemove }
	| 'other';

/** Filesystem watch notification delivered to plugin callbacks. */
export interface WatchEvent {
	/** Event type and sub-kind. */
	type: WatchEventKind;
	/** Affected paths relative to the watched location. */
	paths: string[];
	/** Platform-specific event attributes. */
	attrs: unknown;
}

/** Unsubscribe function returned by {@link PluginAppFsApi.watch} and {@link PluginAppFsApi.watchImmediate}. */
export type UnwatchFn = () => void;
