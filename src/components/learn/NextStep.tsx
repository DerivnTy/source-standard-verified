import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { NEXT_STEPS, NextStepId } from "@/data/learn";

/**
 * NextStep, the "Still have questions?" closer that ends every Learn page.
 * Presents one primary next step and a set of secondary options so the page
 * never dead-ends.
 */
export const NextStep = ({
  primary,
  eyebrow = "Still have questions?",
}: {
  primary: NextStepId;
  eyebrow?: string;
}) => {
  const primaryStep = NEXT_STEPS[primary];
  const secondaryIds: NextStepId[] = (
    [
      "vendor-registry",
      "facility-records",
      "how-verification-works",
      "contact",
    ] as NextStepId[]
  ).filter((id) => id !== primary);

  return (
    <section
      className="bg-background"
      style={{ paddingTop: "24px", paddingBottom: "48px" }}
    >
      <div className="page-shell">
        <div className="mx-auto w-reading-wide">
          <div
            style={{
              border: "0.5px solid hsl(var(--border))",
              borderRadius: "12px",
              background: "hsl(var(--card))",
              padding: "24px",
            }}
          >
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.08em" }}
            >
              {eyebrow}
            </p>
            <h2
              className="t-section-title-sm text-foreground tracking-tight"
              style={{ marginTop: "6px" }}
            >
              {primaryStep.label}
            </h2>

            <div
              style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              <Link
                to={primaryStep.to}
                className="inline-flex items-center gap-1 font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97]"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  height: "32px",
                  padding: "0 14px",
                  borderRadius: "20px",
                  border: "1px solid hsl(var(--foreground))",
                  backgroundColor: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                }}
              >
                {primaryStep.label}
                <ChevronRight aria-hidden style={{ width: "12px", height: "12px", strokeWidth: 1.75 }} />
              </Link>

              {secondaryIds.map((id) => {
                const step = NEXT_STEPS[id];
                return (
                  <Link
                    key={id}
                    to={step.to}
                    className="inline-flex items-center gap-1 font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97] hover:bg-[hsl(var(--muted))]/40"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                      height: "32px",
                      padding: "0 14px",
                      borderRadius: "20px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "#FFFFFF",
                      color: "hsl(var(--foreground) / 0.85)",
                    }}
                  >
                    {step.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
