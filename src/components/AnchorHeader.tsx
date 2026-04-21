import { ReactNode } from "react";

/**
 * AnchorHeader — Tier 1, used on front-door anchor pages
 * (Home, Verified Vendors, Greenlist, Education).
 *
 * Editorial weight (medium, not semibold), no MetadataBar above it,
 * lead column capped near 58ch. Optional right-side `aside` for a
 * single contextual stat or call to action.
 */
export const AnchorHeader = ({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <section className="border-b border-border/50 bg-background">
      <div className="container-wide py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className={aside ? "md:col-span-8" : "md:col-span-12"}>
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="display-1 text-foreground">{title}</h1>
            {lead && (
              <p className="mt-6 max-w-[58ch] text-[16.5px] text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && (
            <div className="md:col-span-4 md:pb-1.5">{aside}</div>
          )}
        </div>
      </div>
    </section>
  );
};
