import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

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
        statement="Submit your basic business information to open a Source Standard review file. If accepted for onboarding, your team will receive the next-step access link for document submission and review."
      />

      <section className="bg-background border-b border-border">
        <div className="page-shell pt-9 pb-9">
          <div className="mx-auto w-standard">
            <div className="max-w-2xl">
              <p className="t-utility-xs text-muted-foreground tracking-wider uppercase mb-3">
                Vendor intake
              </p>
              <h2 className="t-section-title-sm text-foreground">Intake submission</h2>
              <p className="mt-3 t-body-md text-muted-foreground">
                Submit the operating profile below to open a verification file. Source Standard
                will respond directly with the document request and review schedule.
              </p>

              <div className="mt-8 bg-card border border-border rounded-xl p-6">
                {!filed ? (
                  <form onSubmit={onSubmit} className="space-y-7">
                    <fieldset>
                      <legend className="t-body-md font-semibold text-foreground mb-[18px]">
                        Business profile
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-[18px]">
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

                    <fieldset>
                      <legend className="t-body-md font-semibold text-foreground mb-[18px]">
                        Operating scope
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-[18px]">
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

                    <fieldset>
                      <legend className="t-body-md font-semibold text-foreground mb-[18px]">
                        Administrative contact
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-[18px]">
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

                    <div className="flex sm:justify-end mt-6">
                      <Button
                        type="submit"
                        disabled={submitting}
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        {submitting ? "Submitting…" : "Submit intake"}
                      </Button>
                    </div>

                    <p className="mt-5 pt-5 border-t border-border text-[13.5px] leading-[1.6] text-muted-foreground">
                      Submitting this form opens your intake file. If your application is accepted
                      for onboarding, Source Standard will email your team with the next-step
                      access link.
                    </p>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <h3 className="t-h3 text-foreground">Intake received</h3>
                    <p className="t-body-md text-muted-foreground">
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
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell pt-8 pb-16">
          <div className="mx-auto w-standard">
            <div className="max-w-2xl space-y-3">
              <Link
                to="/for-vendors"
                className="group flex items-center justify-between gap-4 bg-card border border-border rounded-xl px-4 py-3.5 hover:border-primary/40 transition-colors"
              >
                <span className="text-[13px] font-semibold text-foreground">
                  Vendor submission standard
                </span>
                <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
              <Link
                to="/how-it-works"
                className="group flex items-center justify-between gap-4 bg-card border border-border rounded-xl px-4 py-3.5 hover:border-primary/40 transition-colors"
              >
                <span className="text-[13px] font-semibold text-foreground">
                  How verification works
                </span>
                <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
