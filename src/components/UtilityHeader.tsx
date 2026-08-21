import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

/**
 * UtilityHeader shares the same navy intro as PageHeader.
 * Kept as a named export so existing page imports continue to compile.
 */
export const UtilityHeader = ({
  eyebrow,
  title,
  description,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => (
  <PageHeader eyebrow={eyebrow} title={title} description={description}>
    {children}
  </PageHeader>
);
