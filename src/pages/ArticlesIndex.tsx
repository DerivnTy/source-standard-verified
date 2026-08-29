import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { Section, PageTitle, Lead, Eyebrow, SectionHeading } from "@/components/system";
import { ARTICLES } from "@/data/articles";
import { CLUSTERS, CLUSTER_PAGES, type ClusterId } from "@/seo/clusters";
import { breadcrumbLd, publisherLd } from "@/seo/entitySeo";
import { absoluteUrl } from "@/lib/siteUrl";

const CLUSTER_ORDER: ClusterId[] = ["peptides", "compounding"];

const ArticlesIndex = () => {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <>
      <PageMeta
        title="Articles: Peptide Sourcing, Testing and Compounding"
        description="Plain-language answers to the questions people ask about peptide sourcing, testing, certificates of analysis, and compounding pharmacy regulation."
        path="/articles"
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Source Standard Articles",
            url: absoluteUrl("/articles"),
            publisher: publisherLd,
            hasPart: ARTICLES.map((a) => ({
              "@type": "Article",
              headline: a.question,
              url: absoluteUrl(`/articles/${a.slug}`),
              datePublished: a.published,
              dateModified: a.updated,
            })),
          },
        ]}
      />

      <Section width="reading-wide" bordered={false}>
        <Eyebrow>Articles</Eyebrow>
        <PageTitle>Questions about sourcing, testing, and compounding</PageTitle>
        <Lead>
          Every article answers a question people actually search, using only what can be
          supported. Where a factual answer depends on information Source Standard does not
          hold, the article says so rather than filling the gap.
        </Lead>
      </Section>

      {CLUSTER_ORDER.map((cid) => {
        const cluster = CLUSTERS[cid];
        const items = ARTICLES.filter((a) => a.cluster === cid);
        const pages = CLUSTER_PAGES.filter((p) => p.cluster === cid);
        return (
          <Section key={cid} width="reading-wide">
            <Eyebrow>{cluster.label}</Eyebrow>
            <SectionHeading size="sm">{cluster.blurb}</SectionHeading>

            <ul className="mt-6 space-y-4">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/articles/${a.slug}`}
                    className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/40"
                  >
                    <h3 className="t-body font-semibold text-foreground">{a.question}</h3>
                    <p className="t-body-sm mt-2 text-muted-foreground">{a.standfirst}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {pages.map((p) => (
                <Link
                  key={p.path}
                  to={p.path}
                  className="t-utility-xs rounded-full border border-border px-4 py-2 text-foreground transition-colors hover:border-foreground/50"
                >
                  {p.navLabel}
                </Link>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
};

export default ArticlesIndex;
