import { ReactNode } from "react";

/**
 * Section — centered "filing" container.
 *
 * Every content-heavy doc page (Terms, Privacy, Disclaimer, About, etc.)
 * renders through this primitive. The layout is a single centered prose
 * column (max 920px) with a unified background and consistent vertical
 * rhythm, so the page reads like one continuous regulatory filing rather
 * than a series of stacked blocks.
 */
export const Section = ({
  children,
  // legacy props accepted for back-compat — intentionally ignored
  muted: _muted = false,
  bordered = true,
  className = "",
  container: _container = "wide",
  density: _density = "default",
}: {
  children: ReactNode;
  muted?: boolean;
  bordered?: boolean;
  className?: string;
  container?: "tight" | "narrow" | "wide";
  density?: "default" | "doc" | "tight";
}) => {
  return (
    <section className={`bg-background ${className}`}>
      <div
        className={`prose-filing mx-auto w-full max-w-[900px] px-6 md:px-10 py-16 md:py-20 ${
          bordered ? "border-t border-[#E5E7EB]" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
};

/**
 * SectionLabel — the "filing header".
 *
 * §N chip rendered inline-left of the title; description sits below at
 * a comfortable reading width. The eyebrow slot is intentionally retired
 * (the §N chip replaces it).
 */
export const SectionLabel = ({
  number,
  eyebrow: _eyebrow,
  title,
  description,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
      {number && (
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {number}
        </span>
      )}
      <h2 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.012em] text-foreground">
        {title}
      </h2>
    </div>
    {description && (
      <p className="text-[15.5px] leading-[1.7] text-muted-foreground max-w-[68ch]">
        {description}
      </p>
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
