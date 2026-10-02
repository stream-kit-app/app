#[tauri::command]
pub fn is_store_install() -> bool {
    std::env::current_exe()
        .ok()
        .map(|path| {
            path.components().any(|component| {
                component
                    .as_os_str()
                    .to_str()
                    .is_some_and(|name| name.eq_ignore_ascii_case("WindowsApps"))
            })
        })
        .unwrap_or(false)
}
