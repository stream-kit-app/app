/** Latest Windows installer. GitHub releases are what the in-app updater uses too. */
export const DOWNLOAD_URL = 'https://github.com/stream-kit-app/app/releases/latest';

export const DOCS_URL = 'https://docs.stream-kit.app';

export const GITHUB_URL = 'https://github.com/stream-kit-app/app';

export function docsUrl(path: string): string {
	return `${DOCS_URL}/docs/${path.replace(/^\//, '')}`;
}
