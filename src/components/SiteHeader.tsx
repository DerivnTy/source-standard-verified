import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/verified-vendors", label: "Verified vendors" },
  { to: "/greenlist", label: "Greenlist" },
  { to: "/medical-advisory", label: "Advisory Board" },
  { to: "/education", label: "Education" },
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
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y <= 0) {
          setVisible(true);
          setHeaderVisibleGlobal(true);
        } else if (y > 120 && delta > 0) {
          setVisible(false);
          setHeaderVisibleGlobal(false);
        } else if (delta < -8) {
          setVisible(true);
          setHeaderVisibleGlobal(true);
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
      className={`sticky top-0 z-40 bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40 transition-transform duration-200 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Utility strip — suppressed on home (hero owns the top band) */}
      {!isHome && (
        <div className="hidden md:block bg-background border-b border-border/40">
          <div className="container-wide flex items-center justify-between py-1.5">
            <span className="text-[11px] text-muted-foreground/75 tracking-[0.005em]">
              Public reference · Standard SS-FRAMEWORK-2026.01 · Active
            </span>
            <span className="text-[11px] text-muted-foreground/75 tracking-[0.005em]">
              United States · Reviewed under Medical Advisory Board
            </span>
          </div>
        </div>
      )}

      <div className="container-wide relative flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-9 h-full">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `relative inline-flex items-center h-10 text-[13px] font-medium tracking-[0.005em] transition-colors ${
                  isActive
                    ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-14px] after:h-[2px] after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center">
          <Button asChild size="sm" className="text-[13px] h-10 px-5 font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg">
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
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3.5 text-[14.5px] border-b border-border last:border-0 ${
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
              className="mt-4 mb-2 h-11 bg-primary hover:bg-primary-hover text-primary-foreground rounded-md font-medium"
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
