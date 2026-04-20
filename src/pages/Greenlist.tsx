import { RecordHeader } from "@/components/RecordHeader";
import { greenlist } from "@/data/greenlist";

const Greenlist = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-GREENLIST-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active · Live" },
          { label: "Updated", value: "04 / 20 / 2026" },
          { label: "Jurisdiction", value: "FL · US" },
        ]}
        eyebrow="Public Registry · Upstream Sources"
        title="The Source Standard Greenlist."
        lead="A public reference of upstream sources recognized under the Source Standard verification framework. The greenlist is the foundation against which every vendor verification is measured."
        summary={[
          { label: "Categories", value: greenlist.length.toString().padStart(2, "0") },
          { label: "Listed sources", value: greenlist.reduce((a, g) => a + g.entries.length, 0).toString().padStart(2, "0") },
          { label: "Source authorities", value: "FDA · PCAB · NSF · USP" },
          { label: "Review cycle", value: "Quarterly" },
        ]}
      />

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§0 — Notes on this registry</p>
              <h2 className="text-lg font-semibold text-foreground leading-snug">
                Published openly. Reviewed quarterly. Anchored to verifiable upstream standards.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-3">
              <p>
                The greenlist is a structured, public reference of the upstream sources Source
                Standard recognizes when evaluating vendor documentation. Each category defines
                the licensing, registration, and documentation criteria a source must satisfy
                to be considered greenlit.
              </p>
              <p>
                Vendors are not listed in this registry. The greenlist describes the standards
                against which vendors are evaluated. Verified vendors appear separately in the
                public Verified Vendors directory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            {/* Section index */}
            <aside className="md:col-span-3">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Section Index</p>
                </div>
                <ul className="divide-y divide-border">
                  {greenlist.map((g, i) => (
                    <li key={g.category}>
                      <a
                        href={`#sec-${g.category}`}
                        className="flex items-baseline justify-between px-4 py-3 hover:bg-surface-muted transition-colors"
                      >
                        <span className="meta">§{i + 1}</span>
                        <span className="text-[12px] font-semibold text-foreground">{g.category}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Sections */}
            <div className="md:col-span-9 space-y-14">
              {greenlist.map((g, idx) => (
                <article
                  id={`sec-${g.category}`}
                  key={g.category}
                  className="scroll-mt-28 border-t border-border pt-8 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="meta text-primary">§{idx + 1}</span>
                    <span className="eyebrow">{g.category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground max-w-3xl">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-3xl">{g.description}</p>

                  <div className="mt-8 grid md:grid-cols-12 gap-8">
                    {/* Criteria */}
                    <div className="md:col-span-5">
                      <p className="meta-label text-foreground mb-3">§{idx + 1}.0 — Criteria</p>
                      <ul className="border-t border-border">
                        {g.criteria.map((c, i) => (
                          <li key={c} className="grid grid-cols-12 gap-3 py-3 border-b border-border">
                            <span className="col-span-2 meta">§{idx + 1}.{i + 1}</span>
                            <span className="col-span-10 text-[13px] text-foreground leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Entries */}
                    <div className="md:col-span-7">
                      <p className="meta-label text-foreground mb-3">§{idx + 1}.R — Recognized sources</p>
                      <div className="border border-border bg-background">
                        <div className="grid grid-cols-12 px-3 py-2 bg-surface-muted border-b border-border">
                          <div className="col-span-6 meta-label">Source</div>
                          <div className="col-span-2 meta-label">Juris.</div>
                          <div className="col-span-2 meta-label">Reg.</div>
                          <div className="col-span-2 meta-label text-right">Status</div>
                        </div>
                        {g.entries.length > 0 ? (
                          <ul className="divide-y divide-border">
                            {g.entries.map((e) => (
                              <li key={e.name} className="grid grid-cols-12 px-3 py-3 items-center">
                                <div className="col-span-6">
                                  <p className="text-[13px] font-medium text-foreground">{e.name}</p>
                                  {e.notes && <p className="meta-label mt-1">{e.notes}</p>}
                                </div>
                                <div className="col-span-2 text-[12px] text-muted-foreground tabular-nums">
                                  {e.jurisdiction}
                                </div>
                                <div className="col-span-2 meta">{e.registration}</div>
                                <div className="col-span-2 text-right meta text-primary">■ Listed</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="px-3 py-5">
                            <p className="meta">— No entries published in this section yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="meta-label text-foreground mr-2">Disclaimer ·</span>
            The greenlist reflects upstream sources recognized at the time of publication.
            Inclusion indicates that a source meets the criteria documented in the Source
            Standard framework. It is not an endorsement of any specific product, treatment,
            or clinical outcome.
          </p>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
