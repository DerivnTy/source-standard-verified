import { PageMeta } from "@/components/PageMeta";
import { Link } from "react-router-dom";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection } from "@/components/system";
import openLogo from "@/assets/open-logo-transparent.png.asset.json";

const PARTNER_CATEGORIES = [
  { t: "Independent Laboratories", d: "Perform independent testing to verify the quality and integrity of compounded therapies." },
  { t: "Healthcare Organizations", d: "Provide clinical expertise and guidance supporting transparent healthcare practice." },
  { t: "Compounding Facilities", d: "Supply therapies manufactured to established quality and sourcing standards." },
  { t: "Medical Advisors", d: "Offer independent clinical oversight that keeps verification objective and evidence-based." },
  { t: "Research Partners", d: "Contribute data and insights that improve transparency across the supply chain." },
];

const Partners = () => (
  <>
    <PageMeta
      title="Partners"
      description="Independent organizations, laboratories, physicians, and partners that support the Source Standard verification ecosystem."
      path="/partners"
    />

    <BriefingHero
      tone="navy"
      variant="chapter"
      category="Partners"
      title="Who Helps Keep Source Standard Independent?"
      statement="Independent organizations, laboratories, physicians, and researchers that support the Source Standard verification ecosystem."
      docId=""
    />

    {/* Movement 1 — Statement. One paragraph, no section heading. */}
    <section className="border-b border-border bg-background" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="page-shell">
        <div className="mx-auto w-standard" style={{ maxWidth: "68ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "17px", lineHeight: 1.6, margin: 0, letterSpacing: "-0.005em" }}
          >
            Consumers should not have to rely on a company's own claims about its products. Transparency is stronger when multiple independent parties contribute to it. Source Standard works with independent laboratories, clinicians, and researchers — kept intentionally separate from the framework itself — to preserve that independence.
          </p>
        </div>
      </div>
    </section>

    {/* Movement 2 — Categories. Definition list, not a feature grid. */}
    <PageSection title="Partner categories" compact>
      <dl className="divide-y divide-border/60 border-t border-b border-border/60">
        {PARTNER_CATEGORIES.map((c) => (
          <div
            key={c.t}
            className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-8 gap-y-1 py-3.5"
          >
            <dt className="font-sans text-foreground" style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
              {c.t}
            </dt>
            <dd className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              {c.d}
            </dd>
          </div>
        ))}
      </dl>
    </PageSection>

    {/* Movement 3 — Open partner spotlight. Unboxed. */}
    <PageSection title="Open · Clinical intelligence partner" bordered={false}>
      <div className="flex flex-col gap-5" style={{ maxWidth: "68ch" }}>
        <img
          src={openLogo.url}
          alt="Open"
          className="h-10 w-auto md:h-12"
          loading="lazy"
          style={{ marginLeft: "-2px" }}
        />
        <p className="text-foreground" style={{ fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
          Open is a physician-led organization focused on helping healthcare professionals better understand clinical outcomes and response patterns for compounded therapies.
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
          Source Standard verifies where therapies come from. Open studies what happens after they are used. Together the two organizations provide different layers of transparency — one at the source, and one at the point of care.
        </p>
        <div>
          <Link
            to="/contact"
            className="font-sans text-foreground hover:text-primary transition-colors"
            style={{ fontSize: "14px", fontWeight: 500, textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: "4px" }}
          >
            Contact Source Standard ›
          </Link>
        </div>
      </div>
    </PageSection>
  </>
);

export default Partners;
