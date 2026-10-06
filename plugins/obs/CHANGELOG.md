# @stream-kit/plugin-obs

## 0.2.0-alpha.7

### Patch Changes

- [#25](https://github.com/stream-kit-app/app/pull/25) [`945cd6b`](https://github.com/stream-kit-app/app/commit/945cd6bdd5fdd9db16291c8ad5070fd3696d4ec6) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Handlers now time out (2 minutes by default) instead of blocking an action queue forever: the handler's `context.signal` aborts, a toast names it, and the rest of its chain stops. Handlers can set `timeout`, and `@stream-kit/plugin/action` exports `abortableDelay`, `raceAbort` and `HandlerTimeoutError`. OBS requests no longer hang when OBS disconnects, and waiting for media playback stops when the source stops playing.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`7e43f48`](https://github.com/stream-kit-app/app/commit/7e43f48954173d1bf8e15054a13c4f634f9c5721) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Disabling and re-enabling Twitch, YouTube, OBS or Discord no longer leaves old connections running (duplicate chat handlers, doubled YouTube polling), and pages and widgets keep updating afterwards.
- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.11

## 0.2.0-alpha.6

### Patch Changes

- Updated dependencies [[`6fa4ba0`](https://github.com/stream-kit-app/app/commit/6fa4ba0c9e2cf0a5951689ecae80dd1ae987410b)]:
    - @stream-kit/core@0.2.0-alpha.11

## 0.2.0-alpha.5

### Patch Changes

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Action editor: outline + detail panel instead of nested If cards, If handler with AND/OR condition groups (`condition-group` field, existing conditions are migrated), handler `outputs` and scope-aware `{variable}` suggestions. Adds `ConditionTreeNode`, `ConditionGroupFieldValue` and `HandlerOutputsSource` to the plugin SDK.

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - The core handlers plugin is now an optional dependency, so these plugins can be enabled on their own. Bot lists Twitch and YouTube as optional dependencies; Bot command and timer editors pick up the new variable autocomplete.

- Updated dependencies [[`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5)]:
    - @stream-kit/core@0.2.0-alpha.10

## 0.2.0-alpha.4

### Patch Changes

- [`0fb0f05`](https://github.com/stream-kit-app/app/commit/0fb0f050c4418dfdd6ea5ac0e1e48b35c4ff5034) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - cloud storage sync

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4

## 0.2.0-alpha.3

### Minor Changes

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; cloud features, design updates and much more

### Patch Changes

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4

## 0.2.0-alpha.2

### Minor Changes

- [`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix build errors

### Patch Changes

- Updated dependencies [[`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c)]:
    - @stream-kit/core@0.2.0-alpha.4

## 0.2.0-alpha.1

### Minor Changes

- [`980b053`](https://github.com/stream-kit-app/app/commit/980b053831a05d1c118671bd47e3bd6e5a19931d) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Extended OBS functionality with more triggers and handlers

### Patch Changes

- Updated dependencies [[`980b053`](https://github.com/stream-kit-app/app/commit/980b053831a05d1c118671bd47e3bd6e5a19931d)]:
    - @stream-kit/core@0.2.0-alpha.3

## 0.1.2-alpha.0

### Minor Changes

- Add **Set Media Input File** handler to change media source files from actions
- Add streaming handlers: Send Stream Caption, Get Stream Status, Get Record Status, Create Record Chapter
- Add streaming triggers: Stream Starting/Stopping/Reconnecting, Recording Paused/Resumed, Record File Changed
- Add media handlers: Set/Offset Media Cursor, Get Media Status; move Trigger Media Action to Media group
- Add media trigger: Media Action Triggered
- Add filter handlers: Enable/Disable/Set Settings/Create/Remove Filter; improve Toggle Filter with combobox
- Add filter triggers: Filter Enabled/Disabled
- Add plugin documentation at `docs/plugins/obs.md`

## 0.1.1-alpha.2

### Patch Changes

- Updated dependencies [[`361e3a2`](https://github.com/stream-kit-app/app/commit/361e3a21cad6e3d85fca0d0029ced1facfd132bb)]:
    - @stream-kit/core@0.1.1-alpha.2

## 0.1.1-alpha.1

### Patch Changes

- Build

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.1

## 0.1.1-alpha.0

### Patch Changes

- [`f41f469`](https://github.com/stream-kit-app/app/commit/f41f469bfdc09ac88637cc55f33097d821cf23cc) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - first release

- Updated dependencies [[`f41f469`](https://github.com/stream-kit-app/app/commit/f41f469bfdc09ac88637cc55f33097d821cf23cc)]:
    - @stream-kit/core@0.1.1-alpha.0
