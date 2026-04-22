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
  cellSize = 32,
}: {
  className?: string;
  opacity?: number;
  stroke?: "foreground" | "white";
  cellSize?: number;
}) => {
  const strokeColor =
    stroke === "white" ? "#ffffff" : "hsl(var(--foreground))";
  const patternId = `hero-grid-${cellSize}`;
  const dotsId = `hero-dots-${cellSize}`;
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
            id={patternId}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id={dotsId}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="1" fill={stroke === "white" ? "#ffffff" : "hsl(var(--primary))"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <rect width="100%" height="100%" fill={`url(#${dotsId})`} opacity="0.6" />
      </svg>
    </div>
  );
};

export default HeroPattern;
