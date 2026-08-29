/**
 * Canonical public navigation.
 *
 * Single source of truth for SiteHeader and SiteFooter. Adding, renaming, or
 * removing a public page happens here — never in a component.
 */

export type NavRoute = {
  path: string;
  label: string;
};

export type FooterColumn = {
  title: string;
  links: NavRoute[];
};

/** Canonical label for every public route. */
export const ROUTES = {
  home: { path: "/", label: "Home" },
  vendors: { path: "/clinics", label: "Search Clinics" },
  providerIndex: { path: "/clinics/browse", label: "Provider Index" },

  facilities: { path: "/facilities", label: "Facility Records" },
  howItWorks: { path: "/how-it-works", label: "How Verification Works" },
  governance: { path: "/governance", label: "Governance" },
  advisory: { path: "/medical-advisory", label: "Advisory Board" },
  learn: { path: "/learn", label: "Learn" },
  articles: { path: "/articles", label: "Articles" },
  intelligence: { path: "/intelligence", label: "Intelligence" },
  peptides: { path: "/peptides", label: "Peptides" },
  compounding: { path: "/compounding", label: "Compounding" },
  news: { path: "/learn/news", label: "News & Insights" },
  faq: { path: "/learn/faq", label: "Frequently Asked Questions" },
  about: { path: "/about", label: "About" },
  contact: { path: "/contact", label: "Contact" },
  privacy: { path: "/privacy", label: "Privacy" },
  terms: { path: "/terms", label: "Terms" },
  disclaimer: { path: "/verification-disclaimer", label: "Disclaimer" },
  statusDefinitions: { path: "/status-definitions", label: "Status Definitions" },
  apply: { path: "/apply", label: "Apply for Verification" },
  reportConcern: { path: "/report-concern", label: "Report a Concern" },
} as const satisfies Record<string, NavRoute>;

/** Header primary navigation (desktop). */
export const PRIMARY_NAV: NavRoute[] = [
  ROUTES.vendors,
  ROUTES.facilities,
  ROUTES.howItWorks,
  ROUTES.governance,
  ROUTES.learn,
  ROUTES.about,
];

/** Mobile mirrors desktop nav with Home prepended. */
export const MOBILE_NAV: NavRoute[] = [ROUTES.home, ...PRIMARY_NAV];

/** Primary header CTA. */
export const PRIMARY_CTA: NavRoute = ROUTES.apply;

/** Footer information architecture. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Registry",
    links: [ROUTES.vendors, ROUTES.providerIndex, ROUTES.facilities, ROUTES.apply, ROUTES.reportConcern],
  },
  {
    title: "Framework",
    links: [ROUTES.howItWorks, ROUTES.governance, ROUTES.advisory, ROUTES.statusDefinitions, ROUTES.disclaimer],
  },
  {
    // Topic-cluster hubs sit in the footer so every page links into them,
    // giving the clusters a sitewide internal-link path.
    title: "Learn",
    links: [
      ROUTES.learn,
      ROUTES.articles,
      ROUTES.intelligence,
      ROUTES.peptides,
      ROUTES.compounding,
      ROUTES.news,
      ROUTES.faq,
    ],
  },
  {
    title: "Source Standard",
    links: [ROUTES.about, ROUTES.contact, ROUTES.privacy, ROUTES.terms],
  },
];
