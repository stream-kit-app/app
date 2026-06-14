export const OVERLAY_MAIN_JS = `import { mount } from '/overlay-sdk/overlay-runtime.js';
import App from './app.compiled.js';

mount(App, { target: document.body });
`;

export const OVERLAY_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="./overlay.css" />
	<style>
		html, body {
			margin: 0;
			width: 100%;
			height: 100%;
			background: transparent;
			overflow: hidden;
		}
	</style>
</head>
<body>
	<script type="module" src="./main.js"></script>
</body>
</html>`;

export function overlayMainJsNeedsMigration(content: string): boolean {
	return content.includes('bootstrap.js') || content.includes('mountOverlay');
}

export function overlayIndexHtmlNeedsMigration(content: string): boolean {
	return content.includes('importmap');
}
