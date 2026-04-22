import { ShieldCheck } from "lucide-react";

/**
 * VerificationShield — premium product treatment for verified vendors.
 * Dense, restrained, mono-tagged. Used in result rows and on profile pages.
 *
 * Hovering reveals a brief explanation of what verification means.
 */
export const VerificationShield = ({
  reviewId,
  reviewDate,
  size = "sm",
}: {
  reviewId?: string;
  reviewDate?: string;
  size?: "sm" | "md";
}) => {
  const iconSize = size === "md" ? "h-3.5 w-3.5" : "h-3 w-3";
  const textSize = size === "md" ? "text-[11px]" : "text-[10px]";
  const tooltip =
    `Verified sourcing.\nThis vendor has provided documentation supporting the reviewed sourcing scope` +
    (reviewDate ? ` as of ${reviewDate}.` : ".") +
    (reviewId ? `\nReview ID ${reviewId}.` : "");

  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1.5 px-2 py-[3px] rounded-[2px] border border-verified/40 bg-verified/10 text-verified font-mono font-semibold uppercase tracking-[0.14em] tabular-nums ${textSize}`}
    >
      <ShieldCheck className={`${iconSize} shrink-0`} aria-hidden />
      Verified
    </span>
  );
};
