import { ReactNode } from "react";

type Tone = "notice" | "warning" | "info";

const toneStyles: Record<Tone, { bar: string; bg: string; label: string }> = {
  notice: {
    bar: "bg-foreground",
    bg: "bg-surface",
    label: "text-foreground",
  },
  warning: {
    bar: "bg-[hsl(var(--pending))]",
    bg: "bg-[hsl(var(--pending-soft))]",
    label: "text-[hsl(var(--pending))]",
  },
  info: {
    bar: "bg-primary",
    bg: "bg-[hsl(var(--accent-soft))]",
    label: "text-primary",
  },
};

export const Callout = ({
  tone = "notice",
  eyebrow,
  children,
  className = "",
}: {
  tone?: Tone;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) => {
  const t = toneStyles[tone];
  return (
    <div
      className={`relative ${t.bg} rounded-lg shadow-sm border border-border/50 overflow-hidden ${className}`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${t.bar}`} aria-hidden />
      <div className="pl-6 pr-6 py-5">
        {eyebrow && (
          <p
            className={`font-mono uppercase tracking-[0.08em] text-[10.5px] font-medium ${t.label} mb-2`}
          >
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export const CalloutTitle = ({ children }: { children: ReactNode }) => (
  <p className="text-[14.5px] font-semibold text-foreground mb-2">{children}</p>
);
