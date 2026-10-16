'use client';

import type * as PageTree from 'fumadocs-core/page-tree';

/** Sidebar section label — mono eyebrow, like the app's nav section labels. */
export function SidebarSeparator({ item }: { item: PageTree.Separator }) {
  return (
    <p className="eyebrow mt-7 mb-1.5 flex items-center gap-2 px-2 first:mt-0 [&_svg]:size-3.5">
      {item.icon}
      {item.name}
    </p>
  );
}
