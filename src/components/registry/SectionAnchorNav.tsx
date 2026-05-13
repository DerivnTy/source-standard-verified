import { useEffect, useState } from "react";
import { useHeaderVisible } from "@/components/SiteHeader";

export type AnchorWaypoint = { id: string; number: string; label: string };

/**
 * SectionAnchorNav — flat, institutional contents bar.
 *
 * Sits flush as a structural seam between the hero and the first content
 * section. No pill, no floating shadow, no scroll-driven morph. It is a
 * quiet horizontal index keyed to the page grid. Sticks to the top of the
 * viewport on scroll, but never changes shape.
 */
export const SectionAnchorNav = ({
  waypoints,
}: {
  waypoints: AnchorWaypoint[];
}) => {
  const [activeId, setActiveId] = useState<string>(waypoints[0]?.id ?? "");
  const [scrolled, setScrolled] = useState(false);
  const headerVisible = useHeaderVisible();

  useEffect(() => {
    const compute = () => {
      // Threshold line ~ just below the sticky nav (header 84 + nav ~52 + padding)
      const threshold = 160;
      let currentId = waypoints[0]?.id ?? "";
      for (const w of waypoints) {
        const el = document.getElementById(w.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - threshold <= 0) {
          currentId = w.id;
        } else {
          break;
        }
      }
      // Bottom-of-page fallback: last section when near page end
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentId = waypoints[waypoints.length - 1]?.id ?? currentId;
      }
      setActiveId(currentId);
      setScrolled(window.scrollY > 8);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [waypoints]);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const stickyTop = headerVisible ? 84 : 0;

  return (
    <nav
      aria-label="Page contents"
      className="sticky border-b hidden lg:block"
      style={{
        top: `${stickyTop}px`,
        zIndex: 40,
        backgroundColor: "hsl(var(--card))",
        borderBottom: "0.5px solid hsl(var(--border))",
        boxShadow: scrolled ? "0 1px 0 hsl(var(--border) / 0.8)" : "none",
        transition: "top 300ms ease-in-out, box-shadow 200ms ease-out",
      }}
    >
      <div className="page-shell">
        <div className="mx-auto w-standard">
          <ul className="flex items-stretch gap-0 overflow-x-auto -mx-1">
            <li className="flex items-center pr-5 mr-2 border-r border-border/60">
              <span className="t-label-sm text-muted-foreground/70 whitespace-nowrap">
                Contents
              </span>
            </li>
            {waypoints.map((w) => {
              const active = w.id === activeId;
              return (
                <li key={w.id} className="flex">
                  <a
                    href={`#${w.id}`}
                    onClick={onJump(w.id)}
                    aria-current={active ? "true" : undefined}
                    className={`relative inline-flex items-baseline gap-2 px-3 py-3.5 t-nav whitespace-nowrap transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="t-label-sm tabular-nums text-muted-foreground/70">{w.number.padStart(2, "0")}.</span>
                    <span className="uppercase">{w.label}</span>
                    <span
                      aria-hidden
                      className={`absolute left-3 right-3 -bottom-px h-px transition-colors ${
                        active ? "bg-foreground" : "bg-transparent"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SectionAnchorNav;
