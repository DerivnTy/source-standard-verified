import { ReactNode } from "react";
import { Section as SystemSection } from "@/components/system/Section";

/**
 * Legacy Section shim.
 *
 * All historical consumers (FAQ, ReportConcern, HowToReadTheDirectory,
 * EducationBasics/Guides/Questions) now flow through the canonical
 * `system/Section` primitive so they inherit the sitewide design
 * constitution: 1120px standard width, sitewide vertical rhythm
 * (`section-pad`), and consistent surfaces.
 *
 * The `width` API is preserved as a compatibility surface and mapped
 * to the new width tokens. New code should import directly from
 * `@/components/system`.
 */
const WIDTH_MAP: Record<"narrow" | "editorial" | "wide", "reading" | "reading-wide" | "standard"> = {
  narrow: "reading",
  editorial: "reading-wide",
  wide: "standard",
};

export const Section = ({
  children,
  muted = false,
  bordered: _bordered = true,
  className = "",
  container: _container,
  density: _density,
  width = "editorial",
}: {
  children: ReactNode;
  muted?: boolean;
  bordered?: boolean;
  className?: string;
  container?: "tight" | "narrow" | "wide";
  density?: "default" | "doc" | "tight";
  width?: "narrow" | "editorial" | "wide";
}) => (
  <SystemSection
    surface={muted ? "muted" : "background"}
    width={WIDTH_MAP[width]}
    bordered={false}
    className={className}
  >
    {children}
  </SystemSection>
);

/**
 * SectionLabel — the in-page filing header. §N chip rendered inline-left
 * of the title, description below at the standard reading measure.
 * Uses the canonical typography tokens so it matches every other heading
 * across the site.
 */
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
  <div className="mb-5">
    {(number || eyebrow) && (
      <p className="ss-eyebrow">
        {[number, eyebrow].filter(Boolean).join(" · ")}
      </p>
    )}
    <h2 className="ss-section-title text-foreground">{title}</h2>
    {description && (
      <p className="ss-lead">{description}</p>
    )}
  </div>
);

/**
 * FramedSection — bordered card with optional metadata bar.
 * Preserved for legacy callers; uses tokenized typography internally.
 */
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
        <span className="t-utility-xs text-foreground">{metaLeft}</span>
        <span className="t-utility-xs text-muted-foreground">{metaRight}</span>
      </div>
    )}
    {children}
  </div>
);
