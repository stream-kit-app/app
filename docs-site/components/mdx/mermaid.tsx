'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useTheme } from 'next-themes';
import mermaid from 'mermaid';

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
      securityLevel: 'loose',
    });

    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    ref.current.innerHTML = '';

    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((error) => {
        if (ref.current) {
          ref.current.textContent = error instanceof Error ? error.message : 'Mermaid render failed';
        }
      });
  }, [chart, resolvedTheme]);

  return <div ref={ref} className="my-6 flex justify-center overflow-x-auto" />;
}
