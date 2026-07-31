<script lang="ts">
	import type { Rank } from '../lib/rank.svelte';

	import { InputFile, InputOneOf, InputText } from '@stream-kit/ui/input';
	import { watch } from 'runed';

	import {
		dataUrlToBlob,
		fileBytesToRankIcon,
		getRankIconKind
	} from '../../lib/rank-icon';
	import { getRankingsService } from '../lib/get-rankings';
	import RankIcon from './rank-icon.svelte';
	import { hasCloudFileAccess } from '$lib/core/user-files/cloud-file-path';

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
	const canUseCloud = $derived(hasCloudFileAccess(app.auth));

	const IMAGE_FILTERS = [
		{
			name: t('Images'),
			extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']
		}
	];

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
			fileDisplayName =
				kind === 'image'
					? rank.icon?.startsWith('data:image/')
						? t('Custom image')
						: rank.icon?.split('/').pop()?.split('?')[0] || t('Cloud image')
					: '';
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

	async function uploadIcon(): Promise<string | null> {
		try {
			if (!hasCloudFileAccess(app.auth)) {
				const path = await app.fs.select({
					type: 'file',
					filters: IMAGE_FILTERS
				});
				if (!path) {
					return null;
				}

				const bytes = await app.fs.readFile(path);
				const dataUrl = await fileBytesToRankIcon(bytes, path);
				const baseName = path.split(/[/\\]/).pop() || 'icon.png';

				iconOneOf = {
					variant: 'file',
					values: {
						...iconOneOf.values,
						file: dataUrl
					}
				};
				rank.icon = dataUrl;
				fileDisplayName = baseName;
				return baseName;
			}

			const existing = String(iconOneOf.values.file ?? '').trim();
			let blob: Blob;
			let originalName: string;

			if (existing.startsWith('data:image/')) {
				blob = await dataUrlToBlob(existing);
				originalName = 'icon.png';
			} else {
				const path = await app.fs.select({
					type: 'file',
					filters: IMAGE_FILTERS
				});

				if (!path) {
					return null;
				}

				const bytes = await app.fs.readFile(path);
				const dataUrl = await fileBytesToRankIcon(bytes, path);
				blob = await dataUrlToBlob(dataUrl);
				const baseName = path.split(/[/\\]/).pop() || 'icon.png';
				originalName = baseName.replace(/\.\w+$/, '.png');
			}

			const uploaded = await app.userFiles.upload(blob, { originalName });

			iconOneOf = {
				variant: 'file',
				values: {
					...iconOneOf.values,
					file: uploaded.url
				}
			};
			rank.icon = uploaded.url;
			fileDisplayName = uploaded.originalName;

			return uploaded.originalName;
		} catch (error) {
			app.toast.create({
				title: t('Could not load icon'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});

			return null;
		}
	}

	async function pickCloudIcon(): Promise<string | null> {
		try {
			if (!hasCloudFileAccess(app.auth)) {
				app.toast.create({
					title: t('Sign in required'),
					description: t('Log in with an active subscription to use cloud files.'),
					variant: 'warning'
				});
				return null;
			}

			const selected = await app.userFiles.pick({
				mimePrefix: 'image/',
				extensions: IMAGE_FILTERS[0]!.extensions
			});
			if (!selected) {
				return null;
			}

			iconOneOf = {
				variant: 'file',
				values: {
					...iconOneOf.values,
					file: selected.url
				}
			};
			rank.icon = selected.url;
			fileDisplayName = selected.originalName;
			return selected.originalName;
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

	<div class="flex flex-col items-start gap-4 sm:flex-row">
		<RankIcon icon={rank.icon} />
		<div class="min-w-0 w-full flex-1">
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
							browseLabel={
								canUseCloud &&
								String(iconOneOf.values.file ?? '').startsWith('data:image/')
									? t('Upload to cloud')
									: t('Upload')
							}
							cloudLabel={t('Cloud')}
							clearLabel={t('Clear')}
							onBrowse={uploadIcon}
							onCloudBrowse={canUseCloud ? pickCloudIcon : undefined}
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
