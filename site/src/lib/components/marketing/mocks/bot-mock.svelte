<script lang="ts">
	import Icon from '@iconify/svelte';

	import MockFrame from '../mock-frame.svelte';

	type Line = {
		user: string;
		message: string;
		platform: 'twitch' | 'youtube';
		bot?: boolean;
	};

	const lines: Line[] = [
		{ user: 'moonlit', message: '!rank', platform: 'twitch' },
		{
			user: 'StreamKitBot',
			message: '@moonlit you are Gold III with 4,210 points (#7 this month)',
			platform: 'twitch',
			bot: true
		},
		{ user: 'Sam Rivers', message: '!quote', platform: 'youtube' },
		{
			user: 'StreamKitBot',
			message: 'Quote #42: "I meant to do that." (2025)',
			platform: 'youtube',
			bot: true
		},
		{ user: 'kiwi_dev', message: 'what game is this?', platform: 'twitch' }
	];

	const platformIcon = { twitch: 'ri:twitch-fill', youtube: 'ri:youtube-fill' };
</script>

<MockFrame>
	<div class="flex h-12 items-center gap-2 border-b border-rule px-5">
		<span class="text-sm font-semibold text-foreground">Chat</span>
		<span class="ms-auto flex items-center gap-1.5 text-xs text-muted-foreground">
			<span class="size-1.5 rounded-full bg-success-400"></span>
			Twitch & YouTube connected
		</span>
	</div>
	<ul class="flex flex-col gap-3 p-5">
		{#each lines as line, index (index)}
			<li
				class={[
					'flex items-start gap-3 rounded-lg px-3 py-2',
					line.bot && 'border border-primary/20 bg-primary/10'
				]}
			>
				<Icon
					icon={platformIcon[line.platform]}
					class="mt-0.5 size-4 shrink-0 text-muted-foreground"
				/>
				<p class="text-sm">
					<span class={['font-semibold', line.bot ? 'text-primary' : 'text-foreground']}>
						{line.user}
					</span>
					<span class="text-dark-100">{line.message}</span>
				</p>
			</li>
		{/each}
	</ul>
	<div class="border-t border-rule px-5 py-3 text-xs text-muted-foreground">
		Next timer: <span class="text-foreground">Discord shoutout</span> in 12 min
	</div>
</MockFrame>
