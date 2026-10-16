import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import { siteLinks } from '@/lib/shared';
import './global.css';

/** Same font set as the desktop app (packages/app/src/app.html). */
const fontsHref =
  'https://fonts.bunny.net/css?family=jetbrains-mono:400,500,600|outfit:500,600,700|plus-jakarta-sans:400,500,600,700,800&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(siteLinks.docs),
  title: {
    default: 'Stream Kit Docs',
    template: '%s · Stream Kit Docs',
  },
  description: 'Guides and reference for Stream Kit, the stream automation app for Twitch, YouTube, OBS and more.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
