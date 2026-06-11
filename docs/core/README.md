# Core plugin

The Core plugin (`@stream-kit/plugin-handlers`) is a built-in plugin loaded automatically when Stream Kit starts. Plugin key: `core`.

Source: `plugins/core/`

## Overview

The Core plugin provides general building blocks for actions:

- **Handlers** — audio, scripts, programs, variables, logging, and delays
- **Triggers** — process started/stopped events
- **Variables** — global, per-user, and per-action-run scopes
- **Action logs** — in-memory ring buffer with disk persistence
- **Plugin API** — `CorePluginApi` for other parts of the app

The plugin does not use direct Tauri imports. Filesystem, processes, audio, and storage go through `PluginAppApi` (`app.fs`, `app.process`, `app.audio`, `PluginStore`).

## Plugin settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Process Watcher | switch | `false` | Keeps process polling active in the background, even without active process triggers |

When Process Watcher is off, polling starts automatically as soon as an action has an enabled process trigger. With the switch on, the watcher stays active at all times.

## Handler structure in the UI

```
Core
├── Audio
│   ├── Play audio file
│   └── Play all audio from folder
├── Script
│   └── Run script
├── Program
│   └── Run program
├── Variables
│   ├── Set variable
│   └── Get variable
├── Utility
│   └── Log
└── Delay
```

## Further documentation

- [Handlers](./handlers.md) — all handlers and their fields
- [Variables](./variables.md) — scopes, interpolation, and storage
- [Logging](./logging.md) — action logs and the LogViewer
- [Triggers](./triggers.md) — process started/stopped
- [API](./api.md) — `CorePluginApi` for developers

## Lifecycle

| Hook | Behavior |
|------|----------|
| `onBoot` | Binds `VariableStore` to `PluginStore`, configures audio, loads variables and logs |
| `onEnable` / `onReady` / `onSave` | Syncs process watcher based on settings and active triggers |
| `onDisable` | Stops process watcher |

## Dependencies

| Package | Role |
|---------|------|
| `@stream-kit/core` | Handler/trigger types, `interpolateVariables` |
| `@stream-kit/app` (dev) | `PluginAppApi`, `PluginStore`, `BaseDirectory` types |
