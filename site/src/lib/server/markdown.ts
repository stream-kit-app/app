import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.setOptions({
	gfm: true,
	breaks: false
});

export function renderPluginMarkdown(markdown: string | null | undefined): string {
	if (!markdown?.trim()) {
		return '';
	}

	const html = marked.parse(markdown, { async: false }) as string;
	return DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true }
	});
}
