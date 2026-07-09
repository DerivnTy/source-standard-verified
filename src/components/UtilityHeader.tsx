import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HeroPattern } from "./HeroPattern";

/**
 * UtilityHeader, Tier 4, used on forms, sub-indexes, and short utility pages
 * (Apply, Contact, Report a Concern form, Education sub-indexes).
 *
 * Navy hero treatment. Uppercase mono eyebrow, white H1, muted-white lead.
 * Consistent with every other "meant to read" page across the site.
 */
export const UtilityHeader = ({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-surface))] border-b border-white/10">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 40%, hsl(var(--navy-surface-2)) 0%, transparent 70%)",
        }}
      />
      <HeroPattern opacity={0.02} stroke="white" cellSize={32} />
      <div
        className="relative z-10 page-shell"
        style={{ paddingTop: "clamp(44px, 6.5vh, 68px)", paddingBottom: "clamp(28px, 4vh, 40px)" }}
      >
        <div className="mx-auto w-standard">
          {backHref && (
            <Link
              to={backHref}
              className="inline-flex items-center gap-1.5 font-mono uppercase text-white/60 hover:text-white transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              <ArrowLeft className="h-3 w-3" /> {backLabel ?? "Back"}
            </Link>
          )}
          <div className={backHref ? "mt-3" : ""}>
            {eyebrow && (
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {eyebrow.toUpperCase()}
              </p>
            )}
            <h1
              className="ss-hero-title !text-white !mt-0 max-w-3xl"
              style={{ marginTop: eyebrow ? "22px" : "0", textWrap: "balance" }}
            >
              {title}
            </h1>
            {description && (
              <p
                className="ss-lead !text-white/70 max-w-[58ch]"
                style={{ marginTop: "14px", textWrap: "balance" }}
              >
                {description}
              </p>
            )}
            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};
