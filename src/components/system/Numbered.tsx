import { ElementType, ReactNode } from "react";

/**
 * NumberedCard — sitewide standard card:
 *   ┌──────────────────────────────────────────┐
 *   │ Title                          01 / 03   │
 *   │ Body copy…                               │
 *   └──────────────────────────────────────────┘
 *
 * Number sits top-right, never in its own left column. Use everywhere
 * the homepage DataStrip pattern is wanted (framework, registry, advisory,
 * about, terms, etc).
 */
export const NumberedCard = ({
  title,
  number,
  total,
  children,
  as: Tag = "div",
  className = "",
  href,
}: {
  title: ReactNode;
  /** 1-indexed position. Pass null to omit numeric label. */
  number?: number | string | null;
  /** Total count. When provided with a numeric `number`, renders "01 / 04". */
  total?: number;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  href?: string;
}) => {
  const label =
    number == null
      ? null
      : typeof number === "number"
      ? total
        ? `${String(number).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
        : String(number).padStart(2, "0")
      : number;

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "18px",
    padding: "24px",
  } as const;

  const content = (
    <>
      <div className="flex items-start justify-between" style={{ gap: "16px" }}>
        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        {label && (
          <span
            className="font-mono tabular-nums shrink-0"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "rgba(0,0,0,0.40)",
              whiteSpace: "nowrap",
              marginTop: "4px",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {children !== undefined && children !== null && (
        <div
          className="text-muted-foreground"
          style={{
            marginTop: "12px",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.75,
            color: "rgba(0,0,0,0.62)",
          }}
        >
          {children}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`block transition-colors hover:bg-muted/40 ${className}`} style={cardStyle}>
        {content}
      </a>
    );
  }
  return (
    <Tag className={className} style={cardStyle}>
      {content}
    </Tag>
  );
};

/**
 * NumberedSectionHeader — inline section-number + section-title on the same baseline.
 *
 *   01  Institutional Mandate
 *
 * Number sits to the LEFT of the title, on the same line, never standalone.
 * Optional intro paragraph below.
 */
export const NumberedSectionHeader = ({
  number,
  title,
  intro,
  id,
  as: Tag = "h2",
  className = "",
}: {
  number: string | number;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h2" | "h3";
  className?: string;
}) => {
  const label =
    typeof number === "number" ? String(number).padStart(2, "0") : number;
  return (
    <div className={className}>
      <div className="flex items-baseline" style={{ gap: "12px" }}>
        <span
          className="font-mono tabular-nums shrink-0"
          style={{
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "rgba(0,0,0,0.40)",
          }}
        >
          {label}
        </span>
        <Tag
          id={id}
          className="font-sans text-foreground"
          style={{
            fontSize: "26px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#0A0A0A",
          }}
        >
          {title}
        </Tag>
      </div>
      {intro && (
        <p
          className="text-muted-foreground"
          style={{
            marginTop: "12px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "68ch",
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
};
