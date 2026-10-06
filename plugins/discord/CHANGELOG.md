# @stream-kit/plugin-discord

## 0.1.0-alpha.4

### Patch Changes

- [#25](https://github.com/stream-kit-app/app/pull/25) [`c4019ad`](https://github.com/stream-kit-app/app/commit/c4019adea886b58765701461ca573f79732f6171) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Discord detects connections that silently stopped delivering events and reconnects, and retries when it can't connect at startup. WebSocket connections keep retrying (once a minute) after their configured attempts are used up instead of staying disconnected.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`7e43f48`](https://github.com/stream-kit-app/app/commit/7e43f48954173d1bf8e15054a13c4f634f9c5721) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Disabling and re-enabling Twitch, YouTube, OBS or Discord no longer leaves old connections running (duplicate chat handlers, doubled YouTube polling), and pages and widgets keep updating afterwards.
- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.11

## 0.1.0-alpha.3

### Patch Changes

- Updated dependencies [[`6fa4ba0`](https://github.com/stream-kit-app/app/commit/6fa4ba0c9e2cf0a5951689ecae80dd1ae987410b)]:
    - @stream-kit/core@0.2.0-alpha.11

## 0.1.0-alpha.2

### Patch Changes

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - The core handlers plugin is now an optional dependency, so these plugins can be enabled on their own. Bot lists Twitch and YouTube as optional dependencies; Bot command and timer editors pick up the new variable autocomplete.

- Updated dependencies [[`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5)]:
    - @stream-kit/core@0.2.0-alpha.10

## 0.1.0-alpha.1

### Minor Changes

- [`ee186f9`](https://github.com/stream-kit-app/app/commit/ee186f99f178557cd2119229fa30638b221a197a) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - feat; cloud features, design updates and much more

### Patch Changes

- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.4
