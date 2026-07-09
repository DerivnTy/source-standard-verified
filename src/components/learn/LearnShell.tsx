import { ReactNode } from "react";
import { LearnBreadcrumbs, LearnCrumb } from "./LearnBreadcrumbs";
import { LearnSecondaryNav, LearnSection } from "./LearnSecondaryNav";

/**
 * LearnShell — persistent frame for every /learn/* surface. Provides:
 *   • Breadcrumb rail (always)
 *   • Section pill nav (optional, landing pages only)
 *
 * Places its chrome above whatever the page renders. Pages continue to
 * own their own hero, sections, and footer strips.
 */
export const LearnShell = ({
  crumbs,
  section,
  showNav = false,
  children,
}: {
  crumbs: LearnCrumb[];
  section: LearnSection;
  showNav?: boolean;
  children: ReactNode;
}) => (
  <>
    <LearnBreadcrumbs items={crumbs} />
    {showNav && <LearnSecondaryNav active={section} />}
    {children}
  </>
);

export default LearnShell;
