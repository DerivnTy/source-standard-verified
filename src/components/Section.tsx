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
      <div className={`${containerClass} py-14 md:py-20`}>{children}</div>
    </section>
  );
};

export const SectionLabel = ({ number, eyebrow, title, description }: { number?: string; eyebrow?: string; title: string; description?: string }) => (
  <div className="max-w-3xl mb-10">
    <div className="flex items-center gap-4 mb-4">
      {number && <span className="meta">{number}</span>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    </div>
    <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2] text-foreground">{title}</h2>
    {description && <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{description}</p>}
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
  <div className={`border border-border bg-background ${className}`}>
    {(metaLeft || metaRight) && (
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
        <span className="meta-label text-foreground">{metaLeft}</span>
        <span className="meta-label">{metaRight}</span>
      </div>
    )}
    {children}
  </div>
);
