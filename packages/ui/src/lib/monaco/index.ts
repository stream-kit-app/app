export { configureMonacoTypescript } from './configure-types';
export type { ConfigureMonacoTypescriptOptions } from './configure-types';
export { streamKitMonacoTheme } from './theme';
export { ensureMonacoEnvironment } from './setup';
export { warmupMonacoTypescript } from './warmup-typescript';
export {
	buildMonacoProjectReferenceDirective,
	MONACO_SCRIPT_API_INDEX,
	MONACO_SCRIPT_PROJECT_ROOT,
	withMonacoProjectReference
} from './script-reference';
export type { MonacoExtraLib } from './types';
