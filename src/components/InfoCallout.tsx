import { ReactNode } from "react";
import { Info } from "lucide-react";

/**
 * InfoCallout — a soft informational notice used within institutional pages.
 *
 * Designed to read as a credibility signal, not an editable form field.
 * Uses the site's semantic blue-gray soft surface, generous padding, and
 * the standard 1.25rem radius.
 */
export const InfoCallout = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`relative rounded-xl bg-[hsl(var(--under-review-soft))] p-5 md:p-6 ${className}`}
  >
    <div className="flex gap-3.5">
      <span
        className="shrink-0 inline-flex items-center justify-center text-[hsl(var(--under-review))]"
        aria-hidden
      >
        <Info size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1 text-[15px] leading-[1.75] text-foreground/80">
        {children}
      </div>
    </div>
  </div>
);

export default InfoCallout;
