use std::fs::{self, File};
use std::io::Read;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use zip::ZipArchive;

const BUILTIN_PLUGIN_KEYS: &[&str] = &["twitch", "youtube", "tts"];
const MANIFEST_FILE: &str = "manifest.json";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PluginManifest {
    pub name: String,
    pub version: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub entry: String,
    #[serde(default)]
    pub dependencies: Vec<String>,
    pub stream_kit_version: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstalledPluginManifest {
    pub key: String,
    pub name: String,
    pub version: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub entry: String,
    pub dependencies: Vec<String>,
    pub stream_kit_version: Option<String>,
    pub install_path: String,
}

impl From<PluginManifest> for InstalledPluginManifest {
    fn from(manifest: PluginManifest) -> Self {
        Self {
            key: String::new(),
            name: manifest.name,
            version: manifest.version,
            description: manifest.description,
            icon: manifest.icon,
            entry: manifest.entry,
            dependencies: manifest.dependencies,
            stream_kit_version: manifest.stream_kit_version,
            install_path: String::new(),
        }
    }
}

fn parse_manifest_contents(contents: &str, source: &str) -> Result<PluginManifest, String> {
    serde_json::from_str(contents)
        .map_err(|error| format!("invalid manifest.json in {source}: {error}"))
}

fn validate_manifest(manifest: &PluginManifest, install_dir: Option<&Path>) -> Result<(), String> {
    if manifest.name.trim().is_empty() {
        return Err("manifest name must not be empty".to_string());
    }

    if manifest.entry.trim().is_empty() {
        return Err("manifest entry must not be empty".to_string());
    }

    if let Some(install_dir) = install_dir {
        let entry_path = install_dir.join(&manifest.entry);
        if !entry_path.is_file() {
            return Err(format!(
                "manifest entry file not found: {}",
                entry_path.display()
            ));
        }
    }

    Ok(())
}

fn plugins_dir(app: &AppHandle) -> Result<PathBuf, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|error| format!("failed to resolve app data directory: {error}"))?;
    let plugins_dir = app_data_dir.join("plugins");

    fs::create_dir_all(&plugins_dir)
        .map_err(|error| format!("failed to create plugins directory: {error}"))?;

    Ok(plugins_dir)
}

fn read_manifest(path: &Path) -> Result<InstalledPluginManifest, String> {
    let manifest_path = path.join(MANIFEST_FILE);
    let contents = fs::read_to_string(&manifest_path).map_err(|error| {
        format!(
            "failed to read manifest at {}: {error}",
            manifest_path.display()
        )
    })?;

    let manifest = parse_manifest_contents(&contents, &path.display().to_string())?;
    validate_manifest(&manifest, Some(path))?;

    let mut installed = InstalledPluginManifest::from(manifest);
    installed.key = path
        .file_name()
        .and_then(|name| name.to_str())
        .ok_or_else(|| "plugin install path is not valid UTF-8".to_string())?
        .to_string();
    installed.install_path = path
        .to_str()
        .ok_or_else(|| "plugin install path is not valid UTF-8".to_string())?
        .to_string();

    Ok(installed)
}

fn slugify(value: &str, fallback: &str) -> String {
    let mut slug = String::new();
    let mut last_was_separator = false;

    for character in value.chars() {
        if character.is_ascii_alphanumeric() {
            slug.push(character.to_ascii_lowercase());
            last_was_separator = false;
        } else if !last_was_separator && !slug.is_empty() {
            slug.push('-');
            last_was_separator = true;
        }
    }

    while slug.ends_with('-') {
        slug.pop();
    }

    if slug.is_empty() {
        fallback.to_string()
    } else {
        slug
    }
}

fn install_key_base(manifest: &PluginManifest) -> String {
    let mut key = slugify(&manifest.name, "plugin");

    if BUILTIN_PLUGIN_KEYS.contains(&key.as_str()) {
        key = format!("{key}-plugin");
    }

    key
}

fn unique_plugin_destination(
    plugins_root: &Path,
    base_key: &str,
    replace_existing: bool,
) -> Result<PathBuf, String> {
    let base_destination = plugins_root.join(base_key);

    if replace_existing || !base_destination.exists() {
        return Ok(base_destination);
    }

    for suffix in 2.. {
        let candidate = plugins_root.join(format!("{base_key}-{suffix}"));

        if !candidate.exists() {
            return Ok(candidate);
        }
    }

    unreachable!("unbounded suffix search should always return a plugin destination")
}

fn extract_zip_to_dir<R: Read + std::io::Seek>(
    archive: &mut ZipArchive<R>,
    destination: &Path,
) -> Result<(), String> {
    for index in 0..archive.len() {
        let mut file = archive
            .by_index(index)
            .map_err(|error| format!("failed to read zip entry {index}: {error}"))?;
        let Some(sanitized) = file.enclosed_name().map(PathBuf::from) else {
            return Err("zip archive contains an invalid path".to_string());
        };

        let output_path = destination.join(sanitized);

        if file.name().ends_with('/') {
            fs::create_dir_all(&output_path).map_err(|error| {
                format!(
                    "failed to create directory {}: {error}",
                    output_path.display()
                )
            })?;
            continue;
        }

        if let Some(parent) = output_path.parent() {
            fs::create_dir_all(parent).map_err(|error| {
                format!(
                    "failed to create parent directory {}: {error}",
                    parent.display()
                )
            })?;
        }

        let mut output = File::create(&output_path)
            .map_err(|error| format!("failed to create file {}: {error}", output_path.display()))?;
        std::io::copy(&mut file, &mut output)
            .map_err(|error| format!("failed to extract {}: {error}", output_path.display()))?;
    }

    Ok(())
}

#[tauri::command]
pub fn get_plugins_dir(app: AppHandle) -> Result<String, String> {
    let dir = plugins_dir(&app)?;
    dir.to_str()
        .map(str::to_string)
        .ok_or_else(|| "plugins directory path is not valid UTF-8".to_string())
}

#[tauri::command]
pub fn list_installed_plugins(app: AppHandle) -> Result<Vec<InstalledPluginManifest>, String> {
    let dir = plugins_dir(&app)?;
    let mut manifests = Vec::new();

    let entries =
        fs::read_dir(&dir).map_err(|error| format!("failed to read plugins directory: {error}"))?;

    for entry in entries {
        let entry =
            entry.map_err(|error| format!("failed to read plugins directory entry: {error}"))?;
        let path = entry.path();

        if !path.is_dir() {
            continue;
        }

        match read_manifest(&path) {
            Ok(manifest) => manifests.push(manifest),
            Err(error) => {
                eprintln!(
                    "skipping invalid plugin directory {}: {error}",
                    path.display()
                );
            }
        }
    }

    manifests.sort_by(|left, right| left.name.cmp(&right.name));

    Ok(manifests)
}

#[tauri::command]
pub fn install_plugin_zip(
    app: AppHandle,
    zip_path: String,
    replace_existing: bool,
) -> Result<InstalledPluginManifest, String> {
    let zip_file = File::open(&zip_path)
        .map_err(|error| format!("failed to open zip file {}: {error}", zip_path))?;
    let mut archive = ZipArchive::new(zip_file)
        .map_err(|error| format!("failed to read zip archive: {error}"))?;

    let mut manifest_contents: Option<String> = None;

    for index in 0..archive.len() {
        let mut file = archive
            .by_index(index)
            .map_err(|error| format!("failed to read zip entry {index}: {error}"))?;

        if file.name() == MANIFEST_FILE || file.name().ends_with(&format!("/{MANIFEST_FILE}")) {
            let mut contents = String::new();
            file.read_to_string(&mut contents)
                .map_err(|error| format!("failed to read manifest from zip: {error}"))?;
            manifest_contents = Some(contents);
            break;
        }
    }

    let manifest_contents = manifest_contents
        .ok_or_else(|| "zip archive does not contain manifest.json".to_string())?;

    let manifest = parse_manifest_contents(&manifest_contents, "zip archive")?;
    validate_manifest(&manifest, None)?;

    let plugins_root = plugins_dir(&app)?;
    let install_key = install_key_base(&manifest);
    let destination = unique_plugin_destination(&plugins_root, &install_key, replace_existing)?;

    if destination.exists() {
        if !replace_existing {
            return Err(format!(
                "a plugin with key '{}' is already installed",
                install_key
            ));
        }

        fs::remove_dir_all(&destination).map_err(|error| {
            format!(
                "failed to remove existing plugin directory {}: {error}",
                destination.display()
            )
        })?;
    }

    fs::create_dir_all(&destination)
        .map_err(|error| format!("failed to create plugin directory: {error}"))?;

    let zip_file = File::open(&zip_path)
        .map_err(|error| format!("failed to reopen zip file {}: {error}", zip_path))?;
    let mut archive = ZipArchive::new(zip_file)
        .map_err(|error| format!("failed to read zip archive: {error}"))?;

    extract_zip_to_dir(&mut archive, &destination)?;

    read_manifest(&destination)
}

#[tauri::command]
pub fn uninstall_plugin(app: AppHandle, key: String) -> Result<(), String> {
    if BUILTIN_PLUGIN_KEYS.contains(&key.as_str()) {
        return Err(format!("cannot uninstall built-in plugin '{key}'"));
    }

    let plugins_root = plugins_dir(&app)?;
    let destination = plugins_root.join(&key);

    if !destination.exists() {
        return Err(format!("plugin '{key}' is not installed"));
    }

    fs::remove_dir_all(&destination).map_err(|error| {
        format!(
            "failed to remove plugin directory {}: {error}",
            destination.display()
        )
    })
}
