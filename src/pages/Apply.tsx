import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

const processSteps = [
  {
    n: "01",
    t: "Submit business details",
    d: "Share general business information through this short intake form.",
  },
  {
    n: "02",
    t: "Receive onboarding invitation",
    d: "If accepted for onboarding, your team is emailed a secure access link to our internal verification system.",
  },
  {
    n: "03",
    t: "Complete onboarding and enter review",
    d: "Inside the internal system, upload documentation, complete onboarding, and move into formal review.",
  },
];

const stepRequires = [
  "Legal business name",
  "Brand name",
  "Website",
  "Doctor or prescriber name (where applicable)",
  "States of operation",
  "Administrative contact details",
];

const onboardingDocs = [
  "Business licenses and registrations",
  "Pharmacy invoices",
  "Certificates of analysis",
  "Prescriber credentials (where applicable)",
  "Supplier or pharmacy agreements (where applicable)",
];

const SectionHeader = ({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) => (
  <div className="mb-10 md:mb-12">
    <div className="h-px w-8 bg-border mb-6" aria-hidden="true" />
    <h2 className="t-section-title-sm text-foreground">{title}</h2>
    {lede && (
      <p className="mt-4 max-w-[68ch] t-body-md text-muted-foreground">{lede}</p>
    )}
  </div>
);

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
        title="Apply for verification"
        description="Submit your basic business information to open a Source Standard review file."
      />
      <Breadcrumb
        items={[
          { label: "Vendors", to: "/for-vendors" },
          { label: "Apply" },
        ]}
      />

      <BriefingHero
        tone="navy"
        category="Vendor intake"
        docId=""
        title="Apply for verification"
        statement="Submit your basic business information to open a Source Standard review file. Once intake is acknowledged, your team will receive an email invitation to continue onboarding and upload documentation through our internal verification system."
      />

      <section className="bg-surface-muted border-b border-border">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <SectionHeader
              title="From intake to review"
              lede="Three steps from intake to formal review."
            />
            <div className="grid md:grid-cols-3 md:divide-x divide-border border-y border-border">
              {processSteps.map((s) => (
                <div key={s.n} className="px-6 py-8 border-b md:border-b-0 border-border last:border-b-0">
                  <p className="t-utility-xs text-muted-foreground mb-3">{s.n}</p>
                  <h3 className="t-h4 text-foreground mb-2">{s.t}</h3>
                  <p className="t-body-md text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background border-b border-border">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <SectionHeader
              title="Step 1 collects general business details only"
              lede="Full documentation is requested later through the internal onboarding system."
            />
            <ul className="border-y border-border divide-y divide-border max-w-3xl">
              {stepRequires.map((item) => (
                <li key={item} className="py-3.5 t-body-md text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted border-b border-border">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <SectionHeader
              title="Documents typically requested during onboarding"
              lede="Provided here for transparency. Not required at this step."
            />
            <ul className="border-y border-border divide-y divide-border max-w-3xl">
              {onboardingDocs.map((item) => (
                <li key={item} className="py-3.5 t-body-md text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background border-b border-border">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <SectionHeader
              title="Begin intake"
              lede="Tell us who you are. We'll review and reach out with next steps."
            />

            <div className="max-w-2xl">
              {!filed ? (
                <>
                  <form onSubmit={onSubmit} className="space-y-10">
                    <fieldset className="space-y-5">
                      <legend className="t-body-md font-semibold text-foreground mb-1">
                        Business profile
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="LegalName">Legal business name</Label>
                          <Input id="LegalName" name="LegalName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="BrandName">Brand name</Label>
                          <Input id="BrandName" name="BrandName" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="Website">Website</Label>
                          <Input id="Website" name="Website" type="url" placeholder="https://" required />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5">
                      <legend className="t-body-md font-semibold text-foreground mb-1">
                        Operating scope
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="Category">Verification category</Label>
                          <Input
                            id="Category"
                            name="Category"
                            placeholder="e.g. TRT clinic, 503A pharmacy"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="PrescriberName">Prescriber name (if applicable)</Label>
                          <Input id="PrescriberName" name="PrescriberName" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="StateList">States of operation</Label>
                          <Input
                            id="StateList"
                            name="StateList"
                            placeholder="Comma-separated, e.g. CA, TX, FL"
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5">
                      <legend className="t-body-md font-semibold text-foreground mb-1">
                        Administrative contact
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="ContactName">Contact name</Label>
                          <Input id="ContactName" name="ContactName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactEmail">Business email</Label>
                          <Input id="ContactEmail" name="ContactEmail" type="email" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="ContactPhone">Business phone</Label>
                          <Input id="ContactPhone" name="ContactPhone" type="tel" />
                        </div>
                      </div>
                    </fieldset>

                    <div className="flex justify-end pt-2">
                      <Button type="submit" disabled={submitting} size="lg">
                        {submitting ? "Submitting…" : "Submit intake"}
                      </Button>
                    </div>
                  </form>

                  <p className="mt-8 t-body-md text-muted-foreground border-t border-border pt-6">
                    Submitting this form opens your intake file. If your application is accepted for
                    onboarding, Source Standard will email your team with the next-step access link
                    for document submission and review.
                  </p>
                </>
              ) : (
                <div className="space-y-4 py-8">
                  <h3 className="t-h3 text-foreground">Intake received</h3>
                  <p className="t-body-md text-muted-foreground max-w-xl">
                    Your file has been opened. If accepted for onboarding, your team will receive
                    an email invitation with secure access to continue onboarding.
                  </p>
                  <p className="t-body-md text-muted-foreground pt-2">
                    Reference: <span className="text-foreground font-medium">{reference}</span>
                  </p>
                  <div className="pt-2">
                    <Button type="button" variant="ghost" onClick={fileAnother}>
                      Submit another intake
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell py-10">
          <p className="t-body-md text-muted-foreground">
            <Link to="/for-vendors" className="hover:text-foreground underline-offset-4 hover:underline">
              Vendor submission standard →
            </Link>
            <span className="mx-3 text-border">·</span>
            <Link to="/how-it-works" className="hover:text-foreground underline-offset-4 hover:underline">
              How verification works →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Apply;
