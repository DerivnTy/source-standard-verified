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
  const [barHeight, setBarHeight] = useState(56);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const headerVisible = useHeaderVisible();
  const seamRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
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
  const HEADER_STACK = 84; // GlobalUtilityBar (24) + SiteHeader (60)
  const stickyTop = headerVisible ? HEADER_STACK : 0;
  const eased = easeInOut(progress);
  const flushTop = !headerVisible;

  // Measure the bar's actual height so we can pull it up by exactly half
  // its height — placing its vertical center precisely on the seam line.
  useEffect(() => {
    if (!navRef.current) return;
    const update = () => {
      if (navRef.current) setBarHeight(navRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(navRef.current);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Interpolated geometry — pill ALWAYS. Expands horizontally + slims vertically.
  const widthPct = isMobile
    ? lerp(92, 95, eased)
    : lerp(86, 95, eased);
  const maxWidthPx = lerp(1200, 1600, eased);
  const navPadY = lerp(8, 3, eased); // slim vertical profile when sticky
  const navPadX = lerp(22, 24, eased);
  const itemGap = lerp(8, 14, eased);
  const itemPadX = lerp(10, 14, eased);
  const chipPadY = lerp(6, 3, eased);
  // CONTENTS stays the fixed left anchor — never push the rail right.
  const ulPushLeft = 0;

  const APPLE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: `${stickyTop}px`,
    width: `${widthPct}%`,
    maxWidth: isMobile ? "none" : `${maxWidthPx}px`,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: flushTop ? "12px" : `-${SEAM_HEIGHT / 2 + barHeight / 2}px`,
    borderRadius: "9999px",
    boxShadow: flushTop
      ? "0 4px 12px rgba(0,0,0,0.05)"
      : "none",
    border: "0.5px solid hsl(var(--border))",
    backgroundColor: "#FFFFFF",
    zIndex: 40,
    overflow: "hidden",
    transition: `top 300ms ease-in-out, margin-top 500ms ${APPLE_EASE}, width 500ms ${APPLE_EASE}, max-width 500ms ${APPLE_EASE}, box-shadow 400ms ${APPLE_EASE}, padding 500ms ${APPLE_EASE}`,
  };

  return (
    <>
      {/* Seam zone — collapses fully when the header is hidden so the bar can
          snap to the browser edge with no residual gap. */}
      <div
        ref={seamRef}
        aria-hidden
        className="relative w-full"
        style={{
          height: flushTop ? "0px" : `${SEAM_HEIGHT}px`,
          background: flushTop
            ? "hsl(var(--card))"
            : "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)",
          transition: "height 200ms ease-out",
        }}
      />
      <nav ref={navRef} aria-label="Document contents" style={navStyle}>
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
  const railRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const animRafRef = useRef<number | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Smoothly tween the rail's scrollLeft toward targetScrollRef.
  useEffect(() => {
    const tick = () => {
      const rail = railRef.current;
      if (!rail) {
        animRafRef.current = null;
        return;
      }
      const target = targetScrollRef.current;
      const current = currentScrollRef.current;
      const next = current + (target - current) * 0.18;
      const done = Math.abs(target - next) < 0.5;
      currentScrollRef.current = done ? target : next;
      rail.scrollLeft = currentScrollRef.current;
      if (!done) {
        animRafRef.current = requestAnimationFrame(tick);
      } else {
        animRafRef.current = null;
      }
    };
    const start = () => {
      if (animRafRef.current == null) {
        animRafRef.current = requestAnimationFrame(tick);
      }
    };
    // Expose start via a custom event on the rail
    const rail = railRef.current;
    if (!rail) return;
    const handler = () => start();
    rail.addEventListener("ss:rail-tween", handler);
    return () => {
      rail.removeEventListener("ss:rail-tween", handler);
      if (animRafRef.current != null) cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const compute = () => {
      const ul = ulRef.current;
      const rail = railRef.current;
      if (!ul || !rail) return;
      const ulRect = ul.getBoundingClientRect();

      // Measure chip positions relative to the ul (rail content).
      const chips = waypoints
        .map((w) => itemRefs.current[w.id])
        .filter((el): el is HTMLLIElement => !!el)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left - ulRect.left, width: r.width };
        });
      if (chips.length === 0) return;

      // Section DOM elements (for scroll progress)
      const sections = waypoints
        .map((w) => document.getElementById(w.id))
        .filter((el): el is HTMLElement => !!el);
      if (sections.length === 0) return;

      const firstTop = sections[0].getBoundingClientRect().top + window.scrollY;
      const lastEl = sections[sections.length - 1];
      const lastBottom =
        lastEl.getBoundingClientRect().top + window.scrollY + lastEl.offsetHeight;
      const anchor = window.scrollY + 200;
      const range = Math.max(1, lastBottom - firstTop);
      const docProgress = Math.max(0, Math.min(1, (anchor - firstTop) / range));

      // Map progress (0..1) across chip indices (0..n-1)
      const n = chips.length;
      const scaled = docProgress * (n - 1);
      const i = Math.max(0, Math.min(n - 2, Math.floor(scaled)));
      const t = Math.max(0, Math.min(1, scaled - i));

      const a = chips[i];
      const b = chips[Math.min(n - 1, i + 1)];
      const indicatorLeft = lerp(a.left, b.left, t);
      const indicatorWidth = lerp(a.width, b.width, t);
      setIndicator({ left: indicatorLeft, width: indicatorWidth });

      // Drive the rail's scrollLeft so the active chip sits centered in
      // the visible viewport of the rail. Clamp to valid scroll bounds so
      // the active chip is always fully visible.
      const railWidth = rail.clientWidth;
      const maxScroll = Math.max(0, ul.scrollWidth - railWidth);
      const desired = indicatorLeft + indicatorWidth / 2 - railWidth / 2;
      const clamped = Math.max(0, Math.min(maxScroll, desired));
      targetScrollRef.current = clamped;
      rail.dispatchEvent(new Event("ss:rail-tween"));
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
    const id = window.setTimeout(compute, 50);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(id);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [itemGap, itemPadX, ulPushLeft, waypoints]);

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
      {/* Fixed left anchor — never moves. */}
      <span className="shrink-0 t-label-sm text-foreground/70">
        CONTENTS ·
      </span>
      {/* Horizontally scrollable rail — scrollbar hidden, scrollLeft is
          driven by page scroll progress so chips glide into the active zone. */}
      <div
        ref={railRef}
        className="relative flex-1 min-w-0 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
        }}
      >
        <style>{`
          .ss-rail::-webkit-scrollbar { display: none; }
        `}</style>
        <ul
          ref={ulRef}
          className="ss-rail relative flex items-center w-max"
          style={{ gap: `${itemGap}px` }}
        >
          {waypoints.map((w) => {
            const active = w.id === activeId;
            const chip = "inline-flex items-center gap-2 t-label-sm transition-colors whitespace-nowrap";
            const tone = active
              ? "text-foreground font-semibold"
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
                  <span className="tabular-nums text-primary">{w.number.padStart(2, "0")}.</span>
                  <span>{w.label.toUpperCase()}</span>
                </a>
              </li>
            );
          })}
          {/* Sliding underline indicator — positioned within the scrolling ul
              so it follows the active chip even as the rail translates. */}
          <span
            aria-hidden
            className="absolute bg-foreground"
            style={{
              left: `${indicator.left}px`,
              width: `${indicator.width}px`,
              height: "2px",
              bottom: "-2px",
              borderRadius: "2px",
              opacity: indicator.width > 0 ? 1 : 0,
              transition: "left 200ms ease-out, width 200ms ease-out",
            }}
          />
        </ul>
      </div>
    </div>
  );
};
