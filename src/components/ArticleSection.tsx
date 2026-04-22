import { ReactNode } from "react";
import { Link } from "react-router-dom";

export { BoardDefList } from "@/components/BoardSection";

/**
 * ArticleSection — editorial section primitive for Library article pages.
 *
 * Single 760px reading column. Sections are separated by typographic
 * rhythm (vertical spacing) rather than full-width hairline bands. Body
 * text is locked to the editorial 16.5px / 1.75 reading scale.
 */
export const ArticleSection = ({
  n,
  title,
  id,
  children,
}: {
  n?: string | number;
  title?: string;
  id?: string;
  children: ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 bg-background">
    <div className="page-shell">
      <div className="mx-auto w-reading-wide py-2">
        {(n !== undefined || title) && (
          <header className="mt-10 mb-5">
            <h2 className="t-section-title-sm text-foreground">
              {n !== undefined && (
                <span className="font-mono text-[16px] leading-none uppercase tracking-[0.08em] text-muted-foreground mr-3 align-baseline">
                  §{n}
                </span>
              )}
              {title}
            </h2>
          </header>
        )}
        <div className="article-body t-body-md text-foreground/85 space-y-5">
          {children}
        </div>
      </div>
    </div>
  </section>
);

/**
 * ArticleFooter — quiet prev/next + cite-as for Library article pages.
 */
export const ArticleFooter = ({
  back,
  next,
  citation,
}: {
  back?: { to: string; label: string };
  next?: { to: string; label: string };
  citation?: string;
}) => (
  <footer className="bg-background border-t border-border mt-10">
    <div className="page-shell py-8">
      <div className="mx-auto w-reading-wide">
        {(back || next) && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div>
              {back && (
                <Link to={back.to} className="block group">
                  <p className="t-utility-xs text-muted-foreground mb-1.5">
                    ← Previous
                  </p>
                  <p className="t-body-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                    {back.label}
                  </p>
                </Link>
              )}
            </div>
            <div className="md:text-right">
              {next && (
                <Link to={next.to} className="block group">
                  <p className="t-utility-xs text-muted-foreground mb-1.5">
                    Next →
                  </p>
                  <p className="t-body-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                    {next.label}
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}
        {/* Citation removed sitewide — doc ID + updated date live in top metadata bar */}
        {void citation}
      </div>
    </div>
  </footer>
);
