// src/lib/core/filesystem/base-directory.ts
var BaseDirectory = {
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
};

// src/lib/core/filesystem/seek-mode.ts
var SeekMode = {
  /** Seek from the start of the file. */
  Start: 0,
  /** Seek relative to the current position. */
  Current: 1,
  /** Seek from the end of the file. */
  End: 2
};

// ../plugin/src/runtime-exports.ts
import {
  computeCronNextRun,
  CRON_FIELD_COUNT,
  CRON_FIELD_KEYS,
  DEFAULT_CRON_PRESETS,
  enrichChatMessageWithCommand,
  extractCommandArgNames,
  findCommandConditionPattern,
  getCronFieldCount,
  getCronNextRunLabel,
  getCronValidationError,
  getFieldValue,
  getLocalTimezone,
  getOneOfFieldValue,
  hasCommandArgPlaceholders,
  interpolateVariables,
  isOneOfFieldValue,
  isValidCronExpression,
  matchCommandPattern,
  normalizeCronExpression,
  parseCommand,
  parseCommandMessage,
  RESERVED_COMMAND_ARG_NAMES,
  resolveFieldText,
  resolveOneOfFieldText,
  splitCronParts,
  withActionVariables
} from "@stream-kit/core";

// ../plugin/src/records-migration.ts
var SYNC_ID_RE = /^[a-z0-9]{15}$/;
function isRecordsSyncId(value) {
  return typeof value === "string" && SYNC_ID_RE.test(value);
}
async function migrateStoreArrayToRecords(app, store, options) {
  const markerKey = options.markerKey ?? `__records_migrated_${options.collection}_v1`;
  if (await store.get(markerKey)) {
    return;
  }
  const records = app.records.open(options.collection);
  const existing = await records.list();
  if (existing.length > 0) {
    await store.set(markerKey, true);
    await store.delete(options.storeKey);
    return;
  }
  const legacy = await store.get(options.storeKey);
  if (Array.isArray(legacy) && legacy.length > 0) {
    for (const item of legacy) {
      const mapped = options.mapItem ? options.mapItem(item) : { ...item };
      const { id, ...rest } = mapped;
      const data = id && isRecordsSyncId(id) ? { ...rest, id } : rest;
      await records.create(data);
    }
  }
  await store.set(markerKey, true);
  await store.delete(options.storeKey);
}
async function migrateStoreSingletonToRecord(app, store, options) {
  if (!isRecordsSyncId(options.syncId)) {
    throw new Error(`syncId must be a 15-char [a-z0-9] id, got "${options.syncId}"`);
  }
  const markerKey = options.markerKey ?? `__records_migrated_${options.collection}_v1`;
  if (await store.get(markerKey)) {
    return;
  }
  const records = app.records.open(options.collection);
  const existing = await records.get(options.syncId);
  if (existing) {
    await store.set(markerKey, true);
    await store.delete(options.storeKey);
    return;
  }
  const legacy = await store.get(options.storeKey);
  if (legacy && typeof legacy === "object") {
    const mapped = options.mapItem ? options.mapItem(legacy) : { ...legacy };
    const { id: _id, ...rest } = mapped;
    await records.create({ ...rest, id: options.syncId });
  }
  await store.set(markerKey, true);
  await store.delete(options.storeKey);
}
export {
  BaseDirectory,
  CRON_FIELD_COUNT,
  CRON_FIELD_KEYS,
  DEFAULT_CRON_PRESETS,
  RESERVED_COMMAND_ARG_NAMES,
  SeekMode,
  computeCronNextRun,
  enrichChatMessageWithCommand,
  extractCommandArgNames,
  findCommandConditionPattern,
  getCronFieldCount,
  getCronNextRunLabel,
  getCronValidationError,
  getFieldValue,
  getLocalTimezone,
  getOneOfFieldValue,
  hasCommandArgPlaceholders,
  interpolateVariables,
  isOneOfFieldValue,
  isRecordsSyncId,
  isValidCronExpression,
  matchCommandPattern,
  migrateStoreArrayToRecords,
  migrateStoreSingletonToRecord,
  normalizeCronExpression,
  parseCommand,
  parseCommandMessage,
  resolveFieldText,
  resolveOneOfFieldText,
  splitCronParts,
  withActionVariables
};
