import { ReactNode } from "react";

export const Section = ({
  children,
  muted = false,
  bordered = true,
  className = "",
  container = "wide",
}: {
  children: ReactNode;
  muted?: boolean;
  bordered?: boolean;
  className?: string;
  container?: "tight" | "narrow" | "wide";
}) => {
  const containerClass =
    container === "narrow" ? "container-narrow" : container === "tight" ? "container-tight" : "container-wide";
  return (
    <section
      className={`${muted ? "bg-surface-muted" : "bg-background"} ${bordered ? "border-b border-border" : ""} ${className}`}
    >
      <div className={`${containerClass} py-16 md:py-24`}>{children}</div>
    </section>
  );
};

export const SectionLabel = ({ number, eyebrow, title, description }: { number?: string; eyebrow?: string; title: string; description?: string }) => (
  <div className="max-w-3xl mb-12">
    <div className="flex items-center gap-4 mb-4">
      {number && <span className="text-[12.5px] text-muted-foreground font-medium">{number}</span>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    </div>
    <h2 className="text-[1.5rem] md:text-[1.625rem] font-semibold tracking-tight leading-[1.2] text-foreground">{title}</h2>
    {description && <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed max-w-2xl">{description}</p>}
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
