# WebSocket plugin

The WebSocket plugin connects to WebSocket servers and fires actions when messages arrive or connection state changes.

## Triggers

| Trigger | Event |
|---------|-------|
| Message Received | A message was received on a connection |
| Connected | A connection was established |
| Disconnected | A connection was closed |

## Message Received conditions

### Connection

Optional. Restrict the trigger to a single configured connection. Leave empty to match any connection.

### Message

Match against the raw message text (the full WebSocket payload as a string).

| Operator | Description |
|----------|-------------|
| Starts with | Message starts with the value |
| Ends with | Message ends with the value |
| Contains | Message contains the value |
| Equals | Message equals the value |

Use the **Not** checkbox on a condition to invert the result (for example, equals + Not = does not equal).

An empty match value always matches (condition is always true).

### JSON field

Match a specific field inside a JSON message. The condition is shown as one unified input:

`[path] [operator] [value]`

Example:

| Path | Operator | Value |
|------|----------|-------|
| `data.topic` | Equals | `game.lobby.joined` |

Given this message:

```json
{
  "data": {
    "topic": "game.lobby.joined"
  }
}
```

The condition matches and the action fires.

#### Path syntax

Paths use dot-separated segments:

- `event` — top-level field
- `data.topic` — nested field
- `items.0.name` — array index

#### Matching rules

| Situation | Result |
|-----------|--------|
| Path is empty | Condition always matches |
| Path is set, message is not valid JSON | Condition fails |
| Path does not exist in the message | Condition fails |
| Match value is empty | Condition always matches |
| Path and value are set | Value at path is compared using the selected operator |

String, number, and boolean values at the path are compared as text. Objects and arrays are serialized to JSON before comparison.

## Trigger context

Message events provide a `WsMessageContext`:

```typescript
{
  connectionId: string;
  connectionName: string;
  url: string;
  message: string;
  isJson: boolean;
  data?: unknown;
  affectedConnectionIds?: string[];
}
```

These fields are available as trigger variables in handlers.

## Testing

The **Message Received** trigger supports **Test** with a simulated JSON message that includes `data.topic: "game.lobby.joined"`.
