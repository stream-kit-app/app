import type { MonacoModule } from '@stream-kit/ui/monaco';

import { SCRIPT_API_LIB_URI, SCRIPT_API_TYPES } from './script-api';

export function configureScriptApiTypes(monaco: MonacoModule): void {
	monaco.typescript.typescriptDefaults.addExtraLib(SCRIPT_API_TYPES, SCRIPT_API_LIB_URI);
	monaco.typescript.javascriptDefaults.addExtraLib(SCRIPT_API_TYPES, SCRIPT_API_LIB_URI);
}
