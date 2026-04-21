import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/verified-vendors", label: "Verified vendors" },
  { to: "/greenlist", label: "Greenlist" },
  { to: "/medical-advisory", label: "Medical advisory" },
  { to: "/education", label: "Education" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      {/* Utility strip — quiet institutional band */}
      <div className="hidden md:block bg-surface-sunken border-b border-border/60">
        <div className="container-wide flex items-center justify-between py-1.5">
          <span className="text-[12px] text-muted-foreground tracking-[0.005em]">
            Public reference · Standard SS-FRAMEWORK-2026.01 · Active
          </span>
          <span className="text-[12px] text-muted-foreground tracking-[0.005em]">
            Maintained in Tampa, FL · Reviewed under Medical Advisory Board
          </span>
        </div>
      </div>

      <div className="container-wide flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              
              className={({ isActive }) =>
                `text-[13.5px] tracking-[0] transition-colors ${
                  isActive
                    ? "text-foreground font-semibold underline underline-offset-[6px] decoration-1"
                    : "text-muted-foreground font-medium hover:text-foreground"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center">
          <Button
            asChild
            size="sm"
            className="text-[13px] h-10 px-5 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-[2px]"
          >
            <Link to="/apply">Apply for verification</Link>
          </Button>
        </div>
        <button
          className="lg:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-wide py-3 flex flex-col">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3.5 text-[15px] border-b border-border last:border-0 ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground font-medium"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-4 mb-2 h-11 bg-primary hover:bg-primary-hover text-primary-foreground rounded-[2px] font-medium"
            >
              <Link to="/apply" onClick={() => setOpen(false)}>
                Apply for verification
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
