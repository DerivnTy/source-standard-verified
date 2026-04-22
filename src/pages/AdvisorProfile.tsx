import { Link, useParams } from "react-router-dom";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { advisoryBoard } from "@/data/advisoryBoard";

const AdvisorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = advisoryBoard.find((m) => m.slug === slug);

  if (!member) {
    return (
      <section className="container-wide py-24">
        <p className="meta mb-3">§ — Not Found</p>
        <h1 className="text-2xl font-semibold tracking-tight">Advisor profile not found.</h1>
        <p className="mt-3 text-[14px] text-muted-foreground">
          This board seat record does not exist or has been retired.
        </p>
        <Link
          to="/medical-advisory"
          className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
        >
          ← Back to Medical Advisory Board
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageMeta
        title={`${member.name} · ${member.boardTitle}`}
        description={`Medical Advisory Board profile — ${member.name}, ${member.credentials}. ${member.specialization}.`}
      />
      <Breadcrumb
        items={[
          { label: "Medical Advisory", to: "/medical-advisory" },
          { label: member.name },
        ]}
      />
      <ProfileHeader
        backHref="/medical-advisory"
        backLabel="Medical Advisory Board"
        eyebrow={`Medical Advisory Board · ${member.boardTitle}`}
        title={`${member.name}, ${member.credentials}`}
        identity={
          <p className="text-[13px] text-muted-foreground">
            {member.specialization} · {member.yearsPracticing} practicing · {member.jurisdiction}
          </p>
        }
        lead={member.shortSummary}
        rightSlot={
          <div className="border border-border/60 bg-surface-muted/40 p-5 rounded-md">
            <img
              src={member.photo}
              alt={`Portrait of ${member.name}`}
              loading="lazy"
              width={256}
              height={256}
              className="h-32 w-32 rounded-[2px] object-cover border border-border bg-surface-muted"
            />
          </div>
        }
      />

      {/* §1 — Identity */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§1 — Identity & Credentials</p>
              <div className="border border-border bg-background p-6">
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  width={256}
                  height={256}
                  className="h-40 w-40 rounded-[2px] object-cover border border-border bg-surface-muted mb-5"
                />
                <h2 className="text-[18px] font-semibold tracking-tight text-foreground">{member.name}</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">{member.credentials}</p>
                <dl className="mt-5 pt-5 border-t border-border space-y-3 text-[12.5px]">
                  <div className="flex justify-between gap-4">
                    <dt className="meta-label text-muted-foreground">Board role</dt>
                    <dd className="text-foreground text-right">{member.boardTitle}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="meta-label text-muted-foreground">Specialization</dt>
                    <dd className="text-foreground text-right">{member.specialization}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="meta-label text-muted-foreground">Jurisdiction</dt>
                    <dd className="text-foreground text-right">{member.jurisdiction}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="meta-label text-muted-foreground">Practicing</dt>
                    <dd className="text-foreground text-right">{member.yearsPracticing}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="md:col-span-8 space-y-10">
              <div>
                <p className="eyebrow mb-3">§2 — Biography</p>
                <p className="text-[15px] text-foreground/90 leading-relaxed">{member.biography}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">§3 — Background & Training</p>
                <ul className="border border-border bg-background divide-y divide-border">
                  {member.background.map((b, i) => (
                    <li key={i} className="grid grid-cols-12 gap-3 px-5 py-3 items-baseline">
                      <div className="col-span-1 meta text-primary">
                        {(i + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="col-span-11 text-[13.5px] text-foreground/90 leading-relaxed">{b}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">§4 — Key Accomplishments</p>
                <ul className="border border-border bg-background divide-y divide-border">
                  {member.accomplishments.map((a, i) => (
                    <li key={i} className="grid grid-cols-12 gap-3 px-5 py-3 items-baseline">
                      <div className="col-span-1 meta text-primary">
                        {(i + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="col-span-11 text-[13.5px] text-foreground/90 leading-relaxed">{a}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Why this sector */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§4 — Why This Sector</p>
              <h2 className="h-section">
                Position on the framework's purpose.
              </h2>
            </div>
            <div className="md:col-span-8 text-[15px] text-foreground/90 leading-relaxed border-t border-border pt-6">
              {member.whyTheyCare}
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Contribution */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§5 — Contribution to Source Standard</p>
              <h2 className="h-section">
                What this seat is responsible for.
              </h2>
            </div>
            <div className="md:col-span-8 text-[15px] text-foreground/90 leading-relaxed border-t border-border pt-6">
              {member.contribution}
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Clinical focus */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§6 — Clinical Focus Areas</p>
              <h2 className="h-section">
                Domains of review attention.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
                {member.clinicalFocus.map((f, i) => (
                  <li key={i} className="bg-background px-5 py-3 flex items-baseline gap-3">
                    <span className="meta text-primary">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="text-[13.5px] text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Philosophy */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§7 — Mission Statement</p>
              <h2 className="h-section">
                Personal philosophy on oversight.
              </h2>
            </div>
            <div className="md:col-span-8 border-t border-border pt-6">
              <blockquote className="text-[16px] md:text-[17px] text-foreground leading-relaxed font-light italic border-l-2 border-primary pl-6">
                {member.philosophy}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Read deeper */}
      <section className="border-b border-border">
        <div className="container-wide py-6">
          <div className="border border-border bg-surface-muted">
            <div className="px-4 py-2.5 border-b border-border bg-background">
              <p className="meta-label text-foreground">Read deeper</p>
            </div>
            <ul className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              <li className="px-4 py-3">
                <Link
                  to="/medical-advisory"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Medical Advisory Board →
                </Link>
              </li>
              <li className="px-4 py-3">
                <Link
                  to="/governance"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Governance & oversight →
                </Link>
              </li>
              <li className="px-4 py-3">
                <Link
                  to="/accountability"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Accountability & enforcement →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvisorProfile;
