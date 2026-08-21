import { Link } from "react-router-dom";

/**
 * EmptyState, institutional zero-result block for registries.
 */
export const EmptyState = ({
  eyebrow = "No matching records",
  body = "No facility in this list matches the current filters.",
  ctaLabel = "Report a concern",
  ctaTo = "/report-concern",
}: {
  eyebrow?: string;
  body?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) => (
  <div className="border-t border-border py-6">
    <p className="t-utility-xs font-mono text-foreground mb-3">
      {eyebrow}
    </p>
    <p className="t-body-sm max-w-[62ch] text-muted-foreground">
      {body}
    </p>
    <Link
      to={ctaTo}
      className="mt-3 inline-block text-[13px] font-medium text-foreground underline-offset-2 hover:underline"
    >
      {ctaLabel} →
    </Link>
  </div>
);
