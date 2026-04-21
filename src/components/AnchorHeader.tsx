import { ReactNode } from "react";

/**
 * AnchorHeader — Tier 1, used on front-door anchor pages
 * (Home, Verified Vendors, Greenlist, Education).
 *
 * Locked structure: eyebrow → title → lead → optional action row.
 * No MetadataBar. No Summary rail.
 *
 * `size="lg"` is reserved for Home (uses display-1). Every other anchor
 * page uses `size="default"` (display-2) — the difference is one type
 * step, deliberate, never per-page improvisation.
 */
export const AnchorHeader = ({
  eyebrow,
  title,
  lead,
  aside,
  size = "default",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  size?: "lg" | "default";
  children?: ReactNode;
}) => {
  return (
    <section className="border-b border-border/50 bg-background">
      <div className={`container-wide ${size === "lg" ? "py-16 md:py-24" : "py-14 md:py-20"}`}>
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className={aside ? "md:col-span-8" : "md:col-span-12"}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className={`${size === "lg" ? "display-1" : "title-page"} text-foreground`}>
              {title}
            </h1>
            {lead && (
              <p className="mt-3 max-w-[58ch] text-[15px] text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
          {aside && (
            <div className="md:col-span-4 md:pb-1.5">{aside}</div>
          )}
        </div>
      </div>
    </section>
  );
};
