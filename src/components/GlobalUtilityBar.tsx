import { useLocation } from "react-router-dom";

/**
 * GlobalUtilityBar — Tier 0
 *
 * The thinnest possible horizontal strip, sitting at the absolute top of the
 * viewport above the SiteHeader. Acts as a "digital signature" for the
 * current document/route: DOC ID · VERSION · STATUS · UPDATED.
 *
 * Pure presentation. Route-aware via a static map. Mono 10.5px, hairline
 * divider beneath, no interaction.
 */

type RouteSignature = {
  docId: string;
  version: string;
  status: string;
  updated: string;
};

const DEFAULT_SIG: RouteSignature = {
  docId: "SS-FRAMEWORK-2026.01",
  version: "v1.0",
  status: "Active",
  updated: "04 / 21 / 2026",
};

const ROUTE_SIGNATURES: Record<string, RouteSignature> = {
  "/": DEFAULT_SIG,
  "/verified-vendors": { docId: "SS-01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/greenlist": { docId: "SS-02", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/medical-advisory": { docId: "SS-MAB-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/education": { docId: "SS-EDU", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/how-it-works": { docId: "SS-PROT", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/about": { docId: "SS-ORG", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/governance": { docId: "SS-GOV-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/accountability": { docId: "SS-ENFORCE-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/apply": { docId: "SS-INTAKE-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/contact": { docId: "SS-CONTACT-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/report-concern": { docId: "SS-REPORT-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/privacy": { docId: "SS-PRIVACY-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/terms": { docId: "SS-TERMS-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/verification-disclaimer": { docId: "SS-DISCLAIMER-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/status-definitions": { docId: "SS-STATUS-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/how-to-read-the-directory": { docId: "SS-READ-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/for-vendors": { docId: "SS-VENDORS-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
  "/faq": { docId: "SS-FAQ-2026.01", version: "v1.0", status: "Active", updated: "04 / 21 / 2026" },
};

const resolveSignature = (pathname: string): RouteSignature => {
  if (ROUTE_SIGNATURES[pathname]) return ROUTE_SIGNATURES[pathname];
  // Match longest prefix (e.g. /library/* → SS-EDU, /medical-advisory/* → SS-MAB)
  const match = Object.keys(ROUTE_SIGNATURES)
    .filter((p) => p !== "/" && pathname.startsWith(p + "/"))
    .sort((a, b) => b.length - a.length)[0];
  if (match) return ROUTE_SIGNATURES[match];
  if (pathname.startsWith("/library/")) return ROUTE_SIGNATURES["/education"];
  if (pathname.startsWith("/faq/")) return ROUTE_SIGNATURES["/faq"];
  if (pathname.startsWith("/education/")) return ROUTE_SIGNATURES["/education"];
  return DEFAULT_SIG;
};

export const GlobalUtilityBar = () => {
  const { pathname } = useLocation();
  const sig = resolveSignature(pathname);
  const isNavy = pathname === "/";

  return (
    <div
      role="contentinfo"
      aria-label="Document signature"
      className={
        isNavy
          ? "bg-[hsl(var(--navy-surface))] border-b border-white/10"
          : "bg-background border-b border-border/60"
      }
    >
      <div
        className={`container-wide flex items-center justify-between gap-6 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
          isNavy ? "text-white/65" : "text-muted-foreground/80"
        }`}
      >
        <div className="flex items-center gap-5 min-w-0">
          <span className="truncate">DOC · {sig.docId}</span>
          <span className="hidden sm:inline">VER · {sig.version}</span>
          <span className="hidden sm:inline">
            STATUS ·{" "}
            <span className={isNavy ? "text-white/90" : "text-foreground/85"}>
              {sig.status}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <span className="hidden md:inline">SOURCE STANDARD</span>
          <span>UPDATED · {sig.updated}</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalUtilityBar;
