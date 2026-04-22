import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity ${className}`}
      aria-label="Source Standard — Clinical Transparency Framework, home"
    >
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden="true" role="img">
        <rect x="1" y="1" width="20" height="20" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <path d="M6 11.5l3.2 3.2L16 7.5" stroke="hsl(var(--primary))" strokeWidth="1.75" strokeLinecap="square" fill="none" />
      </svg>
      <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-foreground leading-none">
        Source Standard
      </span>
    </Link>
  );
};
