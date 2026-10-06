# @stream-kit/plugin-youtube

## 0.2.0-alpha.7

### Patch Changes

- [#25](https://github.com/stream-kit-app/app/pull/25) [`7e43f48`](https://github.com/stream-kit-app/app/commit/7e43f48954173d1bf8e15054a13c4f634f9c5721) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - Disabling and re-enabling Twitch, YouTube, OBS or Discord no longer leaves old connections running (duplicate chat handlers, doubled YouTube polling), and pages and widgets keep updating afterwards.

- [#25](https://github.com/stream-kit-app/app/pull/25) [`71c47d3`](https://github.com/stream-kit-app/app/commit/71c47d33b1fa8a3312b0d3aaa4477ef95b12bacf) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - YouTube chat and stream polling survive network and quota errors instead of stopping or reporting the stream as offline, "stream started" fires once per broadcast, chat history isn't replayed as new commands when monitoring (re)starts, and a temporary token refresh failure no longer signs you out.
- Updated dependencies []:
    - @stream-kit/core@0.2.0-alpha.11

## 0.2.0-alpha.6

### Patch Changes

- Updated dependencies [[`6fa4ba0`](https://github.com/stream-kit-app/app/commit/6fa4ba0c9e2cf0a5951689ecae80dd1ae987410b)]:
    - @stream-kit/core@0.2.0-alpha.11

## 0.2.0-alpha.5

### Patch Changes

- [`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - The core handlers plugin is now an optional dependency, so these plugins can be enabled on their own. Bot lists Twitch and YouTube as optional dependencies; Bot command and timer editors pick up the new variable autocomplete.

- Updated dependencies [[`420bdcd`](https://github.com/stream-kit-app/app/commit/420bdcd3674f7cb80bffe334bb9f8c6b55fc22e5)]:
    - @stream-kit/core@0.2.0-alpha.10

## 0.2.0-alpha.4

### Minor Changes

- [`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c) Thanks [@codeit-ninja](https://github.com/codeit-ninja)! - fix build errors

### Patch Changes

- Updated dependencies [[`3092a9b`](https://github.com/stream-kit-app/app/commit/3092a9bc2a3243d1220c971f38389ce80935624c)]:
    - @stream-kit/core@0.2.0-alpha.4

## 0.1.1-alpha.3

### Patch Changes

- Updated dependencies [[`980b053`](https://github.com/stream-kit-app/app/commit/980b053831a05d1c118671bd47e3bd6e5a19931d)]:
    - @stream-kit/core@0.2.0-alpha.3

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
