import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  getGreenlistEntry,
  GreenlistProfile as GLProfile,
} from "@/data/greenlist";

/**
 * GreenlistProfile — Surgical Audit Record.
 * One-screen, high-density public record card. No marketing copy,
 * no "About", no big CTAs. Single 600px-wide document on white.
 */

const formatAsOf = (iso?: string): string | undefined => {
  if (!iso) return undefined;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const Cell = ({
  label,
  value,
  mono,
  href,
}: {
  label: string;
  value?: ReactNode;
  mono?: boolean;
  href?: string;
}) => {
  const present = value !== undefined && value !== null && value !== "";
  return (
    <div>
      <dt
        className="font-sans font-semibold uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono tabular-nums" : "font-sans font-medium"} ${
          present ? "text-foreground" : "text-muted-foreground"
        }`}
        style={{ fontSize: "12px", lineHeight: "1.5" }}
      >
        {present ? (
          href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
            >
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
};

const GreenlistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getGreenlistEntry(slug);

  if (!entry) {
    return (
      <section className="container-narrow py-24 text-center">
        <p className="eyebrow mb-3">Not Found</p>
        <h1 className="title-page mb-4">No facility profile found.</h1>
        <Link
          to="/greenlist"
          className="t-utility-xs font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const isAlert = !!entry.regulatoryAlert;

  const license =
    p.fdaRegistration ?? (p.feiNumber ? `FEI ${p.feiNumber}` : undefined);
  const verificationDate =
    formatAsOf(p.lastInspectionDate) ?? formatAsOf(p.mostRecentRegistrationYear);
  const sourceType = entry.category;
  const locationLabel = entry.location;

  return (
    <>
      <PageMeta
        title={`${entry.name} · Public Record`}
        description={`Source Standard public registry record for ${entry.name}.`}
      />

      <section className="bg-background">
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "600px", paddingTop: "32px", paddingBottom: "48px" }}
        >
          {/* Back link — outside the record card */}
          <Link
            to="/greenlist"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Directory
          </Link>

          {/* Authority record card */}
          <article
            className="mt-4 bg-card"
            style={{
              border: "0.5px solid hsl(var(--border))",
              borderRadius: "10px",
              padding: "24px",
            }}
          >
            {/* Header: name + status */}
            <header className="flex items-start justify-between gap-4">
              <h1
                className="min-w-0 font-sans font-semibold text-foreground"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.3",
                  letterSpacing: "-0.01em",
                }}
              >
                {entry.name}
              </h1>
              <span
                className="shrink-0 font-sans font-bold uppercase tabular-nums"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: isAlert ? "#FF3B30" : "#34C759",
                }}
              >
                {isAlert ? "Alert" : "Authorized"}
              </span>
            </header>

            {/* Metadata row: specialty pill + registration ID */}
            <div className="mt-3 flex items-center gap-x-2 flex-wrap">
              <span
                className="inline-flex items-center font-sans font-semibold uppercase bg-primary text-primary-foreground"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.06em",
                  padding: "3px 6px",
                  borderRadius: "3px",
                }}
              >
                {entry.type}
              </span>
              {license && (
                <span
                  className="font-mono text-muted-foreground"
                  style={{ fontSize: "11px" }}
                >
                  {license}
                </span>
              )}
            </div>

            {/* Hairline separator */}
            <div
              aria-hidden
              className="mt-5 mb-5"
              style={{ borderTop: "0.5px solid hsl(var(--border))" }}
            />

            {/* Public Record — 2-column grid */}
            <dl
              className="grid grid-cols-2"
              style={{ columnGap: "20px", rowGap: "16px" }}
            >
              <Cell label="Category" value={entry.type} />
              <Cell label="Source Type" value={sourceType} />
              <Cell label="Location" value={locationLabel} />
              <Cell label="License / ID" value={license} mono />
              <Cell
                label="Verification Date"
                value={verificationDate}
                mono
              />
              <Cell
                label="Website"
                value={entry.website ? hostname(entry.website) : undefined}
                href={entry.website}
              />
            </dl>
          </article>
        </div>
      </section>
    </>
  );
};

export default GreenlistProfile;
