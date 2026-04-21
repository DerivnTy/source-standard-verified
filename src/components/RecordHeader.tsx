import { ReactNode } from "react";
import { MetadataBar, MetadataItem } from "./MetadataBar";

/**
 * RecordHeader — Tier 2, used ONLY on regulatory / policy documents.
 *
 * Locked rhythm across all 13 doc pages:
 *  - title leads (MetadataBar moved BELOW the title block, demoted)
 *  - .title-doc enforced from index.css — single source of truth
 *  - py-14 md:py-18 vertical padding everywhere
 *  - Summary rail is optional and reserved for docs where the facts
 *    actually add information (Governance, Accountability,
 *    Verification Disclaimer, Status Definitions).
 */
export const RecordHeader = ({
  metadata,
  eyebrow,
  title,
  lead,
  summary,
  children,
}: {
  metadata: MetadataItem[];
  eyebrow?: string;
  title: string;
  lead?: string;
  summary?: { label: string; value: ReactNode }[];
  children?: ReactNode;
}) => {
  const hasSummary = summary && summary.length > 0;
  return (
    <header className="bg-background border-b border-border/60">
      <div className="container-wide py-14 md:py-18">
        <div className="grid md:grid-cols-12 gap-10">
          <div className={hasSummary ? "md:col-span-8" : "md:col-span-12"}>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="title-doc text-foreground max-w-3xl">{title}</h1>
            {lead && (
              <p className="mt-5 max-w-[64ch] text-[15.5px] text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>
          {hasSummary && (
            <div className="md:col-span-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/75 mb-3">
                Summary
              </p>
              <dl className="border-t border-border/60 divide-y divide-border/60">
                {summary!.map((s, i) => (
                  <div key={i} className="flex items-baseline justify-between py-3">
                    <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
                    <dd className="text-[13px] font-medium text-foreground tabular-nums text-right ml-3">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
      {/* Demoted metadata strip — sits BELOW the title block so the
          title leads, not the bureaucracy. */}
      <MetadataBar items={metadata} />
    </header>
  );
};
