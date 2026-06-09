<script lang="ts">
	import { Action } from '$lib/core/action';
	import { Button } from '@stream-kit/ui/button';
</script>

<Button icon="ri:add-fill" size="lg" variant="outline" onclick={() => Action.createDraft().open()}>
	Add Action
</Button>
