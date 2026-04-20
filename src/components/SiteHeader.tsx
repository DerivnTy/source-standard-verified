import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How Verification Works" },
  { to: "/directory", label: "Vendor Directory" },
  { to: "/apply", label: "Apply for Verification" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="container-tight flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link to="/directory">Check a Vendor</Link>
          </Button>
          <Button asChild size="sm" className="text-sm rounded-sm">
            <Link to="/apply">Apply</Link>
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
          <div className="container-tight py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 text-sm border-b border-border last:border-0 ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button asChild size="sm" className="mt-3 rounded-sm">
              <Link to="/apply" onClick={() => setOpen(false)}>Apply for Verification</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
