import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SiteHeader, setHeaderVisibleGlobal } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { GlobalUtilityBar } from "./GlobalUtilityBar";
import { useHashScroll } from "@/hooks/useHashScroll";

const HEADER_STACK_HEIGHT = 84;

/**
 * Smart Reveal Header Wrapper.
 * Hides on scroll-down, reveals on scroll-up. Announcement bar + main header
 * move as a single fixed unit so hidden state does not reserve layout space.
 *
 * On the home route the header stack renders transparent over the navy hero
 * until the user scrolls past it, producing an unbroken navy field.
 */
const SmartHeader = ({ overHero }: { overHero: boolean }) => {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y <= 0) {
          setHidden(false);
        } else if (delta > 4 && y > 80) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
        setAtTop(y < 40);
        lastY.current = y;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setHeaderVisibleGlobal(!hidden);
    return () => setHeaderVisibleGlobal(true);
  }, [hidden]);

  const transparent = overHero && atTop;

  return (
    <div
      className="fixed inset-x-0 top-0 z-50"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease-in-out",
        willChange: "transform",
      }}
    >
      <GlobalUtilityBar transparent={transparent} />
      <SiteHeader transparent={transparent} />
    </div>
  );
};

export const SiteLayout = () => {
  useHashScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SmartHeader overHero={isHome} />
      <main
        style={{
          paddingTop: `${HEADER_STACK_HEIGHT}px`,
          // Bleed navy under the fixed header on the home route so the
          // hero, header and utility bar read as one unbroken navy field.
          backgroundColor: isHome ? "hsl(var(--navy-surface))" : undefined,
          marginTop: isHome ? `-${HEADER_STACK_HEIGHT}px` : undefined,
        }}
      >
        {isHome ? (
          // Push content back down by the header height; the navy bg behind
          // the fixed header now fills the gap.
          <div style={{ paddingTop: `${HEADER_STACK_HEIGHT}px` }}>
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <SiteFooter />
    </div>
  );
};
