import { ReactNode } from "react";
import { LearnBreadcrumbs, LearnCrumb } from "./LearnBreadcrumbs";

export type LearnSection = "education" | "faq" | "news" | "home";

/**
 * LearnShell — persistent frame for every /learn/* surface. Renders the
 * breadcrumb rail above whatever the page provides. Pill navigation was
 * removed: Learn is meant to read like a publication, not a filtered
 * database, and the breadcrumbs plus site header already cover wayfinding.
 *
 * The `section` prop is retained for future contextual affordances
 * (analytics, closer variants) but no longer drives visible nav.
 */
export const LearnShell = ({
  crumbs,
  children,
}: {
  crumbs: LearnCrumb[];
  section: LearnSection;
  children: ReactNode;
}) => (
  <>
    <LearnBreadcrumbs items={crumbs} />
    {children}
  </>
);

export default LearnShell;
