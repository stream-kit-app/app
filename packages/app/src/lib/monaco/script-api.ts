/** Curated ambient types exposed to user scripts in the Monaco editor. */
export const SCRIPT_API_TYPES = `
/** One trigger payload passed to script handlers. Always provided as an array. */
declare type HandlerTriggerContext = {
\ttrigger: string;
\tdata: unknown;
};
`;

export const SCRIPT_API_LIB_URI = 'file:///node_modules/@stream-kit/script-api/index.d.ts';
