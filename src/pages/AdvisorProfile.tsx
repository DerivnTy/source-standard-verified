import { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { advisoryBoard } from "@/data/advisoryBoard";

/* ------------------------------------------------------------------
 * Local primitives, shared across ALL board-member profiles.
 * Mirror the GovCard / GovRow language used on MedicalAdvisory.tsx
 * so the profile detail pages read as one unified governance record.
 * ------------------------------------------------------------------ */

const GovCard = ({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) => (
  <div
    className={`bg-card ${className}`}
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: padded ? "24px" : "0",
    }}
  >
    {children}
  </div>
);

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="eyebrow mb-4 text-muted-foreground">{children}</p>
);

const GovRow = ({
  index,
  title,
}: {
  index: string;
  title: ReactNode;
}) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "12px 16px",
    }}
  >
    <div className="grid grid-cols-12 gap-3 items-baseline">
      <div className="col-span-2 sm:col-span-1 font-mono text-[10px] tabular-nums text-muted-foreground/70">
        {index}
      </div>
      <div className="col-span-10 sm:col-span-11 t-body-sm text-foreground/90 leading-relaxed">
        {title}
      </div>
    </div>
  </div>
);

const MetaCell = ({ label, value }: { label: string; value?: ReactNode }) => (
  <div>
    <dt className="meta-label text-muted-foreground/80">{label}</dt>
    <dd className="mt-1 t-body-sm text-foreground">{value || "—"}</dd>
  </div>
);

/* ------------------------------------------------------------------ */

const AdvisorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = advisoryBoard.find((m) => m.slug === slug);

  if (!member) {
    return (
      <section className="container-wide py-24">
        <p className="meta mb-3">§ · Not Found</p>
        <h1 className="t-h3">
          Advisor profile not found.
        </h1>
        <p className="mt-3 t-body-sm text-muted-foreground">
          This board seat record does not exist or has been retired.
        </p>
        <Link
          to="/medical-advisory"
          className="mt-6 inline-flex items-center gap-2 t-utility-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Advisory Board
        </Link>
      </section>
    );
  }

  const focusPreview = member.clinicalFocus.slice(0, 2).join(", ") +
    (member.clinicalFocus.length > 2 ? ` +${member.clinicalFocus.length - 2}` : "");

  return (
    <>
      <PageMeta
        title={`${member.name} · ${member.boardTitle}`}
        description={`Medical Advisory Board profile: ${member.name}, ${member.credentials}. ${member.specialization}.`}
        path={`/medical-advisory/${member.slug}`}
        type="profile"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: member.name,
            jobTitle: member.boardTitle,
            description: member.specialization,
            url: `https://sourcestandard.org/medical-advisory/${member.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sourcestandard.org/" },
              { "@type": "ListItem", position: 2, name: "Medical Advisory", item: "https://sourcestandard.org/medical-advisory" },
              { "@type": "ListItem", position: 3, name: member.name, item: `https://sourcestandard.org/medical-advisory/${member.slug}` },
            ],
          },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Medical Advisory", to: "/medical-advisory" },
          { label: member.name },
        ]}
      />

      {/* Back link strip */}
      <div className="container-wide" style={{ paddingTop: "32px", paddingBottom: "20px" }}>
        <Link
          to="/medical-advisory"
          className="inline-flex items-center gap-2 t-utility-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Advisory Board
        </Link>
      </div>

      {/* Profile record */}
      <div className="container-wide" style={{ paddingBottom: "64px" }}>
        <div className="space-y-5">
          {/* Identity card */}
          <GovCard>
            <p className="eyebrow text-muted-foreground">
              Medical Advisory Board · {member.boardTitle}
            </p>
            <div className="mt-4 flex items-start gap-4">
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={128}
                height={128}
                className="h-16 w-16 rounded-[2px] object-cover border border-border bg-surface-muted shrink-0"
              />
              <div className="min-w-0">
                <h1 className="t-h3 text-foreground leading-tight">{member.name}</h1>
                <p className="mt-1 t-body-sm text-muted-foreground">
                  {member.credentials}
                </p>
              </div>
            </div>

            <div
              className="mt-5 pt-5"
              style={{ borderTop: "0.5px solid hsl(var(--border))" }}
            >
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
                <MetaCell label="Board Role" value={member.boardTitle} />
                <MetaCell label="Specialization" value={member.specialization} />
                <MetaCell label="Jurisdiction" value={member.jurisdiction} />
                <MetaCell label="Practicing" value={member.yearsPracticing} />
                <div className="col-span-2">
                  <MetaCell label="Clinical Focus" value={focusPreview} />
                </div>
              </dl>
            </div>

            {member.shortSummary && (
              <p
                className="mt-5 pt-5 t-body-sm text-muted-foreground leading-relaxed"
                style={{ borderTop: "0.5px solid hsl(var(--border))" }}
              >
                {member.shortSummary}
              </p>
            )}
          </GovCard>

          {/* Biography */}
          <GovCard>
            <SectionLabel>Biography</SectionLabel>
            <p className="t-body-sm text-foreground/90 leading-relaxed">
              {member.biography}
            </p>
          </GovCard>

          {/* Background */}
          <section>
            <SectionLabel>Background &amp; Training</SectionLabel>
            <div className="space-y-2">
              {member.background.map((b, i) => (
                <GovRow
                  key={i}
                  index={(i + 1).toString().padStart(2, "0")}
                  title={b}
                />
              ))}
            </div>
          </section>

          {/* Accomplishments */}
          <section>
            <SectionLabel>Key Accomplishments</SectionLabel>
            <div className="space-y-2">
              {member.accomplishments.map((a, i) => (
                <GovRow
                  key={i}
                  index={(i + 1).toString().padStart(2, "0")}
                  title={a}
                />
              ))}
            </div>
          </section>

          {/* Framework Role */}
          <GovCard>
            <SectionLabel>Framework Role</SectionLabel>
            <div className="space-y-5">
              <div>
                <p className="meta-label text-muted-foreground/80 mb-2">
                  Why This Sector
                </p>
                <p className="t-body-sm text-foreground/90 leading-relaxed">
                  {member.whyTheyCare}
                </p>
              </div>
              <div
                className="pt-5"
                style={{ borderTop: "0.5px solid hsl(var(--border))" }}
              >
                <p className="meta-label text-muted-foreground/80 mb-2">
                  Contribution to Standard
                </p>
                <p className="t-body-sm text-foreground/90 leading-relaxed">
                  {member.contribution}
                </p>
              </div>
            </div>
          </GovCard>

          {/* Clinical Focus */}
          <section>
            <SectionLabel>Clinical Focus</SectionLabel>
            <div className="space-y-2">
              {member.clinicalFocus.map((f, i) => (
                <GovRow
                  key={i}
                  index={(i + 1).toString().padStart(2, "0")}
                  title={f}
                />
              ))}
            </div>
          </section>

          {/* Mission Statement */}
          <GovCard>
            <SectionLabel>Mission Statement</SectionLabel>
            <blockquote className="t-body-sm text-foreground leading-relaxed font-light italic border-l-2 border-primary pl-5">
              {member.philosophy}
            </blockquote>
          </GovCard>

          {/* Read deeper */}
          <GovCard padded={false}>
            <div
              className="px-5 py-3"
              style={{ borderBottom: "0.5px solid hsl(var(--border))" }}
            >
              <p className="meta-label text-foreground">Read deeper</p>
            </div>
            <ul className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
              <li>
                <Link
                  to="/medical-advisory"
                  className="block px-5 py-3 t-utility-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Medical Advisory Board →
                </Link>
              </li>
              <li style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <Link
                  to="/governance"
                  className="block px-5 py-3 t-utility-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Governance &amp; oversight →
                </Link>
              </li>
              <li style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <Link
                  to="/accountability"
                  className="block px-5 py-3 t-utility-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Accountability &amp; enforcement →
                </Link>
              </li>
            </ul>
          </GovCard>
        </div>
      </div>
    </>
  );
};

export default AdvisorProfile;
