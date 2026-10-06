---
'@stream-kit/app': minor
'@stream-kit/plugin': minor
---

Plugins can now only access their own settings, settings context, migrations and owned actions/commands, and `app.auth.send` only reaches routes granted to the plugin. Reading `core` settings and scripts keep full access.
