import { ReactNode } from "react";

export const Section = ({
  children,
  muted = false,
  bordered = true,
  className = "",
  container = "tight",
}: {
  children: ReactNode;
  muted?: boolean;
  bordered?: boolean;
  className?: string;
  container?: "tight" | "narrow" | "wide";
}) => {
  const containerClass =
    container === "narrow" ? "container-narrow" : container === "wide" ? "container-wide" : "container-tight";
  return (
    <section
      className={`${muted ? "bg-surface-muted" : "bg-background"} ${bordered ? "border-b border-border" : ""} ${className}`}
    >
      <div className={`${containerClass} py-20 md:py-24`}>{children}</div>
    </section>
  );
};

export const SectionLabel = ({ number, eyebrow, title, description }: { number?: string; eyebrow?: string; title: string; description?: string }) => (
  <div className="max-w-3xl mb-14">
    <div className="flex items-center gap-4 mb-5">
      {number && <span className="text-[11px] font-mono text-muted-foreground tabular-nums">{number}</span>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    </div>
    <h2 className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.15] text-foreground">{title}</h2>
    {description && <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">{description}</p>}
  </div>
);
