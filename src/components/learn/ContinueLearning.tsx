import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Destination = {
  to: string;
  title: string;
  description: string;
  cta: string;
};

const DESTINATIONS: Destination[] = [
  {
    to: "/learn/education",
    title: "Education",
    description:
      "Plain-language articles explaining sourcing, verification, facilities, and providers.",
    cta: "Browse Education",
  },
  {
    to: "/learn/faq",
    title: "Frequently Asked Questions",
    description:
      "Quick answers to the questions consumers ask most often.",
    cta: "Browse FAQs",
  },
  {
    to: "/learn/news",
    title: "News & Insights",
    description:
      "Updates on regulations, industry developments, and Source Standard announcements.",
    cta: "Browse News",
  },
];

/**
 * ContinueLearning — canonical editorial closer for every Learn surface.
 * Three navigation cards, one per Learn section. Filters out the caller's
 * own section so users are always pointed somewhere new.
 */
export const ContinueLearning = ({ exclude }: { exclude?: string }) => {
  const items = exclude
    ? DESTINATIONS.filter((d) => d.to !== exclude)
    : DESTINATIONS;

  return (
    <section
      className="bg-background border-t border-border/60"
      style={{ paddingTop: "40px", paddingBottom: "48px" }}
    >
      <div className="page-shell">
        <div className="mx-auto w-standard">
          <header style={{ marginBottom: "20px" }}>
            <h2
              className="font-sans text-foreground"
              style={{
                fontSize: "22px",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Continue Learning
            </h2>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                marginTop: "8px",
                marginBottom: 0,
                maxWidth: "64ch",
              }}
            >
              Explore another part of the Source Standard knowledge library.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {items.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="group flex flex-col bg-card hover:bg-muted/50 transition-colors h-full"
                style={{
                  border: "0.5px solid hsl(var(--border))",
                  borderRadius: "12px",
                  padding: "20px 22px",
                }}
              >
                <h3
                  className="font-sans text-foreground group-hover:text-primary transition-colors"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.3,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {d.title}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    marginTop: "10px",
                    marginBottom: "18px",
                  }}
                >
                  {d.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-foreground mt-auto"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "-0.005em",
                  }}
                >
                  <span>{d.cta}</span>
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-[3px]"
                    style={{ width: 14, height: 14 }}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinueLearning;
