import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { GlobalUtilityBar } from "./GlobalUtilityBar";
import { useHashScroll } from "@/hooks/useHashScroll";

export const SiteLayout = () => {
  useHashScroll();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GlobalUtilityBar />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
