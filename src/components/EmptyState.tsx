import { Link } from "react-router-dom";

/**
 * EmptyState, institutional zero-result block for registries.
 */
export const EmptyState = ({
  eyebrow = "No Verified Entities Found",
  body = "Source Standard has not yet audited a facility matching these filters.",
  ctaLabel = "Suggest a Facility for Audit",
  ctaTo = "/report-a-concern",
}: {
  eyebrow?: string;
  body?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) => (
  <div className="border border-border bg-surface-muted px-6 py-10 text-center rounded-[4px]">
    <p className="t-utility-xs font-mono text-foreground mb-3">
      {eyebrow}
    </p>
    <p className="t-body-sm text-muted-foreground max-w-xl mx-auto">
      {body}
    </p>
    <Link
      to={ctaTo}
      className="mt-5 inline-block t-utility-xs font-mono text-primary hover:text-primary-hover"
    >
      {ctaLabel} →
    </Link>
  </div>
);
