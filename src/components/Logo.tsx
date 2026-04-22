import { Link } from "react-router-dom";
import logoDark from "@/assets/source-standard-logo.png";
import logoLight from "@/assets/source-standard-logo-light.png";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <Link
      to="/"
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="Source Standard — Clinical Transparency Framework, home"
    >
      <img
        src={src}
        alt="Source Standard"
        className="h-7 md:h-8 w-auto"
        loading="eager"
        decoding="sync"
      />
    </Link>
  );
};
