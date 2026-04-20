import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { getVendor } from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

const VendorProfile = () => {
  const { slug } = useParams();
  const vendor = slug ? getVendor(slug) : undefined;

  if (!vendor) {
    return (
      <section className="container-narrow py-32 text-center">
        <p className="eyebrow mb-4">Not Found</p>
        <h1 className="font-serif text-3xl mb-4">No vendor profile found.</h1>
        <Button asChild variant="outline" className="rounded-sm">
          <Link to="/directory">Back to directory</Link>
        </Button>
      </section>
    );
  }

  const isVerified = vendor.status === "verified";

  return (
    <>
      <div className="border-b border-border bg-surface-muted">
        <div className="container-tight pt-10">
          <Link to="/directory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Vendor Directory
          </Link>
        </div>
        <div className="container-tight py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <StatusBadge status={vendor.status} size="md" />
                {vendor.reviewId && (
                  <span className="text-xs font-mono text-muted-foreground">Review ID: {vendor.reviewId}</span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                {vendor.name}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {vendor.category} · {vendor.location}
              </p>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{vendor.summary}</p>
            </div>

            <div className="md:col-span-4">
              <div className="border border-border bg-background p-6">
                {isVerified ? (
                  <div className="text-center">
                    <ShieldCheck className="mx-auto h-10 w-10 text-verified" strokeWidth={1.5} />
                    <p className="mt-4 font-serif text-lg">Verified Vendor</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Source Standard
                    </p>
                    {vendor.verifiedSince && (
                      <p className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        Verified since {vendor.verifiedSince}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
                    <p className="mt-4 font-serif text-lg">Not Currently Verified</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      This vendor does not hold an active Source Standard verification.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-tight py-16 md:py-20">
        <p className="eyebrow mb-5">Documentation Record</p>
        <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-8">
          Records reviewed at time of verification
        </h2>

        {vendor.documentation.length > 0 ? (
          <div className="border border-border divide-y divide-border bg-background">
            {vendor.documentation.map((d) => (
              <div key={d.label} className="grid md:grid-cols-12 gap-4 p-5 md:p-6">
                <div className="md:col-span-7">
                  <p className="font-medium text-foreground">{d.label}</p>
                  {d.note && <p className="text-sm text-muted-foreground mt-1">{d.note}</p>}
                </div>
                <div className="md:col-span-5 md:text-right">
                  <span
                    className={`text-xs uppercase tracking-wider font-medium px-2.5 py-1 border ${
                      d.status === "Verified"
                        ? "bg-verified-soft text-verified border-verified/20"
                        : d.status === "On file"
                          ? "bg-secondary text-secondary-foreground border-border"
                          : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-border bg-surface-muted p-8 text-center text-muted-foreground">
            No documentation has been submitted for this vendor.
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground max-w-3xl leading-relaxed">
          Verification reflects documentation reviewed at the time of assessment and does not guarantee medical
          outcomes, product safety, or treatment efficacy. Source Standard is not a regulator, pharmacy, clinic,
          laboratory, or enforcement agency.
        </p>
      </section>
    </>
  );
};

export default VendorProfile;
