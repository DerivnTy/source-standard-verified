import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { PRIMARY_NAV, MOBILE_NAV, PRIMARY_CTA } from "@/config/navigation";

const nav = PRIMARY_NAV.map((r) => ({ to: r.path, label: r.label }));
const mobileNav = MOBILE_NAV.map((r) => ({ to: r.path, label: r.label }));




// Module-level subscription so DocJumpBar (and others) can mirror the header's
// hide-on-scroll-down / show-on-scroll-up behavior without prop drilling.
const visibilityListeners = new Set<(v: boolean) => void>();
let _headerVisible = true;
export const setHeaderVisibleGlobal = (v: boolean) => {
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
  const location = useLocation();

  // Lock body scroll when full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Header is always visible, keep global subscribers in sync.
  useEffect(() => {
    setHeaderVisibleGlobal(true);
  }, [location.pathname]);

  return (
    <header
      className="!bg-white"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "0.5px solid #E5E5EA",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <div
        className="relative flex items-center justify-between"
        style={{ height: "63px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Logo />
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 h-full">
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
            <Link to={PRIMARY_CTA.path}>{PRIMARY_CTA.label}</Link>
          </Button>

        </div>
        <button
          className="lg:hidden p-2 -mr-2 relative h-10 w-10 transition-colors"
          style={{
            zIndex: open ? 70 : undefined,
            color: open ? "#FFFFFF" : "hsl(var(--foreground))",
          }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {/* Clean 2-bar hamburger ↔ X */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[1.5px] w-[22px] -translate-x-1/2 bg-current transition-all duration-300 ease-out"
            style={{
              transform: open
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, -4px)",
            }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[1.5px] w-[22px] -translate-x-1/2 bg-current transition-all duration-300 ease-out"
            style={{
              transform: open
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, 3px)",
            }}
          />
        </button>
      </div>

      {/* Full-screen mobile overlay, navy surface, light type, edge-to-edge viewport. */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className="lg:hidden fixed z-[9999]"
            aria-hidden={!open}
            style={{
              inset: 0,
              height: "100dvh",
              minHeight: "100dvh",
              pointerEvents: open ? "auto" : "none",
              opacity: open ? 1 : 0,
              transition: "opacity 280ms ease-in-out",
              backgroundColor: "hsl(var(--navy-surface))",
            }}
          >
            <div className="flex h-full w-full flex-col">
              {/* Top bar, unified lockup + close (matches header height) */}
              <div
                className="flex shrink-0 items-center justify-between"
                style={{
                  height: "63px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.10)",
                }}
              >
                <Logo variant="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="relative h-10 w-10 text-white"
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 block h-[1.5px] w-[22px] bg-current"
                    style={{ transform: "translate(-50%, -50%) rotate(45deg)" }}
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 block h-[1.5px] w-[22px] bg-current"
                    style={{ transform: "translate(-50%, -50%) rotate(-45deg)" }}
                  />
                </button>
              </div>

              {/* Nav list, left-aligned, 32px gaps, 20px Inter Semi-bold Navy */}
              <nav
                className="flex-1 overflow-y-auto"
                style={{ paddingLeft: "32px", paddingRight: "32px", paddingTop: "40px" }}
              >
                <ul className="flex flex-col" style={{ rowGap: "32px" }}>
                  {mobileNav.map((n) => (
                    <li key={n.to}>
                      <NavLink
                        to={n.to}
                        end
                        onClick={() => setOpen(false)}
                        className="block transition-opacity hover:opacity-70 text-white font-sans font-semibold"
                        style={{
                          fontSize: "18px",
                          letterSpacing: "-0.015em",
                          lineHeight: "1.2",
                        }}
                      >
                        {n.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <Link
                  to={PRIMARY_CTA.path}
                  onClick={() => setOpen(false)}
                  className="mt-10 w-full inline-flex items-center justify-center px-8 text-white transition-colors hover:bg-white/[0.06]"
                  style={{
                    height: "52px",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRadius: "0px",
                    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    lineHeight: "1.2",
                    textTransform: "uppercase",
                  }}
                >
                  {PRIMARY_CTA.label}
                </Link>

              </nav>

              {/* Footer brand tag */}
              <div
                className="flex shrink-0 items-center justify-center t-utility-xs"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  paddingTop: "16px",
                  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
                  borderTop: "0.5px solid rgba(255,255,255,0.10)",
                }}
              >
                Source Standard © 2026
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
};
