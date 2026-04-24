import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SiteHeader, setHeaderVisibleGlobal } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useHashScroll } from "@/hooks/useHashScroll";

const HEADER_STACK_HEIGHT = 60;

/**
 * Smart Reveal Header Wrapper.
 * Hides on scroll-down, reveals on scroll-up. Announcement bar + main header
 * move as a single fixed unit so hidden state does not reserve layout space.
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
      className="fixed inset-x-0 top-0 z-50"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease-in-out",
        willChange: "transform",
      }}
    >
      <SiteHeader />
    </div>
  );
};

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SmartHeader />
      <main style={{ paddingTop: `${HEADER_STACK_HEIGHT}px` }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
