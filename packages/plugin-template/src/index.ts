import type { Plugin } from '@stream-kit/app/api';

import { createGreetHandler } from './handler/greet';

const plugin: Plugin = (app) => {
	const twitch = app.plugins.get('twitch');
	const showDemoToast = () => {
		app.toast.create({
			title: 'Hello World',
			description: 'This toast was triggered by a plugin page button.',
			variant: 'success'
		});
	};
	const showSecondaryDemoToast = () => {
		app.toast.create({
			title: 'Second button',
			description: 'Buttons can define their own plugin-owned callback.',
			variant: 'warning'
		});
	};

	return {
		name: 'Hello World',
		description: 'Example Stream Kit plugin with a greeting action.',
		icon: 'ri:hand-heart-line',
		handlers: [createGreetHandler()],
		menuItems: [
			{
				title: 'Hello World',
				icon: 'ri:hand-heart-line',
				children: [
					{
						title: 'Overview',
						page: {
							title: 'Plugin page block showcase',
							description: 'Every supported block type rendered by Stream Kit UI.',
							blocks: [
								{
									type: 'heading',
									level: 2,
									title: 'Heading block',
									subtitle: 'Headings can include a subtitle and choose levels 1 through 6.'
								},
								{
									type: 'text',
									text: 'Text blocks render plain text only. No raw HTML or Svelte component rendering path is exposed.'
								},
								{
									type: 'alert',
									title: 'Alert block',
									description: 'Alerts support default, success, warning, and error variants.',
									variant: 'warning'
								},
								{
									type: 'stack',
									blocks: [
										{
											type: 'heading',
											level: 3,
											title: 'Badge blocks'
										},
										{
											type: 'grid',
											columns: 3,
											blocks: [
												{
													type: 'badge',
													label: 'Default',
													variant: 'default'
												},
												{
													type: 'badge',
													label: 'Success',
													variant: 'success'
												},
												{
													type: 'badge',
													label: 'Warning',
													variant: 'warning'
												}
											]
										}
									]
								},
								{
									type: 'card',
									title: 'Card block',
									description:
										'Cards can contain nested blocks, which makes them useful for grouped plugin information.',
									blocks: [
										{
											type: 'badge',
											label: 'Nested badge',
											variant: 'success'
										},
										{
											type: 'text',
											text: 'This text is nested inside a card block.'
										}
									]
								},
								{
									type: 'grid',
									columns: 2,
									blocks: [
										{
											type: 'card',
											title: 'Grid block',
											description: 'This card sits in a two-column grid.',
											blocks: [
												{
													type: 'text',
													text: 'Grid items can be any supported block.'
												}
											]
										},
										{
											type: 'card',
											title: 'Stack block',
											description: 'Stacks render nested blocks vertically.',
											blocks: [
												{
													type: 'stack',
													blocks: [
														{
															type: 'badge',
															label: 'First stacked block',
															variant: 'secondary'
														},
														{
															type: 'text',
															text: 'Second stacked block.'
														}
													]
												}
											]
										}
									]
								},
								{
									type: 'stack',
									blocks: [
										{
											type: 'heading',
											level: 3,
											title: 'Interactive blocks'
										},
										{
											type: 'button',
											label: 'Button block',
											variant: 'outline',
											onClick: showDemoToast
										},
										{
											type: 'button',
											label: 'Second button callback',
											variant: 'secondary',
											onClick: showSecondaryDemoToast
										}
									]
								},
								{
									type: 'form',
									title: 'Form block',
									description:
										'Forms use Stream Kit managed fields and persist to the plugin store.',
									submitLabel: 'Save showcase form',
									successMessage: 'Showcase form saved',
									fields: [
										{
											type: 'alert',
											name: 'Form alert field',
											description: 'Alert fields can be shown inside forms.',
											variant: 'default'
										},
										{
											type: 'section',
											title: 'Inputs',
											description: 'This section renders every supported form input.',
											fields: [
												{
													type: 'text',
													name: 'Text input',
													placeholder: 'Type a value',
													defaultValue: 'Hello blocks',
													required: true
												},
												{
													type: 'checkbox',
													name: 'Checkbox input',
													defaultValue: true
												},
												{
													type: 'switch',
													name: 'Switch input',
													defaultValue: true
												},
												{
													type: 'select',
													name: 'Select input',
													defaultValue: 'alpha',
													items: [
														{ label: 'Alpha', value: 'alpha' },
														{ label: 'Beta', value: 'beta' },
														{ label: 'Gamma', value: 'gamma' }
													]
												},
												{
													type: 'combobox',
													name: 'Combobox input',
													defaultValue: 'one',
													items: [
														{ label: 'One', value: 'one' },
														{ label: 'Two', value: 'two' },
														{ label: 'Three', value: 'three' }
													]
												},
												{
													type: 'slider',
													name: 'Slider input',
													min: 0,
													max: 10,
													step: 1,
													defaultValue: 5
												}
											]
										}
									]
								}
							]
						}
					},
					{
						title: 'Settings demo',
						page: {
							title: 'Settings demo',
							description:
								'This form writes to the plugin store with Stream Kit managed fields.',
							blocks: [
								{
									type: 'form',
									title: 'Greeting settings',
									description: 'Save a message and a couple of simple preferences.',
									submitLabel: 'Save demo settings',
									successMessage: 'Demo settings saved',
									fields: [
										{
											type: 'text',
											name: 'Message',
											placeholder: 'Hello from Stream Kit!',
											defaultValue: 'Hello from Stream Kit!',
											required: true
										},
										{
											type: 'checkbox',
											name: 'Enable demo mode',
											defaultValue: true
										},
										{
											type: 'select',
											name: 'Tone',
											defaultValue: 'friendly',
											items: [
												{ label: 'Friendly', value: 'friendly' },
												{ label: 'Focused', value: 'focused' },
												{ label: 'Playful', value: 'playful' }
											]
										},
										{
											type: 'slider',
											name: 'Demo volume',
											min: 0,
											max: 100,
											step: 5,
											defaultValue: 50
										}
									]
								}
							]
						}
					}
				]
			}
		],
		isConfigured: () => true,
		onBoot: () => {
			app.toast.create({
				title: 'Hello World',
				description: 'The example plugin is active.',
				variant: 'success'
			});
		}
	};
};

export default plugin;
