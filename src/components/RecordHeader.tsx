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
      <div className="container-wide py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-[1.625rem] md:text-[2rem] font-semibold tracking-tight text-foreground leading-[1.15] max-w-3xl">
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
              <div className="border border-border/70 rounded-[2px] bg-surface-muted/60">
                <div className="px-4 py-3 border-b border-border/70">
                  <p className="text-[12.5px] font-semibold text-foreground">Summary</p>
                </div>
                <dl className="divide-y divide-border/70">
                  {summary.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between px-4 py-3">
                      <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
                      <dd className="text-[13px] font-medium text-foreground tabular-nums text-right ml-3">{s.value}</dd>
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
