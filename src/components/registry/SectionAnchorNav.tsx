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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const stickyTop = headerVisible ? 64 : 0;

  return (
    <nav
      aria-label="Page contents"
      className="sticky z-30 bg-background border-b border-border/80 transition-shadow duration-200"
      style={{
        top: `${stickyTop}px`,
        boxShadow: scrolled ? "0 1px 0 hsl(var(--border) / 0.8), 0 6px 16px -12px hsl(0 0% 0% / 0.10)" : "none",
      }}
    >
      <div className="page-shell">
        <div className="mx-auto w-standard">
          <ul className="flex items-stretch gap-0 overflow-x-auto -mx-1">
            <li className="flex items-center pr-5 mr-2 border-r border-border/60">
              <span className="t-utility-xs text-muted-foreground/70 whitespace-nowrap">
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
                    className={`relative inline-flex items-baseline gap-2 px-3 py-3.5 text-[12.5px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">
                      {w.number}
                    </span>
                    <span>{w.label}</span>
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
