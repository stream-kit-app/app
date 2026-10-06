---
'@stream-kit/app': minor
'@stream-kit/plugin': minor
'@stream-kit/plugin-handlers': patch
'@stream-kit/plugin-obs': patch
'@stream-kit/plugin-tts': patch
---

Handlers now time out (2 minutes by default) instead of blocking an action queue forever: the handler's `context.signal` aborts, a toast names it, and the rest of its chain stops. Handlers can set `timeout`, and `@stream-kit/plugin/action` exports `abortableDelay`, `raceAbort` and `HandlerTimeoutError`. OBS requests no longer hang when OBS disconnects, and waiting for media playback stops when the source stops playing.
