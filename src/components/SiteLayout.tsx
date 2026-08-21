import { Outlet } from "react-router-dom";
import { SiteHeader, setHeaderVisibleGlobal } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useHashScroll } from "@/hooks/useHashScroll";
import { useEffect } from "react";

const HEADER_STACK_HEIGHT = 60;

/**
 * Fixed institutional header. Always visible. Hide-on-scroll belongs to
 * product apps, not a public standards record.
 */
const StaticHeader = () => {
  useEffect(() => {
    setHeaderVisibleGlobal(true);
    return () => setHeaderVisibleGlobal(true);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <SiteHeader />
    </div>
  );
};

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <StaticHeader />
      <main id="main-content" className="flex-1 flex flex-col" style={{ paddingTop: `${HEADER_STACK_HEIGHT}px` }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
