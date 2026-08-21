import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { ClinicSearchResult } from "@/components/registry/ClinicSearchResult";
import { SearchField } from "@/components/system";
import { vendors } from "@/data/vendors";
import { HOME_SEARCH_LEAD, HOW_IT_WORKS_SEARCH_PURPOSE } from "@/data/publicLanguage";
import { searchClinics } from "@/lib/clinicSearch";

const DESTINATIONS = [
  { to: "/how-it-works", label: "How verification works", note: "The review sequence and what it covers." },
  { to: "/apply", label: "Apply for review", note: "Submit an operating profile to request review." },
  { to: "/status-definitions", label: "Status definitions", note: "What each published status does and does not mean." },
  { to: "/greenlist", label: "Facility records", note: "A separate index of pharmacies and manufacturers." },
];

const VerifiedVendors = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  useEffect(() => {
    const paramQ = searchParams.get("q") ?? "";
    setQuery((current) => (current === paramQ ? current : paramQ));
  }, [searchParams]);

  const results = useMemo(() => searchClinics(query, vendors), [query]);
  const isSearching = query.trim().length > 0;

  return (
    <>
      <PageMeta
        title="Search a clinic · Source Standard"
        description={HOME_SEARCH_LEAD}
        path="/verified-vendors"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Search a clinic",
          url: "https://sourcestandard.org/verified-vendors",
        }}
      />

      <RegistryHeader
        title="Search a clinic"
        description={HOME_SEARCH_LEAD}
        hideRecordPill
        recordCount={0}
      >
        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Clinic name"
          ariaLabel="Search a clinic"
        />
      </RegistryHeader>

      <section className="bg-background">
        <div className="page-shell" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
          {!isSearching ? (
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p
                  className="text-foreground"
                  style={{ fontSize: "17px", lineHeight: 1.6, margin: 0, maxWidth: "38ch" }}
                >
                  {HOW_IT_WORKS_SEARCH_PURPOSE}
                </p>
              </div>
              <ul className="m-0 list-none divide-y divide-border border-t border-b border-border p-0 lg:col-span-7">
                {DESTINATIONS.map((row) => (
                  <li key={row.to}>
                    <Link
                      to={row.to}
                      className="group flex items-baseline justify-between gap-6 py-4 text-foreground hover:text-primary"
                    >
                      <span>
                        <span className="block font-sans text-[15px] font-semibold tracking-[-0.01em]">
                          {row.label}
                        </span>
                        <span className="mt-1 block text-[13.5px] leading-relaxed text-muted-foreground">
                          {row.note}
                        </span>
                      </span>
                      <span aria-hidden className="shrink-0 text-muted-foreground group-hover:text-foreground">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="t-meta" style={{ marginBottom: "16px" }}>
                {results.length} {results.length === 1 ? "record" : "records"}
              </p>
              <ul className="m-0 list-none divide-y divide-border border-t border-b border-border p-0">
                {results.map((hit) => (
                  <li
                    key={hit.kind === "indexed" ? hit.vendor.slug : `unknown:${hit.name}`}
                    style={{ padding: "22px 0" }}
                  >
                    <ClinicSearchResult
                      name={hit.kind === "indexed" ? hit.vendor.name : hit.name}
                      vendor={hit.kind === "indexed" ? hit.vendor : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
