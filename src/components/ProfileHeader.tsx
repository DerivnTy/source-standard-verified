import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * ProfileHeader — Tier 3, used on individual record pages
 * (Vendor profile, Greenlist profile, Advisor profile, Library entry).
 *
 * Leads with the entity (eyebrow + name), with a compact identity row
 * (status badge, location, credential, category) directly underneath.
 * The doc ID/version/updated date is intentionally NOT shown here —
 * it belongs in a `ProfileFootnote` at the bottom of the record.
 */
export const ProfileHeader = ({
  backHref,
  backLabel,
  eyebrow,
  identity,
  title,
  lead,
  rightSlot,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  /** Compact identity row: status badge, location, credential, etc. */
  identity?: ReactNode;
  title: string;
  lead?: string;
  /** Right-aligned slot — photo, status card, or quick-glance facts. */
  rightSlot?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <header className="bg-background border-b border-border/60">
      <div className="container-wide pt-5 pb-14 md:pb-20">
        {backHref && (
          <Link
            to={backHref}
            className="inline-flex items-center gap-2 t-utility-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {backLabel ?? "Back"}
          </Link>
        )}

        <div className={`grid md:grid-cols-12 gap-10 ${backHref ? "mt-5" : ""}`}>
          <div className={rightSlot ? "md:col-span-8" : "md:col-span-12"}>
            <h1 className="title-page text-foreground">{title}</h1>
            {identity && <div className="mt-2 text-helper text-muted-foreground">{identity}</div>}
            {lead && (
              <p className="mt-3 max-w-[58ch] t-body-sm text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-5">{children}</div>}
          </div>
          {rightSlot && <aside className="md:col-span-4">{rightSlot}</aside>}
        </div>
      </div>
    </header>
  );
};

/**
 * ProfileFootnote — Citation strip for record pages.
 * Houses the doc ID / version / updated date that used to live
 * in a top metadata bar. Place at the bottom of the record.
 */
export const ProfileFootnote = ({
  items,
  note,
}: {
  items: { label: string; value: ReactNode }[];
  note?: ReactNode;
}) => {
  return (
    <section className="bg-surface-muted/40 border-t border-border/60">
      <div className="container-wide py-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 t-utility-xs">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground/80">{it.label}</span>
              <span className="text-foreground/90 font-medium">{it.value}</span>
            </div>
          ))}
        </div>
        {note && (
          <p className="mt-3 t-utility-xs text-muted-foreground leading-relaxed max-w-4xl">
            {note}
          </p>
        )}
      </div>
    </section>
  );
};
