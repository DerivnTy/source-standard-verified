import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { vendors, VerificationStatus } from "@/data/vendors";
import { Input } from "@/components/ui/input";

const filters: { key: "all" | VerificationStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "verified", label: "Verified" },
  { key: "pending", label: "Under Review" },
  { key: "expired", label: "Expired" },
  { key: "unverified", label: "Unverified" },
];

const Directory = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const results = useMemo(() => {
    return vendors.filter((v) => {
      const matchesQ =
        !q ||
        v.name.toLowerCase().includes(q.toLowerCase()) ||
        v.location.toLowerCase().includes(q.toLowerCase()) ||
        v.category.toLowerCase().includes(q.toLowerCase());
      const matchesF = filter === "all" || v.status === filter;
      return matchesQ && matchesF;
    });
  }, [q, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Public Vendor Directory"
        title="Check whether a vendor is verified."
        description="A public registry of vendors reviewed under the Source Standard verification framework. Search by name, category, or location."
      />

      <section className="container-tight py-12">
        <div className="border border-border bg-surface p-5 md:p-6 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by vendor name, category, or location"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10 h-12 rounded-sm border-border focus-visible:ring-1"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>

        <div className="mt-4 border border-border divide-y divide-border bg-background">
          {results.map((v) => (
            <Link
              key={v.slug}
              to={`/directory/${v.slug}`}
              className="grid md:grid-cols-12 gap-4 p-5 md:p-6 hover:bg-surface-muted transition-colors items-center"
            >
              <div className="md:col-span-5">
                <h3 className="font-serif text-lg font-medium tracking-tight">{v.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{v.category}</p>
              </div>
              <p className="md:col-span-3 text-sm text-muted-foreground">{v.location}</p>
              <p className="md:col-span-2 text-xs font-mono text-muted-foreground">
                {v.reviewId ?? "—"}
              </p>
              <div className="md:col-span-2 md:text-right">
                <StatusBadge status={v.status} />
              </div>
            </Link>
          ))}
          {results.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No vendors match your search.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Directory;
