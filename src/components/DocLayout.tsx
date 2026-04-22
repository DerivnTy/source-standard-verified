import { ReactNode, useEffect, useState } from "react";

export type Waypoint = { id: string; number: string; label: string };

type Variant = "default" | "certificate";

/**
 * DocLayout — Dashboard/Report layout for institutional doc pages.
 *
 * Asymmetric 12-col grid: sticky waypoint rail (left) + wide content (right).
 * Replaces the centered prose column for About/Privacy/Terms/Disclaimer/etc.
 */
export const DocLayout = ({
  waypoints,
  variant = "default",
  children,
}: {
  waypoints: Waypoint[];
  variant?: Variant;
  children: ReactNode;
}) => {
  const [activeId, setActiveId] = useState<string>(waypoints[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    waypoints.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [waypoints]);

  const isCert = variant === "certificate";

  return (
    <section
      className={
        isCert
          ? "bg-[hsl(210_40%_99%)] border-t-2 border-t-foreground"
          : "bg-background"
      }
    >
      <div className="container-wide py-12 md:py-16">
        {/* Mobile waypoint pills */}
        <nav
          aria-label="Document sections"
          className="lg:hidden -mx-6 md:-mx-10 mb-8 overflow-x-auto"
        >
          <ul className="flex gap-2 px-6 md:px-10 min-w-max">
            {waypoints.map((w) => (
              <li key={w.id}>
                <a
                  href={`#${w.id}`}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors ${
                    activeId === w.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-surface border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10.5px] opacity-70">{w.number}</span>
                  {w.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky waypoint rail (desktop) */}
          <aside className="hidden lg:block col-span-3">
            <nav
              aria-label="Document sections"
              className="sticky top-24"
            >
              <p className="eyebrow mb-4">Contents</p>
              <ol className="space-y-1 border-l border-border/70">
                {waypoints.map((w) => {
                  const active = activeId === w.id;
                  return (
                    <li key={w.id}>
                      <a
                        href={`#${w.id}`}
                        className={`group flex items-baseline gap-3 -ml-px pl-4 py-1.5 border-l-2 transition-colors ${
                          active
                            ? "border-l-primary"
                            : "border-l-transparent hover:border-l-border-strong"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10.5px] tracking-[0.06em] tabular-nums ${
                            active ? "text-primary" : "text-muted-foreground/70"
                          }`}
                        >
                          {w.number}
                        </span>
                        <span
                          className={`text-[13px] leading-snug ${
                            active
                              ? "font-semibold text-foreground"
                              : "font-medium text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {w.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* Main content column */}
          <main className="col-span-12 lg:col-span-9 min-w-0">
            {isCert && (
              <div className="mb-8 pb-4 border-b-2 border-double border-border-strong/60">
                <p className="font-mono uppercase tracking-[0.12em] text-[10.5px] text-muted-foreground">
                  Certificate of Disclosure · Source Standard
                </p>
              </div>
            )}
            <div className="space-y-2">{children}</div>
          </main>
        </div>
      </div>
    </section>
  );
};

/**
 * DocSection — section primitive used inside DocLayout.
 */
export const DocSection = ({
  id,
  number,
  title,
  description,
  children,
  first = false,
}: {
  id: string;
  number?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  first?: boolean;
}) => (
  <section
    id={id}
    className={`scroll-mt-24 py-10 ${first ? "" : "border-t border-border/60"}`}
  >
    <header className="mb-6">
      <h2 className="text-[1.5rem] md:text-[1.625rem] font-semibold tracking-[-0.015em] leading-[1.2] text-foreground">
        {number && (
          <span className="font-mono text-[0.7em] uppercase tracking-[0.08em] text-primary mr-3 align-baseline">
            {number}
          </span>
        )}
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15.5px] leading-[1.75] text-muted-foreground max-w-[68ch]">
          {description}
        </p>
      )}
    </header>
    <div className="prose-filing">{children}</div>
  </section>
);
