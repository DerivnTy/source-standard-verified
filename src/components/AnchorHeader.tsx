import { ReactNode } from "react";

/**
 * AnchorHeader — Tier 1, used on front-door anchor pages.
 *
 * Split-header standard. If `aside` is provided it is rendered as-is;
 * otherwise an optional `reference` block renders a default white
 * Reference Box (mirrors RecordHeader).
 */
export const AnchorHeader = ({
  eyebrow,
  title,
  lead,
  aside,
  reference,
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
  const renderedAside =
    aside ??
    (reference ? (
      <div className="bg-surface border border-border rounded-[4px] p-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
          Reference
        </p>
        <dl className="space-y-2">
          {[
            { l: "Doc", v: reference.docId },
            { l: "Status", v: reference.status },
            { l: "Updated", v: reference.updated },
          ].map((m) => (
            <div key={m.l} className="flex items-baseline justify-between gap-3">
              <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {m.l}
              </dt>
              <dd className="font-mono text-[12px] text-foreground tabular-nums text-right">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    ) : null);

  return (
    <section className="border-b border-border/50 bg-background">
      <div className={`container-wide ${size === "lg" ? "py-16 md:py-24" : "py-14 md:py-20"}`}>
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className={renderedAside ? "md:col-span-8" : "md:col-span-12"}>
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
          {renderedAside && (
            <div className="md:col-span-4 md:pb-1.5">{renderedAside}</div>
          )}
        </div>
      </div>
    </section>
  );
};
