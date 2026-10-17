---
'@stream-kit/plugin-tts': minor
'@stream-kit/app': patch
---

Back up cloned ElevenLabs voices on this device and restore them automatically when the API key changes to another account. Voices cloned in Stream Kit are saved with their samples; existing clones get a **Back up** button. Restored voices keep their tuning, and the default voice and Speak Text actions move to the new voice id. Plugins that update a user's action no longer take over its ownership.
