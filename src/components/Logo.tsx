import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  /** Render as a non-link inline lockup (for use inside other links/headers). */
  asLink?: boolean;
}

/**
 * Logo — unified horizontal lockup.
 *
 * [S Shield] Source Standard — single row, vertically centered.
 * Adaptive: `variant="dark"` for white surfaces, `variant="light"` for navy.
 * Surgically slim — 22px shield, 15px wordmark, -0.01em tracking.
 */
export const Logo = ({ className = "", variant = "dark", asLink = true }: LogoProps) => {
  const isLight = variant === "light";
  const fg = isLight ? "#FFFFFF" : "hsl(var(--foreground))";
  const shieldBg = isLight ? "#FFFFFF" : "hsl(var(--foreground))";
  const shieldFg = isLight ? "hsl(var(--foreground))" : "#FFFFFF";

  const lockup = (
    <span className="inline-flex items-center" style={{ gap: "8px" }}>
      <span
        aria-hidden
        className="inline-flex items-center justify-center font-sans font-semibold"
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "5px",
          backgroundColor: shieldBg,
          color: shieldFg,
          fontSize: "13px",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        S
      </span>
      <span
        className="font-sans font-semibold"
        style={{
          color: fg,
          fontSize: "15px",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        Source Standard
      </span>
    </span>
  );

  if (!asLink) {
    return <span className={`inline-flex items-center ${className}`}>{lockup}</span>;
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="Source Standard, home"
    >
      {lockup}
    </Link>
  );
};
