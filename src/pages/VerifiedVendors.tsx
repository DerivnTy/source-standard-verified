import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { ClinicSearchResult } from "@/components/registry/ClinicSearchResult";
import { vendors } from "@/data/vendors";
import { HOME_SEARCH_LEAD, HOW_IT_WORKS_SEARCH_PURPOSE } from "@/data/publicLanguage";
import { searchClinics } from "@/lib/clinicSearch";

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
        <div className="relative w-full md:max-w-[520px]">
          <Search
            aria-hidden
            className="pointer-events-none absolute text-white/50"
            style={{
              top: "50%",
              left: "12px",
              width: "15px",
              height: "15px",
              strokeWidth: 1.75,
              transform: "translateY(-50%)",
            }}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Clinic name"
            aria-label="Search a clinic"
            className="hero-search-input font-sans w-full text-white placeholder:text-white/45 focus:outline-none"
            style={{
              height: "42px",
              borderRadius: "2px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.26)",
              paddingLeft: "36px",
              paddingRight: "12px",
            }}
          />
        </div>
      </RegistryHeader>

      <section className="bg-background">
        <div className="page-shell" style={{ paddingTop: "36px", paddingBottom: "48px" }}>
          <div className="mx-auto w-reading text-center">
            {!isSearching ? (
              <div>
                <p
                  className="max-w-[62ch] text-muted-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.6, margin: 0 }}
                >
                  {HOW_IT_WORKS_SEARCH_PURPOSE}
                </p>
                <ul className="mt-6 max-w-[62ch] list-none divide-y divide-border border-t border-border p-0">
                  {[
                    { to: "/how-it-works", label: "How verification works" },
                    { to: "/apply", label: "Apply for review" },
                    { to: "/status-definitions", label: "Status definitions" },
                    { to: "/greenlist", label: "Facility records" },
                  ].map((row) => (
                    <li key={row.to}>
                      <Link
                        to={row.to}
                        className="inline-flex items-center justify-center gap-2 py-2.5 text-foreground hover:text-primary"
                      >
                        <span className="t-body-sm">{row.label}</span>
                        <span aria-hidden className="text-muted-foreground">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="m-0 list-none divide-y divide-border border-t border-border p-0">
                {results.map((hit) => (
                  <li
                    key={hit.kind === "indexed" ? hit.vendor.slug : `unknown:${hit.name}`}
                    style={{ padding: "16px 0" }}
                  >
                    <ClinicSearchResult
                      name={hit.kind === "indexed" ? hit.vendor.name : hit.name}
                      vendor={hit.kind === "indexed" ? hit.vendor : undefined}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
