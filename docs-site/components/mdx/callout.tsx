import type { ReactNode } from 'react';
import { RemixIcon } from '@/lib/icon';

type CalloutType = 'info' | 'tip' | 'warn' | 'warning' | 'error' | 'success' | 'pro';

const tones: Record<CalloutType, { icon: string; className: string }> = {
  info: { icon: 'information-line', className: 'border-primary/25 bg-primary/8 [--callout-accent:var(--color-primary)]' },
  tip: { icon: 'lightbulb-line', className: 'border-success/25 bg-success/8 [--callout-accent:var(--color-success)]' },
  success: { icon: 'checkbox-circle-line', className: 'border-success/25 bg-success/8 [--callout-accent:var(--color-success)]' },
  warn: { icon: 'error-warning-line', className: 'border-warning/30 bg-warning/8 [--callout-accent:var(--color-warning)]' },
  warning: { icon: 'error-warning-line', className: 'border-warning/30 bg-warning/8 [--callout-accent:var(--color-warning)]' },
  error: { icon: 'close-circle-line', className: 'border-destructive/30 bg-destructive/8 [--callout-accent:var(--color-destructive)]' },
  pro: { icon: 'vip-crown-2-line', className: 'border-secondary/30 bg-secondary/8 [--callout-accent:var(--color-secondary)]' },
};

/** Tinted callout — tone-tinted surface instead of a solid fill, like the app's alerts. */
export function Callout({ type = 'info', title, children }: { type?: CalloutType; title?: ReactNode; children?: ReactNode }) {
  const tone = tones[type] ?? tones.info;
  return (
    <div className={`not-prose my-6 flex gap-3 rounded-xl border px-4 py-3.5 text-sm ${tone.className}`}>
      <RemixIcon name={tone.icon} className="mt-0.5 size-4.5 shrink-0 text-(--callout-accent)" />
      <div className="min-w-0 flex-1 leading-relaxed text-dark-100 [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-3 [&_code]:font-mono [&_code]:text-[0.85em] [&_p+p]:mt-2">
        {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
        {children}
      </div>
    </div>
  );
}
