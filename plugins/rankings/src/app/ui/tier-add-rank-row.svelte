<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { InputText } from '@stream-kit/ui/input';

	type Props = {
		name: string;
		pointsRequired: string;
		namePlaceholder: string;
		pointsPlaceholder: string;
		addLabel: string;
		onNameInput: (value: string) => void;
		onPointsInput: (value: string) => void;
		onAdd: () => void;
	};

	let {
		name,
		pointsRequired,
		namePlaceholder,
		pointsPlaceholder,
		addLabel,
		onNameInput,
		onPointsInput,
		onAdd
	}: Props = $props();
</script>

<div class="border-t border-dark-700/80 p-2">
	<div class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_8rem_auto] sm:items-center">
		<InputText
			value={name}
			placeholder={namePlaceholder}
			size="sm"
			oninput={(event) => {
				onNameInput((event.currentTarget as HTMLInputElement).value);
			}}
		/>
		<InputText
			value={pointsRequired}
			placeholder={pointsPlaceholder}
			inputmode="numeric"
			size="sm"
			oninput={(event) => {
				onPointsInput((event.currentTarget as HTMLInputElement).value);
			}}
		/>
		<Button type="button" size="sm" icon="ri:add-line" onclick={() => onAdd()}>
			{addLabel}
		</Button>
	</div>
</div>
