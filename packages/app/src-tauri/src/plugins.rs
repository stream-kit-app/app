use std::fs::{self, File};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};

use reqwest::blocking::Client;
use semver::{Version, VersionReq};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use tauri::{AppHandle, Manager};
use zip::ZipArchive;

const DEV_LINK_FILE: &str = "dev-link.json";
const MANIFEST_FILE: &str = "manifest.json";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PluginManifest {
    pub key: String,
    pub name: String,
    pub version: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub entry: String,
    #[serde(default)]
    pub dependencies: Vec<String>,
    pub stream_kit_version: Option<String>,
    pub update_manifest_url: Option<String>,
    pub download_url: Option<String>,
    pub sha256: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct DevLinkManifest {
    pub source_root: String,
    pub source_entry: String,
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
    #[serde(skip_serializing_if = "Option::is_none")]
    pub update_manifest_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub download_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sha256: Option<String>,
    pub install_path: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dev_source_entry: Option<String>,
}

impl From<PluginManifest> for InstalledPluginManifest {
    fn from(manifest: PluginManifest) -> Self {
        Self {
            key: manifest.key,
            name: manifest.name,
            version: manifest.version,
            description: manifest.description,
            icon: manifest.icon,
            entry: manifest.entry,
            dependencies: manifest.dependencies,
            stream_kit_version: manifest.stream_kit_version,
            update_manifest_url: manifest.update_manifest_url,
            download_url: manifest.download_url,
            sha256: manifest.sha256,
            install_path: String::new(),
            dev_source_entry: None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RemotePluginManifest {
    pub key: String,
    pub name: String,
    pub version: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub entry: String,
    #[serde(default)]
    pub dependencies: Vec<String>,
    pub stream_kit_version: Option<String>,
    pub update_manifest_url: Option<String>,
    pub download_url: Option<String>,
    pub sha256: Option<String>,
}

impl From<PluginManifest> for RemotePluginManifest {
    fn from(manifest: PluginManifest) -> Self {
        Self {
            key: manifest.key,
            name: manifest.name,
            version: manifest.version,
            description: manifest.description,
            icon: manifest.icon,
            entry: manifest.entry,
            dependencies: manifest.dependencies,
            stream_kit_version: manifest.stream_kit_version,
            update_manifest_url: manifest.update_manifest_url,
            download_url: manifest.download_url,
            sha256: manifest.sha256,
        }
    }
}

fn app_version() -> Version {
    Version::parse(env!("CARGO_PKG_VERSION")).unwrap_or_else(|_| Version::new(0, 1, 0))
}

fn version_matches_requirement(app: &Version, requirement: &VersionReq) -> bool {
    if requirement.matches(app) {
        return true;
    }

    // Prerelease app builds (e.g. 0.1.0-alpha.6) satisfy constraints such as
    // >=0.1.0 when their release components meet the requirement.
    if !app.pre.is_empty() {
        let release = Version::new(app.major, app.minor, app.patch);
        return requirement.matches(&release);
    }

    false
}

fn validate_stream_kit_version(constraint: &str) -> Result<(), String> {
    let trimmed = constraint.trim();

    if trimmed.is_empty() {
        return Ok(());
    }

    let requirement = if trimmed.starts_with('>') || trimmed.starts_with('<') || trimmed.starts_with('=') || trimmed.starts_with('^') || trimmed.starts_with('~') {
        VersionReq::parse(trimmed)
    } else {
        VersionReq::parse(&format!(">={trimmed}"))
    }
    .map_err(|error| format!("invalid streamKitVersion constraint '{trimmed}': {error}"))?;

    if !version_matches_requirement(&app_version(), &requirement) {
        return Err(format!(
            "plugin requires Stream Kit {trimmed}, but this app is {}",
            app_version()
        ));
    }

    Ok(())
}

fn validate_manifest_compatibility(manifest: &PluginManifest) -> Result<(), String> {
    if let Some(stream_kit_version) = manifest.stream_kit_version.as_deref() {
        validate_stream_kit_version(stream_kit_version)?;
    }

    Ok(())
}

fn http_client() -> Result<Client, String> {
    Client::builder()
        .user_agent(format!("StreamKit/{}", app_version()))
        .build()
        .map_err(|error| format!("failed to create HTTP client: {error}"))
}

fn download_file(client: &Client, url: &str, destination: &Path) -> Result<(), String> {
    let response = client
        .get(url)
        .send()
        .map_err(|error| format!("download request failed: {error}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "download failed with status {} for {}",
            response.status(),
            url
        ));
    }

    let bytes = response
        .bytes()
        .map_err(|error| format!("failed to read download response: {error}"))?;

    if let Some(parent) = destination.parent() {
        fs::create_dir_all(parent).map_err(|error| {
            format!(
                "failed to create parent directory {}: {error}",
                parent.display()
            )
        })?;
    }

    let mut file = File::create(destination)
        .map_err(|error| format!("failed to create file {}: {error}", destination.display()))?;

    file.write_all(&bytes)
        .map_err(|error| format!("failed to write file {}: {error}", destination.display()))?;

    Ok(())
}

fn verify_sha256(path: &Path, expected: &str) -> Result<(), String> {
    let expected = expected.trim().to_ascii_lowercase();

    if expected.is_empty() {
        return Ok(());
    }

    let mut file = File::open(path)
        .map_err(|error| format!("failed to open file {}: {error}", path.display()))?;
    let mut hasher = Sha256::new();
    let mut buffer = [0_u8; 8192];

    loop {
        let read = file
            .read(&mut buffer)
            .map_err(|error| format!("failed to read file {}: {error}", path.display()))?;

        if read == 0 {
            break;
        }

        hasher.update(&buffer[..read]);
    }

    let digest = format!("{:x}", hasher.finalize());

    if digest != expected {
        return Err("downloaded plugin archive failed SHA-256 verification".to_string());
    }

    Ok(())
}

fn read_manifest_from_zip(archive: &mut ZipArchive<File>) -> Result<PluginManifest, String> {
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
    validate_manifest_compatibility(&manifest)?;

    Ok(manifest)
}

fn install_plugin_archive(app: &AppHandle, zip_path: &Path, replace_existing: bool) -> Result<InstalledPluginManifest, String> {
    let zip_file = File::open(zip_path)
        .map_err(|error| format!("failed to open zip file {}: {error}", zip_path.display()))?;
    let mut archive = ZipArchive::new(zip_file)
        .map_err(|error| format!("failed to read zip archive: {error}"))?;

    let manifest = read_manifest_from_zip(&mut archive)?;

    let plugins_root = plugins_dir(app)?;
    let destination = plugin_destination(&plugins_root, &manifest.key);

    if destination.exists() {
        if !replace_existing {
            return Err(format!(
                "a plugin with key '{}' is already installed",
                manifest.key
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

    let zip_file = File::open(zip_path)
        .map_err(|error| format!("failed to open zip file {}: {error}", zip_path.display()))?;
    let mut archive = ZipArchive::new(zip_file)
        .map_err(|error| format!("failed to read zip archive: {error}"))?;

    extract_zip_to_dir(&mut archive, &destination)?;

    read_manifest(&destination)
}

fn parse_manifest_contents(contents: &str, source: &str) -> Result<PluginManifest, String> {
    serde_json::from_str(contents)
        .map_err(|error| format!("invalid manifest.json in {source}: {error}"))
}

fn validate_plugin_key(key: &str) -> Result<(), String> {
    let trimmed = key.trim();

    if trimmed.is_empty() {
        return Err("manifest key must not be empty".to_string());
    }

    if trimmed.len() > 64 {
        return Err("manifest key must be 64 characters or fewer".to_string());
    }

    if !trimmed
        .chars()
        .all(|character| character.is_ascii_lowercase() || character.is_ascii_digit() || character == '-')
    {
        return Err(
            "manifest key must use lowercase letters, numbers, and hyphens only".to_string(),
        );
    }

    if trimmed.starts_with('-') || trimmed.ends_with('-') {
        return Err("manifest key must not start or end with a hyphen".to_string());
    }

    Ok(())
}

fn validate_manifest(manifest: &PluginManifest, install_dir: Option<&Path>) -> Result<(), String> {
    validate_plugin_key(&manifest.key)?;

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

fn read_dev_link(path: &Path) -> Result<Option<DevLinkManifest>, String> {
    let dev_link_path = path.join(DEV_LINK_FILE);

    if !dev_link_path.is_file() {
        return Ok(None);
    }

    let contents = fs::read_to_string(&dev_link_path).map_err(|error| {
        format!(
            "failed to read dev link at {}: {error}",
            dev_link_path.display()
        )
    })?;

    serde_json::from_str(&contents).map_err(|error| {
        format!(
            "invalid dev link file at {}: {error}",
            dev_link_path.display()
        )
    }).map(Some)
}

fn read_manifest_metadata(path: &Path) -> Result<InstalledPluginManifest, String> {
    let manifest_path = path.join(MANIFEST_FILE);
    let contents = fs::read_to_string(&manifest_path).map_err(|error| {
        format!(
            "failed to read manifest at {}: {error}",
            manifest_path.display()
        )
    })?;

    let manifest = parse_manifest_contents(&contents, &path.display().to_string())?;
    validate_manifest(&manifest, None)?;

    let mut installed = InstalledPluginManifest::from(manifest);
    installed.install_path = path
        .to_str()
        .ok_or_else(|| "plugin install path is not valid UTF-8".to_string())?
        .to_string();

    if let Some(dev_link) = read_dev_link(path)? {
        installed.dev_source_entry = Some(dev_link.source_entry);
    }

    Ok(installed)
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
    installed.install_path = path
        .to_str()
        .ok_or_else(|| "plugin install path is not valid UTF-8".to_string())?
        .to_string();

    if let Some(dev_link) = read_dev_link(path)? {
        installed.dev_source_entry = Some(dev_link.source_entry);
    }

    Ok(installed)
}

fn plugin_destination(plugins_root: &Path, key: &str) -> PathBuf {
    plugins_root.join(key)
}

fn copy_file_create_parents(source: &Path, destination: &Path) -> Result<(), String> {
    if let Some(parent) = destination.parent() {
        fs::create_dir_all(parent).map_err(|error| {
            format!(
                "failed to create parent directory {}: {error}",
                parent.display()
            )
        })?;
    }

    fs::copy(source, destination).map_err(|error| {
        format!(
            "failed to copy {} to {}: {error}",
            source.display(),
            destination.display()
        )
    })?;

    Ok(())
}

fn mirror_directory(source: &Path, destination: &Path) -> Result<(), String> {
    fs::create_dir_all(destination)
        .map_err(|error| format!("failed to create directory {}: {error}", destination.display()))?;

    for entry in fs::read_dir(source).map_err(|error| {
        format!(
            "failed to read directory {}: {error}",
            source.display()
        )
    })? {
        let entry = entry.map_err(|error| format!("failed to read directory entry: {error}"))?;
        let source_path = entry.path();
        let destination_path = destination.join(entry.file_name());

        if source_path.is_dir() {
            mirror_directory(&source_path, &destination_path)?;
        } else {
            copy_file_create_parents(&source_path, &destination_path)?;
        }
    }

    Ok(())
}

fn mirror_plugin_files(source_root: &Path, manifest: &PluginManifest, destination: &Path) -> Result<(), String> {
    fs::create_dir_all(destination)
        .map_err(|error| format!("failed to create plugin directory: {error}"))?;

    let manifest_path = source_root.join(MANIFEST_FILE);
    copy_file_create_parents(&manifest_path, &destination.join(MANIFEST_FILE))?;

    let source_entry = source_root.join(&manifest.entry);
    if !source_entry.is_file() {
        return Err(format!(
            "manifest entry file not found: {}",
            source_entry.display()
        ));
    }

    let source_output_dir = source_entry.parent().ok_or_else(|| {
        format!(
            "manifest entry file has no parent directory: {}",
            source_entry.display()
        )
    })?;

    if source_output_dir.file_name().is_some_and(|name| name == "dist") {
        mirror_directory(source_output_dir, &destination.join("dist"))?;
    } else {
        copy_file_create_parents(&source_entry, &destination.join(&manifest.entry))?;
    }

    Ok(())
}

fn write_dev_link(destination: &Path, source_root: &Path, source_entry: &Path) -> Result<(), String> {
    let dev_link = DevLinkManifest {
        source_root: source_root
            .to_str()
            .ok_or_else(|| "plugin source root is not valid UTF-8".to_string())?
            .to_string(),
        source_entry: source_entry
            .to_str()
            .ok_or_else(|| "plugin source entry is not valid UTF-8".to_string())?
            .to_string(),
    };

    fs::write(
        destination.join(DEV_LINK_FILE),
        serde_json::to_string_pretty(&dev_link)
            .map_err(|error| format!("failed to serialize dev link file: {error}"))?,
    )
    .map_err(|error| format!("failed to write dev link file: {error}"))?;

    Ok(())
}

fn resolve_project_root(project_path: &str) -> Result<PathBuf, String> {
    let path = PathBuf::from(project_path);

    if path.ends_with(MANIFEST_FILE) {
        path.parent()
            .map(Path::to_path_buf)
            .ok_or_else(|| "manifest path has no parent directory".to_string())
    } else {
        Ok(path)
    }
}

fn read_manifest_from_project(project_root: &Path) -> Result<PluginManifest, String> {
    let manifest_path = project_root.join(MANIFEST_FILE);
    let contents = fs::read_to_string(&manifest_path).map_err(|error| {
        format!(
            "failed to read manifest at {}: {error}",
            manifest_path.display()
        )
    })?;

    let manifest = parse_manifest_contents(&contents, &manifest_path.display().to_string())?;
    validate_plugin_key(&manifest.key)?;

    if manifest.name.trim().is_empty() {
        return Err("manifest name must not be empty".to_string());
    }

    if manifest.entry.trim().is_empty() {
        return Err("manifest entry must not be empty".to_string());
    }

    let source_entry = project_root.join(&manifest.entry);
    if !source_entry.is_file() {
        return Err(format!(
            "manifest entry file not found: {}. Build the plugin before linking it.",
            source_entry.display()
        ));
    }

    Ok(manifest)
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

        match read_manifest_metadata(&path) {
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
    install_plugin_archive(&app, Path::new(&zip_path), replace_existing)
}

#[tauri::command]
pub fn link_plugin_dev(
    app: AppHandle,
    project_path: String,
    replace_existing: bool,
) -> Result<InstalledPluginManifest, String> {
    let project_root = resolve_project_root(&project_path)?;
    let manifest = read_manifest_from_project(&project_root)?;

    let plugins_root = plugins_dir(&app)?;
    let destination = plugin_destination(&plugins_root, &manifest.key);

    if destination.exists() {
        if !replace_existing {
            return Err(format!(
                "a plugin with key '{}' is already installed",
                manifest.key
            ));
        }

        fs::remove_dir_all(&destination).map_err(|error| {
            format!(
                "failed to remove existing plugin directory {}: {error}",
                destination.display()
            )
        })?;
    }

    mirror_plugin_files(&project_root, &manifest, &destination)?;

    let source_entry = project_root.join(&manifest.entry);
    write_dev_link(&destination, &project_root, &source_entry)?;

    read_manifest(&destination)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceDevPluginsConfig {
    #[serde(default)]
    plugins: Vec<String>,
}

#[tauri::command]
pub fn link_workspace_dev_plugins(
    app: AppHandle,
    workspace_root: String,
    replace_existing: bool,
) -> Result<Vec<InstalledPluginManifest>, String> {
    let config_path = PathBuf::from(&workspace_root).join("dev-plugins.json");

    if !config_path.is_file() {
        return Ok(Vec::new());
    }

    let contents = fs::read_to_string(&config_path).map_err(|error| {
        format!(
            "failed to read workspace dev plugin config at {}: {error}",
            config_path.display()
        )
    })?;

    let config: WorkspaceDevPluginsConfig = serde_json::from_str(&contents).map_err(|error| {
        format!(
            "invalid workspace dev plugin config at {}: {error}",
            config_path.display()
        )
    })?;

    let workspace_root_path = PathBuf::from(&workspace_root);
    let mut linked = Vec::new();

    for plugin_path in config.plugins {
        let project_root = workspace_root_path.join(&plugin_path);
        let manifest_path = project_root.join(MANIFEST_FILE);

        if !manifest_path.is_file() {
            eprintln!(
                "skipping workspace dev plugin at {}: manifest.json not found",
                project_root.display()
            );
            continue;
        }

        match link_plugin_dev(
            app.clone(),
            project_root
                .to_str()
                .ok_or_else(|| "plugin project path is not valid UTF-8".to_string())?
                .to_string(),
            replace_existing,
        ) {
            Ok(manifest) => linked.push(manifest),
            Err(error) => {
                eprintln!(
                    "failed to link workspace dev plugin at {}: {error}",
                    project_root.display()
                );
            }
        }
    }

    Ok(linked)
}

#[tauri::command]
pub fn sync_dev_plugin_entry(app: AppHandle, plugin_key: String) -> Result<(), String> {
    let plugins_root = plugins_dir(&app)?;
    let destination = plugin_destination(&plugins_root, &plugin_key);

    if !destination.is_dir() {
        return Err(format!("plugin '{plugin_key}' is not installed"));
    }

    let dev_link = read_dev_link(&destination)?.ok_or_else(|| {
        format!("plugin '{plugin_key}' is not linked for development")
    })?;

    let manifest = read_manifest(&destination)?;
    let source_root = PathBuf::from(&dev_link.source_root);
    let source_entry = source_root.join(&manifest.entry);

    if !source_entry.is_file() {
        return Err(format!(
            "dev plugin entry file not found: {}",
            source_entry.display()
        ));
    }

    let source_manifest = source_root.join(MANIFEST_FILE);
    if source_manifest.is_file() {
        copy_file_create_parents(&source_manifest, &destination.join(MANIFEST_FILE))?;
    }

    let source_output_dir = source_entry.parent().ok_or_else(|| {
        format!(
            "manifest entry file has no parent directory: {}",
            source_entry.display()
        )
    })?;

    if source_output_dir.file_name().is_some_and(|name| name == "dist") {
        let destination_output_dir = destination.join("dist");
        if destination_output_dir.exists() {
            fs::remove_dir_all(&destination_output_dir).map_err(|error| {
                format!(
                    "failed to remove plugin output directory {}: {error}",
                    destination_output_dir.display()
                )
            })?;
        }

        mirror_directory(source_output_dir, &destination_output_dir)?;
    } else {
        copy_file_create_parents(&source_entry, &destination.join(&manifest.entry))?;
    }

    Ok(())
}

#[tauri::command]
pub fn uninstall_plugin(app: AppHandle, key: String) -> Result<(), String> {
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

fn manifest_fetch_url(manifest_url: &str) -> String {
    let cache_key = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_secs())
        .unwrap_or(0);

    if manifest_url.contains('?') {
        format!("{manifest_url}&streamKitManifestCheck={cache_key}")
    } else {
        format!("{manifest_url}?streamKitManifestCheck={cache_key}")
    }
}

#[tauri::command]
pub fn fetch_plugin_manifest(manifest_url: String) -> Result<RemotePluginManifest, String> {
    let client = http_client()?;
    let response = client
        .get(manifest_fetch_url(&manifest_url))
        .header(reqwest::header::CACHE_CONTROL, "no-cache")
        .send()
        .map_err(|error| format!("failed to fetch plugin manifest: {error}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "failed to fetch plugin manifest with status {} from {}",
            response.status(),
            manifest_url
        ));
    }

    let contents = response
        .text()
        .map_err(|error| format!("failed to read plugin manifest response: {error}"))?;

    let manifest = parse_manifest_contents(&contents, &manifest_url)?;
    validate_manifest(&manifest, None)?;

    Ok(RemotePluginManifest::from(manifest))
}

#[tauri::command]
pub fn download_and_install_plugin_update(
    app: AppHandle,
    download_url: String,
    expected_key: String,
    expected_sha256: Option<String>,
) -> Result<InstalledPluginManifest, String> {
    let client = http_client()?;
    let plugins_root = plugins_dir(&app)?;
    let temp_dir = plugins_root.join(".updates");

    fs::create_dir_all(&temp_dir)
        .map_err(|error| format!("failed to create plugin update directory: {error}"))?;

    let temp_zip = temp_dir.join(format!("{expected_key}-{}.zip", std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_millis())
        .unwrap_or(0)));

    download_file(&client, &download_url, &temp_zip)?;

    if let Some(expected_sha256) = expected_sha256.as_deref() {
        verify_sha256(&temp_zip, expected_sha256)?;
    }

    let zip_file = File::open(&temp_zip)
        .map_err(|error| format!("failed to open downloaded zip file: {error}"))?;
    let mut archive = ZipArchive::new(zip_file)
        .map_err(|error| format!("failed to read downloaded zip archive: {error}"))?;
    let manifest = read_manifest_from_zip(&mut archive)?;

    if manifest.key != expected_key {
        let _ = fs::remove_file(&temp_zip);
        return Err(format!(
            "remote plugin key '{}' does not match expected key '{}'",
            manifest.key, expected_key
        ));
    }

    let installed = install_plugin_archive(&app, &temp_zip, true);
    let _ = fs::remove_file(&temp_zip);

    installed
}
