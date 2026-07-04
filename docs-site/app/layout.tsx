import { Inter, Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import { siteLinks } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteLinks.docs),
  title: {
    default: 'Stream Kit Docs',
    template: '%s | Stream Kit Docs',
  },
  description: 'Documentation for Stream Kit plugins, overlays, and core features.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
