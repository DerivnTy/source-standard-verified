import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { PageShell, Section, PageTitle, Lead, Eyebrow, SectionHeading } from "@/components/system";
import type { EntitySeo, Crumb } from "@/seo/entitySeo";
import type { SiteLink } from "@/seo/internalLinks";

/**
 * EditorialPage — the shared long-form template behind cluster pages
 * and articles. Owns head metadata, breadcrumbs, heading hierarchy
 * (single H1, H2 per section, H3 inside), FAQ rendering, and the
 * internal-link rails at the foot of the page.
 */

export type EditorialSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="border-b border-border">
    <PageShell>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-2">
              {c.path && !last ? (
                <Link
                  to={c.path}
                  className="t-utility-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              ) : (
                <span className="t-utility-xs text-foreground" aria-current={last ? "page" : undefined}>
                  {c.name}
                </span>
              )}
              {!last && (
                <span className="t-utility-xs text-muted-foreground" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </PageShell>
  </nav>
);

const LinkRail = ({ title, links }: { title: string; links: SiteLink[] }) => {
  if (!links.length) return null;
  return (
    <Section surface="muted" width="reading-wide">
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/40"
            >
              <span className="t-body-sm block font-semibold text-foreground">{l.label}</span>
              {l.description && (
                <span className="t-utility-xs mt-1 block normal-case tracking-normal text-muted-foreground">
                  {l.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export const EditorialPage = ({
  seo,
  h1,
  lead,
  meta,
  sections,
  faqs,
  rails,
  children,
}: {
  seo: EntitySeo;
  h1: string;
  lead: string;
  /** Small dateline / category strip under the lead. */
  meta?: string;
  sections: EditorialSection[];
  faqs?: { q: string; a: string }[];
  rails?: { title: string; links: SiteLink[] }[];
  children?: ReactNode;
}) => (
  <>
    <PageMeta
      title={seo.title}
      rawTitle={seo.rawTitle}
      description={seo.description}
      path={seo.path}
      type={seo.type}
      noindex={seo.noindex}
      jsonLd={seo.jsonLd}
    />

    <Breadcrumbs crumbs={seo.crumbs} />

    <Section width="reading-wide" bordered={false}>
      <PageTitle>{h1}</PageTitle>
      <Lead>{lead}</Lead>
      {meta && (
        <p className="t-utility-xs mt-5 text-muted-foreground">{meta}</p>
      )}
    </Section>

    <article>
      {sections.map((s) => (
        <Section key={s.id} id={s.id} width="reading-wide" bordered={false} className="pt-0">
          <SectionHeading size="sm" id={`${s.id}-heading`}>
            {s.heading}
          </SectionHeading>
          <div className="mt-4 space-y-4">
            {s.body.map((p, i) => (
              <p key={i} className="t-body text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          {s.bullets && (
            <ul className="mt-5 space-y-3 border-l border-border pl-5">
              {s.bullets.map((b, i) => (
                <li key={i} className="t-body-sm text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          )}
        </Section>
      ))}
    </article>

    {children}

    {faqs && faqs.length > 0 && (
      <Section width="reading-wide">
        <SectionHeading size="sm" as="h2">
          Common questions
        </SectionHeading>
        <dl className="mt-5 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="t-body font-semibold text-foreground">{f.q}</dt>
              <dd className="t-body mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    )}

    {rails?.map((r) => (
      <LinkRail key={r.title} title={r.title} links={r.links} />
    ))}
  </>
);

export default EditorialPage;
