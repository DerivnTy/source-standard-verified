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
  <div className="border-t border-border py-10">
    <p className="t-utility-xs text-foreground mb-3">
      {eyebrow}
    </p>
    <p className="t-body-sm max-w-[46ch] text-muted-foreground">
      {body}
    </p>
    <Link
      to={ctaTo}
      className="mt-5 inline-block text-[13px] font-medium text-foreground underline-offset-4 hover:underline"
    >
      {ctaLabel} →
    </Link>
  </div>
);
