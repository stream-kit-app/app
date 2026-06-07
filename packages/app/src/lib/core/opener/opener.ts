import { openUrl } from '@tauri-apps/plugin-opener';

export class Opener {
	openUrl(url: string): Promise<void> {
		return openUrl(url);
	}
}
