import { Link } from "react-router-dom";
import lockupDark from "@/assets/source-standard-lockup-dark.png";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  /** Render as a non-link inline lockup (for use inside other links/headers). */
  asLink?: boolean;
}

/**
 * Logo — horizontal "S Shield + Source Standard" lockup.
 *
 * Uses a single navy source asset and inverts it for use on dark surfaces:
 *   • variant="dark"   → natural navy lockup (for white/light backgrounds).
 *   • variant="light"  → inverted to white (for navy/dark backgrounds).
 *
 * Sized to 24px height so it fits cleanly inside the header without crowding.
 */
export const Logo = ({ className = "", variant = "dark", asLink = true }: LogoProps) => {
  const isLight = variant === "light";

  const img = (
    <img
      src={lockupDark}
      alt="Source Standard"
      draggable={false}
      style={{
        height: "24px",
        width: "auto",
        display: "block",
        // Invert navy → white on dark surfaces while preserving crisp edges.
        filter: isLight ? "invert(1) brightness(2)" : "none",
      }}
    />
  );

  if (!asLink) {
    return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="Source Standard, home"
    >
      {img}
    </Link>
  );
};
