import { PageHeader } from "@/components/PageHeader";
import { greenlist } from "@/data/greenlist";

const Greenlist = () => {
  return (
    <>
      <PageHeader
        eyebrow="Public Registry"
        title="The Source Standard Greenlist."
        description="A public list of upstream sources recognized under the Source Standard verification framework. The greenlist is the foundation against which every vendor verification is measured."
      />

      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow-muted mb-3">About this registry</p>
              <h2 className="text-xl font-semibold text-foreground leading-snug">
                Published openly. Updated quarterly. Anchored to verifiable upstream standards.
              </h2>
            </div>
            <div className="md:col-span-8 text-[15px] text-muted-foreground leading-relaxed space-y-4">
              <p>
                The greenlist is a structured, public reference of the upstream sources Source Standard recognizes when
                evaluating vendor documentation. Each category defines the licensing, registration, and documentation
                criteria that a source must satisfy to be considered greenlit.
              </p>
              <p>
                Vendors are not listed here. The greenlist describes the <em>standards</em> against which vendors are
                evaluated. Verified vendors appear in the public Verified Vendors directory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {greenlist.map((g, idx) => (
        <section key={g.category} className={`${idx % 2 === 0 ? "bg-surface-muted" : "bg-background"} border-b border-border`}>
          <div className="container-wide py-16 md:py-20">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[11px] font-mono text-muted-foreground tabular-nums">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow">{g.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-foreground max-w-3xl">
              {g.title}
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-3xl">{g.description}</p>

            <div className="mt-10 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
                  Greenlist criteria
                </p>
                <ul className="border border-border bg-background divide-y divide-border">
                  {g.criteria.map((c, i) => (
                    <li key={c} className="flex gap-3 px-4 py-3 text-sm text-foreground">
                      <span className="text-[11px] font-mono text-muted-foreground tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
                  Recognized sources
                </p>
                <div className="border border-border bg-background overflow-hidden">
                  <div className="grid grid-cols-12 px-4 py-3 bg-surface-muted border-b border-border text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <div className="col-span-6">Source</div>
                    <div className="col-span-2">Jurisdiction</div>
                    <div className="col-span-2">Registration</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  {g.entries.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {g.entries.map((e) => (
                        <li key={e.name} className="grid grid-cols-12 px-4 py-4 items-center">
                          <div className="col-span-6">
                            <p className="text-sm font-medium text-foreground">{e.name}</p>
                            {e.notes && <p className="text-xs text-muted-foreground mt-0.5">{e.notes}</p>}
                          </div>
                          <div className="col-span-2 text-sm text-muted-foreground">{e.jurisdiction}</div>
                          <div className="col-span-2 text-xs font-mono text-muted-foreground">{e.registration}</div>
                          <div className="col-span-2 text-right">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground border border-border px-2 py-1">
                              {e.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Initial registry publishing Q1 2026.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="container-wide py-16">
          <div className="border border-border bg-surface-muted p-6 md:p-8">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
              The greenlist reflects upstream sources recognized at the time of publication. Inclusion on the greenlist
              indicates that a source meets the criteria documented in the Source Standard framework. It is not an
              endorsement of any specific product, treatment, or clinical outcome.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
