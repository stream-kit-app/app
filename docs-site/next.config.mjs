import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const config = {
  // Static export is for production builds (Cloudflare Pages). Dev uses the
  // standard server so dynamic routes are not limited to generateStaticParams.
  ...(isProd ? { output: 'export' } : {}),
  // Required so relative links like ./app-started resolve under folder index pages
  // (e.g. /docs/api/triggers/core/ → /docs/api/triggers/core/app-started/).
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
