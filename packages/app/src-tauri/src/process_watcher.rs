use std::collections::HashMap;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

use serde::Serialize;
use sysinfo::{Pid, ProcessRefreshKind, ProcessesToUpdate, System};
use tauri::{AppHandle, Emitter, State};

const DEFAULT_POLL_INTERVAL_MS: u64 = 1000;
const MIN_POLL_INTERVAL_MS: u64 = 500;
const MAX_POLL_INTERVAL_MS: u64 = 5000;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProcessEventPayload {
    pub executable: String,
    pub full_path: String,
    pub name: String,
    pub parent_process_id: u32,
    pub path: String,
    pub process_id: u32,
}

pub struct ProcessWatcherState {
    inner: Mutex<WatcherInner>,
}

struct WatcherInner {
    running: bool,
    cancel: Option<Arc<AtomicBool>>,
    thread: Option<thread::JoinHandle<()>>,
}

impl ProcessWatcherState {
    pub fn new() -> Self {
        Self {
            inner: Mutex::new(WatcherInner {
                running: false,
                cancel: None,
                thread: None,
            }),
        }
    }
}

impl Default for ProcessWatcherState {
    fn default() -> Self {
        Self::new()
    }
}

fn clamp_poll_interval(poll_interval_ms: Option<u64>) -> u64 {
    poll_interval_ms
        .unwrap_or(DEFAULT_POLL_INTERVAL_MS)
        .clamp(MIN_POLL_INTERVAL_MS, MAX_POLL_INTERVAL_MS)
}

fn normalize_executable(name: &str) -> String {
    let trimmed = name.trim();

    #[cfg(windows)]
    {
        if trimmed.len() > 4 && trimmed.to_ascii_lowercase().ends_with(".exe") {
            return trimmed[..trimmed.len() - 4].to_string();
        }
    }

    trimmed.to_string()
}

fn executable_from_process(process: &sysinfo::Process) -> String {
    if let Some(exe) = process.exe() {
        let file_name = exe
            .file_name()
            .map(|name| name.to_string_lossy().into_owned())
            .unwrap_or_default();

        if !file_name.is_empty() {
            return normalize_executable(&file_name);
        }
    }

    normalize_executable(&process.name().to_string_lossy())
}

fn build_payload(process: &sysinfo::Process, pid: Pid) -> ProcessEventPayload {
    let full_path = process
        .exe()
        .map(|path| path.to_string_lossy().into_owned())
        .unwrap_or_default();

    let executable = executable_from_process(process);

    let path = process
        .exe()
        .and_then(|exe_path| exe_path.parent())
        .map(|parent| parent.to_string_lossy().into_owned())
        .unwrap_or_default();

    let parent_process_id = process.parent().map(|parent| parent.as_u32()).unwrap_or(0);
    let process_id = pid.as_u32();

    ProcessEventPayload {
        executable: executable.clone(),
        full_path,
        name: executable,
        parent_process_id,
        path,
        process_id,
    }
}

fn collect_snapshots(
    system: &System,
    previous: &HashMap<Pid, ProcessEventPayload>,
) -> HashMap<Pid, ProcessEventPayload> {
    system
        .processes()
        .iter()
        .map(|(pid, process)| {
            let payload = build_payload(process, *pid);

            if !payload.executable.is_empty() {
                return (*pid, payload);
            }

            if let Some(previous_payload) = previous.get(pid) {
                if !previous_payload.executable.is_empty() {
                    return (*pid, previous_payload.clone());
                }
            }

            (*pid, payload)
        })
        .collect()
}

fn process_identity_changed(previous: &ProcessEventPayload, current: &ProcessEventPayload) -> bool {
    if previous.executable != current.executable {
        return true;
    }

    if previous.full_path.is_empty() || current.full_path.is_empty() {
        return false;
    }

    previous.full_path != current.full_path
}

fn emit_process_events(
    app: &AppHandle,
    previous: &HashMap<Pid, ProcessEventPayload>,
    current: &HashMap<Pid, ProcessEventPayload>,
) {
    for (pid, payload) in current {
        match previous.get(pid) {
            None => {
                let _ = app.emit("process-started", payload);
            }
            Some(previous_payload) if process_identity_changed(previous_payload, payload) => {
                let _ = app.emit("process-stopped", previous_payload);
                let _ = app.emit("process-started", payload);
            }
            _ => {}
        }
    }

    for (pid, payload) in previous {
        if !current.contains_key(pid) {
            let _ = app.emit("process-stopped", payload);
        }
    }
}

fn refresh_process_list(system: &mut System) {
    system.refresh_processes_specifics(
        ProcessesToUpdate::All,
        true,
        ProcessRefreshKind::everything()
            .without_cpu()
            .without_memory()
            .without_disk_usage(),
    );
}

fn run_watcher(app: AppHandle, poll_interval_ms: u64, cancel: Arc<AtomicBool>) {
    let mut system = System::new_all();
    refresh_process_list(&mut system);

    let mut previous = collect_snapshots(&system, &HashMap::new());

    while !cancel.load(Ordering::Relaxed) {
        thread::sleep(Duration::from_millis(poll_interval_ms));

        if cancel.load(Ordering::Relaxed) {
            break;
        }

        refresh_process_list(&mut system);
        let current = collect_snapshots(&system, &previous);
        emit_process_events(&app, &previous, &current);
        previous = current;
    }
}

fn stop_watcher_inner(inner: &mut WatcherInner) -> Result<(), String> {
    if !inner.running {
        return Ok(());
    }

    if let Some(cancel) = inner.cancel.take() {
        cancel.store(true, Ordering::Relaxed);
    }

    if let Some(thread) = inner.thread.take() {
        thread
            .join()
            .map_err(|_| "process watcher thread panicked".to_string())?;
    }

    inner.running = false;

    Ok(())
}

#[tauri::command]
pub fn start_process_watcher(
    app: AppHandle,
    state: State<'_, ProcessWatcherState>,
    poll_interval_ms: Option<u64>,
) -> Result<(), String> {
    let poll_interval_ms = clamp_poll_interval(poll_interval_ms);

    let mut inner = state
        .inner
        .lock()
        .map_err(|error| format!("process watcher state lock poisoned: {error}"))?;

    stop_watcher_inner(&mut inner)?;

    let cancel = Arc::new(AtomicBool::new(false));
    let cancel_for_thread = Arc::clone(&cancel);
    let app_for_thread = app.clone();

    let thread = thread::Builder::new()
        .name("process-watcher".into())
        .spawn(move || run_watcher(app_for_thread, poll_interval_ms, cancel_for_thread))
        .map_err(|error| format!("failed to start process watcher thread: {error}"))?;

    inner.running = true;
    inner.cancel = Some(cancel);
    inner.thread = Some(thread);

    Ok(())
}

#[tauri::command]
pub fn stop_process_watcher(state: State<'_, ProcessWatcherState>) -> Result<(), String> {
    let mut inner = state
        .inner
        .lock()
        .map_err(|error| format!("process watcher state lock poisoned: {error}"))?;

    stop_watcher_inner(&mut inner)
}
