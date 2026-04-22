import { ReactNode } from "react";

/**
 * Footnote — inline superscript reference, links to #fn-{n}.
 */
export const Footnote = ({ n }: { n: number }) => (
  <sup id={`fnref-${n}`} className="ml-0.5">
    <a
      href={`#fn-${n}`}
      className="font-mono text-[10px] text-primary hover:underline tabular-nums"
      aria-label={`Footnote ${n}`}
    >
      [{n}]
    </a>
  </sup>
);

/**
 * FootnoteList — academic-style footnote band at page bottom.
 */
export const FootnoteList = ({
  items,
}: {
  items: { n: number; content: ReactNode }[];
}) => (
  <section className="border-t border-border bg-background">
    <div className="container-wide py-10">
      <p className="meta mb-4 text-foreground">Notes · §</p>
      <ol className="space-y-3 max-w-4xl">
        {items.map((item) => (
          <li
            key={item.n}
            id={`fn-${item.n}`}
            className="grid grid-cols-12 gap-3 text-[13px] text-muted-foreground leading-relaxed scroll-mt-20"
          >
            <span className="col-span-1 font-mono text-[11px] text-primary tabular-nums pt-0.5">
              [{item.n}]
            </span>
            <div className="col-span-11">
              {item.content}{" "}
              <a
                href={`#fnref-${item.n}`}
                className="font-mono text-[10px] text-muted-foreground hover:text-primary ml-1"
                aria-label={`Return to reference ${item.n}`}
              >
                ↩
              </a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
