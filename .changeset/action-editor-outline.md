---
'@stream-kit/app': patch
'@stream-kit/core': patch
'@stream-kit/plugin': patch
'@stream-kit/script-api': patch
'@stream-kit/plugin-handlers': patch
'@stream-kit/plugin-obs': patch
---

Action editor: outline + detail panel instead of nested If cards, If handler with AND/OR condition groups (`condition-group` field, existing conditions are migrated), handler `outputs` and scope-aware `{variable}` suggestions. Adds `ConditionTreeNode`, `ConditionGroupFieldValue` and `HandlerOutputsSource` to the plugin SDK.
