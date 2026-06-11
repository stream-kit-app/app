import { Popover as PopoverPrimitive } from 'bits-ui';

import PopoverContent from './popover-content.svelte';

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

export {
	PopoverContent as Content,
	PopoverClose as Close,
	PopoverRoot as Root,
	PopoverTrigger as Trigger
};
