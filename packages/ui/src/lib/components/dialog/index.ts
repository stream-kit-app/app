import { Dialog as DialogPrimitive } from 'bits-ui';

import DialogContent from './dialog-content.svelte';
import DialogOverlay from './dialog-overlay.svelte';

const DialogRoot = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogClose = DialogPrimitive.Close;
const DialogTrigger = DialogPrimitive.Trigger;

export {
	DialogClose as Close,
	DialogContent as Content,
	DialogDescription as Description,
	DialogOverlay as Overlay,
	DialogPortal as Portal,
	DialogRoot as Root,
	DialogTitle as Title,
	DialogTrigger as Trigger
};
