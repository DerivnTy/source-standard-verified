import { ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";

/**
 * PageHeader, Source Standard institutional page intro band.
 * Navy hero. Uppercase mono eyebrow, white H1, muted-white lead.
 */
export const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => (
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
      style={{ paddingTop: "clamp(44px, 5vh, 64px)", paddingBottom: "24px" }}
    >
      <div className="mx-auto w-standard">
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
          className="ss-hero-title !text-white max-w-[36ch] !mt-0"
          style={{ marginTop: eyebrow ? "22px" : "0", textWrap: "balance" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="ss-lead !text-white/70 max-w-[68ch]"
            style={{ marginTop: "14px", textWrap: "balance" }}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  </section>
);
