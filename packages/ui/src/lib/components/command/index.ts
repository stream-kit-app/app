import { Command as CommandPrimitive } from 'bits-ui';

import CommandEmpty from './command-empty.svelte';
import CommandInput from './command-input.svelte';
import CommandItem from './command-item.svelte';
import CommandList from './command-list.svelte';
import CommandLoading from './command-loading.svelte';
import CommandRoot from './command-root.svelte';

const CommandViewport = CommandPrimitive.Viewport;
const CommandGroup = CommandPrimitive.Group;
const CommandGroupHeading = CommandPrimitive.GroupHeading;
const CommandGroupItems = CommandPrimitive.GroupItems;
const CommandSeparator = CommandPrimitive.Separator;

export {
	CommandEmpty as Empty,
	CommandGroup as Group,
	CommandGroupHeading as GroupHeading,
	CommandGroupItems as GroupItems,
	CommandInput as Input,
	CommandItem as Item,
	CommandList as List,
	CommandLoading as Loading,
	CommandRoot as Root,
	CommandSeparator as Separator,
	CommandViewport as Viewport
};
