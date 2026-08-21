import { Outlet } from "react-router-dom";
import { SiteHeader, setHeaderVisibleGlobal } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useHashScroll } from "@/hooks/useHashScroll";
import { useEffect } from "react";

const HEADER_HEIGHT = 64;

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
    <div className="flex flex-col bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <StaticHeader />
      <main id="main-content" className="flex flex-col" style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
