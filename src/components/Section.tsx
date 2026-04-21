import { ReactNode } from "react";

type Density = "default" | "doc" | "tight";

const densityClass: Record<Density, string> = {
  default: "py-16 md:py-20",
  doc: "py-12 md:py-16",
  tight: "py-8 md:py-10",
};

export const Section = ({
  children,
  muted = false,
  bordered = true,
  className = "",
  container = "wide",
  density = "default",
}: {
  children: ReactNode;
  muted?: boolean;
  bordered?: boolean;
  className?: string;
  container?: "tight" | "narrow" | "wide";
  density?: Density;
}) => {
  const containerClass =
    container === "narrow" ? "container-narrow" : container === "tight" ? "container-tight" : "container-wide";
  return (
    <section
      className={`${muted ? "bg-surface-muted/60" : "bg-background"} ${bordered ? "border-b border-border/60" : ""} ${className}`}
    >
      <div className={`${containerClass} ${densityClass[density]}`}>{children}</div>
    </section>
  );
};

export const SectionLabel = ({
  number,
  eyebrow,
  title,
  description,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) => (
  <div className="max-w-3xl mb-8">
    <div className="flex items-center gap-3 mb-3">
      {number && <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground/75">{number}</span>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    </div>
    <h2 className="h-section">{title}</h2>
    {description && (
      <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{description}</p>
    )}
  </div>
);

export const FramedSection = ({
  metaLeft,
  metaRight,
  children,
  className = "",
}: {
  metaLeft?: ReactNode;
  metaRight?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`border border-border/70 rounded-[2px] bg-background ${className}`}>
    {(metaLeft || metaRight) && (
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-surface-muted/60">
        <span className="text-[12.5px] text-foreground font-medium">{metaLeft}</span>
        <span className="text-[12.5px] text-muted-foreground">{metaRight}</span>
      </div>
    )}
    {children}
  </div>
);
