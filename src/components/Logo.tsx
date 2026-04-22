import { Link } from "react-router-dom";
import logoDark from "@/assets/source-standard-logo.png";
import logoLight from "@/assets/source-standard-logo-light.png";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

/**
 * Logo — sitewide brand mark.
 *
 * Loading discipline:
 *   - `loading="eager"` and `decoding="sync"` keep the mark on-screen
 *     immediately, never deferred behind the lazy-load cursor.
 *   - `fetchpriority="high"` tells the browser to fetch ahead of
 *     decorative imagery.
 *   - Explicit `width` / `height` reserve box dimensions so the
 *     header / footer never reflow once the image lands.
 *   - The PNG intrinsic ratio is ~3.5:1; we render at h-8 (32px) /
 *     md:h-9 (36px) so 128×36 hints the layout at full fidelity
 *     without forcing the browser to over-decode.
 */
export const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <Link
      to="/"
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="Source Standard · Clinical Transparency Framework, home"
    >
      <img
        src={src}
        alt="Source Standard"
        width={128}
        height={36}
        className="h-8 md:h-9 w-auto"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
      />
    </Link>
  );
};
