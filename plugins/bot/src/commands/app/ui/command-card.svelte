<script lang="ts">
	import type { Command } from '../lib/command.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip, tooltipSnippet } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { cn } from '@stream-kit/plugin/utils';

	import { Command as CommandModel } from '../lib/command.svelte';
	import { getCommandsService } from '../lib/get-commands';

	type Definition = { id: string; name: string; isAvailable: boolean };

	type Props = {
		command: Command;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		isDragging?: boolean;
		movingLabel?: string;
	};

	let {
		command,
		selected = false,
		onSelectedChange,
		isDragging = false,
		movingLabel = ''
	}: Props = $props();

	const t = getCommandsService().requireApp().i18n.t;
	let shiftKey = false;

	const isUnavailable = $derived(command.hasUnavailableDefinitions);
	const handlersUnavailable = $derived(
		command.handlers.some((handler) => !handler.definition.isAvailable)
	);
	const commandLabel = $derived(command.displayCommandNames.map((name) => `!${name}`).join(', '));

	const roleLabels = $derived(
		command.permissions.roles.map((role) => ({
			id: role,
			label: roleLabel(role)
		}))
	);

	const cooldownLabel = $derived(formatCooldownLabel(command.cooldownGlobalMs, command.cooldownUserMs));
	const cooldownTooltip = $derived(formatCooldownTooltip(command.cooldownGlobalMs, command.cooldownUserMs));

	function formatCooldownSeconds(ms: number): string {
		return `${ms / 1000}s`;
	}

	function formatCooldownLabel(globalMs: number | null, userMs: number | null): string | null {
		const parts: string[] = [];

		if (globalMs != null && globalMs > 0) {
			parts.push(`${formatCooldownSeconds(globalMs)} ${t('global')}`);
		}

		if (userMs != null && userMs > 0) {
			parts.push(`${formatCooldownSeconds(userMs)} ${t('user')}`);
		}

		return parts.length > 0 ? parts.join(' / ') : null;
	}

	function formatCooldownTooltip(globalMs: number | null, userMs: number | null): string | null {
		const parts: string[] = [];

		if (globalMs != null && globalMs > 0) {
			parts.push(
				t('Global cooldown: {seconds}s between any use', {
					seconds: globalMs / 1000
				})
			);
		}

		if (userMs != null && userMs > 0) {
			parts.push(
				t('User cooldown: {seconds}s per viewer', {
					seconds: userMs / 1000
				})
			);
		}

		return parts.length > 0 ? parts.join(' · ') : null;
	}

	function roleLabel(role: string): string {
		switch (role) {
			case 'everyone':
				return t('Everyone');
			case 'mod':
				return t('Mod');
			case 'broadcaster':
				return t('Broadcaster');
			case 'vip':
				return t('VIP');
			case 'subscriber':
				return t('Subscriber');
			default:
				return role;
		}
	}

	function handleClone(event: MouseEvent): void {
		event.stopPropagation();
		CommandModel.createFrom(command).open();
	}
</script>

{#snippet definitionList({ title, definitions }: { title: string; definitions: Definition[] })}
	<div class="flex flex-col gap-1.5">
		<span class="text-[10px] font-semibold tracking-wider text-dark-400 uppercase">
			{title} · {definitions.length}
		</span>
		<ul class="flex flex-col gap-1">
			{#each definitions as { id, name, isAvailable } (id)}
				<li class="flex items-center gap-2">
					<span
						class={cn(
							'size-1.5 shrink-0 rounded-full',
							isAvailable ? 'bg-dark-400' : 'bg-destructive-400'
						)}
					></span>
					<span class={cn(!isAvailable && 'text-destructive-200')}>{name}</span>
					{#if !isAvailable}
						<span
							class="rounded bg-destructive-800 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-destructive-200 uppercase"
						>
							{t('Unavailable')}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

<div class="relative min-w-0">
	<div
		class={cn(
			'group/card relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 transition-colors',
			{
				'border-dark-700 bg-dark-800 hover:border-dark-500 hover:bg-dark-700': !isUnavailable,
				'border-destructive-700 bg-destructive-950 hover:border-destructive-600':
					isUnavailable,
				'opacity-60': !command.enabled,
				'pointer-events-none opacity-0 select-none': isDragging
			}
		)}
		aria-hidden={isDragging}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class={cn(
				'shrink-0 transition-opacity',
				!selected && 'opacity-0 group-hover/card:opacity-100 focus-within:opacity-100'
			)}
			onclick={(event) => event.stopPropagation()}
			onmousedown={(event) => {
				shiftKey = event.shiftKey;
			}}
		>
			<InputCheckbox
				inline
				aria-label={t('Select {name}', {
					name: command.name.trim() || t('this command')
				})}
				bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
			/>
		</div>

		<div
			class={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', {
				'bg-destructive-900 text-destructive-200': isUnavailable,
				'bg-dark-700 text-dark-400': !command.enabled && !isUnavailable,
				'bg-dark-700 text-primary': command.enabled && !isUnavailable
			})}
			aria-hidden="true"
		>
			<Icon icon="ri:terminal-box-line" class="size-5" />
		</div>

		<button
			type="button"
			class="flex min-w-0 flex-1 flex-col gap-1 text-left"
			onclick={() => command.open()}
		>
			<span
				class={cn(
					'truncate font-medium',
					!command.enabled ? 'text-dark-300' : 'text-dark-50'
				)}
			>
				{command.name.trim() || t('Untitled command')}
			</span>
			<span class="flex flex-wrap items-center gap-1.5">
				{#if commandLabel}
					<span class="truncate text-sm text-dark-300">{commandLabel}</span>
				{/if}
				<Badge
					size="sm"
					variant={handlersUnavailable ? 'destructive' : 'ghost'}
					{@attach tooltip(() =>
						tooltipSnippet(definitionList, {
							title: t('Handlers'),
							definitions: command.handlers.map((handler) => ({
								id: handler.id,
								name: handler.definition.name,
								isAvailable: handler.definition.isAvailable
							}))
						})
					)}
				>
					<Icon icon="ri:list-check" />
					{t('handlers ({count})', { count: command.handlers.length })}
				</Badge>
				{#each roleLabels as role (role.id)}
					<Badge size="sm" variant="outline">
						<Icon icon="ri:shield-user-line" />
						{role.label}
					</Badge>
				{/each}
				{#if cooldownLabel}
					<Badge
						size="sm"
						variant="secondary"
						{@attach tooltip(() => cooldownTooltip ?? cooldownLabel)}
					>
						<Icon icon="ri:timer-line" />
						{cooldownLabel}
					</Badge>
				{/if}
				{#each command.sources as source (source)}
					<Badge size="sm" variant="secondary">{source}</Badge>
				{/each}
			</span>
		</button>

		<div class="flex shrink-0 items-center gap-1">
			{#if command.id != null}
				<Button
					variant="outline"
					size="icon"
					icon="clarity:clone-line"
					class="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
					aria-label={t('Clone command')}
					onclick={handleClone}
					{@attach tooltip(() => t('Clone command'))}
				/>
			{/if}
			<Icon
				icon="ri:arrow-right-s-line"
				class="size-5 shrink-0 text-dark-500 transition-[color,transform] group-hover/card:translate-x-0.5 group-hover/card:text-dark-300"
				aria-hidden="true"
			/>
		</div>
	</div>

	{#if isDragging}
		<div
			class="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-primary-300 bg-primary-950 px-4 text-sm font-medium text-primary-200"
			aria-hidden="true"
		>
			{t('Moving: {name}', {
				name: movingLabel || command.name.trim() || t('this command')
			})}
		</div>
	{/if}
</div>
