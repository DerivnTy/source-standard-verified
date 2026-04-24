/**
 * VerifiedShieldMark — inline SVG shield used in Verified status groups.
 * Renders without an image request to avoid late-loading flashes.
 * Sized via height (default 22px); width auto-derives from viewBox.
 */
export const VerifiedShieldMark = ({
  height = 22,
  color = "#001021",
}: {
  height?: number;
  color?: string;
}) => (
  <svg
    viewBox="0 0 24 28"
    aria-hidden="true"
    focusable="false"
    style={{
      height: `${height}px`,
      width: "auto",
      display: "block",
      color,
    }}
  >
    <path
      d="M12 1 L22 4 V13 C22 19.5 17.5 24.5 12 27 C6.5 24.5 2 19.5 2 13 V4 Z"
      fill="currentColor"
    />
  </svg>
);
