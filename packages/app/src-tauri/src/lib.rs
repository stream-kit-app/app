// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod audio;
mod dev;
mod local_tts;
mod media;
mod network;
mod overlay_server;
mod plugins;
mod process_watcher;
mod run_program;
mod scripts;

use tauri::Manager;

#[cfg(windows)]
const WINDOWS_APP_USER_MODEL_ID: &str = "StreamKit.App";

#[cfg(windows)]
fn configure_windows_app_identity() -> windows::core::Result<()> {
    use windows::core::HSTRING;
    use windows::Win32::UI::Shell::SetCurrentProcessExplicitAppUserModelID;

    unsafe { SetCurrentProcessExplicitAppUserModelID(&HSTRING::from(WINDOWS_APP_USER_MODEL_ID)) }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn play_audio(data: Vec<u8>, volume: f32) -> Result<(), String> {
    audio::play_audio_bytes(data, volume).await
}

#[tauri::command]
async fn play_audio_file(path: String, volume: f32) -> Result<(), String> {
    audio::play_audio_file(path, volume).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(windows)]
    if let Err(error) = configure_windows_app_identity() {
        eprintln!("failed to configure Windows app identity: {error}");
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_oauth::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            play_audio,
            play_audio_file,
            media::get_media_file_duration_ms,
            network::is_tcp_port_reachable,
            local_tts::list_local_tts_voices,
            local_tts::get_local_tts_runtime_info,
            local_tts::download_local_tts_runtime,
            local_tts::download_local_tts_voice,
            local_tts::delete_local_tts_voice,
            local_tts::synthesize_local_speech,
            dev::watch_plugin_entry,
            dev::unwatch_plugin_entry,
            dev::open_devtools_if_needed,
            plugins::get_plugins_dir,
            plugins::list_installed_plugins,
            plugins::install_plugin_zip,
            plugins::link_plugin_dev,
            plugins::link_workspace_dev_plugins,
            plugins::sync_dev_plugin_entry,
            plugins::uninstall_plugin,
            plugins::fetch_plugin_manifest,
            plugins::download_and_install_plugin_update,
            process_watcher::start_process_watcher,
            process_watcher::stop_process_watcher,
            run_program::run_program,
            overlay_server::commands::overlay_server_start,
            overlay_server::commands::overlay_server_stop,
            overlay_server::commands::overlay_server_status,
            overlay_server::commands::overlay_broadcast,
            overlay_server::commands::overlay_sync_config,
            overlay_server::commands::overlay_sync_all_configs,
            overlay_server::commands::overlay_broadcast_settings,
            overlay_server::commands::overlay_get_overlays_dir,
            scripts::script_get_project_dir,
            scripts::script_get_scripts_dir
        ])
        .setup(|app| {
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_global_shortcut::Builder::new().build())?;

            app.manage(dev::PluginWatchers(std::sync::Mutex::new(
                std::collections::HashMap::new(),
            )));
            app.manage(process_watcher::ProcessWatcherState::new());
            app.manage(overlay_server::OverlayServerState::new());

            #[cfg(debug_assertions)]
            if let Some(window) = app.get_webview_window("main") {
                window.open_devtools();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
