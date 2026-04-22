import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SourceBot } from "./SourceBot";
import { GlobalUtilityBar } from "./GlobalUtilityBar";
import { useHashScroll } from "@/hooks/useHashScroll";

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GlobalUtilityBar />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <SourceBot />
    </div>
  );
};
