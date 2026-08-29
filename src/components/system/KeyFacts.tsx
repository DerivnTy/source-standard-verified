import { ReactNode } from "react";

export type KeyFact = {
  label: string;
  /** Omit or pass null when Source Standard has not established the value. */
  value?: ReactNode;
  /** Optional one-line qualifier shown under the value. */
  note?: string;
};

export const NOT_ESTABLISHED = "Not independently established by Source Standard";

/**
 * KeyFacts, the institutional record grid.
 *
 * Labelled facts in a dense 2–3 column desktop grid that stacks to a
 * single labelled column on mobile. Missing values are rendered
 * explicitly as "Not independently established by Source Standard"
 * rather than hidden, so a record never looks like a stub and never
 * implies a fact Source Standard has not established.
 */
export const KeyFacts = ({
  facts,
  columns = 3,
  className = "",
}: {
  facts: KeyFact[];
  columns?: 2 | 3;
  className?: string;
}) => {
  if (!facts.length) return null;
  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <dl
      className={`grid grid-cols-1 ${colClass} gap-px bg-border border border-border rounded-[2px] overflow-hidden ${className}`}
    >
      {facts.map((fact) => {
        const empty = fact.value === undefined || fact.value === null || fact.value === "";
        return (
          <div key={fact.label} className="bg-background px-4 py-3">
            <dt className="t-utility-xs text-muted-foreground">{fact.label}</dt>
            <dd
              className={`mt-1.5 font-sans ${empty ? "text-muted-foreground" : "text-foreground"}`}
              style={{ fontSize: "15px", lineHeight: 1.5, margin: 0 }}
            >
              {empty ? NOT_ESTABLISHED : fact.value}
            </dd>
            {fact.note && (
              <p className="mt-1 text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                {fact.note}
              </p>
            )}
          </div>
        );
      })}
    </dl>
  );
};
