import { ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

/* ------------------------------ Content ------------------------------ */

const STEPS: { n: string; title: string; description: string }[] = [
  {
    n: "01",
    title: "Provider enters the registry",
    description:
      "A compounding pharmacy or clinic is added to the Source Standard public registry.",
  },
  {
    n: "02",
    title: "Review of available information",
    description:
      "Source Standard reviews available information for providers undergoing verification.",
  },
  {
    n: "03",
    title: "Public verification status",
    description:
      "A public verification status is assigned and shown on the provider's profile.",
  },
  {
    n: "04",
    title: "Ongoing record maintenance",
    description:
      "Records are periodically reviewed and updated as new public information becomes available.",
  },
];

const MEANS: string[] = [
  "Public sourcing transparency",
  "Independent review within the Source Standard framework",
  "Public verification status",
  "Ongoing record maintenance",
];

const DOES_NOT_MEAN: string[] = [
  "Medical advice",
  "FDA approval",
  "Product approval",
  "Safety guarantee",
  "Treatment recommendation",
  "Future outcome guarantee",
];

/* ------------------------------ Primitives ------------------------------ */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2
    className="mt-2 font-sans text-foreground"
    style={{
      fontSize: "22px",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
    }}
  >
    {children}
  </h2>
);

const Prose = ({ children }: { children: ReactNode }) => (
  <p
    className="mt-3 text-muted-foreground"
    style={{ fontSize: "15px", lineHeight: 1.65, fontWeight: 400, maxWidth: "62ch" }}
  >
    {children}
  </p>
);

const SectionDivider = () => (
  <div
    aria-hidden
    className="my-10 lg:my-12"
    style={{ borderTop: "0.5px solid hsl(var(--border))" }}
  />
);

/* ----------------------------------- Page ----------------------------------- */

const HowItWorks = () => {
  const heroDescription =
    "How Source Standard verification works, what it means, and what it does not mean for consumers.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />

      <PageMeta
        title="How Verification Works · Source Standard"
        description={heroDescription}
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How Verification Works",
          url: "https://sourcestandard.org/how-it-works",
        }}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Public Guide"
        title="How Verification Works"
        statement={heroDescription}
        docId=""
      />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard" style={{ paddingTop: "32px", paddingBottom: "56px" }}>

            {/* §1 · What is Verification? */}
            <section>
              <Eyebrow>What is verification?</Eyebrow>
              <SectionTitle>What Is Verification?</SectionTitle>
              <Prose>
                Source Standard verification is a public reference standard. It gives consumers a
                consistent way to see whether a compounding pharmacy or clinic has undergone
                independent review of the sourcing information it publishes.
              </Prose>
              <Prose>
                Verification is not a clinical, medical, or regulatory certification. It is a
                transparency signal about publicly available sourcing information.
              </Prose>
            </section>

            <SectionDivider />

            {/* §2 · How Verification Works, 4-step flow */}
            <section>
              <Eyebrow>How it works</Eyebrow>
              <SectionTitle>How Does Verification Work?</SectionTitle>

              <ol
                className="mt-6 grid grid-cols-1 md:grid-cols-4"
                style={{ gap: 0 }}
              >
                {STEPS.map((s, i) => (
                  <li
                    key={s.n}
                    className="relative"
                    style={{
                      padding: "16px 0 16px 0",
                      borderTop: "0.5px solid hsl(var(--border))"...(i > 0
                        ? {
                            // Vertical hairline connector on desktop
                          }
                        : {}),
                    }}
                  >
                    <div
                      className="md:pr-5"
                      style={{
                        borderRight:
                          i < STEPS.length - 1
                            ? "0.5px solid hsl(var(--border) / 0.6)"
                            : undefined,
                        paddingRight: i < STEPS.length - 1 ? "20px" : undefined,
                        marginRight: i < STEPS.length - 1 ? "20px" : undefined,
                      }}
                    >
                      <span
                        className="font-mono tabular-nums"
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        {s.n}
                      </span>
                      <h3
                        className="mt-2 font-sans text-foreground"
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          lineHeight: 1.3,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="mt-1.5 text-muted-foreground"
                        style={{ fontSize: "13.5px", lineHeight: 1.55, fontWeight: 400 }}
                      >
                        {s.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <SectionDivider />

            {/* §3 · What Verification Means */}
            <section>
              <Eyebrow>What verification means</Eyebrow>
              <SectionTitle>What Does Verified Mean?</SectionTitle>
              <ul className="mt-5 flex flex-col" style={{ gap: "10px" }}>
                {MEANS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                    style={{ fontSize: "15px", lineHeight: 1.5 }}
                  >
                    <Check
                      size={14}
                      strokeWidth={1.75}
                      className="mt-1 shrink-0 text-foreground"
                      aria-hidden
                    />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <SectionDivider />

            {/* §4 · What Verification Does Not Mean */}
            <section>
              <Eyebrow>What verification does not mean</Eyebrow>
              <SectionTitle>What Does Verified Not Mean?</SectionTitle>
              <ul className="mt-5 flex flex-col" style={{ gap: "10px" }}>
                {DOES_NOT_MEAN.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                    style={{ fontSize: "15px", lineHeight: 1.5 }}
                  >
                    <Minus
                      size={14}
                      strokeWidth={1.75}
                      className="mt-1 shrink-0 text-muted-foreground/70"
                      aria-hidden
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <SectionDivider />

            {/* §5 · Why It Matters */}
            <section>
              <Eyebrow>Why it matters</Eyebrow>
              <SectionTitle>Why Does This Matter?</SectionTitle>
              <Prose>
                Source Standard exists to bring public transparency to the compounded peptide
                market. By reviewing sourcing information and publishing verification status,
                Source Standard helps consumers, clinicians, and healthcare organizations
                understand where their care comes from.
              </Prose>
              <Prose>
                Verification is one input among many. It is intended to support informed
                decision-making, not to replace medical judgment or regulatory oversight.
              </Prose>
            </section>

            {/* §6 · Disclaimer footer */}
            <div
              className="mt-12 pt-6"
              style={{ borderTop: "0.5px solid hsl(var(--border))" }}
            >
              <p
                className="text-muted-foreground"
                style={{ fontSize: "12px", lineHeight: 1.6, fontWeight: 400 }}
              >
                Source Standard does not provide medical advice, treatment guidance, or clinical
                recommendations. Verification reflects only publicly reviewed sourcing information
                within the Source Standard framework. Unverified status does not imply that a
                provider is unsafe, unlawful, fraudulent, or clinically inappropriate. Source
                Standard does not certify product potency, sterility, safety, efficacy,
                manufacturing quality, or future performance, and does not replace federal, state,
                or medical regulatory oversight.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
