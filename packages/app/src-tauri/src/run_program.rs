use std::collections::HashMap;
use std::path::Path;
use std::process::{Command, Stdio};
use std::time::{Duration, Instant};

use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunProgramRequest {
    pub command: String,
    pub working_directory: Option<String>,
    pub arguments: Option<String>,
    pub wait_seconds: Option<f64>,
    pub environment: Option<HashMap<String, String>>,
    pub hide_window: Option<bool>,
    pub use_shell: Option<bool>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RunProgramResult {
    pub exit_code: Option<i32>,
    pub stdout: String,
    pub stderr: String,
    pub output_lines: Vec<String>,
}

fn split_arguments(arguments: &str) -> Vec<String> {
    let mut args = Vec::new();
    let mut current = String::new();
    let mut in_single = false;
    let mut in_double = false;

    for ch in arguments.chars() {
        match ch {
            '\'' if !in_double => in_single = !in_single,
            '"' if !in_single => in_double = !in_double,
            ' ' | '\t' if !in_single && !in_double => {
                if !current.is_empty() {
                    args.push(std::mem::take(&mut current));
                }
            }
            _ => current.push(ch),
        }
    }

    if !current.is_empty() {
        args.push(current);
    }

    args
}

fn should_use_shell(command: &str, use_shell: bool) -> bool {
    if use_shell {
        return true;
    }

    let lower = command.to_ascii_lowercase();

    lower.ends_with(".bat")
        || lower.ends_with(".cmd")
        || lower.ends_with(".ps1")
}

fn default_working_directory(command: &str) -> Option<String> {
    let path = Path::new(command);

    if !path.is_absolute() && path.components().count() <= 1 {
        return None;
    }

    path.parent()
        .filter(|parent| !parent.as_os_str().is_empty())
        .map(|parent| parent.to_string_lossy().into_owned())
}

fn apply_working_directory(command: &mut Command, request: &RunProgramRequest) {
    if let Some(working_directory) = request
        .working_directory
        .as_ref()
        .map(|value| value.trim())
        .filter(|value| !value.is_empty())
    {
        command.current_dir(working_directory);
        return;
    }

    if let Some(working_directory) = default_working_directory(&request.command) {
        command.current_dir(working_directory);
    }
}

fn apply_environment(command: &mut Command, environment: Option<&HashMap<String, String>>) {
    let Some(environment) = environment else {
        return;
    };

    for (key, value) in environment {
        if key.trim().is_empty() {
            continue;
        }

        command.env(key, value);
    }
}

#[cfg(windows)]
fn apply_hide_window(command: &mut Command, hide_window: bool) {
    if !hide_window {
        return;
    }

    use std::os::windows::process::CommandExt;

    const CREATE_NO_WINDOW: u32 = 0x0800_0000;
    command.creation_flags(CREATE_NO_WINDOW);
}

#[cfg(not(windows))]
fn apply_hide_window(_command: &mut Command, _hide_window: bool) {}

fn build_powershell_command(request: &RunProgramRequest) -> Command {
    let mut command = Command::new("powershell");
    command.args([
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        request.command.trim(),
    ]);

    if let Some(arguments) = request.arguments.as_ref() {
        for argument in split_arguments(arguments) {
            command.arg(argument);
        }
    }

    command
}

fn build_shell_command(request: &RunProgramRequest) -> Command {
    let mut parts = vec![request.command.trim().to_string()];

    if let Some(arguments) = request.arguments.as_ref() {
        let trimmed = arguments.trim();

        if !trimmed.is_empty() {
            parts.push(trimmed.to_string());
        }
    }

    let full_command = parts.join(" ");

    #[cfg(windows)]
    {
        let mut command = Command::new("cmd");
        command.arg("/C").arg(full_command);
        command
    }

    #[cfg(not(windows))]
    {
        let mut command = Command::new("sh");
        command.arg("-c").arg(full_command);
        command
    }
}

fn build_direct_command(request: &RunProgramRequest) -> Result<Command, String> {
    let program = request.command.trim();

    if program.is_empty() {
        return Err("program command is required".to_string());
    }

    let mut command = Command::new(program);

    if let Some(arguments) = request.arguments.as_ref() {
        for argument in split_arguments(arguments) {
            command.arg(argument);
        }
    }

    Ok(command)
}

fn build_command(request: &RunProgramRequest) -> Result<Command, String> {
    let use_shell = should_use_shell(&request.command, request.use_shell.unwrap_or(false));

    let mut command = if request.command.trim().to_ascii_lowercase().ends_with(".ps1") {
        build_powershell_command(request)
    } else if use_shell {
        build_shell_command(request)
    } else {
        build_direct_command(request)?
    };

    apply_working_directory(&mut command, request);
    apply_environment(&mut command, request.environment.as_ref());
    apply_hide_window(&mut command, request.hide_window.unwrap_or(false));

    Ok(command)
}

fn wait_with_timeout(
    child: &mut std::process::Child,
    timeout: Duration,
) -> Result<std::process::ExitStatus, String> {
    let started = Instant::now();

    loop {
        match child
            .try_wait()
            .map_err(|error| format!("failed to wait for process: {error}"))?
        {
            Some(status) => return Ok(status),
            None if started.elapsed() >= timeout => {
                child
                    .kill()
                    .map_err(|error| format!("failed to kill timed out process: {error}"))?;
                let _ = child.wait();
                return Err(format!(
                    "process did not exit within {} seconds",
                    timeout.as_secs_f64()
                ));
            }
            None => std::thread::sleep(Duration::from_millis(50)),
        }
    }
}

fn collect_output(stdout: Vec<u8>, stderr: Vec<u8>, exit_code: Option<i32>) -> RunProgramResult {
    let stdout = String::from_utf8_lossy(&stdout).into_owned();
    let stderr = String::from_utf8_lossy(&stderr).into_owned();
    let output_lines: Vec<String> = stdout
        .lines()
        .map(str::trim_end)
        .filter(|line| !line.is_empty())
        .map(str::to_string)
        .collect();

    RunProgramResult {
        exit_code,
        stdout,
        stderr,
        output_lines,
    }
}

fn run_program_inner(request: RunProgramRequest) -> Result<RunProgramResult, String> {
    let wait_seconds = request.wait_seconds.unwrap_or(0.0).max(0.0);
    let mut command = build_command(&request)?;

    if wait_seconds <= 0.0 {
        command
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null());

        command
            .spawn()
            .map_err(|error| format!("failed to start program: {error}"))?;

        return Ok(RunProgramResult {
            exit_code: None,
            stdout: String::new(),
            stderr: String::new(),
            output_lines: Vec::new(),
        });
    }

    command
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    let mut child = command
        .spawn()
        .map_err(|error| format!("failed to start program: {error}"))?;

    let timeout = Duration::from_secs_f64(wait_seconds);
    let status = wait_with_timeout(&mut child, timeout)?;

    let stdout = child
        .stdout
        .take()
        .map(|mut output| {
            let mut buffer = Vec::new();
            let _ = std::io::Read::read_to_end(&mut output, &mut buffer);
            buffer
        })
        .unwrap_or_default();

    let stderr = child
        .stderr
        .take()
        .map(|mut output| {
            let mut buffer = Vec::new();
            let _ = std::io::Read::read_to_end(&mut output, &mut buffer);
            buffer
        })
        .unwrap_or_default();

    Ok(collect_output(
        stdout,
        stderr,
        status.code(),
    ))
}

#[tauri::command]
pub async fn run_program(request: RunProgramRequest) -> Result<RunProgramResult, String> {
    tauri::async_runtime::spawn_blocking(move || run_program_inner(request))
        .await
        .map_err(|error| format!("run program task failed: {error}"))?
}
