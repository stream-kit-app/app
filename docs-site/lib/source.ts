import { docs } from 'collections/server';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { resolveIcon } from './icon';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

/** Resolves `icon` names in frontmatter / meta.json to Remix Icons (the app's icon set). */
function remixIconsPlugin(): LoaderPlugin {
  function replaceIcon<T extends { icon?: unknown }>(node: T): T {
    if (node.icon === undefined || typeof node.icon === 'string') {
      node.icon = resolveIcon(node.icon as string | undefined);
    }
    return node;
  }

  return {
    name: 'stream-kit:remix-icons',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  };
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [remixIconsPlugin()],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
