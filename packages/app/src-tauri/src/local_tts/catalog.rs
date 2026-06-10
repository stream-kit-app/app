use std::sync::OnceLock;

use serde::{Deserialize, Serialize};

const HF_BASE: &str = "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0";
const VOICES_JSON: &str = include_str!("../../local_tts/voices.json");

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct VoicesFile {
    voices: Vec<VoiceCatalogEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VoiceCatalogEntry {
    pub id: String,
    pub name: String,
    pub language: String,
    pub quality: String,
    pub model_path: String,
}

fn loaded_catalog() -> &'static [VoiceCatalogEntry] {
    static CATALOG: OnceLock<Vec<VoiceCatalogEntry>> = OnceLock::new();
    CATALOG.get_or_init(|| {
        let file: VoicesFile =
            serde_json::from_str(VOICES_JSON).expect("invalid local_tts/voices.json");
        file.voices
    })
}

pub fn voice_catalog() -> &'static [VoiceCatalogEntry] {
    loaded_catalog()
}

pub fn find_voice(voice_id: &str) -> Option<&'static VoiceCatalogEntry> {
    loaded_catalog().iter().find(|voice| voice.id == voice_id)
}

pub fn model_download_url(voice_id: &str) -> Option<String> {
    find_voice(voice_id)
        .map(|voice| format!("{HF_BASE}/{}?download=true", voice.model_path))
}

pub fn config_download_url(voice_id: &str) -> Option<String> {
    find_voice(voice_id).map(|voice| {
        let config_path = voice
            .model_path
            .strip_suffix(".onnx")
            .map(|path| format!("{path}.onnx.json"))
            .unwrap_or_else(|| format!("{}.json", voice.model_path));

        format!("{HF_BASE}/{config_path}?download=true")
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn catalog_loads_all_voices() {
        assert!(voice_catalog().len() >= 100);
    }

    #[test]
    fn catalog_contains_dutch_voice() {
        assert!(find_voice("nl_NL-mls-medium").is_some());
    }

    #[test]
    fn model_urls_are_generated() {
        let url = model_download_url("en_US-lessac-medium").expect("url");
        assert!(url.contains("en_US-lessac-medium.onnx"));
    }
}
