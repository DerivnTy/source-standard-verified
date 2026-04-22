import { Helmet } from "react-helmet-async";

/**
 * PageMeta — standardized <title> / <meta description> for every page.
 * Format: "{title} | Source Standard — The Clinical Transparency Framework"
 */
export const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const fullTitle = `${title} | Source Standard, The Clinical Transparency Framework`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};
