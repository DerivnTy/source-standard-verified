import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`} aria-label="Source Standard home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="26" height="26" rx="2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <path d="M8 14.5l4 4 8-9" stroke="hsl(var(--primary))" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      </svg>
      <span className="font-serif text-[1.05rem] font-medium tracking-tight text-foreground leading-none">
        Source Standard
      </span>
    </Link>
  );
};
