import { ReactNode, useEffect, useState } from "react";

export type RegistryWaypoint = { id: string; number: string; label: string };

/**
 * RegistryLayout, DocLayout-style sticky rail + wide content column,
 * adapted for data pages (Verified Vendors, Greenlist).
 *
 * Caller is responsible for rendering the AnchorHeader above this.
 * Children are placed in the right-hand column and may include any mix
 * of summary cards, sticky filter rows, tables, and footer bands.
 */
export const RegistryLayout = ({
  waypoints,
  children,
}: {
  waypoints: RegistryWaypoint[];
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
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    waypoints.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [waypoints]);

  return (
    <section className="bg-background">
      <div className="container-wide py-10 md:py-12 lg:py-14 xl:py-16">
        {/* Mobile waypoint pills */}
        <nav
          aria-label="Registry sections"
          className="lg:hidden -mx-6 md:-mx-10 mb-8 overflow-x-auto"
        >
          <ul className="flex gap-2 px-6 md:px-10 min-w-max">
            {waypoints.map((w) => (
              <li key={w.id}>
                <a
                  href={`#${w.id}`}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border t-micro transition-colors ${
                    activeId === w.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-surface border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="t-utility-xs tabular-nums opacity-70">{w.number}</span>
                  {w.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <aside className="hidden lg:block col-span-3">
            <nav aria-label="Registry sections" className="sticky top-24">
              <p className="eyebrow mb-4">Registry index</p>
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
                          className={`t-utility-xs tabular-nums ${
                            active ? "text-primary" : "text-muted-foreground/70"
                          }`}
                        >
                          {w.number}
                        </span>
                        <span
                          className={`t-nav ${
                            active
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
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

          <main className="col-span-12 lg:col-span-9 min-w-0 space-y-2">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
};

/**
 * RegistrySection, section primitive used inside RegistryLayout.
 * Carries the scroll-anchor id and a §N + title block, then renders
 * arbitrary content (cards, tables, prose).
 */
export const RegistrySection = ({
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
      <h2 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.014em] leading-[1.2] text-foreground">
        {number && (
          <span className="text-[0.7em] uppercase tracking-[0.08em] text-primary mr-3 align-baseline tabular-nums">
            {number}
          </span>
        )}
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[14.5px] leading-[1.7] text-muted-foreground max-w-[68ch]">
          {description}
        </p>
      )}
    </header>
    <div>{children}</div>
  </section>
);
