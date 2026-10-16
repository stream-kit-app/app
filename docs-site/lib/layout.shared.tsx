import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { RemixIcon } from './icon';
import { gitConfig, siteLinks } from './shared';

/** Logo mark + wordmark, same recipe as @stream-kit/ui Logo, with a mono "Docs" tag. */
function NavTitle() {
  return (
    <span className="flex items-center gap-2.5">
      <Image src="/logo.svg" alt="" width={26} height={26} />
      <span className="font-outfit text-base font-semibold tracking-wide text-foreground uppercase">Stream Kit</span>
      <span className="eyebrow rounded-md border border-rule px-1.5 py-0.5 text-[10px]">Docs</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavTitle />,
    },
    links: [
      {
        text: 'stream-kit.app',
        url: siteLinks.home,
        icon: <RemixIcon name="global-line" />,
        external: true,
      },
      {
        text: 'Download',
        url: siteLinks.download,
        icon: <RemixIcon name="download-2-line" />,
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
