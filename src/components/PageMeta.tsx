import { Helmet } from "react-helmet-async";
import { absoluteUrl, SITE_URL } from "@/lib/siteUrl";

type JsonLd = Record<string, unknown>;

/**
 * PageMeta — standardized <title>, meta description, canonical, OG/Twitter,
 * and optional JSON-LD for every page.
 *
 * This component is non-visible. It only writes into <head>. Existing
 * call sites that pass only `title` / `description` keep working unchanged.
 */
export const PageMeta = ({
  title,
  description,
  path,
  image,
  type = "website",
  noindex,
  jsonLd,
}: {
  title: string;
  description?: string;
  /** Site-relative path (e.g. "/directory/acme"). Drives canonical + og:url. */
  path?: string;
  /** Absolute or site-relative image URL for OG/Twitter cards. */
  image?: string;
  /** og:type — "website" | "article" | "profile" | etc. */
  type?: string;
  /** When true, emits <meta name="robots" content="noindex,follow">. */
  noindex?: boolean;
  /** One or more schema.org JSON-LD objects. */
  jsonLd?: JsonLd | JsonLd[];
}) => {
  const fullTitle = `${title} | Source Standard · The Clinical Transparency Framework`;
  const canonical = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : `${SITE_URL}/placeholder.svg`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex,follow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Source Standard" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {ldArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};
