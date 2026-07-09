import { ReactNode } from "react";
import { MetadataItem } from "./MetadataBar";
import { DownloadPdfLink } from "./DownloadPdfLink";
import { HeroPattern } from "./HeroPattern";

/**
 * RecordHeader, Tier 2, used on regulatory / policy documents.
 *
 * Navy split-header:
 *  - Left: uppercase mono eyebrow + white title + muted-white lead + optional children
 *  - Right: dark-tinted "Reference" service-card housing doc metadata,
 *          with optional Summary list stacked below.
 *
 * `verifiedOn` renders a dedicated VERIFIED row inside the Reference box.
 * `downloadable` defaults to false, opt in only when a real PDF is attached.
 */
export const RecordHeader = ({
  metadata,
  eyebrow,
  title,
  lead,
  summary,
  verifiedOn,
  downloadable = false,
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

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "10px",
    padding: "16px",
  } as const;

  if (compact && !hasLeftContent) {
    return (
      <header className="relative overflow-hidden bg-[hsl(var(--navy-surface))] border-b border-white/10">
        <HeroPattern opacity={0.02} stroke="white" cellSize={32} />
        <div className="relative z-10 page-shell py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <p
                className="font-mono uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}
              >
                Reference
              </p>
              {downloadable && (
                <span className="hidden md:inline-block" style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
              )}
              {downloadable && <DownloadPdfLink />}
            </div>
            <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {fullMetadata.map((m, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <dt
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}
                  >
                    {m.label}
                  </dt>
                  <dd
                    className="font-mono text-white tabular-nums"
                    style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                  >
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
    <header className="relative overflow-hidden bg-[hsl(var(--navy-surface))] border-b border-white/10">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 40%, hsl(var(--navy-surface-2)) 0%, transparent 70%)",
        }}
      />
      <HeroPattern opacity={0.02} stroke="white" cellSize={32} />
      <div
        className={
          compact
            ? "relative z-10 page-shell py-6 md:py-8"
            : "relative z-10 page-shell"
        }
        style={
          compact
            ? undefined
            : { paddingTop: "clamp(44px, 6.5vh, 68px)", paddingBottom: "clamp(28px, 4vh, 40px)" }
        }
      >
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {eyebrow && (
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {eyebrow.toUpperCase()}
              </p>
            )}
            {title && (
              <h1
                className="ss-hero-title !text-white max-w-3xl !mt-0"
                style={{ marginTop: eyebrow ? "20px" : "0", textWrap: "balance" }}
              >
                {title}
              </h1>
            )}
            {lead && (
              <p
                className="ss-lead !text-white/70 max-w-[68ch]"
                style={{ marginTop: "14px", textWrap: "balance" }}
              >
                {lead}
              </p>
            )}
            {children && <div className="mt-4">{children}</div>}
          </div>
          <aside className="md:col-span-4 space-y-4">
            {downloadable && (
              <div className="flex justify-end">
                <DownloadPdfLink />
              </div>
            )}
            <div style={cardStyle}>
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "12px",
                }}
              >
                Reference
              </p>
              <dl className="space-y-2">
                {fullMetadata.map((m, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3">
                    <dt
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {m.label}
                    </dt>
                    <dd
                      className="font-mono text-white tabular-nums text-right"
                      style={{ fontSize: "11px" }}
                    >
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {hasSummary && (
              <div style={cardStyle}>
                <p
                  className="font-mono uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "12px",
                  }}
                >
                  Summary
                </p>
                <dl style={{ borderTop: "0" }}>
                  {summary!.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-baseline justify-between gap-3"
                      style={{
                        paddingTop: i === 0 ? 0 : "8px",
                        paddingBottom: i === summary!.length - 1 ? 0 : "8px",
                        borderTop: i === 0 ? "0" : "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <dt style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                        {s.label}
                      </dt>
                      <dd
                        className="text-white tabular-nums text-right"
                        style={{ fontSize: "11px", fontWeight: 500 }}
                      >
                        {s.value}
                      </dd>
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
