import { ReactNode } from "react";

export type EvidenceItem = {
  claim: ReactNode;
  /** Where the claim comes from, e.g. "FDA Drug Establishment Registration". */
  source?: string;
  /** Date the source material carries, or when Source Standard reviewed it. */
  date?: string;
  href?: string;
};

/**
 * EvidencePanel, a sourced-claims block.
 *
 * Each row states a claim and the record it rests on. Rows without a
 * source are labelled as unsourced rather than presented as established,
 * so the panel can never imply evidence that does not exist.
 */
export const EvidencePanel = ({
  title,
  items,
  emptyLabel = "No supporting documentation has been reviewed by Source Standard for this record.",
  className = "",
}: {
  title?: string;
  items: EvidenceItem[];
  emptyLabel?: string;
  className?: string;
}) => (
  <div className={`border border-border rounded-[2px] bg-surface-muted/40 ${className}`}>
    {title && (
      <div className="px-4 py-2.5 border-b border-border">
        <span className="t-utility-xs text-foreground">{title}</span>
      </div>
    )}
    {items.length === 0 ? (
      <p className="px-4 py-3.5 text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
        {emptyLabel}
      </p>
    ) : (
      <ul className="divide-y divide-border">
        {items.map((item, i) => (
          <li key={i} className="px-4 py-3">
            <p className="text-foreground" style={{ fontSize: "15px", lineHeight: 1.55, margin: 0 }}>
              {item.claim}
            </p>
            <p
              className="mt-1.5 font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.08em", margin: "6px 0 0" }}
            >
              {item.source ? (
                item.href ? (
                  <a href={item.href} className="underline underline-offset-2 hover:text-foreground" rel="noopener">
                    {item.source}
                  </a>
                ) : (
                  item.source
                )
              ) : (
                "Source not established"
              )}
              {item.date ? ` · ${item.date}` : ""}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
