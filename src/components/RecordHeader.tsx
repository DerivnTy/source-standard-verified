import { ReactNode } from "react";
import { MetadataItem } from "./MetadataBar";

/**
 * RecordHeader — Tier 2, used on regulatory / policy documents.
 *
 * Split-header standard:
 *  - Left: eyebrow + title + lead + optional children
 *  - Right: white "Reference" service-card panel housing doc metadata,
 *           with optional Summary list stacked below.
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
    <header className="bg-background border-b border-[#E5E7EB]">
      <div className="container-wide py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className="title-page text-foreground max-w-3xl">{title}</h1>
            {lead && (
              <p className="mt-3 max-w-[58ch] text-[15px] text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
          <aside className="md:col-span-4 space-y-4">
            {/* Reference Box — white service-card panel */}
            <div className="bg-surface border border-border rounded-[4px] p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Reference
              </p>
              <dl className="space-y-2">
                {metadata.map((m, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3">
                    <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="font-mono text-[12px] text-foreground tabular-nums text-right">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {hasSummary && (
              <div className="bg-surface border border-border rounded-[4px] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Summary
                </p>
                <dl className="divide-y divide-border/60">
                  {summary!.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0">
                      <dt className="text-[12.5px] text-muted-foreground">{s.label}</dt>
                      <dd className="text-[12.5px] font-medium text-foreground tabular-nums text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </div>
    </header>
  );
};
