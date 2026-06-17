import { openPath as openPathWithApp, openUrl } from '@tauri-apps/plugin-opener';

export class Opener {
	openUrl(url: string): Promise<void> {
		return openUrl(url);
	}

	openPath(path: string, openWith?: string): Promise<void> {
		return openPathWithApp(path, openWith);
	}
}
