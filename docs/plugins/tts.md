# TTS Plugin

The **TTS** plugin (`@stream-kit/plugin-tts`) provides text-to-speech through local Piper voices, StreamElements, and ElevenLabs.

## Providers

| Provider | Description |
|----------|-------------|
| **Local TTS** | Offline Piper voices downloaded to the device |
| **StreamElements** | Cloud TTS via your StreamElements overlay token |
| **ElevenLabs** | Cloud TTS via your ElevenLabs API key |

Configure providers under **Plugins → TTS → Configure**.

## ElevenLabs voices

After entering a valid ElevenLabs API key in **Plugins → TTS → Configure**, the **Voices** section shows a searchable table of every available voice with configurable columns for the voice name and voice ID.

Use this overview when building triggers or handler chains:

1. Search by voice name, language, or ID in the inline search field.
2. Click the **copy** button on a row to copy that voice's ID to the clipboard.
3. In a **TTS → ElevenLabs → Speak Text** handler, choose **Variable** for the voice field and paste the ID (for example `{voiceId}` from trigger context).

The default voice combobox and handler voice picker show voice IDs in each option label (for example `Rachel (en) · 21m00Tcm4TlvDq8ikWAM`).

## ElevenLabs model

On the ElevenLabs configure page, choose a default TTS model. In **TTS → ElevenLabs → Speak Text**, the **Model** field lets you override that default per handler. Leave it on **Use default model** to use the value from plugin settings.

## Handlers

| Handler | Description |
|---------|-------------|
| **TTS → Local → Speak Text** | Speak with an installed Piper voice |
| **TTS → StreamElements → Speak Text** | Speak with StreamElements |
| **TTS → ElevenLabs → Speak Text** | Speak with ElevenLabs |

Each speak handler supports a fixed voice selection or a **Variable** voice ID for dynamic values from trigger context.

Settings are stored in `plugin.tts.json`.
