import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const checklist = [
  "Business licenses (state and federal registrations for your operating entity)",
  "Pharmacy invoices (records from the 503A / 503B pharmacies you work with)",
  "Certificates of Analysis (third-party lab results from ISO-accredited labs)",
  "Prescriber credentials (active licenses for any prescribing practitioners)",
  "Pharmacy service agreements (contracts with your 503A or 503B partners)",
];

const sectionHeader = "font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground";

const Apply = () => {
  const [submitting, setSubmitting] = useState(false);
  const [filed, setFiled] = useState(false);
  const [reference, setReference] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const id = crypto.randomUUID().slice(0, 6).toUpperCase();
      setReference(`SS-INTAKE-${new Date().getFullYear()}-${id}`);
      setFiled(true);
    }, 600);
  };

  const fileAnother = () => {
    setFiled(false);
    setReference("");
  };

  return (
    <>
      <PageMeta
        title="Apply for Verification"
        description="Vendor intake for the Source Standard verification framework. Submit licensing, supplier disclosures, and supporting records."
      />
      <Breadcrumb
        items={[
          { label: "Vendors", to: "/for-vendors" },
          { label: "Apply" },
        ]}
      />

      <UtilityHeader
        eyebrow="Form SS-INTAKE-01 · Step 1 of 2"
        title="Step 1: Registry Initialization."
        description="Submit this form to open your audit file. A Verification Officer will review your basic details and issue a secure portal link for Step 2 (document uploads and payment)."
      />

      <section>
        <div className="container-wide py-8 md:py-10">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                    Documentation required for Step 2
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {checklist.map((i, idx) => (
                    <li key={i} className="flex gap-3 px-4 py-3">
                      <span className="meta pt-0.5">§{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-[13px] text-foreground leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 border-t border-border bg-surface-muted">
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground leading-relaxed normal-case">
                    You'll receive a secure upload link from your Verification Officer once Step 1 is acknowledged.
                  </p>
                </div>
              </div>
            </aside>

            <div className="md:col-span-8">
              <div className="border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 mb-4">
                <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-1">
                  Step 1 of 2 · Registry initialization
                </p>
                <p className="text-[13px] text-foreground leading-relaxed">
                  Tell us who you are. We'll open your audit file and email you a secure portal link for Step 2 (document uploads and payment) within 24 hours.
                </p>
              </div>

              <form onSubmit={onSubmit} className="border border-border bg-background">
                <div className="px-6 md:px-8 py-3 border-b border-border bg-surface-muted">
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                    Form SS-INTAKE-01 · Preliminary administrative intake
                  </p>
                  <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-muted-foreground mt-1">
                    {filed
                      ? "Status · Filing acknowledged · Awaiting Verification Officer"
                      : "Step 1 — Public business details only · Required fields marked"}
                  </p>
                </div>

                {!filed ? (
                  <div className="p-6 md:p-8 space-y-8">
                    {/* §A · Public Identity */}
                    <fieldset className="space-y-5">
                      <div className="border-t border-border pt-3">
                        <legend className={sectionHeader}>§A · Business profile</legend>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="LegalName" className="meta-label text-foreground">Legal business name</Label>
                          <Input id="LegalName" name="LegalName" required className="h-10 rounded-none" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="BrandName" className="meta-label text-foreground">Brand name (as customers see it)</Label>
                          <Input id="BrandName" name="BrandName" required className="h-10 rounded-none" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="Website" className="meta-label text-foreground">Website</Label>
                          <Input id="Website" name="Website" type="url" placeholder="https://" required className="h-10 rounded-none" />
                        </div>
                      </div>
                    </fieldset>

                    {/* §B · Verification Scope */}
                    <fieldset className="space-y-5">
                      <div className="border-t border-border pt-3">
                        <legend className={sectionHeader}>§B · Audit scope</legend>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="Category" className="meta-label text-foreground">Verification category</Label>
                          <Input
                            id="Category"
                            name="Category"
                            placeholder="e.g. TRT clinic, 503A pharmacy, 503B outsourcing facility"
                            required
                            className="h-10 rounded-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="StateList" className="meta-label text-foreground">States of operation</Label>
                          <Input
                            id="StateList"
                            name="StateList"
                            placeholder="Comma-separated, e.g. CA, TX, FL"
                            required
                            className="h-10 rounded-none"
                          />
                          <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-muted-foreground normal-case">
                            Use two-letter state codes, separated by commas.
                          </p>
                        </div>
                      </div>
                    </fieldset>

                    {/* §C · Administrative Contact */}
                    <fieldset className="space-y-5">
                      <div className="border-t border-border pt-3">
                        <legend className={sectionHeader}>§C · Administrative contact</legend>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="ContactName" className="meta-label text-foreground">Contact name</Label>
                          <Input id="ContactName" name="ContactName" required className="h-10 rounded-none" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactEmail" className="meta-label text-foreground">Business email</Label>
                          <Input id="ContactEmail" name="ContactEmail" type="email" required className="h-10 rounded-none" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="ContactPhone" className="meta-label text-foreground">Business phone</Label>
                          <Input id="ContactPhone" name="ContactPhone" type="tel" className="h-10 rounded-none" />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                ) : (
                  <div className="p-6 md:p-8 space-y-3">
                    <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                      Filing received · SS-INTAKE-01
                    </p>
                    <h2 className="text-[16px] font-semibold text-foreground">Filing Received.</h2>
                    <p className="text-[13px] text-foreground leading-relaxed max-w-2xl">
                      A Verification Officer is initializing your profile. You will receive an automated email within 24 hours to set up your secure portal access.
                    </p>
                    <p className="font-mono uppercase tracking-[0.08em] text-[11px] text-muted-foreground pt-2">
                      Reference · {reference}
                    </p>
                  </div>
                )}

                <div className="px-6 md:px-8 py-4 border-t border-border bg-surface-muted space-y-4">
                  <div>
                    <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-1.5">
                      Administrative notice · SS-INTAKE-01
                    </p>
                    <p className="text-[12.5px] text-foreground leading-relaxed">
                      This is Step 1 of 2. Submitting this form opens your audit file with the Source Standard registry — it does not complete verification. Your Verification Officer will email a secure portal link for document uploads and payment (Step 2) within 24 hours.
                    </p>
                  </div>
                  <div className="flex sm:justify-end">
                    {!filed ? (
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary hover:bg-primary-hover text-primary-foreground h-10 px-6 text-[12px] font-semibold uppercase rounded-none font-mono tracking-[0.14em]"
                      >
                        {submitting ? "[ SS-INTAKE-01 ]  SUBMITTING…" : "[ SS-INTAKE-01 ]  SUBMIT INITIAL FILING"}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={fileAnother}
                        className="h-10 px-6 text-[12px] font-semibold uppercase rounded-none font-mono tracking-[0.14em] border-border"
                      >
                        [ SS-INTAKE-01 ]  SUBMIT ANOTHER FILING
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-border bg-background px-5 py-3 max-w-4xl mt-10">
            <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-muted-foreground mb-2">
              Official citation · SS-INTAKE-01
            </p>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              Source Standard. Form SS-INTAKE-01 — Preliminary Administrative Intake. Governed by Vendor Submission Standard SS-VENDOR-STD-2026.01. Examined under SOP: Verification Protocol & Audit Methodology SS-FRAMEWORK-2026.01.
            </p>
            <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-muted-foreground mt-2">
              Controlled form · See{" "}
              <Link to="/for-vendors" className="underline hover:text-foreground">
                Vendor Submission Standard
              </Link>{" "}
              · See{" "}
              <Link to="/how-it-works" className="underline hover:text-foreground">
                SOP: Verification Protocol & Audit Methodology
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
