import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/verified-vendors", label: "Verified vendors" },
  { to: "/greenlist", label: "Greenlist" },
  { to: "/medical-advisory", label: "Advisory Board" },
  { to: "/education", label: "Resource Library" },
  { to: "/how-it-works", label: "Verification" },
  { to: "/about", label: "About" },
];

// Module-level subscription so DocJumpBar (and others) can mirror the header's
// hide-on-scroll-down / show-on-scroll-up behavior without prop drilling.
const visibilityListeners = new Set<(v: boolean) => void>();
let _headerVisible = true;
const setHeaderVisibleGlobal = (v: boolean) => {
  if (v === _headerVisible) return;
  _headerVisible = v;
  visibilityListeners.forEach((fn) => fn(v));
};

export const useHeaderVisible = () => {
  const [v, setV] = useState(_headerVisible);
  useEffect(() => {
    visibilityListeners.add(setV);
    setV(_headerVisible);
    return () => {
      visibilityListeners.delete(setV);
    };
  }, []);
  return v;
};

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let upwardAccum = 0;
    const REVEAL_THRESHOLD = 400;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y <= 0) {
          upwardAccum = 0;
          setVisible(true);
          setHeaderVisibleGlobal(true);
        } else if (delta > 0) {
          upwardAccum = 0;
          if (y > 120) {
            setVisible(false);
            setHeaderVisibleGlobal(false);
          }
        } else if (delta < 0) {
          upwardAccum += -delta;
          if (upwardAccum > REVEAL_THRESHOLD) {
            setVisible(true);
            setHeaderVisibleGlobal(true);
          }
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border/60 transition-transform duration-200 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Utility strip moved to GlobalUtilityBar (Tier 0) */}

      <div className="container-wide relative flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 h-full">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `relative inline-flex items-center h-10 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "text-foreground font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-14px] after:h-[1.5px] after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
            variant="outline"
            size="sm"
            className="h-9 px-4 font-mono text-[12px] uppercase tracking-[0.12em] rounded-[2px] border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/[0.03] hover:text-foreground hover:border-foreground"
          >
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
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] border-b border-border last:border-0 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-4 mb-2 h-11 border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/[0.03] hover:text-foreground hover:border-foreground rounded-[2px] font-mono text-[12px] uppercase tracking-[0.12em]"
            >
              <Link to="/apply" onClick={() => setOpen(false)}>
                Apply for Verification
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
