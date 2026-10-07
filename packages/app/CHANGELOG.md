# @stream-kit/app

## 0.1.0-alpha.22

### Patch Changes

- [#28](https://github.com/stream-kit-app/app/pull/28) [`70403e0`](https://github.com/stream-kit-app/app/commit/70403e058ed4fabbd1724b72fcf10fc8e13cb775) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Recover from database migrations that were interrupted by a crash or close (previously actions could disappear), and repair rows without a sync id that caused actions to duplicate on every cloud sync.

- [#28](https://github.com/stream-kit-app/app/pull/28) [`7875e31`](https://github.com/stream-kit-app/app/commit/7875e31c5149699dd9abe8b17355a2e1e0a9ca2b) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Deleted actions no longer come back after a crash, a failed or interrupted plugin update no longer removes the installed plugin, and an update that fails to load keeps the plugin installed.

- [#28](https://github.com/stream-kit-app/app/pull/28) [`8f1e1e0`](https://github.com/stream-kit-app/app/commit/8f1e1e0dfb22f4c25cb096e1828e468fd215a35f) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Overlay settings changed while a previous change was still saving are no longer lost.

- [#28](https://github.com/stream-kit-app/app/pull/28) [`118ddc6`](https://github.com/stream-kit-app/app/commit/118ddc6c53fe086da75556611100e57c260803da) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Signing in with a different account on a PC no longer mixes that PC's actions, overlays and plugin data into the new account. Cloud sync pauses and asks whether to copy the data to the new account.

- [#28](https://github.com/stream-kit-app/app/pull/28) [`7034378`](https://github.com/stream-kit-app/app/commit/7034378ed17130fb4f3ef9ce7e9df68ed023bed4) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - When an action or queue is edited on two devices before they sync, changes to different settings are now combined instead of one device overwriting the other (for example reordering on one PC no longer discards a handler edit made on another). Overwritten versions are kept as a local backup.
- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.11
    - @stream-kit/plugin@0.2.0-alpha.12

## 0.1.0-alpha.21

### Minor Changes

- [#25](https://github.com/stream-kit-app/app/pull/25) [`945cd6b`](https://github.com/stream-kit-app/app/commit/945cd6bdd5fdd9db16291c8ad5070fd3696d4ec6) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Handlers now time out (2 minutes by default) instead of blocking an action queue forever: the handler's `context.signal` aborts, a toast names it, and the rest of its chain stops. Handlers can set `timeout`, and `@stream-kit/plugin/action` exports `abortableDelay`, `raceAbort` and `HandlerTimeoutError`. OBS requests no longer hang when OBS disconnects, and waiting for media playback stops when the source stops playing.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`a00d345`](https://github.com/stream-kit-app/app/commit/a00d345a31ea3c963c471baedc2d415964836547) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Plugins can now only access their own settings, settings context, migrations and owned actions/commands, and `app.auth.send` only reaches routes granted to the plugin. Reading `core` settings and scripts keep full access.

### Patch Changes

- [#25](https://github.com/stream-kit-app/app/pull/25) [`0760d46`](https://github.com/stream-kit-app/app/commit/0760d46a62b67277fff29d96963213795b3b8076) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Clicking the menu item of the page you're already on no longer clears its toolbar and header.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`8235f3f`](https://github.com/stream-kit-app/app/commit/8235f3f490a38d3e8f732093cd505cd28137d239) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Ask before installing plugins from your account's cloud catalog, only restore marketplace plugins automatically offered by Stream Kit, and stop uninstalled plugins from coming back on the next sync.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`11ef607`](https://github.com/stream-kit-app/app/commit/11ef6071dcfc2104fc98d1639894d50a1e351cb9) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - "Run program" no longer times out on programs that print a lot of output, toggling the process watcher no longer freezes the window, and local TTS gives up on a stuck Piper process after two minutes.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`5ecd3f3`](https://github.com/stream-kit-app/app/commit/5ecd3f3e42373b1d32cfc9161f74ee0c07c2f82d) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Cancel subscriptions through a server route that sets the grace end date, so clients can no longer choose their own `endsAt`.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`ccd271f`](https://github.com/stream-kit-app/app/commit/ccd271f592cdb4bd6a0ad6fc3f2fa044f09c500b) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Cloud sync keeps retrying after a failed sync, a network hiccup no longer signs you out (also when starting offline), and cloud overlays stay connected when their status can't be loaded.
- Updated dependencies [[`945cd6b`](https://github.com/stream-kit-app/app/commit/945cd6bdd5fdd9db16291c8ad5070fd3696d4ec6), [`a00d345`](https://github.com/stream-kit-app/app/commit/a00d345a31ea3c963c471baedc2d415964836547)]:
    - @stream-kit/plugin@0.2.0-alpha.12
    - @stream-kit/core@0.2.0-alpha.11

## 0.1.0-alpha.20

### Minor Changes

- [`6fa4ba0`](https://github.com/stream-kit-app/app/commit/6fa4ba0c9e2cf0a5951689ecae80dd1ae987410b) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Upgrade to SvelteKit 3 and update all dependencies to their latest versions. The app now uses `#lib` / `#db` subpath imports and `$app/env`; the Tauri backend moves to rodio 0.22 and the latest crates.

### Patch Changes

- Updated dependencies [[`6fa4ba0`](https://github.com/stream-kit-app/app/commit/6fa4ba0c9e2cf0a5951689ecae80dd1ae987410b)]:
    - @stream-kit/core@0.2.0-alpha.11
    - @stream-kit/plugin@0.2.0-alpha.11
    - @stream-kit/script-api@0.1.0-alpha.6
    - @stream-kit/ui@0.2.0-alpha.11

## 0.1.0-alpha.19

### Minor Changes

- [`728032f`](https://github.com/stream-kit-app/app/commit/728032f833cfb64c6f2ff3febdd45789d44c70cd) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Add in-app auto-updates for GitHub Windows installs (check on startup and from Settings).

### Patch Changes

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Action editor: outline + detail panel instead of nested If cards, If handler with AND/OR condition groups (`condition-group` field, existing conditions are migrated), handler `outputs` and scope-aware `{variable}` suggestions. Adds `ConditionTreeNode`, `ConditionGroupFieldValue` and `HandlerOutputsSource` to the plugin SDK.

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - AI Actions plugin: describe an action in plain language and open the generated draft in the action editor. Adds `app.actions.openDraft`, `getTriggers`/`findTrigger`, `app.auth.send` and the `InputTextarea` UI component.

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Theme settings, a dedicated plugin detail page (`/plugins/[pluginKey]`), add-tile and widget menu on the dashboard, and remembered window size/position.

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - New UI components: `VariableAutocomplete` (also in Monaco JSON editors), `Widget`, `CopyButton` and a `masonry` attachment. Text inputs with variables now share the autocomplete instead of their own popover logic.

- Updated dependencies [[`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5), [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5), [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5)]:
    - @stream-kit/core@0.2.0-alpha.10
    - @stream-kit/plugin@0.2.0-alpha.10
    - @stream-kit/script-api@0.1.0-alpha.5
    - @stream-kit/ui@0.2.0-alpha.10

## 0.1.0-alpha.18

### Patch Changes

- [`0fb0f05`](https://github.com/stream-kit-app/app/commit/0fb0f050c4418dfdd6ea5ac0e1e48b35c4ff5034) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - cloud storage sync

- Updated dependencies [[`0fb0f05`](https://github.com/stream-kit-app/app/commit/0fb0f050c4418dfdd6ea5ac0e1e48b35c4ff5034)]:
    - @stream-kit/script-api@0.1.0-alpha.4
    - @stream-kit/ui@0.2.0-alpha.9
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.8

## 0.1.0-alpha.17

### Minor Changes

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Multi-PC Pro cloud sync: generic ConfigSync adapters, `app.records` / `user_plugin_records`, overlay project + dashboard sync, settings account/device split, and restore flow.

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; cloud features, design updates and much more

### Patch Changes

- Updated dependencies [[`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a), [`fd9558d`](https://github.com/stream-kit-app/app/commit/fd9558d95834c054a5a50733f09c2149970ddbcd), [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a), [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a)]:
    - @stream-kit/ui@0.2.0-alpha.8
    - @stream-kit/plugin@0.2.0-alpha.8
    - @stream-kit/script-api@0.1.0-alpha.3
    - @stream-kit/core@0.2.0-alpha.4

## 0.1.0-alpha.16

### Patch Changes

- [`82a8d3d`](https://github.com/stream-kit-app/app/commit/82a8d3dbecfa10d6435b08c329ba0f0b366840e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.7

## 0.1.0-alpha.15

### Patch Changes

- [`cec0d23`](https://github.com/stream-kit-app/app/commit/cec0d23142fb02df941a320f839a026be5fa8721) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.7

## 0.1.0-alpha.14

### Patch Changes

- [`d41000c`](https://github.com/stream-kit-app/app/commit/d41000c599cf167404047a1afdf97e5d473a07a9) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix; null error in pocketbase

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.7

## 0.1.0-alpha.13

### Patch Changes

- [`57be460`](https://github.com/stream-kit-app/app/commit/57be46079e78960c2e6e1e7e5315efdb953f4e06) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - add auth and cloud features

- Updated dependencies [[`57be460`](https://github.com/stream-kit-app/app/commit/57be46079e78960c2e6e1e7e5315efdb953f4e06)]:
    - @stream-kit/script-api@0.1.0-alpha.2
    - @stream-kit/plugin@0.2.0-alpha.7
    - @stream-kit/ui@0.2.0-alpha.7
    - @stream-kit/core@0.2.0-alpha.4

## 0.1.0-alpha.12

### Patch Changes

- [`0f5c693`](https://github.com/stream-kit-app/app/commit/0f5c6932777b6622cde1915fa06d045294a96ab7) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - major version update, to much to describe and no need

- [`fa91e18`](https://github.com/stream-kit-app/app/commit/fa91e1878f18766e20bab985fb329d097b9eac3f) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; update UI

- [`e1ba62a`](https://github.com/stream-kit-app/app/commit/e1ba62adf13bea9c0757fe0ead16e02b52788bc0) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; add toolbar and change app design

- [`fa91e18`](https://github.com/stream-kit-app/app/commit/fa91e1878f18766e20bab985fb329d097b9eac3f) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; add new rankings plugin

- Updated dependencies [[`0f5c693`](https://github.com/stream-kit-app/app/commit/0f5c6932777b6622cde1915fa06d045294a96ab7), [`fa91e18`](https://github.com/stream-kit-app/app/commit/fa91e1878f18766e20bab985fb329d097b9eac3f), [`e1ba62a`](https://github.com/stream-kit-app/app/commit/e1ba62adf13bea9c0757fe0ead16e02b52788bc0), [`fa91e18`](https://github.com/stream-kit-app/app/commit/fa91e1878f18766e20bab985fb329d097b9eac3f)]:
    - @stream-kit/script-api@0.1.0-alpha.1
    - @stream-kit/plugin@0.2.0-alpha.6
    - @stream-kit/ui@0.2.0-alpha.6
    - @stream-kit/core@0.2.0-alpha.4

## 0.1.0-alpha.11

### Patch Changes

- [`d9ac5f6`](https://github.com/stream-kit-app/app/commit/d9ac5f6353bb12b219542296f6d7e30d627ea75f) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - many small fixes

- Updated dependencies [[`d9ac5f6`](https://github.com/stream-kit-app/app/commit/d9ac5f6353bb12b219542296f6d7e30d627ea75f)]:
    - @stream-kit/ui@0.2.0-alpha.5
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.4

## 0.1.0-alpha.10

### Minor Changes

- [`0e99d9c`](https://github.com/stream-kit-app/app/commit/0e99d9c8a1afbeb18240644625b10b05d06f6a9d) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - add cooldown to commands

### Patch Changes

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/plugin@0.2.0-alpha.4

## 0.1.0-alpha.9

### Minor Changes

- [`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix build errors

### Patch Changes

- Updated dependencies [[`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c)]:
    - @stream-kit/plugin@0.2.0-alpha.4
    - @stream-kit/core@0.2.0-alpha.4
    - @stream-kit/ui@0.2.0-alpha.4

## 0.1.0-alpha.8

### Minor Changes

- [`7bdd844`](https://github.com/stream-kit-app/app/commit/7bdd844fb834aa514c405a1160061141c9bda048) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Added overlay support and fixes alot of issues and bugs

- [`980b053`](https://github.com/stream-kit-app/app/commit/980b053831a05d1c118671bd47e3bd6e5a19931d) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Extended OBS functionality with more triggers and handlers

- [`422c52c`](https://github.com/stream-kit-app/app/commit/422c52c2750aed79247260433ce76d6746c51f93) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Add new hotkey and queue triggers and handlers

- [`d0ed399`](https://github.com/stream-kit-app/app/commit/d0ed399c80621c3f0d4941fd6d39bacd406b99d4) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - change commands UI design, to align with actions and other parts of the app

### Patch Changes

- Updated dependencies [[`980b053`](https://github.com/stream-kit-app/app/commit/980b053831a05d1c118671bd47e3bd6e5a19931d), [`422c52c`](https://github.com/stream-kit-app/app/commit/422c52c2750aed79247260433ce76d6746c51f93), [`d0ed399`](https://github.com/stream-kit-app/app/commit/d0ed399c80621c3f0d4941fd6d39bacd406b99d4)]:
    - @stream-kit/plugin@0.1.0-alpha.1
    - @stream-kit/core@0.2.0-alpha.3
    - @stream-kit/ui@0.2.0-alpha.3

## 0.1.0-alpha.7

### Patch Changes

- [`caf4950`](https://github.com/stream-kit-app/app/commit/caf49507198b8beba2490c74b9d6c52ef783daa7) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Remove macos builds

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.2
    - @stream-kit/plugin-bot@0.1.1-alpha.2
    - @stream-kit/plugin-handlers@0.1.1-alpha.2
    - @stream-kit/plugin-obs@0.1.1-alpha.2
    - @stream-kit/plugin-tts@0.1.1-alpha.2
    - @stream-kit/plugin-twitch@0.1.1-alpha.2
    - @stream-kit/plugin-websocket@0.1.1-alpha.2
    - @stream-kit/plugin-youtube@0.1.1-alpha.2

## 0.1.0-alpha.6

### Patch Changes

- [`ac3acee`](https://github.com/stream-kit-app/app/commit/ac3acee81af2a2258b83f6f53c8b2e72330f0e0f) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Dont ignore config scripts

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.2
    - @stream-kit/plugin-bot@0.1.1-alpha.2
    - @stream-kit/plugin-handlers@0.1.1-alpha.2
    - @stream-kit/plugin-obs@0.1.1-alpha.2
    - @stream-kit/plugin-tts@0.1.1-alpha.2
    - @stream-kit/plugin-twitch@0.1.1-alpha.2
    - @stream-kit/plugin-websocket@0.1.1-alpha.2
    - @stream-kit/plugin-youtube@0.1.1-alpha.2

## 0.1.0-alpha.5

### Patch Changes

- [`0430e4a`](https://github.com/stream-kit-app/app/commit/0430e4a74ee3df6894c9576ad107377866dbfdbd) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - build

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.2
    - @stream-kit/plugin-bot@0.1.1-alpha.2
    - @stream-kit/plugin-handlers@0.1.1-alpha.2
    - @stream-kit/plugin-obs@0.1.1-alpha.2
    - @stream-kit/plugin-tts@0.1.1-alpha.2
    - @stream-kit/plugin-twitch@0.1.1-alpha.2
    - @stream-kit/plugin-websocket@0.1.1-alpha.2
    - @stream-kit/plugin-youtube@0.1.1-alpha.2

## 0.1.0-alpha.4

### Patch Changes

- [`361e3a2`](https://github.com/stream-kit-app/app/commit/361e3a21cad6e3d85fca0d0029ced1facfd132bb) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - build

- Updated dependencies [[`361e3a2`](https://github.com/stream-kit-app/app/commit/361e3a21cad6e3d85fca0d0029ced1facfd132bb)]:
    - @stream-kit/plugin-websocket@0.1.1-alpha.2
    - @stream-kit/plugin-twitch@0.1.1-alpha.2
    - @stream-kit/core@0.1.1-alpha.2
    - @stream-kit/plugin-handlers@0.1.1-alpha.2
    - @stream-kit/plugin-bot@0.1.1-alpha.2
    - @stream-kit/plugin-tts@0.1.1-alpha.2
    - @stream-kit/ui@0.1.1-alpha.2
    - @stream-kit/plugin-obs@0.1.1-alpha.2
    - @stream-kit/plugin-youtube@0.1.1-alpha.2

## 0.1.0-alpha.3

### Patch Changes

- [`b3f8d29`](https://github.com/stream-kit-app/app/commit/b3f8d297f942171acdcf8b35722e1f7c6be5f8b6) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Build

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.1
    - @stream-kit/plugin-bot@0.1.1-alpha.1
    - @stream-kit/plugin-handlers@0.1.1-alpha.1
    - @stream-kit/plugin-obs@0.1.1-alpha.1
    - @stream-kit/plugin-tts@0.1.1-alpha.1
    - @stream-kit/plugin-twitch@0.1.1-alpha.1
    - @stream-kit/plugin-websocket@0.1.1-alpha.1
    - @stream-kit/plugin-youtube@0.1.1-alpha.1

## 0.1.0-alpha.2

### Patch Changes

- Build

- Updated dependencies []:
    - @stream-kit/core@0.1.1-alpha.1
    - @stream-kit/ui@0.1.1-alpha.1
    - @stream-kit/plugin-bot@0.1.1-alpha.1
    - @stream-kit/plugin-handlers@0.1.1-alpha.1
    - @stream-kit/plugin-obs@0.1.1-alpha.1
    - @stream-kit/plugin-tts@0.1.1-alpha.1
    - @stream-kit/plugin-twitch@0.1.1-alpha.1
    - @stream-kit/plugin-websocket@0.1.1-alpha.1
    - @stream-kit/plugin-youtube@0.1.1-alpha.1

## 0.1.0-alpha.1

### Patch Changes

- [`f41f469`](https://github.com/stream-kit-app/app/commit/f41f469bfdc09ac88637cc55f33097d821cf23cc) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - first release

- Updated dependencies [[`f41f469`](https://github.com/stream-kit-app/app/commit/f41f469bfdc09ac88637cc55f33097d821cf23cc)]:
    - @stream-kit/core@0.1.1-alpha.0
    - @stream-kit/ui@0.1.1-alpha.0
    - @stream-kit/plugin-bot@0.1.1-alpha.0
    - @stream-kit/plugin-handlers@0.1.1-alpha.0
    - @stream-kit/plugin-obs@0.1.1-alpha.0
    - @stream-kit/plugin-tts@0.1.1-alpha.0
    - @stream-kit/plugin-twitch@0.1.1-alpha.0
    - @stream-kit/plugin-websocket@0.1.1-alpha.0
    - @stream-kit/plugin-youtube@0.1.1-alpha.0
