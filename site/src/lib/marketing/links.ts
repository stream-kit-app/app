/** Latest Windows installer. Publish Updater Feed copies it to the `updater` release under a stable name. */
export const DOWNLOAD_URL = 'https://github.com/stream-kit-app/app/releases/download/updater/stream-kit-setup.exe';

export const DOCS_URL = 'https://docs.stream-kit.app';

export const GITHUB_URL = 'https://github.com/stream-kit-app/app';

export function docsUrl(path: string): string {
	return `${DOCS_URL}/docs/${path.replace(/^\//, '')}`;
}
