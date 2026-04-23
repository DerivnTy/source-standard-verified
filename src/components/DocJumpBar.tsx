import { useEffect, useRef, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — scroll-linked pill-to-bar morph.
 *
 * One sticky <nav> element. Width, radius, shadow, and border are
 * interpolated directly from scroll position — no triggered transition,
 * no positional jump. Pill widens as the user scrolls past the seam zone
 * and narrows back as they scroll up.
 */
export const DocJumpBar = ({
  waypoints,
  tone = "default",
}: {
  waypoints: JumpWaypoint[];
  tone?: "default" | "navy";
}) => {
  const [activeId, setActiveId] = useState<string>(waypoints[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const headerVisible = useHeaderVisible();
  const seamRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  void tone;

  useEffect(() => {
    const RUNWAY = 200; // px of scroll over which the pill fully widens

    const compute = () => {
      const seam = seamRef.current;
      if (!seam) return;
      const headerOffset = headerVisible ? 64 : 0;
      // Distance from the seam's bottom edge to the header offset.
      // When seam.bottom === headerOffset, progress starts; after RUNWAY px more, it's complete.
      const bottom = seam.getBoundingClientRect().bottom;
      const past = headerOffset - bottom; // positive once seam scrolls under header
      const p = Math.max(0, Math.min(1, past / RUNWAY));
      setProgress(p);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
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

  // Interpolated geometry — pure functions of `progress` (0 → 1).
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const widthPct = lerp(80, 100, progress); // 80% → 100%
  const radiusPx = lerp(9999, 0, progress); // pill → square
  const shadowOpacity = lerp(0.12, 0, progress); // shadow fades out
  const borderOpacity = progress; // hairline fades in

  const stickyTop = headerVisible ? 64 : 0;

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: `${stickyTop}px`,
    width: `${widthPct}%`,
    maxWidth: progress < 1 ? "1200px" : "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: `${radiusPx}px`,
    boxShadow: `0 10px 30px -10px hsl(0 0% 0% / ${shadowOpacity})`,
    borderBottom: `1px solid hsl(var(--border) / ${borderOpacity})`,
    backgroundColor: "hsl(var(--background))",
    zIndex: 30,
  };

  return (
    <>
      {/* Seam zone — purely decorative navy/white split. No nav inside so it
          can't clip the sticky element. */}
      <div
        ref={seamRef}
        aria-hidden
        className="relative w-full"
        style={{
          height: `${SEAM_HEIGHT}px`,
          background:
            "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)",
        }}
      />
      {/* Sticky nav — sibling of the seam, so its sticky container is the page
          body and it remains visible for the entire article. Negative top margin
          pulls it up at rest so it visually straddles the seam. */}
      <nav
        aria-label="Document contents"
        className="border border-border"
        style={{
          ...navStyle,
          marginTop: `${lerp(-SEAM_HEIGHT / 2 - 22, 0, progress)}px`,
          borderColor: `hsl(var(--border) / ${lerp(1, borderOpacity, progress)})`,
        }}
      >
        <PillContents
          waypoints={waypoints}
          activeId={activeId}
          onJump={onJump}
          flush={progress > 0.95}
        />
      </nav>
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
