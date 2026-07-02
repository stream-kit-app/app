/**
 * Well-known base directories for relative filesystem paths.
 * Numeric values match the platform backend so options can be forwarded safely.
 *
 * For plugins, prefer `AppData`, `AppConfig`, `AppCache`, and `Resource`.
 */
export const BaseDirectory = {
	/** System audio directory. */
	Audio: 1,
	/** System cache directory. */
	Cache: 2,
	/** System config directory. */
	Config: 3,
	/** System data directory. */
	Data: 4,
	/** System local data directory. */
	LocalData: 5,
	/** User documents directory. */
	Document: 6,
	/** User downloads directory. */
	Download: 7,
	/** User pictures directory. */
	Picture: 8,
	/** User public directory. */
	Public: 9,
	/** User videos directory. */
	Video: 10,
	/** Plugin-bundled read-only resources (assets shipped with the plugin). */
	Resource: 11,
	/** System temporary directory. */
	Temp: 12,
	/** Application configuration directory (shared across users on the machine). */
	AppConfig: 13,
	/** Plugin-owned app data (settings, logs, caches). Scoped per plugin. */
	AppData: 14,
	/** Application local data directory (per user). */
	AppLocalData: 15,
	/** Application cache directory. Suitable for regenerable data. */
	AppCache: 16,
	/** Application log directory. */
	AppLog: 17,
	/** User desktop directory. */
	Desktop: 18,
	/** Application executable directory. */
	Executable: 19,
	/** System fonts directory. */
	Font: 20,
	/** User home directory. */
	Home: 21,
	/** Runtime directory. */
	Runtime: 22,
	/** User templates directory. */
	Template: 23
} as const;

export type BaseDirectory = (typeof BaseDirectory)[keyof typeof BaseDirectory];
