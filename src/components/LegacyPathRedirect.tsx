import { Navigate, useLocation } from "react-router-dom";

/**
 * Rewrites a retired URL prefix to its successor, preserving the rest of
 * the path plus query and hash. Used for the /directory → /clinics and
 * /greenlist → /facilities migration so every old link, bookmark, and
 * crawled URL lands on the canonical page instead of a 404.
 */
export const LegacyPathRedirect = ({ from, to }: { from: string; to: string }) => {
  const { pathname, search, hash } = useLocation();
  const rest = pathname.startsWith(from) ? pathname.slice(from.length) : "";
  return <Navigate to={`${to}${rest}${search}${hash}`} replace />;
};

export default LegacyPathRedirect;
