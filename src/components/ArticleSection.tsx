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
    <div className="container-wide">
      <div className="max-w-[760px] mx-auto py-2">
        {(n !== undefined || title) && (
          <header className="mt-12 mb-5">
            {n !== undefined && (
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
                §{n}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-[24px] md:text-[26px] leading-[1.2] tracking-[-0.01em] text-foreground">
                {title}
              </h2>
            )}
          </header>
        )}
        <div className="article-body text-[16.5px] leading-[1.75] text-foreground/85 space-y-5">
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
  <footer className="bg-background border-t border-border mt-16">
    <div className="container-wide py-10">
      <div className="max-w-[760px] mx-auto">
        {(back || next) && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div>
              {back && (
                <Link to={back.to} className="block group">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                    ← Previous
                  </p>
                  <p className="text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors">
                    {back.label}
                  </p>
                </Link>
              )}
            </div>
            <div className="md:text-right">
              {next && (
                <Link to={next.to} className="block group">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                    Next →
                  </p>
                  <p className="text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors">
                    {next.label}
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}
        {citation && (
          <p className="mt-10 pt-6 border-t border-border text-[12px] leading-[1.7] text-muted-foreground/80">
            <span className="font-mono uppercase tracking-[0.12em] text-foreground/80 mr-2">
              Cite as ·
            </span>
            {citation}
          </p>
        )}
      </div>
    </div>
  </footer>
);
