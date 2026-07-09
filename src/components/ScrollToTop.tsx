import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop, resets scroll to top on every route change,
 * unless the URL carries a #hash (in which case useHashScroll handles it).
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};
