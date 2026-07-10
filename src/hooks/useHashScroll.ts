import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useHashScroll, smoothly scrolls to the element matching location.hash
 * on mount and whenever the hash changes. Waits briefly so the destination
 * page/section has mounted, then centers the section in the viewport.
 */
export const useHashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;

    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const timeout = window.setTimeout(scrollToSection, 150);
    return () => window.clearTimeout(timeout);
  }, [hash, pathname]);
};
