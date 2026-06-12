# Bot Plugin

The **Bot** plugin (`@stream-kit/plugin-bot`) provides chat bot functionality: custom commands, scheduled timers, auto-moderation, and built-in system commands.

## Requirements

- **Twitch** or **YouTube** plugin connected (either platform is sufficient)
- Both platforms can be used together when connected

## Pages

Open **Bot** in the sidebar (under plugin menu items):

| Page | Description |
|------|-------------|
| **Overview** | Connection status, bot settings, summary counts |
| **Commands** | Custom chat commands with handler chains |
| **Timers** | Scheduled actions on an interval with handler chains |
| **Moderation** | Custom auto-mod rules with a condition builder |

## Bot settings

| Setting | Default | Description |
|---------|---------|-------------|
| Bot enabled | `true` | Master toggle for commands and timers |
| Command prefix | `!` | Prefix that triggers commands |
| Auto-moderation | `true` | Run moderation rules on chat messages |
| Twitch / YouTube chat | `true` | Platform toggles |

Settings are stored in `plugin.bot.json`.

## Commands

Custom commands work like Actions handler chains: each command has aliases, permissions, cooldowns, platform sources, and a handler chain.

Chat messages matching `{prefix}{command}` are processed after moderation and before built-in commands.

## Built-in commands

| Command | Description |
|---------|-------------|
| `!commands` | Lists enabled custom commands |
| `!uptime` | Stream uptime (Twitch or YouTube) |
| `!bot` | Bot status and prefix |

Custom commands with the same name override built-ins.

## Timers

Timers run handler chains on a random interval, similar to commands:

- Handler chain (Twitch Send Message, OBS, variables, etc.)
- Random interval between min/max seconds (minimum 30s)
- Optional minimum chat messages between runs
- Platform selection and optional online-only mode (live on any selected platform)

When a timer fires, handlers receive trigger context with `timerId`, `name`, `platforms`, and `firedAt`. Twitch and YouTube Send Message handlers work without chat context — they fall back to the connected channel.

### Migration from message-only timers

Existing timers with chat messages are migrated automatically to Send Message handlers on startup. Timers that had multiple rotating messages become multiple handlers in the chain (all run each tick). Review migrated timers and remove duplicate handlers if needed.

## Moderation

All rules are **custom** rules built with a condition tree (AND/OR/negate), similar to Actions triggers.

### Using moderation in Actions

The Bot plugin registers two action triggers under **Bot**:

| Trigger | Description |
|---------|-------------|
| **Moderation rule** | Fires when a saved moderation rule’s conditions match a chat message (Twitch or YouTube). Pick the rule in the trigger condition. Exempt roles from the rule are **not** applied — the action runs for all matching messages. |
| **Chat message** | Fires on chat messages when a custom condition tree matches. Uses the same condition types as moderation rules (message flood, caps, links, etc.). |

Handlers receive `ChatModerationContext` trigger data: `source`, `user`, `userId`, `message`, `role`, platform IDs, and `messageId` when available.

Auto-moderation (delete/timeout/warn) and action triggers are independent: a matching mod rule can still run its mod action while a separate action runs its handlers.

### Condition types

| Condition | Description |
|-----------|-------------|
| Message | Text match (contains, equals, starts/ends with, regex) |
| User | Username match |
| Role | Role equals (mod, broadcaster, VIP, etc.) |
| Min/max length | Message length bounds |
| Contains link | URL detection |
| Caps percent | Excessive caps threshold |
| Repeated message | Same text sent too often within a time window |
| Message flood | Too many chat messages within a time window (optional min length on the message that triggers) |

### Actions

| Action | Twitch | YouTube |
|--------|--------|---------|
| Delete message | Yes | Yes |
| Timeout (10 min) | Yes | Yes (via live chat ban API) |
| Warn | Yes | Not available (no API) |

Moderators, broadcasters, and owners are exempt by default. Rules are evaluated in priority order (lower number first).

Legacy preset rules (`banned_word`, `caps`, `links`, `repeat`) are migrated automatically to equivalent custom rules on startup.

## Developer API

The Bot plugin exposes:

```ts
app.plugins.get('bot')?.commands  // Commands service
app.plugins.get('bot')?.timers
app.plugins.get('bot')?.moderation
app.plugins.get('bot')?.settings
```

The legacy `app.commands` API still works and delegates to the Bot plugin.

## Database tables

| Table | Owner |
|-------|-------|
| `commands` | Bot plugin |
| `bot_timers` | Bot plugin |
| `bot_mod_rules` | Bot plugin |

Migrations run via `@stream-kit/plugin-bot/app/db/migrate`.
