export type Crumb = { label: string; to?: string };

/**
 * Breadcrumb — retired sitewide.
 *
 * The thin contextual breadcrumb bar was removed on user request: it
 * served no navigational purpose given the SiteHeader + page-level
 * back links already establish location. The component is kept as a
 * no-op so existing imports across pages continue to compile.
 */
export const Breadcrumb = (_: { items: Crumb[] }) => null;
