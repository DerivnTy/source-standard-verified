import { useEffect, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — sticky horizontal contents bar for legal/protocol documents.
 * Mounts directly under RecordHeader. Mono `CONTENTS ·` label + scrollable
 * §N · Label chips. Hairline bottom border, translucent backdrop. Uses
 * IntersectionObserver to highlight the active section.
 */
export const DocJumpBar = ({
  waypoints,
  tone = "default",
}: {
  waypoints: JumpWaypoint[];
  tone?: "default" | "navy";
}) => {
  const [activeId, setActiveId] = useState<string>(waypoints[0]?.id ?? "");
  const headerVisible = useHeaderVisible();
  const isNavy = tone === "navy";

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

  return (
    <nav
      aria-label="Document contents"
      className={`sticky z-30 transition-[top] duration-200 ease-out ${
        isNavy
          ? "border-b border-white/15 bg-[hsl(222_47%_11%)] text-white"
          : "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      } ${headerVisible ? "top-[64px]" : "top-0"}`}
    >
      <div className="container-wide flex items-center gap-4 py-2.5 overflow-x-auto">
        <span
          className={`meta-mono shrink-0 ${isNavy ? "text-white/60" : "text-foreground/70"}`}
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
  );
};
