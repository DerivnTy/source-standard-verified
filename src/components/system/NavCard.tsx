import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * NavCard — compact navigation destination.
 *
 * Reserved for actual navigation. Reads as interactive: hairline border,
 * chevron nudges on hover, background shifts. Never used for informational
 * content — informational content uses FeatureItem instead.
 */
export const NavCard = ({
  to,
  title,
  desc,
  className = "",
}: {
  to: string;
  title: string;
  desc: string;
  className?: string;
}) => (
  <Link
    to={to}
    className={`group flex items-center gap-3 bg-card hover:bg-muted ${className}`}
    style={{
      border: "1px solid hsl(var(--border))",
      borderRadius: "2px",
      padding: "14px 16px",
    }}
  >
    <div className="min-w-0 flex-1">
      <h3
        className="font-sans text-foreground"
        style={{
          fontSize: "15px",
          lineHeight: 1.3,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        className="text-muted-foreground"
        style={{
          fontSize: "13px",
          lineHeight: 1.5,
          fontWeight: 400,
          marginTop: "4px",
        }}
      >
        {desc}
      </p>
    </div>
    <ArrowRight
      aria-hidden
      strokeWidth={1.25}
      className="text-muted-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-foreground"
      style={{ width: 16, height: 16 }}
    />
  </Link>
);

export default NavCard;
