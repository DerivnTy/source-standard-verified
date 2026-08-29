/**
 * ContentsNav, the institutional contents index.
 *
 * A numbered, hairline-ruled table of contents that sits directly under a
 * page hero. Establishes up-front that the page is a structured document,
 * not a marketing scroll. Anchors are in-page (#id) and handled by the
 * sitewide hash-scroll hook.
 */
export type ContentsEntry = {
  id: string;
  label: string;
  desc?: string;
};

export const ContentsNav = ({
  entries,
  title = "Contents",
  className = "",
}: {
  entries: ContentsEntry[];
  title?: string;
  className?: string;
}) => {
  if (!entries.length) return null;
  return (
    <nav aria-label={title} className={className}>
      <p className="t-utility-xs text-muted-foreground">{title}</p>
      <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[2px] overflow-hidden m-0 p-0 list-none">
        {entries.map((entry, i) => (
          <li key={entry.id} className="bg-background">
            <a
              href={`#${entry.id}`}
              className="group flex items-baseline gap-3 px-4 py-3 hover:bg-surface-muted/60 transition-colors"
            >
              <span
                className="font-mono text-muted-foreground shrink-0"
                style={{ fontSize: "11px", letterSpacing: "0.08em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span
                  className="block font-sans uppercase text-foreground group-hover:text-primary transition-colors"
                  style={{ fontSize: "12px", letterSpacing: "0.09em", fontWeight: 700 }}
                >
                  {entry.label}
                </span>
                {entry.desc && (
                  <span
                    className="block text-muted-foreground"
                    style={{ fontSize: "13px", lineHeight: 1.5, marginTop: "4px" }}
                  >
                    {entry.desc}
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ContentsNav;
