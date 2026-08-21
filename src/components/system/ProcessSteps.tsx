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
  steps: { title: string; desc?: string }[];
  className?: string;
}) => (
  <ol className={`m-0 list-none p-0 text-left ${className}`}>
    {steps.map((step, i) => {
      const isLast = i === steps.length - 1;
      return (
        <li key={step.title} className="flex gap-4">
          {/* Gutter: glyph + connecting hairline */}
          <div
            className="flex flex-col items-center shrink-0"
            style={{ width: "20px" }}
          >
            <span
              className="text-primary/80 inline-flex items-center justify-center"
              style={{ height: "20px" }}
            >
              <Glyph name="check" size="md" />
            </span>
            {!isLast && (
              <span
                aria-hidden
                className="bg-border"
                style={{ width: "1px", flex: 1, marginTop: "6px", marginBottom: "6px" }}
              />
            )}
          </div>

          {/* Step body */}
          <div
            className="min-w-0 flex-1"
            style={{ paddingBottom: isLast ? 0 : "14px" }}
          >
            <h3
              className="font-sans text-foreground"
              style={{
                fontSize: "15px",
                lineHeight: 1.45,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {step.title}
            </h3>
            {step.desc ? (
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "14.5px",
                  lineHeight: 1.65,
                  fontWeight: 400,
                  marginTop: "6px",
                }}
              >
                {step.desc}
              </p>
            ) : null}
          </div>
        </li>
      );
    })}
  </ol>
);

export default ProcessSteps;
