# Action Queues

Action queues serialize action execution. Normally every matching action runs immediately and concurrently. When an action is assigned to a **queue**, its run is placed in that queue instead, and a per-queue worker runs jobs in order while respecting the queue's settings.

Queues are managed on the **Queues** page (`/queues`).

## Default queue

On first boot Stream Kit creates a **default** queue (`default`). New actions are assigned to it automatically, and existing actions without a queue are migrated to it on upgrade. The default queue cannot be deleted; deleting any other queue moves its actions to the default queue.

You can still set an action to **No queue** in the editor to run it concurrently without queueing.

## When to use a queue

Use a queue when multiple actions (or repeated triggers of the same action) must not overlap — for example media playback, TTS, or any handler chain that touches a shared resource. Actions without a queue keep running concurrently, exactly as before.

## Queue settings

| Setting | Description |
|---------|-------------|
| Name | Display name shown in the action editor and on the Queues page. |
| Blocking | When enabled, the queue runs one action at a time (FIFO). When disabled, queued actions start immediately and can run in parallel. |
| Max length | Optional cap on pending jobs. When the queue is full, new runs are dropped and logged. Leave empty for unlimited. |

## Behavior

- Trigger conditions are still evaluated immediately when the trigger fires; only **matching** runs are enqueued.
- A job runs the full handler chain of one action. With **Blocking** enabled the queue runs FIFO, one action at a time.
- The green "running" indicator on an action reflects the moment the worker starts the job, not when it was enqueued.
- **Pause** holds jobs, **Resume** drains them, **Clear** discards pending jobs.
- The **Queues** page shows which actions are running and which are waiting in each queue. Click a listed action to open its editor.
- The action editor **Test** button bypasses queueing and runs immediately.

## Persistence

Queue definitions are stored in the local database (`action_queues`) and the assignment is stored on each action (`actions.queue_id`). Pending and in-flight jobs are kept in memory only and are not restored after an app restart. Deleting a queue moves its actions to the default queue.

## Assigning actions to a queue

- New actions start on the **default** queue.
- In the action editor, pick a queue in the **Queue** field (or **No queue** to run concurrently).
- On the Actions page, select multiple actions and use **Assign to queue** in the bulk edit dialog.

## Plugin API

Plugins can control queues through `app.actionQueues` (see [Plugin API](../plugins/api.md#action-queues-appactionqueues)):

- `pause(queueId)` / `resume(queueId)` — runtime control
- `on(event, handler)` — subscribe to queue status events (`paused`, `resumed`, `idle`, `job_enqueued`, `job_started`, `job_completed`)
- `definitions` — list of configured queues

The core plugin exposes **Pause Queue** and **Resume Queue** handlers, plus triggers for each queue status event.
