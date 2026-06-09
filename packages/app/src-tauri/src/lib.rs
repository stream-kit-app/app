// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod dev;
mod plugins;

use std::io::Cursor;

use rodio::{Decoder, OutputStream, Sink, Source};
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
    tauri::async_runtime::spawn_blocking(move || {
        let cursor = Cursor::new(data);
        let source = Decoder::new(cursor)
            .map_err(|error| format!("failed to decode audio stream: {error}"))?
            .amplify(volume.clamp(0.0, 1.0));
        let (_stream, stream_handle) = OutputStream::try_default()
            .map_err(|error| format!("failed to open default audio output: {error}"))?;
        let sink = Sink::try_new(&stream_handle)
            .map_err(|error| format!("failed to create audio sink: {error}"))?;

        sink.append(source);
        sink.sleep_until_end();

        Ok::<(), String>(())
    })
    .await
    .map_err(|error| format!("audio playback task failed: {error}"))?
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
        .invoke_handler(tauri::generate_handler![
            greet,
            play_audio,
            dev::watch_plugin_entry,
            dev::unwatch_plugin_entry,
            dev::open_devtools_if_needed,
            plugins::get_plugins_dir,
            plugins::list_installed_plugins,
            plugins::install_plugin_zip,
            plugins::uninstall_plugin
        ])
        .setup(|app| {
            app.manage(dev::PluginWatchers(std::sync::Mutex::new(
                std::collections::HashMap::new(),
            )));

            #[cfg(debug_assertions)]
            if let Some(window) = app.get_webview_window("main") {
                window.open_devtools();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
