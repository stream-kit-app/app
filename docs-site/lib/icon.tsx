import { icons as remix } from '@iconify-json/ri';
import { getIconData, iconToSVG } from '@iconify/utils';

/**
 * Remix Icon (same set the app uses via `ri:*`), rendered on the server so no icon data ships to the client.
 * Accepts `ri:name` or a bare `name`; returns null for unknown icons.
 */
export function RemixIcon({ name, className }: { name: string; className?: string }) {
  const data = getIconData(remix, name.replace(/^ri:/, ''));
  if (!data) return null;

  const { attributes, body } = iconToSVG(data, { height: '1em' });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      className={className}
      viewBox={attributes.viewBox}
      width={attributes.width}
      height={attributes.height}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, bundled icon data
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

export function resolveIcon(name: string | undefined) {
  if (!name) return undefined;
  return <RemixIcon name={name} />;
}
