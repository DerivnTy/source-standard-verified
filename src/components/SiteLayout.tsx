import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SiteHeader, setHeaderVisibleGlobal } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { GlobalUtilityBar } from "./GlobalUtilityBar";
import { useHashScroll } from "@/hooks/useHashScroll";

/**
 * Smart Reveal Header Wrapper.
 * Hides on scroll-down, reveals on scroll-up. Announcement bar + main header
 * move as a single sticky unit.
 */
const SmartHeader = () => {
  const [hidden, setHidden] = useState(false);
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
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setHeaderVisibleGlobal(!hidden);
    return () => setHeaderVisibleGlobal(true);
  }, [hidden]);

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease-in-out",
        willChange: "transform",
      }}
    >
      <GlobalUtilityBar />
      <SiteHeader />
    </div>
  );
};

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SmartHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
