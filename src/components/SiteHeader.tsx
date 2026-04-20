import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/greenlist", label: "Greenlist" },
  { to: "/verified-vendors", label: "Verified Vendors" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/for-vendors", label: "For Vendors" },
  { to: "/education", label: "Education" },
  { to: "/about", label: "About" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container-wide flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `text-[13px] transition-colors ${isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center">
          <Button asChild size="sm" className="text-[13px] h-9 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium">
            <Link to="/apply">Apply for Verification</Link>
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
                end={n.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm border-b border-border last:border-0 ${isActive ? "text-foreground font-semibold" : "text-muted-foreground"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button asChild size="sm" className="mt-4 mb-2 bg-primary hover:bg-primary-hover text-primary-foreground">
              <Link to="/apply" onClick={() => setOpen(false)}>Apply for Verification</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
