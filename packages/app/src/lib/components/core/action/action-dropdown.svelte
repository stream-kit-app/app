<script lang="ts">
	import { Action } from '#lib/core/action/index.js';
	import { Button } from '@stream-kit/ui/button';
</script>

<Button icon="ri:add-fill" size="lg" variant="outline" onclick={() => Action.createDraft().open()}>
	Add Action
</Button>
