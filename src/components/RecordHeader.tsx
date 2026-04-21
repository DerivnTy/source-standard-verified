import { ReactNode } from "react";
import { MetadataBar, MetadataItem } from "./MetadataBar";

/**
 * RecordHeader — Tier 2, used ONLY on regulatory / policy documents
 * (Governance, Accountability, Terms, Privacy, Verification Disclaimer,
 * Status Definitions, How It Works, How to Read the Directory, For Vendors,
 * Medical Advisory, About, FAQ, Report a Concern doc portion).
 *
 * Refined to a calmer document tone: medium-weight headline, smaller scale,
 * optional summary rail (omit on docs where it would just restate metadata).
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
      <MetadataBar items={metadata} className="border-t-0" />
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className={hasSummary ? "md:col-span-8" : "md:col-span-12"}>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-[1.5rem] md:text-[1.875rem] font-medium tracking-[-0.012em] text-foreground leading-[1.2] max-w-3xl">
              {title}
            </h1>
            {lead && (
              <p className="mt-5 max-w-[64ch] text-[16px] text-muted-foreground leading-[1.65]">
                {lead}
              </p>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>
          {hasSummary && (
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/80 mb-3">
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
    </header>
  );
};
