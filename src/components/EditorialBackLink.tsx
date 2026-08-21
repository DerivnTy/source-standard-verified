/**
 * Quiet close under the last page section so copy does not sit on the footer.
 * The visible back-link was removed; it read as an orphan exit.
 */
export const EditorialBackLink = (_props: {
  to?: string;
  label?: string;
}) => <div aria-hidden className="bg-background" style={{ height: "20px" }} />;
