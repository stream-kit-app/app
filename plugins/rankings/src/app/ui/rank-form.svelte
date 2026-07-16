<script lang="ts">
	import type { Rank } from '../lib/rank.svelte';

	import { InputFile, InputOneOf, InputText } from '@stream-kit/ui/input';
	import { watch } from 'runed';

	import { fileBytesToRankIcon, getRankIconKind } from '../../lib/rank-icon';
	import { getRankingsService } from '../lib/get-rankings';
	import RankIcon from './rank-icon.svelte';

	type Props = {
		rank: Rank;
	};

	type IconOneOfValue = {
		variant: string;
		values: Record<string, unknown>;
	};

	let { rank }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;

	const iconVariants = $derived([
		{ id: 'iconify', label: t('Iconify') },
		{ id: 'file', label: t('File') }
	]);

	let iconOneOf = $state<IconOneOfValue>({
		variant: 'iconify',
		values: { iconify: '', file: '' }
	});
	let fileDisplayName = $state('');

	watch(
		() => rank,
		() => {
			const kind = getRankIconKind(rank.icon);
			iconOneOf = {
				variant: kind === 'image' ? 'file' : 'iconify',
				values: {
					iconify: kind === 'iconify' ? (rank.icon ?? '') : '',
					file: kind === 'image' ? (rank.icon ?? '') : ''
				}
			};
			fileDisplayName = kind === 'image' ? t('Custom image') : '';
		}
	);

	watch(
		() => [iconOneOf.variant, iconOneOf.values.iconify, iconOneOf.values.file] as const,
		() => {
			if (iconOneOf.variant === 'iconify') {
				const value = String(iconOneOf.values.iconify ?? '').trim();
				rank.icon = value || undefined;
				return;
			}

			const value = String(iconOneOf.values.file ?? '').trim();
			rank.icon = value || undefined;
		}
	);

	async function browseIcon(): Promise<string | null> {
		try {
			const path = await app.fs.select({
				type: 'file',
				filters: [
					{
						name: t('Images'),
						extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']
					}
				]
			});

			if (!path) {
				return null;
			}

			const bytes = await app.fs.readFile(path);
			const dataUrl = await fileBytesToRankIcon(bytes, path);
			const name = path.split(/[/\\]/).pop() || t('Custom image');

			iconOneOf = {
				variant: 'file',
				values: {
					...iconOneOf.values,
					file: dataUrl
				}
			};
			rank.icon = dataUrl;

			return name;
		} catch (error) {
			app.toast.create({
				title: t('Could not load icon'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});

			return null;
		}
	}

	function clearFile(): void {
		iconOneOf = {
			...iconOneOf,
			values: {
				...iconOneOf.values,
				file: ''
			}
		};
		fileDisplayName = '';

		if (iconOneOf.variant === 'file') {
			rank.icon = undefined;
		}
	}
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Rank name')}
		required
		autocomplete="off"
		value={rank.name}
		error={rank.formErrors?.name}
		oninput={(event) => {
			rank.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<InputText
		label={t('Points required')}
		required
		autocomplete="off"
		inputmode="numeric"
		value={rank.pointsRequiredInput}
		error={rank.formErrors?.pointsRequired}
		oninput={(event) => {
			rank.pointsRequiredInput = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<div class="flex items-start gap-3">
		<RankIcon icon={rank.icon} />
		<div class="min-w-0 flex-1">
			<InputOneOf label={t('Icon')} variants={iconVariants} bind:value={iconOneOf}>
				{#snippet panel({ variantId, value, setValue })}
					{#if variantId === 'iconify'}
						<InputText
							label={t('Iconify icon')}
							autocomplete="off"
							placeholder="ri:award-line"
							value={String(value ?? '')}
							oninput={(event) => {
								setValue((event.currentTarget as HTMLInputElement).value);
							}}
						/>
					{:else}
						<InputFile
							label={t('Image file')}
							value={fileDisplayName}
							emptyLabel={t('No file selected')}
							browseLabel={t('Browse')}
							clearLabel={t('Clear')}
							onBrowse={browseIcon}
							onValueChange={(name) => {
								fileDisplayName = name;
							}}
							onClear={clearFile}
						/>
					{/if}
				{/snippet}
			</InputOneOf>
		</div>
	</div>
</form>
