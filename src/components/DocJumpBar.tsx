import { useEffect, useRef, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/**
 * DocJumpBar — pill always, with a subtle scroll-scrubbed morph.
 *
 * As the user scrolls past the seam, the pill widens horizontally and
 * minimizes vertically; items spread and slide toward visual center.
 * Border-radius stays 9999px throughout — never becomes a square bar.
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
  const seamRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  void tone;

  // Active section tracking
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

  // Scroll-scrubbed morph progress (0 at seam, 1 after RUNWAY px)
  useEffect(() => {
    const RUNWAY = 220;
    const compute = () => {
      const seam = seamRef.current;
      if (!seam) return;
      const rect = seam.getBoundingClientRect();
      // Distance scrolled past the seam's top edge meeting the header line (~64px)
      const passed = 64 - rect.top;
      const p = Math.max(0, Math.min(1, passed / RUNWAY));
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
  }, []);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const SEAM_HEIGHT = 44;
  const stickyTop = headerVisible ? 64 : 0;
  const eased = easeInOut(progress);

  // Interpolated geometry — pill throughout
  const widthPct = lerp(86, 96, eased);
  const maxWidthPx = lerp(1200, 1360, eased);
  const navPadY = lerp(8, 4, eased);
  const navPadX = lerp(22, 20, eased);
  const itemGap = lerp(8, 14, eased);
  const itemPadX = lerp(10, 14, eased);
  const chipPadY = lerp(6, 3, eased);
  const ulPushLeft = lerp(0, 80, eased);

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: `${stickyTop}px`,
    width: `${widthPct}%`,
    maxWidth: `${maxWidthPx}px`,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: `-${SEAM_HEIGHT / 2 + 22}px`,
    borderRadius: "9999px",
    boxShadow: "0 10px 30px -10px hsl(0 0% 0% / 0.12)",
    border: "1px solid hsl(var(--border))",
    backgroundColor: "hsl(var(--background))",
    zIndex: 30,
    overflow: "hidden",
    transition: "top 200ms ease-out",
  };

  return (
    <>
      {/* Seam zone — purely decorative navy/white split. */}
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
      <nav aria-label="Document contents" style={navStyle}>
        <PillContents
          waypoints={waypoints}
          activeId={activeId}
          onJump={onJump}
          navPadY={navPadY}
          navPadX={navPadX}
          itemGap={itemGap}
          itemPadX={itemPadX}
          chipPadY={chipPadY}
          ulPushLeft={ulPushLeft}
        />
      </nav>
    </>
  );
};

const PillContents = ({
  waypoints,
  activeId,
  onJump,
  navPadY,
  navPadX,
  itemGap,
  itemPadX,
  chipPadY,
  ulPushLeft,
}: {
  waypoints: JumpWaypoint[];
  activeId: string;
  onJump: (id: string) => (e: React.MouseEvent) => void;
  navPadY: number;
  navPadX: number;
  itemGap: number;
  itemPadX: number;
  chipPadY: number;
  ulPushLeft: number;
}) => {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const update = () => {
      const ul = ulRef.current;
      const el = itemRefs.current[activeId];
      if (!ul || !el) return;
      const ulRect = ul.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({
        left: elRect.left - ulRect.left,
        width: elRect.width,
      });
    };
    update();
    window.addEventListener("resize", update);
    const id = window.setTimeout(update, 50);
    return () => {
      window.removeEventListener("resize", update);
      window.clearTimeout(id);
    };
  }, [activeId, itemGap, itemPadX, ulPushLeft, waypoints]);

  return (
    <div
      className="flex items-center"
      style={{
        paddingLeft: `${navPadX}px`,
        paddingRight: `${navPadX}px`,
        paddingTop: `${navPadY}px`,
        paddingBottom: `${navPadY}px`,
        gap: "14px",
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <span className="meta-mono shrink-0 text-foreground/70 text-[11px]">
        Contents ·
      </span>
      <ul
        ref={ulRef}
        className="relative flex items-center shrink-0"
        style={{
          gap: `${itemGap}px`,
          minWidth: 0,
          marginLeft: `${ulPushLeft}px`,
        }}
      >
        {waypoints.map((w) => {
          const active = w.id === activeId;
          const chip =
            "inline-flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.06em] transition-colors";
          const tone = active
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground";
          return (
            <li
              key={w.id}
              ref={(el) => {
                itemRefs.current[w.id] = el;
              }}
            >
              <a
                href={`#${w.id}`}
                onClick={onJump(w.id)}
                className={`${chip} ${tone}`}
                style={{
                  paddingLeft: `${itemPadX}px`,
                  paddingRight: `${itemPadX}px`,
                  paddingTop: `${chipPadY}px`,
                  paddingBottom: `${chipPadY}px`,
                }}
              >
                <span className="text-primary">{w.number.padStart(2, "0")}.</span>
                <span>{w.label}</span>
              </a>
            </li>
          );
        })}
        {/* Sliding underline indicator */}
        <span
          aria-hidden
          className="absolute bg-foreground"
          style={{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
            height: "2px",
            bottom: "-2px",
            borderRadius: "2px",
            transition:
              "left 350ms cubic-bezier(0.4, 0, 0.2, 1), width 350ms cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: indicator.width > 0 ? 1 : 0,
          }}
        />
      </ul>
    </div>
  );
};
