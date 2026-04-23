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

// Primary mobile nav — larger, consumer-facing labels
const mobileNav = [
  { to: "/", label: "Home" },
  { to: "/greenlist", label: "Greenlist" },
  { to: "/verified-vendors", label: "Verified Vendors" },
  { to: "/how-it-works", label: "Protocol" },
  { to: "/about", label: "Contact" },
];

const APP_VERSION = "v1.0.4";

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
          className="lg:hidden p-2 -mr-2 text-foreground relative h-9 w-9"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {/* Morphing hamburger ↔ X */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-current transition-all duration-300 ease-out"
            style={{
              transform: open
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, -7px)",
            }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-current transition-opacity duration-200 ease-out"
            style={{
              transform: "translate(-50%, -50%)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-current transition-all duration-300 ease-out"
            style={{
              transform: open
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, 5px)",
            }}
          />
        </button>
      </div>

      {/* In-place vertical unfold */}
      <div
        className="lg:hidden grid overflow-hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 350ms ease-out",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="border-t border-[hsl(var(--navy-surface))]/20"
            style={{
              backgroundColor: "hsl(var(--navy-surface) / 0.96)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="container-wide flex flex-col">
              {mobileNav.map((n, idx) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between font-serif text-[18px] tracking-tight transition-colors ${
                      isActive
                        ? "text-[hsl(var(--background))] font-semibold"
                        : "text-[hsl(var(--background))]/85 hover:text-[hsl(var(--background))]"
                    }`
                  }
                  style={{
                    paddingTop: "24px",
                    paddingBottom: "24px",
                    borderBottom:
                      idx === mobileNav.length - 1
                        ? "none"
                        : "1px solid hsl(var(--background) / 0.12)",
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{n.label}</span>
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        width="14"
                        height="14"
                        style={{
                          opacity: isActive ? 0.9 : 0.5,
                          color: "hsl(var(--background))",
                        }}
                      >
                        <path
                          d="M5 3l5 5-5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </NavLink>
              ))}

              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-5 mb-4 h-11 border border-[hsl(var(--background))]/40 bg-transparent text-[hsl(var(--background))] hover:bg-[hsl(var(--background))]/10 hover:text-[hsl(var(--background))] hover:border-[hsl(var(--background))] rounded-[2px] font-mono text-[12px] uppercase tracking-[0.12em]"
              >
                <Link to="/apply" onClick={() => setOpen(false)}>
                  Apply for Verification
                </Link>
              </Button>

              {/* System status footer */}
              <div
                className="flex items-center justify-center gap-2 pb-5 pt-2 font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "hsl(var(--background) / 0.55)" }}
              >
                <span
                  aria-hidden
                  className="inline-block animate-pulse"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "9999px",
                    backgroundColor: "hsl(142 65% 55%)",
                  }}
                />
                <span>System Operational</span>
                <span style={{ color: "hsl(var(--background) / 0.3)" }}>·</span>
                <span>{APP_VERSION}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
