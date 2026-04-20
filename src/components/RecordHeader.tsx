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
    <header className="bg-background border-b border-border">
      <MetadataBar items={metadata} className="border-t-0" />
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-[1.75rem] md:text-[2.25rem] font-semibold tracking-tight text-foreground leading-[1.15] max-w-3xl">
              {title}
            </h1>
            {lead && (
              <p className="mt-5 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                {lead}
              </p>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>
          {summary && summary.length > 0 && (
            <div className="md:col-span-4">
              <div className="border border-border bg-surface-muted">
                <div className="px-4 py-2.5 border-b border-border">
                  <p className="meta-label text-foreground">Summary</p>
                </div>
                <dl className="divide-y divide-border">
                  {summary.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between px-4 py-2.5">
                      <dt className="text-[12px] text-muted-foreground">{s.label}</dt>
                      <dd className="text-[12px] font-medium text-foreground tabular-nums">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
