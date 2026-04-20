import { FormEvent, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Application received", description: "Source Standard will follow up with intake instructions." });
  };

  return (
    <>
      <PageHeader
        eyebrow="Apply for Verification"
        title="Demonstrate the legitimacy you already have."
        description="Submit an application to begin the Source Standard documentation review. Verification is open to vendors operating in the peptide, TRT, hormone optimization, and wellness space."
      />

      <section className="container-tight py-16 md:py-20 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-8">
          <div>
            <p className="eyebrow mb-3">Eligibility</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Operating vendors with current business licensing and access to supplier and quality documentation.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">What You'll Need</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>— Active business registration</li>
              <li>— Applicable licensing records</li>
              <li>— Supplier / sourcing documentation</li>
              <li>— Certificates of analysis (where applicable)</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Review Timeline</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Initial documentation review typically completes within 10–15 business days following intake.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-8">
          {submitted ? (
            <div className="border border-border bg-surface p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-verified" strokeWidth={1.5} />
              <h2 className="mt-5 font-serif text-2xl font-medium tracking-tight">Application received</h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Thank you. Source Standard will follow up with intake instructions and a secure documentation link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-border bg-surface p-8 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <Field id="name" label="Vendor / Business Name" required />
                <Field id="category" label="Category" placeholder="e.g. Peptides, TRT Clinic" required />
                <Field id="contact" label="Primary Contact Name" required />
                <Field id="role" label="Role" placeholder="e.g. Compliance Officer" />
                <Field id="email" label="Email" type="email" required />
                <Field id="phone" label="Phone" />
                <Field id="state" label="Primary State of Operation" required />
                <Field id="website" label="Website" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-xs uppercase tracking-wider text-muted-foreground">Operating Scope</Label>
                <Textarea
                  id="notes"
                  rows={5}
                  placeholder="Briefly describe your operation, jurisdictions, and the documentation you maintain."
                  className="rounded-sm"
                />
              </div>
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground max-w-md">
                  Submission acknowledges that verification is documentation-based and does not guarantee any medical
                  or product outcome.
                </p>
                <Button type="submit" size="lg" className="rounded-sm">Submit Application</Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

const Field = ({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}{required && " *"}
    </Label>
    <Input id={id} type={type} required={required} placeholder={placeholder} className="rounded-sm h-11" />
  </div>
);

export default Apply;
