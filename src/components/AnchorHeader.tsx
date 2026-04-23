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
  size: _size = "default",
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
  void _reference;
  void _size;

  if (aside) {
    return (
      <section className="relative border-b border-border/50 bg-background overflow-hidden">
        <HeroPattern />
        <div className="relative page-shell section-pad">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="md:col-span-8">
              <h1 className="t-page-title text-foreground">{title}</h1>
              {lead && (
                <p className="mt-5 max-w-[68ch] t-body-md text-muted-foreground">
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

  return (
    <section className="relative border-b border-border/50 bg-background overflow-hidden">
      <HeroPattern />
      <div className="relative page-shell section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-px w-8 bg-border mb-6" aria-hidden="true" />
          <h1 className="t-page-title text-foreground">{title}</h1>
          {lead && (
            <p className="mt-5 mx-auto max-w-[68ch] t-body-md text-muted-foreground">
              {lead}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
};
