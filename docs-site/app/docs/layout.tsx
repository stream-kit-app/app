import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarSeparator } from '@/components/sidebar';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{ components: { Separator: SidebarSeparator }, defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}
