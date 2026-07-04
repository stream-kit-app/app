import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig, siteLinks } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-wide">
          <Image src="/logo.svg" alt="" width={28} height={28} className="rounded-md" />
          {appName}
        </span>
      ),
    },
    links: [
      {
        text: 'Home',
        url: siteLinks.home,
        external: true,
      },
      {
        text: 'Plugins',
        url: siteLinks.plugins,
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
