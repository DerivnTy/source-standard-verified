import { ReactNode } from "react";

/**
 * Mono, inline mono accent for technical scalars (IDs, dates, versions).
 */
export const Mono = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span
    className={`font-mono text-[12.5px] tracking-[0.02em] text-foreground ${className}`}
  >
    {children}
  </span>
);
