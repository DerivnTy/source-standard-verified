import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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

  // Lock body scroll when full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
                `relative inline-flex items-center h-10 t-nav transition-colors ${
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
            className="h-9 px-4 rounded-[2px] border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/[0.03] hover:text-foreground hover:border-foreground"
          >
            <Link to="/apply">Apply for Verification</Link>
          </Button>
        </div>
        <button
          className="lg:hidden p-2 -mr-2 relative h-9 w-9 transition-colors"
          style={{
            zIndex: open ? 70 : undefined,
            color: open ? "hsl(var(--background))" : "hsl(var(--foreground))",
          }}
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

      {/* Full-screen immersive mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[60]"
        aria-hidden={!open}
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(1.015)",
          transition:
            "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          backgroundColor: "hsl(var(--navy-surface) / 0.92)",
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
        }}
      >
        <div className="flex h-full w-full flex-col">
          {/* Top bar — logo left, close right (matches header height) */}
          <div className="container-wide flex h-16 shrink-0 items-center justify-between">
            <span
              className="t-body-md font-semibold"
              style={{ color: "hsl(var(--background))" }}
            >
              Source Standard
            </span>
            {/* Close button (X) — re-uses morphing icon via main header button */}
            <span aria-hidden style={{ width: "36px", height: "36px" }} />
          </div>

          {/* Nav list */}
          <nav className="container-wide flex-1 overflow-hidden">
            <ul className="flex flex-col">
              {mobileNav.map((n, idx) => (
                <li
                  key={n.to}
                  style={{
                    borderTop:
                      idx === 0
                        ? "0.5px solid hsl(var(--background) / 0.14)"
                        : "none",
                    borderBottom: "0.5px solid hsl(var(--background) / 0.14)",
                  }}
                >
                  <NavLink
                    to={n.to}
                    end
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between transition-opacity hover:opacity-80"
                    style={{
                      paddingTop: "32px",
                      paddingBottom: "32px",
                      color: "hsl(var(--background))",
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="t-section-title-sm"
                          style={{
                            fontWeight: 400,
                            opacity: isActive ? 1 : 0.92,
                          }}
                        >
                          {n.label}
                        </span>
                        <svg
                          aria-hidden
                          viewBox="0 0 16 16"
                          width="14"
                          height="14"
                          style={{
                            opacity: 0.5,
                            color: "hsl(var(--background))",
                          }}
                        >
                          <path
                            d="M5 3l5 5-5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Apply CTA — invitation, not advertisement */}
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="mt-10 flex h-12 w-full items-center justify-center t-button transition-colors hover:bg-[hsl(var(--background))]/[0.06]"
              style={{
                border: "1px solid hsl(var(--background) / 0.55)",
                color: "hsl(var(--background))",
                borderRadius: "2px",
              }}
            >
              Apply for Verification
            </Link>
          </nav>

          {/* Pinned status footer */}
          <div
            className="container-wide flex shrink-0 items-center justify-center gap-2 t-meta-note"
            style={{
              color: "hsl(var(--background) / 0.55)",
              paddingTop: "16px",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
            }}
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
    </header>
  );
};
