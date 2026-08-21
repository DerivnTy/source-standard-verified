import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: "-8px 0px 0px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      />

      <section className="bg-background">
        <div className="page-shell pb-2 md:pb-4">
          <div className="mx-auto w-wide">
            <div ref={searchRef} className="-mx-5 md:mx-0 px-5 pt-6 md:pt-8">
              <div className="mx-auto w-full md:max-w-[640px]">
                <div className="relative">
                  <Search
                    aria-hidden
                    className="pointer-events-none absolute text-muted-foreground/70"
                    style={{
                      top: "50%",
                      left: "18px",
                      width: "16px",
                      height: "16px",
                      strokeWidth: 1.75,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a clinic"
                    aria-label="Search a clinic"
                    className="font-sans w-full text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                    style={{
                      height: "52px",
                      borderRadius: "2px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid hsl(var(--border))",
                      paddingLeft: "44px",
                      paddingRight: "18px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 animate-fade-in">
              {!isSearching ? (
                <p
                  className="text-muted-foreground mx-auto text-center"
                  style={{ fontSize: "14.5px", lineHeight: 1.65, maxWidth: "52ch" }}
                >
                  {HOW_IT_WORKS_SEARCH_PURPOSE}
                </p>
              ) : (
                <ul className="divide-y divide-border/60 border-t border-border/60">
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
              )}
            </div>
          </div>
        </div>
      </section>

      <div
        aria-hidden={!stickyVisible}
        className="fixed left-0 right-0 top-0 z-40"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 220ms ease-out",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          backgroundColor: "hsl(var(--background) / 0.85)",
          borderBottom: "1px solid hsl(var(--border))",
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
      >
        <div className="page-shell" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
          <div className="mx-auto w-wide flex items-center" style={{ gap: "8px" }}>
            <div className="relative flex-1 min-w-0">
              <Search
                aria-hidden
                className="pointer-events-none absolute text-muted-foreground/70"
                style={{
                  top: "50%",
                  left: "14px",
                  width: "14px",
                  height: "14px",
                  strokeWidth: 1.75,
                  transform: "translateY(-50%)",
                }}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a clinic"
                aria-label="Search a clinic"
                className="font-sans w-full text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                style={{
                  height: "40px",
                  borderRadius: "2px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid hsl(var(--border))",
                  paddingLeft: "36px",
                  paddingRight: "14px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifiedVendors;
