import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useHashScroll, smoothly scrolls to the element matching location.hash
 * on mount and whenever the hash changes. Uses requestAnimationFrame to
 * defer until after the route's content has rendered.
 */
export const useHashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;

    const raf = requestAnimationFrame(() => {
      // double-RAF to ensure layout is complete after route swap
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);
};
