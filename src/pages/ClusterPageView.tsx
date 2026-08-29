import { Navigate, useLocation } from "react-router-dom";

import { EditorialPage } from "@/components/seo/EditorialPage";
import { clusterSeo } from "@/seo/entitySeo";
import { CLUSTERS, getClusterPage, clusterSpokes } from "@/seo/clusters";
import { articleLinks, clusterNavLinks, type SiteLink } from "@/seo/internalLinks";

/**
 * Single renderer for every topic-cluster page (hubs and spokes).
 * Route data comes from src/seo/clusters.ts, so adding a spoke is a
 * data change plus one route entry.
 */
const ClusterPageView = () => {
  const { pathname } = useLocation();
  const page = getClusterPage(pathname.replace(/\/$/, "") || "/");

  if (!page) return <Navigate to="/" replace />;

  const seo = clusterSeo(page);
  const hub = CLUSTERS[page.cluster];

  const rails: { title: string; links: SiteLink[] }[] = [];

  if (page.isHub) {
    rails.push({ title: `In this section`, links: clusterNavLinks(page.cluster) });
  } else {
    const siblings = clusterSpokes(page.cluster)
      .filter((p) => p.path !== page.path)
      .map((p) => ({ to: p.path, label: p.navLabel, description: p.metaDescription }));
    rails.push({
      title: `More in ${hub.label}`,
      links: [{ to: hub.path, label: `${hub.label} overview`, description: hub.blurb }, ...siblings],
    });
  }

  const related = articleLinks(page.relatedArticles);
  if (related.length) rails.push({ title: "Related reading", links: related });

  rails.push({
    title: "Check a specific organisation",
    links: [
      { to: "/clinics", label: "Clinic directory", description: "Search clinic records and verification status." },
      { to: "/facilities", label: "Facility records", description: "Compounding pharmacies and outsourcing facilities." },
      { to: "/how-it-works", label: "How verification works", description: "What Source Standard reviews, and what it does not." },
    ],
  });

  return (
    <EditorialPage
      seo={seo}
      h1={page.h1}
      lead={page.lead}
      meta={`Updated ${new Date(page.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
      sections={page.sections}
      faqs={page.faqs}
      rails={rails}
    />
  );
};

export default ClusterPageView;
