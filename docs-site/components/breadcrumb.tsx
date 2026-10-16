'use client';

import { getBreadcrumbItemsFromPath } from 'fumadocs-core/breadcrumb';
import Link from 'fumadocs-core/link';
import { useTreeContext, useTreePath } from 'fumadocs-ui/contexts/tree';
import { Fragment, useMemo } from 'react';

/** Mono breadcrumb with `/` separators, same as the app's page headers. */
export function Breadcrumb() {
  const path = useTreePath();
  const { root } = useTreeContext();
  const items = useMemo(
    () => getBreadcrumbItemsFromPath(root, path, { includePage: false, includeSeparator: true, includeRoot: false }),
    [path, root],
  );

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && <span className="text-rule-strong">/</span>}
          {item.url ? (
            <Link href={item.url} className="transition-colors hover:text-foreground">
              {item.name}
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
