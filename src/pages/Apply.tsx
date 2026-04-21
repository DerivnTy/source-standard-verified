import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const checklist = [
  "Active jurisdictional registrations of the operating entity",
  "Upstream supply-chain records (procurement nodes & supplier disclosures)",
  "Analytical lot documentation (ISO/IEC 17025-accredited certificates of analysis)",
  "Prescriber credentials of record (clinical operating models)",
  "Compounding pharmacy service agreements (503A / 503B partnerships)",
];

const Apply = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Filing acknowledged · SS-INTAKE-01",
        description:
          "A Verification Officer of record will acknowledge receipt within five business days. Document upload protocols are initiated via secure transmission link upon acknowledgment.",
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <UtilityHeader
        eyebrow="Form SS-INTAKE-01 · Preliminary intake"
        title="Preliminary Administrative Intake."
        description="Submission of Form SS-INTAKE-01 opens an administrative file with the Source Standard registry. A Verification Officer of record will acknowledge receipt within five business days. Intake does not constitute forensic review and does not establish any standing."
      />

      <section>
        <div className="container-wide py-8 md:py-10">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                    Pre-audit evidentiary requirements
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
                    Document upload protocols are initiated via secure transmission link issued by the Verification Officer of record upon acknowledgment of this filing.
                  </p>
                </div>
              </div>
            </aside>

            <form
              onSubmit={onSubmit}
              className="md:col-span-8 border border-border bg-background"
            >
              <div className="px-6 md:px-8 py-3 border-b border-border bg-surface-muted">
                <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                  Form SS-INTAKE-01 · Preliminary administrative intake
                </p>
                <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-muted-foreground mt-1">
                  Governed by SS-VENDOR-STD-2026.01 · Examined under SS-FRAMEWORK-2026.01 · Required fields
                </p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="vendor" className="meta-label text-foreground">Entity of record</Label>
                    <Input id="vendor" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="meta-label text-foreground">Authorized representative</Label>
                    <Input id="contact" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="meta-label text-foreground">Email of record</Label>
                    <Input id="email" type="email" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="meta-label text-foreground">Telephone of record</Label>
                    <Input id="phone" type="tel" className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="meta-label text-foreground">Audit category requested</Label>
                    <Input
                      id="category"
                      placeholder="e.g. TRT clinic, 503A compounding pharmacy, 503B outsourcing facility"
                      required
                      className="h-10 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="meta-label text-foreground">Jurisdiction of operation</Label>
                    <Input id="state" required className="h-10 rounded-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="meta-label text-foreground">Operational scope statement</Label>
                  <Textarea
                    id="notes"
                    rows={5}
                    placeholder="Provide a concise statement of operating model, jurisdictional registrations held, and the categories of evidentiary documentation available for examination."
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="px-6 md:px-8 py-4 border-t border-border bg-surface-muted space-y-4">
                <div>
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-1.5">
                    Administrative notice · SS-INTAKE-01
                  </p>
                  <p className="text-[12.5px] text-foreground leading-relaxed">
                    Submissions are entered into the controlled audit file in the order received. Any subsequent determination of standing is contingent upon the authenticity, completeness, and verifiability of the records produced under the verification protocol (SS-FRAMEWORK-2026.01). Intake does not constitute review and does not confer standing.
                  </p>
                </div>
                <div className="flex sm:justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground h-10 px-6 text-[12px] font-semibold uppercase rounded-none font-mono tracking-[0.14em]"
                  >
                    {submitting ? "[ SS-INTAKE-01 ]  FILING…" : "[ SS-INTAKE-01 ]  FILE DOCUMENT"}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-10">
            <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-2">
              Official citation · SS-INTAKE-01
            </p>
            <p className="text-[12.5px] text-foreground leading-relaxed">
              Source Standard. Form SS-INTAKE-01 — Preliminary Administrative Intake. Governed by Vendor Submission Standard SS-VENDOR-STD-2026.01. Examined under SOP: Verification Protocol & Audit Methodology SS-FRAMEWORK-2026.01.
            </p>
            <p className="font-mono uppercase tracking-[0.08em] text-[11px] text-muted-foreground mt-2">
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
