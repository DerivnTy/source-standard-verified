import { Navigate, useParams } from "react-router-dom";

import { EditorialPage } from "@/components/seo/EditorialPage";
import { getArticle } from "@/data/articles";
import { articleSeo } from "@/seo/entitySeo";
import { CLUSTERS } from "@/seo/clusters";
import { siblingArticles, type SiteLink } from "@/seo/internalLinks";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const ArticlePage = () => {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  if (!article) return <Navigate to="/articles" replace />;

  const seo = articleSeo(article);

  const rails: { title: string; links: SiteLink[] }[] = [
    { title: "Related articles", links: siblingArticles(article.slug, 4) },
  ];

  const contextual: SiteLink[] = [];
  if (article.cluster) {
    const c = CLUSTERS[article.cluster];
    contextual.push({ to: c.path, label: `${c.label} overview`, description: c.blurb });
  }
  for (const p of article.relatedPaths ?? []) contextual.push({ to: p.to, label: p.label });
  contextual.push({
    to: "/clinics",
    label: "Clinic directory",
    description: "Look up a specific clinic and its Source Standard verification status.",
  });
  rails.push({ title: "Go deeper", links: contextual });

  const metaLine = [
    `Published ${fmt(article.published)}`,
    article.updated !== article.published ? `Updated ${fmt(article.updated)}` : null,
    "Source Standard editorial",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <EditorialPage
      seo={seo}
      h1={article.question}
      lead={article.standfirst}
      meta={metaLine}
      sections={article.sections}
      faqs={article.faqs}
      rails={rails}
    />
  );
};

export default ArticlePage;
