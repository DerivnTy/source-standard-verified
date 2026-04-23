import { useEffect, useState } from "react";
import { useHeaderVisible } from "./SiteHeader";

export type JumpWaypoint = { id: string; number: string; label: string };

/**
 * DocJumpBar — fixed pill shape, sticky position only.
 *
 * The bar always renders at its widest/most-extended pill form. Scrolling
 * does not morph its shape — only its sticky `top` shifts as the SiteHeader
 * shows/hides, eased via CSS transition for a smooth follow.
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

  void tone;

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
  const stickyTop = headerVisible ? 64 : 0;

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: `${stickyTop}px`,
    width: "92%",
    maxWidth: "1360px",
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
        />
      </nav>
    </>
  );
};

const PillContents = ({
  waypoints,
  activeId,
  onJump,
}: {
  waypoints: JumpWaypoint[];
  activeId: string;
  onJump: (id: string) => (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      className="flex items-center"
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "4px",
        paddingBottom: "4px",
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
        className="flex items-center shrink-0"
        style={{ gap: "8px", minWidth: 0 }}
      >
        {waypoints.map((w) => {
          const active = w.id === activeId;
          const chip =
            "inline-flex items-center gap-2 py-0.5 text-[11px] font-mono font-medium uppercase tracking-[0.06em] border transition-colors rounded-full";
          const tone = active
            ? "border-foreground text-foreground bg-surface-muted"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border";
          return (
            <li key={w.id}>
              <a
                href={`#${w.id}`}
                onClick={onJump(w.id)}
                className={`${chip} ${tone}`}
                style={{ paddingLeft: "12px", paddingRight: "12px" }}
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
