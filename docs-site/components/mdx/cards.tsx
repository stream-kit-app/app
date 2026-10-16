import Link from 'fumadocs-core/link';
import type { ReactNode } from 'react';
import { RemixIcon } from '@/lib/icon';

/** Collapsed cell grid (shared hairlines, no gaps) — the blueprint CellGrid recipe. */
export function Cards({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div
      className={`not-prose my-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-rule bg-rule ${
        cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
      }`}
    >
      {children}
    </div>
  );
}

type CardProps = {
  title: ReactNode;
  href?: string;
  /** Remix icon name, e.g. `download-2-line`. */
  icon?: string;
  children?: ReactNode;
  /** Kept for compatibility with Fumadocs' Card. */
  description?: ReactNode;
};

export function Card({ title, href, icon, children, description }: CardProps) {
  const body = (
    <>
      {icon && (
        <span className="mb-3 inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4.5">
          <RemixIcon name={icon} />
        </span>
      )}
      <span className="flex items-center gap-1.5 font-semibold text-foreground">
        {title}
        {href && (
          <RemixIcon
            name="arrow-right-line"
            className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        )}
      </span>
      {(children ?? description) && (
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{children ?? description}</span>
      )}
    </>
  );

  const className = 'group flex flex-col bg-surface p-5 transition-colors';
  if (!href) return <div className={className}>{body}</div>;
  return (
    <Link href={href} className={`${className} hover:bg-dark-800`}>
      {body}
    </Link>
  );
}
