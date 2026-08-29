import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { Section, PageTitle, Lead, Eyebrow, SectionHeading } from "@/components/system";
import { ARTICLES } from "@/data/articles";
import { INTEL_CATEGORIES } from "@/data/intelArticles";
import { breadcrumbLd, publisherLd } from "@/seo/entitySeo";
import { absoluteUrl } from "@/lib/siteUrl";

/**
 * Intelligence — Source Standard's Research & Insights index.
 *
 * Groups every categorised article by its intelligence category. Articles
 * keep their canonical /articles/:slug URL; this page is a crawlable hub
 * that links into all of them.
 */

const INTEL = ARTICLES.filter((a) => a.category);

const CATEGORY_BLURB: Record<string, string> = {
  "Regulatory Updates": "FDA actions, import controls, and enforcement that change what is knowable about a product.",
  Research: "Published trials and analyses, reported with their stated limitations.",
  "Recalls & Safety": "Recalls and adverse-event reports, and what they reveal about product quality questions.",
  "Testing & Quality": "What individual assays establish, and what they leave open.",
  "Sourcing & Transparency": "Where products originate, who documents that, and what remains unverified.",
  Guides: "Structured guidance for evaluating products, clinics, and documentation.",
};

const Intelligence = () => {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Intelligence", path: "/intelligence" },
  ];

  return (
    <>
      <PageMeta
        title="Intelligence: Regulatory, Research and Sourcing Updates | Source Standard"
        rawTitle
        description="Source Standard's research and insights record: FDA regulatory updates, recalls, published research, testing analysis, and sourcing transparency, each traced to a primary source."
        path="/intelligence"
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Source Standard Intelligence",
            url: absoluteUrl("/intelligence"),
            publisher: publisherLd,
            hasPart: INTEL.map((a) => ({
              "@type": "Article",
              headline: a.metaTitle,
              url: absoluteUrl(`/articles/${a.slug}`),
              datePublished: a.published,
              dateModified: a.updated,
            })),
          },
        ]}
      />

      <Section width="reading-wide" bordered={false}>
        <Eyebrow>Research &amp; Insights</Eyebrow>
        <PageTitle>Intelligence</PageTitle>
        <Lead>
          Regulatory actions, recalls, published research, and sourcing analysis. Every entry
          states its primary source, and no claim is made beyond what that source supports.
        </Lead>
      </Section>

      {INTEL_CATEGORIES.map((cat) => {
        const items = INTEL.filter((a) => a.category === cat);
        if (!items.length) return null;
        return (
          <Section key={cat} width="reading-wide">
            <Eyebrow>{cat}</Eyebrow>
            <SectionHeading size="sm">{CATEGORY_BLURB[cat]}</SectionHeading>
            <ul className="mt-6 space-y-4">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/articles/${a.slug}`}
                    className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/40"
                  >
                    <h3 className="t-body font-semibold text-foreground">{a.metaTitle}</h3>
                    <p className="t-body-sm mt-2 text-muted-foreground">{a.standfirst}</p>
                    {a.source && (
                      <p className="t-utility-xs mt-3 text-muted-foreground">
                        Source: {a.source.name}
                        {a.source.date ? ` · ${a.source.date}` : ""}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
};

export default Intelligence;
