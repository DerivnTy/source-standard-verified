import { Link } from "react-router-dom";
import type { Vendor } from "@/data/vendors";
import { isSourceStandardVerified } from "@/lib/clinicSearch";
import {
  CTA_APPLY,
  RESULT_NOT_VERIFIED_APPLY,
  RESULT_NOT_VERIFIED_BODY,
  RESULT_NOT_VERIFIED_LABEL,
  RESULT_VERIFIED_DISCLAIMER,
  RESULT_VERIFIED_LABEL,
  RESULT_VERIFIED_LAPSE,
} from "@/data/publicLanguage";

const formatReviewDate = (iso?: string): string | undefined => {
  if (!iso) return undefined;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const uniqueList = (values: Array<string | undefined>): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const next = value?.trim();
    if (!next || seen.has(next)) continue;
    seen.add(next);
    out.push(next);
  }
  return out;
};

const scopeLine = (vendor: Vendor): string | undefined => {
  const parts = uniqueList([
    ...(vendor.verifiedCompounds ?? []),
    ...(vendor.verifiedCategories ?? []),
  ]);
  return parts.length > 0 ? parts.join(", ") : undefined;
};

const documentedSources = (vendor: Vendor): string | undefined => {
  const parts = uniqueList(vendor.verifiedManufacturers ?? []);
  return parts.length > 0 ? parts.join(", ") : undefined;
};

const ResultName = ({ name, to }: { name: string; to?: string }) => {
  const style = {
    fontSize: "17px",
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    margin: 0,
  } as const;

  if (to) {
    return (
      <h2 className="font-sans text-foreground" style={style}>
        <Link to={to} className="hover:text-primary transition-colors">
          {name}
        </Link>
      </h2>
    );
  }

  return (
    <h2 className="font-sans text-foreground" style={style}>
      {name}
    </h2>
  );
};

const StatusLabel = ({ children }: { children: string }) => (
  <p
    className="font-sans text-foreground"
    style={{
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: "-0.005em",
      margin: "10px 0 0",
    }}
  >
    {children}
  </p>
);

const Body = ({ children }: { children: string }) => (
  <p
    className="text-muted-foreground"
    style={{ fontSize: "14.5px", lineHeight: 1.65, margin: "10px 0 0" }}
  >
    {children}
  </p>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <p
    className="text-foreground"
    style={{ fontSize: "14.5px", lineHeight: 1.65, margin: "8px 0 0" }}
  >
    <span className="text-muted-foreground">{label}: </span>
    {value}
  </p>
);

const ApplyLink = () => (
  <Link
    to="/apply"
    className="inline-flex items-center font-sans font-semibold uppercase text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
    style={{ fontSize: "11px", letterSpacing: "0.08em" }}
  >
    {CTA_APPLY}
  </Link>
);

const NotVerifiedResult = ({ name, to }: { name: string; to?: string }) => (
  <article>
    <ResultName name={name} to={to} />
    <StatusLabel>{RESULT_NOT_VERIFIED_LABEL}</StatusLabel>
    <Body>{RESULT_NOT_VERIFIED_BODY}</Body>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "14.5px", lineHeight: 1.65, margin: "12px 0 0" }}
    >
      {RESULT_NOT_VERIFIED_APPLY}{" "}
      <ApplyLink />
    </p>
  </article>
);

const VerifiedResult = ({ vendor }: { vendor: Vendor }) => {
  const lastReview = formatReviewDate(vendor.reviewDate ?? vendor.scopeReviewDate);
  const scope = scopeLine(vendor);
  const sources = documentedSources(vendor);

  return (
    <article>
      <ResultName name={vendor.name} to={`/directory/${vendor.slug}`} />
      <StatusLabel>{RESULT_VERIFIED_LABEL}</StatusLabel>
      {lastReview && <Field label="Last review" value={lastReview} />}
      {scope && <Field label="Scope" value={scope} />}
      {sources && <Field label="Documented sources" value={sources} />}
      <Body>{RESULT_VERIFIED_LAPSE}</Body>
      <Body>{RESULT_VERIFIED_DISCLAIMER}</Body>
    </article>
  );
};

export const ClinicSearchResult = ({
  name,
  vendor,
}: {
  name: string;
  vendor?: Vendor;
}) => {
  if (vendor && isSourceStandardVerified(vendor.status)) {
    return <VerifiedResult vendor={vendor} />;
  }

  return (
    <NotVerifiedResult
      name={vendor?.name ?? name}
      to={vendor ? `/directory/${vendor.slug}` : undefined}
    />
  );
};

export default ClinicSearchResult;
