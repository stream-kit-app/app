export const MODAL_PANEL_WIDTH = {
	xs: '22rem',
	sm: '28rem',
	md: '42rem',
	lg: '48rem',
	full: '50%'
} as const;

export type ModalPanelSize = keyof typeof MODAL_PANEL_WIDTH;

/** CSS width for the overlay panel; `full` uses viewport width. */
export function getModalPanelWidth(size: ModalPanelSize): string {
	const width = MODAL_PANEL_WIDTH[size];
	return width === '50%' ? '50vw' : width;
}
