import { useEffect, useRef, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — adaptive "pill-to-bar" contents navigation.
 *
 * Resting: a slim pill centered on the navy/white seam. Once the user
 * scrolls past the pill itself, a single persistent <nav> morphs into a
 * full-width fixed bar via a 500ms cubic-bezier transition (no remount,
 * so width/radius/shadow actually tween).
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
  const seamRef = useRef<HTMLDivElement>(null);

  void tone;

  useEffect(() => {
    const onScroll = () => {
      const seam = seamRef.current;
      if (!seam) return;
      const headerOffset = headerVisible ? 64 : 0;
      const bottom = seam.getBoundingClientRect().bottom;
      setDocked(bottom < headerOffset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headerVisible]);

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

  const SEAM_HEIGHT = 44;
  const morph =
    "transition-[width,max-width,border-radius,box-shadow,top,padding,background-color,border-color] duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]";

  // Single persistent element. Position/geometry classes swap on docked state.
  const restingClasses =
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[1200px] rounded-full shadow-lg border border-border bg-background";
  const dockedTop = headerVisible ? "top-[64px]" : "top-0";
  const dockedClasses = `fixed left-0 right-0 ${dockedTop} translate-x-0 translate-y-0 w-full max-w-none rounded-none shadow-none border-x-0 border-t-0 border-b border-border bg-background z-30`;

  return (
    <>
      {/* Seam zone — reserves vertical space and provides the navy/white split
          the resting pill straddles. Height is fixed so the body never jumps
          when the nav detaches into `fixed` positioning. */}
      <div
        ref={seamRef}
        aria-hidden={false}
        className="relative w-full"
        style={{
          height: `${SEAM_HEIGHT}px`,
          background:
            "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)",
        }}
      >
        <nav
          aria-label="Document contents"
          className={`${morph} ${docked ? dockedClasses : restingClasses}`}
        >
          <PillContents
            waypoints={waypoints}
            activeId={activeId}
            onJump={onJump}
            flush={docked}
          />
        </nav>
      </div>
    </>
  );
};

const PillContents = ({
  waypoints,
  activeId,
  onJump,
  flush = false,
}: {
  waypoints: JumpWaypoint[];
  activeId: string;
  onJump: (id: string) => (e: React.MouseEvent) => void;
  flush?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 overflow-x-auto ${
        flush ? "container-wide py-2" : "px-6 py-2"
      }`}
    >
      <span className="meta-mono shrink-0 text-foreground/70 text-[11px]">
        Contents ·
      </span>
      <ul className="flex items-center gap-2 shrink-0">
        {waypoints.map((w) => {
          const active = w.id === activeId;
          const chip =
            "inline-flex items-center gap-2 px-3 py-1 text-[12px] font-mono font-medium uppercase tracking-[0.06em] border transition-colors rounded-full";
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
