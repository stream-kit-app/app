use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Mutex;
use std::time::Duration;

use notify::RecursiveMode;
use notify_debouncer_mini::{new_debouncer, DebounceEventResult, Debouncer};
use serde::Serialize;
use tauri::{AppHandle, Emitter, State, WebviewWindow};

type RecommendedDebouncer = Debouncer<notify::RecommendedWatcher>;

pub struct PluginWatchers(pub Mutex<HashMap<String, RecommendedDebouncer>>);

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct PluginEntryChangedPayload {
    plugin_key: String,
}

fn remove_watcher(watchers: &PluginWatchers, plugin_key: &str) -> Result<(), String> {
    let mut map = watchers
        .0
        .lock()
        .map_err(|error| format!("watcher state lock poisoned: {error}"))?;

    map.remove(plugin_key);

    Ok(())
}

#[tauri::command]
pub fn watch_plugin_entry(
    app: AppHandle,
    watchers: State<'_, PluginWatchers>,
    plugin_key: String,
    entry_path: String,
) -> Result<(), String> {
    remove_watcher(&watchers, &plugin_key)?;

    let path = PathBuf::from(&entry_path);
    if !path.is_file() {
        return Err(format!("plugin entry file not found: {entry_path}"));
    }

    let watch_path = path
        .parent()
        .ok_or_else(|| format!("plugin entry has no parent directory: {entry_path}"))?
        .to_path_buf();
    let entry_file_name = path
        .file_name()
        .ok_or_else(|| format!("plugin entry has no file name: {entry_path}"))?
        .to_owned();

    let app_handle = app.clone();
    let plugin_key_for_event = plugin_key.clone();

    let mut debouncer = new_debouncer(
        Duration::from_millis(300),
        move |result: DebounceEventResult| {
            let Ok(events) = result else {
                return;
            };

            for event in events {
                if event.path.file_name() == Some(entry_file_name.as_os_str()) {
                    let _ = app_handle.emit(
                        "plugin-entry-changed",
                        PluginEntryChangedPayload {
                            plugin_key: plugin_key_for_event.clone(),
                        },
                    );
                    return;
                }
            }
        },
    )
    .map_err(|error| format!("failed to create file watcher: {error}"))?;

    debouncer
        .watcher()
        .watch(&watch_path, RecursiveMode::NonRecursive)
        .map_err(|error| format!("failed to watch plugin entry directory: {error}"))?;

    let mut map = watchers
        .0
        .lock()
        .map_err(|error| format!("watcher state lock poisoned: {error}"))?;

    map.insert(plugin_key, debouncer);

    Ok(())
}

#[tauri::command]
pub fn unwatch_plugin_entry(
    watchers: State<'_, PluginWatchers>,
    plugin_key: String,
) -> Result<(), String> {
    remove_watcher(&watchers, &plugin_key)
}

#[tauri::command]
pub fn open_devtools_if_needed(window: WebviewWindow) -> Result<(), String> {
    #[cfg(windows)]
    {
        window.open_devtools();
    }

    #[cfg(not(windows))]
    if !window.is_devtools_open() {
        window.open_devtools();
    }

    Ok(())
}
