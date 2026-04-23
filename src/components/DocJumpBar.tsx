import { useEffect, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — adaptive "pill-to-bar" contents navigation.
 *
 * Resting state: floating rounded pill nested at the seam between the navy
 * Hero and the white Body, with a split background (top half navy, bottom
 * half white) and a soft shadow for depth.
 *
 * Scrolled state: as the user passes the hero, the pill animates into a
 * full-width fixed bar docked at the top of the viewport, with a hairline
 * bottom border and translucent backdrop. Active section is highlighted
 * via IntersectionObserver.
 */
export const DocJumpBar = ({
  waypoints,
  tone = "default",
}: {
  waypoints: JumpWaypoint[];
  tone?: "default" | "navy";
}) => {
  const [activeId, setActiveId] = useState<string>(waypoints[0]?.id ?? "");
  const [docked, setDocked] = useState(false);
  const headerVisible = useHeaderVisible();
  const isNavy = tone === "navy";

  // Dock when the user scrolls a meaningful distance past the hero seam.
  useEffect(() => {
    const onScroll = () => {
      // Threshold roughly matches the chapter-hero height; once past it the
      // pill expands to a full-width fixed bar.
      setDocked(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 }
    );
    waypoints.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [waypoints]);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  // ── Resting state: floating split-background pill ────────────────────
  // We render a wrapper that establishes the navy/white split, then the
  // pill itself sits centered on the seam.
  if (!docked) {
    return (
      <div
        aria-hidden={false}
        className="relative"
        style={{
          background: isNavy
            ? "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)"
            : "linear-gradient(to bottom, hsl(var(--background)) 50%, hsl(var(--background)) 50%)",
        }}
      >
        <nav
          aria-label="Document contents"
          className="container-wide flex justify-center py-0"
        >
          <div
            className={`pointer-events-auto inline-flex items-center gap-3 rounded-full border shadow-lg transition-all duration-300 ease-in-out px-4 py-2 max-w-full overflow-x-auto ${
              isNavy
                ? "border-white/15 bg-[hsl(var(--navy-surface))] text-white"
                : "border-border bg-background text-foreground"
            }`}
          >
            <span
              className={`meta-mono shrink-0 ${
                isNavy ? "text-white/60" : "text-foreground/70"
              }`}
            >
              Contents ·
            </span>
            <ul className="flex items-center gap-1.5 shrink-0">
              {waypoints.map((w) => {
                const active = w.id === activeId;
                const baseChip =
                  "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-mono uppercase tracking-[0.06em] border transition-colors rounded-full";
                const chipClass = isNavy
                  ? active
                    ? "border-white text-white bg-white/10"
                    : "border-transparent text-white/70 hover:text-white hover:border-white/40"
                  : active
                    ? "border-foreground text-foreground bg-surface-muted"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border";
                return (
                  <li key={w.id}>
                    <a
                      href={`#${w.id}`}
                      onClick={onJump(w.id)}
                      className={`${baseChip} ${chipClass}`}
                    >
                      <span className={isNavy ? "text-white/90" : "text-primary"}>
                        {w.number.padStart(2, "0")}.
                      </span>
                      <span>{w.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  // ── Docked state: fixed full-width bar ───────────────────────────────
  return (
    <>
      {/* Spacer preserves layout flow once the bar leaves it. */}
      <div aria-hidden className="h-[52px]" />
      <nav
        aria-label="Document contents"
        className={`fixed inset-x-0 z-30 transition-all duration-300 ease-in-out shadow-md ${
          isNavy
            ? "border-b border-white/15 bg-[hsl(var(--navy-surface))] text-white"
            : "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        } ${headerVisible ? "top-[64px]" : "top-0"}`}
      >
        <div className="container-wide flex items-center gap-4 py-2.5 overflow-x-auto">
          <span
            className={`meta-mono shrink-0 ${
              isNavy ? "text-white/60" : "text-foreground/70"
            }`}
          >
            Contents ·
          </span>
          <ul className="flex items-center gap-1.5 shrink-0">
            {waypoints.map((w) => {
              const active = w.id === activeId;
              const baseChip =
                "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-mono uppercase tracking-[0.06em] border transition-colors rounded-none";
              const chipClass = isNavy
                ? active
                  ? "border-white text-white bg-white/10"
                  : "border-transparent text-white/70 hover:text-white hover:border-white/40"
                : active
                  ? "border-foreground text-foreground bg-surface-muted"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border";
              return (
                <li key={w.id}>
                  <a
                    href={`#${w.id}`}
                    onClick={onJump(w.id)}
                    className={`${baseChip} ${chipClass}`}
                  >
                    <span className={isNavy ? "text-white/90" : "text-primary"}>
                      {w.number.padStart(2, "0")}.
                    </span>
                    <span>{w.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
