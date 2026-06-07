import { Link } from "react-router-dom";
import lockup from "@/assets/source-standard-lockup-dark.png";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  /** Render as a non-link inline lockup (for use inside other links/headers). */
  asLink?: boolean;
}

/**
 * Logo — horizontal "S Shield + Source Standard" lockup.
 *
 *   • variant="dark"   → natural navy lockup (for white/light backgrounds).
 *   • variant="light"  → inverted to white (for navy/dark backgrounds).
 *
 * Source asset is a transparent-background PNG of the navy lockup. We use
 * `brightness(0) invert(1)` to flip it to pure white on dark surfaces, and
 * leave it untouched on light surfaces. Height is fixed so the lockup reads
 * cleanly inside the header without crowding.
 */
export const Logo = ({ className = "", variant = "dark", asLink = true }: LogoProps) => {
  const isLight = variant === "light";

  const img = (
    <img
      src={lockup}
      alt="Source Standard"
      draggable={false}
      className="block h-[24px] w-auto select-none translate-y-[2px]"
      style={{
        filter: isLight ? "brightness(0) invert(1)" : "none",
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
