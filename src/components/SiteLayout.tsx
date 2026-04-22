import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SourceBot } from "./SourceBot";
import { useHashScroll } from "@/hooks/useHashScroll";

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <SourceBot />
    </div>
  );
};
