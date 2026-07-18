import { Glyph } from "./GlyphIcon";

/**
 * ProcessSteps — lightweight vertical process rail.
 *
 * No cards, no numbered badges. A small check glyph in the gutter and a
 * thin hairline connecting consecutive steps communicate sequence
 * without adding visual weight. The last step draws no trailing
 * connector.
 */
export const ProcessSteps = ({
  steps,
  className = "",
}: {
  steps: { title: string; desc: string }[];
  className?: string;
}) => (
  <ol className={`m-0 p-0 list-none ${className}`}>
    {steps.map((step, i) => {
      const isLast = i === steps.length - 1;
      return (
        <li key={step.title} className="flex gap-3">
          {/* Gutter: glyph + connecting hairline */}
          <div
            className="flex flex-col items-center shrink-0"
            style={{ width: "16px" }}
          >
            <span
              className="text-primary/80 inline-flex items-center justify-center"
              style={{ height: "18px" }}
            >
              <Glyph name="check" size="sm" />
            </span>
            {!isLast && (
              <span
                aria-hidden
                className="bg-border"
                style={{ width: "1px", flex: 1, marginTop: "4px", marginBottom: "4px" }}
              />
            )}
          </div>

          {/* Step body */}
          <div
            className="min-w-0 flex-1"
            style={{ paddingBottom: isLast ? 0 : "28px" }}
          >
            <h3
              className="font-sans text-foreground"
              style={{
                fontSize: "15px",
                lineHeight: 1.3,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {step.title}
            </h3>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                fontWeight: 400,
                marginTop: "4px",
              }}
            >
              {step.desc}
            </p>
          </div>
        </li>
      );
    })}
  </ol>
);

export default ProcessSteps;
