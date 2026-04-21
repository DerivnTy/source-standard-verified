import { ReactNode } from "react";
import { MetadataBar, MetadataItem } from "./MetadataBar";

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
  return (
    <header className="bg-background border-b border-border/60">
      <MetadataBar items={metadata} className="border-t-0" />
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-[1.75rem] md:text-[2.125rem] font-semibold tracking-[-0.015em] text-foreground leading-[1.15] max-w-3xl">
              {title}
            </h1>
            {lead && (
              <p className="mt-5 max-w-2xl text-[16px] text-muted-foreground leading-relaxed">
                {lead}
              </p>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>
          {summary && summary.length > 0 && (
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/80 mb-3">
                Summary
              </p>
              <dl className="border-t border-border/60 divide-y divide-border/60">
                {summary.map((s, i) => (
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
