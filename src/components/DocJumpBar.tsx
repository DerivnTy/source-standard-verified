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
  const [armed, setArmed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const headerVisible = useHeaderVisible();
  const seamRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  void tone;

  // Active section tracking — "closest to viewport center" wins.
  // We bypass IntersectionObserver here because IO can't tell us which
  // visible section is *most central*; it only tells us what's intersecting.
  useEffect(() => {
    const pickActive = () => {
      const vh = window.innerHeight;
      const center = vh / 2;
      let bestId = waypoints[0]?.id ?? "";
      let bestDist = Infinity;
      for (const w of waypoints) {
        const el = document.getElementById(w.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // Clamp the section's on-screen span to the viewport, then take
        // the midpoint of that visible band. This makes tall sections
        // win while they dominate the screen, and short sections win
        // exactly when they're centered.
        const top = Math.max(0, r.top);
        const bottom = Math.min(vh, r.bottom);
        if (bottom <= top) {
          // Off-screen: fall back to distance from section center.
          const mid = r.top + r.height / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = w.id;
          }
          continue;
        }
        const visibleMid = (top + bottom) / 2;
        const dist = Math.abs(visibleMid - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = w.id;
        }
      }
      setActiveId((prev) => (prev === bestId ? prev : bestId));
    };
    let raf: number | null = null;
    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        pickActive();
      });
    };
    pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [waypoints]);

  // Scroll-scrubbed morph progress (0 at seam, 1 after RUNWAY px) +
  // "armed" gate: pill stays hidden until Section 01's top reaches the
  // viewport top. Strict binary trigger — no pre-scroll movement.
  useEffect(() => {
    const RUNWAY = 220;
    const firstId = waypoints[0]?.id;
    const compute = () => {
      const seam = seamRef.current;
      if (seam) {
        const rect = seam.getBoundingClientRect();
        const passed = 64 - rect.top;
        const p = Math.max(0, Math.min(1, passed / RUNWAY));
        setProgress(p);
      }
      if (firstId) {
        const first = document.getElementById(firstId);
        if (first) {
          // Arm the moment Section 01's top crosses the viewport top.
          const shouldArm = first.getBoundingClientRect().top <= 0;
          setArmed((prev) => (prev === shouldArm ? prev : shouldArm));
        }
      }
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
  }, [waypoints]);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const SEAM_HEIGHT = 44;
  const HEADER_STACK = 84; // GlobalUtilityBar (24) + SiteHeader (60)
  const stickyTop = 0;
  void headerVisible;
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

  // Outer pill expands; INTERNAL spacing is fixed to prevent jumping/snapping.
  const widthPct = isMobile
    ? lerp(92, 95, eased)
    : lerp(86, 95, eased);
  const maxWidthPx = lerp(1200, 1600, eased);

  // Fixed internal geometry — never interpolated. Eliminates layout shift.
  const NAV_PAD_Y = 6;
  const NAV_PAD_X = 22;
  const ITEM_GAP = 24; // constant gap-x-6
  const ITEM_PAD_X = 12;
  const CHIP_PAD_Y = 4;
  const PILL_HEIGHT = 44; // locked height, no vertical vibration
  const ulPushLeft = 0;
  void barHeight;

  const APPLE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
  void eased;
  void widthPct;
  void maxWidthPx;
  void armed;
  void flushTop;
  void SEAM_HEIGHT;

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: `${stickyTop}px`,
    width: "100%",
    height: `${PILL_HEIGHT}px`,
    borderRadius: 0,
    border: "0.5px solid hsl(var(--border))",
    borderLeft: "none",
    borderRight: "none",
    backgroundColor: "#FFFFFF",
    zIndex: 40,
    overflow: "hidden",
    transition: `box-shadow 400ms ${APPLE_EASE}`,
  };

  return (
    <>
      <nav ref={navRef} aria-label="Document contents" style={navStyle} className="hidden lg:flex">
        <PillContents
          waypoints={waypoints}
          activeId={activeId}
          onJump={onJump}
          navPadY={NAV_PAD_Y}
          navPadX={NAV_PAD_X}
          itemGap={ITEM_GAP}
          itemPadX={ITEM_PAD_X}
          chipPadY={CHIP_PAD_Y}
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
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const rafRef = useRef<number | null>(null);
  // Indicator state is kept in a ref + written directly to the DOM each frame
  // to avoid React re-renders on every scroll tick (zero-latency path).
  // We still seed a state value so the initial paint is correct.
  const [, force] = useState(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const compute = () => {
      const ul = ulRef.current;
      const rail = railRef.current;
      const indicatorEl = indicatorRef.current;
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
      const anchor = window.scrollY + window.innerHeight / 2;
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

      // Pan the rail with translateX (GPU). Clamp so the active chip stays
      // visible. We translate the <ul>, never write scrollLeft.
      const railWidth = rail.clientWidth;
      const maxPan = Math.max(0, ul.scrollWidth - railWidth);
      const desired = indicatorLeft + indicatorWidth / 2 - railWidth / 2;
      const tx = Math.max(0, Math.min(maxPan, desired));

      // Direct DOM writes — bypass React for 1:1 scroll sync.
      ul.style.transform = `translate3d(${-tx}px, 0, 0)`;
      if (indicatorEl) {
        indicatorEl.style.transform = `translate3d(${indicatorLeft}px, 0, 0)`;
        indicatorEl.style.width = `${indicatorWidth}px`;
        indicatorEl.style.opacity = indicatorWidth > 0 ? "1" : "0";
      }
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    // Initial paint + a delayed second pass once layout settles.
    compute();
    force((n) => n + 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
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
      className="flex items-center mx-auto"
      style={{
        paddingLeft: `${navPadX}px`,
        paddingRight: `${navPadX}px`,
        paddingTop: `${navPadY}px`,
        paddingBottom: `${navPadY}px`,
        gap: "14px",
        width: "100%",
        maxWidth: "1180px",
        justifyContent: "center",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Fixed left anchor — never moves. */}
      <span className="shrink-0 t-label-sm text-foreground/70">
        CONTENTS ·
      </span>
      {/* Rail viewport — clips overflow; the inner <ul> is panned via
          GPU translate3d in lockstep with page scroll. */}
      <div
        ref={railRef}
        className="relative flex-1 min-w-0 overflow-hidden"
      >
        <style>{`
          .ss-rail::-webkit-scrollbar { display: none; }
        `}</style>
        <ul
          ref={ulRef}
          className="ss-rail relative flex items-center w-max"
          style={{
            gap: `${itemGap}px`,
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
          }}
        >
          {waypoints.map((w) => {
            const active = w.id === activeId;
            const chip = "inline-flex items-center gap-2 t-label-sm transition-colors whitespace-nowrap no-underline hover:no-underline focus:no-underline";
            const tone = active
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground";
            return (
              <li
                key={w.id}
                className="shrink-0"
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
                    textDecoration: "none",
                    textShadow: "none",
                  }}
                >
                  <span className="tabular-nums text-primary">{w.number.padStart(2, "0")}.</span>
                  <span>{w.label.toUpperCase()}</span>
                </a>
              </li>
            );
          })}
          {/* Indicator removed — active state is conveyed by chip weight/color only. */}
          <span ref={indicatorRef} aria-hidden style={{ display: "none" }} />
        </ul>
      </div>
    </div>
  );
};
