use std::path::PathBuf;

const SHELL_EDITORS: [&str; 3] = ["cursor", "code", "code-insiders"];

fn push_unique(commands: &mut Vec<String>, command: String) {
	if command.trim().is_empty() {
		return;
	}

	if commands.iter().any(|existing| existing == &command) {
		return;
	}

	commands.push(command);
}

#[cfg(windows)]
fn push_windows_editor_paths(commands: &mut Vec<String>) {
	let Ok(local_app_data) = std::env::var("LOCALAPPDATA") else {
		return;
	};

	let base = PathBuf::from(local_app_data);
	let candidates = [
		base.join("Programs")
			.join("cursor")
			.join("resources")
			.join("app")
			.join("bin")
			.join("cursor.cmd"),
		base.join("Programs").join("cursor").join("Cursor.exe"),
		base.join("Programs")
			.join("Microsoft VS Code")
			.join("bin")
			.join("code.cmd"),
		base.join("Programs")
			.join("Microsoft VS Code")
			.join("Code.exe"),
		base.join("Programs")
			.join("Microsoft VS Code Insiders")
			.join("bin")
			.join("code-insiders.cmd"),
		base.join("Programs")
			.join("Microsoft VS Code Insiders")
			.join("Code - Insiders.exe"),
	];

	for path in candidates {
		if path.is_file() {
			push_unique(commands, path.to_string_lossy().into_owned());
		}
	}
}

#[cfg(target_os = "macos")]
fn push_macos_editor_paths(commands: &mut Vec<String>) {
	let candidates = [
		"/Applications/Cursor.app/Contents/MacOS/Cursor",
		"/Applications/Cursor.app/Contents/Resources/app/bin/cursor",
		"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
		"/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code",
	];

	for path in candidates {
		if PathBuf::from(path).is_file() {
			push_unique(commands, path.to_string());
		}
	}
}

#[tauri::command]
pub fn resolve_editor_commands() -> Vec<String> {
	let mut commands = Vec::new();

	#[cfg(windows)]
	push_windows_editor_paths(&mut commands);

	#[cfg(target_os = "macos")]
	push_macos_editor_paths(&mut commands);

	for editor in SHELL_EDITORS {
		push_unique(&mut commands, editor.to_string());
	}

	commands
}
