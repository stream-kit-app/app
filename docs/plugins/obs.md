# OBS plugin

The OBS plugin connects to OBS Studio via WebSocket and provides triggers and handlers for streaming, recording, media sources, filters, scenes, and more.

## Settings

Configure the connection under **Plugins → OBS**:

| Setting | Description |
|---------|-------------|
| Host | OBS WebSocket host (`127.0.0.1` by default). Supports full `ws://` or `wss://` URLs. |
| Port | WebSocket port (`4455` by default). Ignored when the host is a full WebSocket URL. |
| Password | OBS WebSocket server password |

Use **Test connection**, **Connect**, or **Disconnect** to manage the live connection. The plugin auto-connects on enable when host, port, and password are set.

## Triggers

Triggers are grouped under **OBS** in the Actions page.

### Scene & transition

| Trigger | Event |
|---------|-------|
| Scene Changed | Program scene changed |
| Preview Scene Changed | Preview scene changed (Studio Mode) |
| Transition Started | Scene transition started |
| Transition Ended | Scene transition ended |

Scene and transition triggers support name matching (starts with, ends with, contains, equals).

### Stream

| Trigger | Event |
|---------|-------|
| Stream Starting | Stream output is starting |
| Stream Started | Stream is live |
| Stream Stopping | Stream output is stopping |
| Stream Stopped | Stream stopped |
| Stream Reconnecting | Stream is reconnecting |

### Recording

| Trigger | Event |
|---------|-------|
| Recording Started | Recording started |
| Recording Paused | Recording paused |
| Recording Resumed | Recording resumed |
| Recording Stopped | Recording stopped (includes `outputPath` when available) |
| Record File Changed | Recording started writing to a new file (e.g. split) |

### Replay buffer, virtual cam, studio mode

| Trigger | Event |
|---------|-------|
| Replay Buffer Started / Stopped / Saved | Replay buffer state changes |
| Virtual Camera Started / Stopped | Virtual camera state changes |
| Studio Mode Enabled / Disabled | Studio Mode toggled |

### Source

| Trigger | Conditions |
|---------|------------|
| Input Muted / Unmuted | Optional input name match |
| Input Shown / Hidden | Optional input name match |

### Media

| Trigger | Conditions |
|---------|------------|
| Media Started | Optional input name match |
| Media Ended | Optional input name match |
| Media Action Triggered | Optional input name + media action type |

### Filter

| Trigger | Conditions |
|---------|------------|
| Filter Enabled | Optional input name + filter name match |
| Filter Disabled | Optional input name + filter name match |

## Handlers

### Stream

| Handler | Description |
|---------|-------------|
| Start / Stop / Toggle Stream | Control the stream output |
| Send Stream Caption | Send CEA-608 caption text over the stream |
| Get Stream Status | Fetches stream stats into action variables (see below) |

### Recording

| Handler | Description |
|---------|-------------|
| Start / Stop / Toggle / Pause / Resume Recording | Control recording |
| Split Recording File | Split the current recording into a new file |
| Get Record Status | Fetches recording stats into action variables |
| Create Record Chapter | Add a chapter marker (Hybrid MP4, OBS 30.2+) |

### Media

| Handler | Description |
|---------|-------------|
| Set Media Input File | Change the file loaded by a media source |
| Trigger Media Action | Play, pause, stop, restart, next, or previous |
| Set Media Cursor | Seek to a position in milliseconds |
| Offset Media Cursor | Seek relative to the current position |
| Get Media Status | Fetches media state into action variables |

Media handlers use a dropdown limited to media input kinds (`ffmpeg_source`, `vlc_source`, `media_source`).

**Set Media Input File** updates the loaded media for a source:

- **Media Source** (`ffmpeg_source`) and legacy **Media Source** use the `local_file` setting.
- **VLC Video Source** replaces the playlist with the selected file.
- Provide the media file via the **Path** or **File** tab on the single **Media file** field (path supports `{variables}`).
- **Restart playback** (enabled by default) restarts the source after the file changes. When the same file is set again (for example a repeated channel point redeem), OBS is asked to stop and restart playback instead of skipping the update.

After a successful update, the handler sets action variable `mediaFilePath` to the resolved path.

### Filter

| Handler | Description |
|---------|-------------|
| Enable / Disable / Toggle Filter | Change filter enabled state |
| Set Filter Settings | Update filter settings via key-value pairs |
| Create Filter | Add a new filter to an input |
| Remove Filter | Remove a filter from an input |

Filter handlers use a combobox that loads filters for the selected input. Custom filter names are supported.

**Set Filter Settings** and **Create Filter** use a key-value list. Keys must match OBS filter property names for the chosen filter kind (for example `opacity`, `color`, `speed`).

## Action variables from status handlers

These handlers write to **action-scoped variables** for use in later handlers in the same action chain (via Core **Get variable** or `{variable}` interpolation).

### Get Stream Status

| Variable | Description |
|----------|-------------|
| `streamActive` | Whether the stream is active |
| `streamReconnecting` | Whether the stream is reconnecting |
| `streamTimecode` | Formatted timecode string |
| `streamDuration` | Duration in milliseconds |
| `streamCongestion` | Output congestion |
| `streamBytes` | Bytes sent |
| `streamSkippedFrames` | Skipped frames |
| `streamTotalFrames` | Total frames delivered |

### Get Record Status

| Variable | Description |
|----------|-------------|
| `recordActive` | Whether recording is active |
| `recordPaused` | Whether recording is paused |
| `recordTimecode` | Formatted timecode string |
| `recordDuration` | Duration in milliseconds |
| `recordBytes` | Bytes written |

### Get Media Status

| Variable | Description |
|----------|-------------|
| `mediaState` | Media state (`OBS_MEDIA_STATE_PLAYING`, etc.) |
| `mediaDuration` | Total duration in ms |
| `mediaCursor` | Current cursor position in ms |

## Trigger context variables

Common trigger variables available for interpolation:

| Variable | Source |
|----------|--------|
| `sceneName`, `sceneUuid` | Scene triggers |
| `inputName`, `inputUuid` | Source / media triggers |
| `transitionName` | Transition triggers |
| `outputState`, `outputActive`, `outputPath` | Stream / recording triggers |
| `newOutputPath` | Record File Changed |
| `filterName`, `sourceName`, `filterEnabled` | Filter triggers |
| `mediaAction` | Media Action Triggered |

## Plugin API

Other plugins can access the OBS connection via `app.plugins.get('obs')`:

- `isConnected`, `isConnecting`, `connectionError`, `obsVersion`
- `connect()`, `disconnect()`, `testConnection()`
- `client` — raw `OBSWebSocket` instance
- `subscribe(listener)` — connection state changes
