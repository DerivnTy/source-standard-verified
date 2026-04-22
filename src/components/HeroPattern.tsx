/**
 * HeroPattern — faint geometric data-grid mesh.
 * Pure SVG, ~8% opacity navy lines on a 32px square grid,
 * radial-masked so it fades to transparent at the edges.
 *
 * Render as an absolutely-positioned background layer inside any
 * relatively-positioned container.
 */
export const HeroPattern = ({
  className = "",
  opacity = 0.08,
  stroke = "foreground",
}: {
  className?: string;
  opacity?: number;
  stroke?: "foreground" | "white";
}) => {
  const strokeColor =
    stroke === "white" ? "#ffffff" : "hsl(var(--foreground))";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="hero-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="hero-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="1" fill={stroke === "white" ? "#ffffff" : "hsl(var(--primary))"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
        <rect width="100%" height="100%" fill="url(#hero-dots)" opacity="0.6" />
      </svg>
    </div>
  );
};

export default HeroPattern;
