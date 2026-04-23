import { useEffect, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — adaptive "pill-to-bar" contents navigation.
 *
 * Resting state: a substantial, weighted pill that sits exactly on the seam
 * between the navy hero and the white body (top half navy, bottom half
 * white) with a soft drop shadow.
 *
 * Docked state: as the user scrolls past the hero, the pill morphs in a
 * single fluid 500ms cubic-bezier motion into a full-width fixed bar with
 * a hairline bottom border, no radius, and no shadow. Active section is
 * tracked via IntersectionObserver.
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

  // tone is reserved for future variants; the morphing pill always renders
  // on a high-contrast white surface so it pops against navy AND white.
  void tone;

  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > 220);
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

  const morph = "transition-all duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]";
  const dockedTop = headerVisible ? "top-[64px]" : "top-0";

  return (
    <>
      {/* Seam zone — establishes the 50/50 navy/white split that the resting
          pill straddles. Height equals the pill height so the split lands
          exactly on the pill's vertical midpoint. */}
      <div
        aria-hidden
        className="relative w-full"
        style={{
          height: "64px",
          background:
            "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)",
        }}
      >
        {/* Resting pill anchor — absolute, centered on the seam. */}
        {!docked && (
          <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center pointer-events-none">
            <PillContents
              waypoints={waypoints}
              activeId={activeId}
              onJump={onJump}
              className={`pointer-events-auto w-[80%] max-w-[1200px] rounded-full shadow-lg border border-border bg-background ${morph}`}
            />
          </div>
        )}
      </div>

      {/* Docked bar — fixed full-width, morphs in once scrolled. */}
      {docked && (
        <nav
          aria-label="Document contents"
          className={`fixed inset-x-0 z-30 border-b border-border bg-background ${morph} ${dockedTop}`}
          style={{ borderRadius: 0 }}
        >
          <PillContents
            waypoints={waypoints}
            activeId={activeId}
            onJump={onJump}
            className="w-full"
            flush
          />
        </nav>
      )}
    </>
  );
};

const PillContents = ({
  waypoints,
  activeId,
  onJump,
  className = "",
  flush = false,
}: {
  waypoints: JumpWaypoint[];
  activeId: string;
  onJump: (id: string) => (e: React.MouseEvent) => void;
  className?: string;
  flush?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-5 overflow-x-auto ${
        flush ? "container-wide py-3" : "px-8 py-4"
      } ${className}`}
    >
      <span className="meta-mono shrink-0 text-foreground/70 text-[12px]">
        Contents ·
      </span>
      <ul className="flex items-center gap-2 shrink-0">
        {waypoints.map((w) => {
          const active = w.id === activeId;
          const chip =
            "inline-flex items-center gap-2 px-3.5 py-1.5 text-[14px] font-mono font-medium uppercase tracking-[0.06em] border transition-colors rounded-full";
          const tone = active
            ? "border-foreground text-foreground bg-surface-muted"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border";
          return (
            <li key={w.id}>
              <a
                href={`#${w.id}`}
                onClick={onJump(w.id)}
                className={`${chip} ${tone}`}
              >
                <span className="text-primary">{w.number.padStart(2, "0")}.</span>
                <span>{w.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
