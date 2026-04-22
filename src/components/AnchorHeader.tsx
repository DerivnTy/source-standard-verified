import { ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";

/**
 * AnchorHeader — Tier 1, used on front-door anchor pages.
 *
 * Default presentation: centered single-column title block (no Reference
 * metadata box). Pages may still pass a custom `aside` (e.g. status legend)
 * to opt back into the split layout. The legacy `reference` prop is accepted
 * but no longer auto-rendered — front-facing pages should not show internal
 * Doc IDs / Status codes.
 */
export const AnchorHeader = ({
  eyebrow,
  title,
  lead,
  aside,
  reference: _reference,
  size = "default",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  reference?: { docId: string; status: string; updated: string };
  size?: "lg" | "default";
  children?: ReactNode;
}) => {
  // `reference` is intentionally ignored — kept in the type for backward
  // compatibility with existing page callers.
  void _reference;

  if (aside) {
    return (
      <section className="relative border-b border-border/50 bg-background overflow-hidden">
        <HeroPattern />
        <div className={`relative container-wide ${size === "lg" ? "py-16 md:py-24" : "py-14 md:py-20"}`}>
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="md:col-span-8">
              {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
              <h1 className={`${size === "lg" ? "display-1" : "title-page"} text-foreground`}>
                {title}
              </h1>
              {lead && (
                <p className="mt-3 max-w-[58ch] text-[14.5px] text-muted-foreground leading-[1.65]">
                  {lead}
                </p>
              )}
              {children && <div className="mt-6">{children}</div>}
            </div>
            <div className="md:col-span-4 md:pb-1.5">{aside}</div>
          </div>
        </div>
      </section>
    );
  }

  // Centered, no aside — the new default for anchor pages.
  return (
    <section className="relative border-b border-border/50 bg-background overflow-hidden">
      <HeroPattern />
      <div className={`relative container-wide ${size === "lg" ? "py-20 md:py-28" : "py-16 md:py-24"}`}>
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1
            className={`${size === "lg" ? "display-1" : "title-page"} text-foreground tracking-[-0.02em]`}
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-4 mx-auto max-w-[62ch] text-[14.5px] text-muted-foreground leading-[1.65]">
              {lead}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
};

