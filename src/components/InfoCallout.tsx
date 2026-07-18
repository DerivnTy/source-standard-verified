import { ReactNode } from "react";

/**
 * InfoCallout — compact editorial notice.
 *
 * Left hairline accent bar + soft blue-gray fill. Small mono uppercase
 * eyebrow carries semantics; body is quiet body copy. Consistent with
 * the sitewide `Callout` component but scoped for inline notices.
 */
export const InfoCallout = ({
  eyebrow = "Important",
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-lg bg-[hsl(var(--under-review-soft))] ${className}`}
  >
    <span
      aria-hidden
      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[hsl(var(--under-review))]"
    />
    <div className="pl-5 pr-5 py-4 md:pl-6 md:pr-6 md:py-5">
      <p
        className="font-mono uppercase text-[hsl(var(--under-review))]"
        style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          fontWeight: 600,
          margin: 0,
          marginBottom: "8px",
        }}
      >
        {eyebrow}
      </p>
      <div
        className="text-muted-foreground"
        style={{ fontSize: "14px", lineHeight: 1.65 }}
      >
        {children}
      </div>
    </div>
  </div>
);

export default InfoCallout;
