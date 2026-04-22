import { ReactNode } from "react";
import { MetadataItem } from "./MetadataBar";
import { DownloadPdfLink } from "./DownloadPdfLink";

/**
 * RecordHeader — Tier 2, used on regulatory / policy documents.
 *
 * Split-header standard:
 *  - Left: eyebrow + title + lead + optional children
 *  - Right: white "Reference" service-card panel housing doc metadata,
 *           with optional Summary list stacked below.
 *
 * `verifiedOn` renders a dedicated DATA VERIFIED row inside the Reference box.
 * `downloadable` (default true on Tier 2 docs) renders a "Download · PDF" link
 *   in the right rail header.
 */
export const RecordHeader = ({
  metadata,
  eyebrow,
  title,
  lead,
  summary,
  verifiedOn,
  downloadable = true,
  compact = false,
  children,
}: {
  metadata: MetadataItem[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  summary?: { label: string; value: ReactNode }[];
  verifiedOn?: string;
  downloadable?: boolean;
  compact?: boolean;
  children?: ReactNode;
}) => {
  const hasSummary = summary && summary.length > 0;
  const fullMetadata: MetadataItem[] = verifiedOn
    ? [...metadata, { label: "Verified", value: verifiedOn }]
    : metadata;
  const hasLeftContent = Boolean(eyebrow || title || lead || children);

  // Compact metadata-only strip — used after a BriefingHero chapter intro.
  if (compact && !hasLeftContent) {
    return (
      <header className="bg-background border-b border-[#E5E7EB]">
        <div className="container-wide py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="font-mono t-utility-xs uppercase tracking-[0.14em] text-muted-foreground">
                Reference
              </p>
              {downloadable && (
                <span className="hidden md:inline-block text-muted-foreground/40">·</span>
              )}
              {downloadable && <DownloadPdfLink />}
            </div>
            <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {fullMetadata.map((m, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <dt className="t-utility-xs uppercase tracking-[0.08em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="font-mono t-utility-xs text-foreground tabular-nums">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background border-b border-[#E5E7EB]">
      <div className={compact ? "container-wide py-8 md:py-10" : "container-wide py-14 md:py-20"}>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h1 className="title-page text-foreground max-w-3xl">{title}</h1>}
            {lead && (
              <p className="mt-3 max-w-[58ch] t-body-sm text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
          <aside className="md:col-span-4 space-y-4">
            {downloadable && (
              <div className="flex justify-end">
                <DownloadPdfLink />
              </div>
            )}
            {/* Reference Box — white service-card panel */}
            <div className="bg-surface border border-border rounded-[4px] p-4">
              <p className="font-mono t-utility-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Reference
              </p>
              <dl className="space-y-2">
                {fullMetadata.map((m, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3">
                    <dt className="t-utility-xs uppercase tracking-[0.08em] text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="font-mono t-utility-xs text-foreground tabular-nums text-right">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {hasSummary && (
              <div className="bg-surface border border-border rounded-[4px] p-4">
                <p className="font-mono t-utility-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Summary
                </p>
                <dl className="divide-y divide-border/60">
                  {summary!.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0">
                      <dt className="t-utility-xs text-muted-foreground">{s.label}</dt>
                      <dd className="t-utility-xs font-medium text-foreground tabular-nums text-right">{s.value}</dd>
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
