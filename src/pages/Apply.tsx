import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";


const VENDOR_TYPES = [
  "Physical clinic",
  "Telehealth clinic",
  "Online vendor",
  "Pharmacy / supplier",
  "Other",
];

const THERAPY_CATEGORIES = [
  "TRT",
  "HRT",
  "GLP-1",
  "Peptides",
  "Longevity compounds",
  "Other compounded therapies",
];

const ACK_TEXT =
  "I understand this intake does not approve, certify, or verify this organization. Source Standard will determine whether the applicant is eligible to enter documentation review. Verified status is assigned only after documentation review, agreement execution, and certification activation.";

const SUBTITLE =
  "Submit your operating profile to determine eligibility for Source Standard documentation review. This form does not create verified status.";

type GroupProps = {
  legend: string;
  children: React.ReactNode;
  first?: boolean;
};

const Group = ({ legend, children, first }: GroupProps) => (
  <fieldset className={first ? "" : "border-t border-border pt-7"}>
    <legend className="t-body-md font-semibold text-foreground mb-0 pb-0">
      {legend}
    </legend>
    {children}
  </fieldset>
);

const Apply = () => {
  const [submitting, setSubmitting] = useState(false);
  const [filed, setFiled] = useState(false);
  const [reference, setReference] = useState<string>("");

  // Selects need controlled state
  const [vendorType, setVendorType] = useState("");
  const [hasInvoices, setHasInvoices] = useState("");
  const [hasCoas, setHasCoas] = useState("");

  const [therapies, setTherapies] = useState<Record<string, boolean>>({});
  const [acknowledged, setAcknowledged] = useState(false);

  const toggleTherapy = (key: string) =>
    setTherapies((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acknowledged) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k)?.toString() || "").trim();

    const id = crypto.randomUUID().slice(0, 6).toUpperCase();
    const referenceId = `SS-INTAKE-${new Date().getFullYear()}-${id}`;

    const therapyList = Object.keys(therapies).filter((k) => therapies[k]).join(", ");

    const templateData = {
      referenceId,
      legalName: get("LegalName"),
      dba: get("BrandName"),
      website: get("Website"),
      principalAddress: get("PrincipalAddress"),
      vendorType,
      therapyCategories: therapyList,
      primarySupplier: get("PrimarySupplier"),
      hasInvoices,
      hasCoas,
      medicalDirector: get("PrescriberName"),
      npi: get("NPI"),
      contactName: get("ContactName"),
      contactEmail: get("ContactEmail"),
      contactPhone: get("ContactPhone"),
    };

    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "vendor-intake-notification",
          recipientEmail: "info@sourcestandard.org",
          idempotencyKey: `vendor-intake-${referenceId}`,
          templateData,
        },
      });
      if (error) throw error;
      setReference(referenceId);
      setFiled(true);
    } catch (err) {
      console.error("Intake submission failed", err);
      toast.error("Submission failed. Please try again or contact info@sourcestandard.org.");
    } finally {
      setSubmitting(false);
    }
  };

  const fileAnother = () => {
    setFiled(false);
    setReference("");
  };

  return (
    <>
      <PageMeta
        title="Vendor Verification Intake"
        description={SUBTITLE}
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
        title="Vendor Verification Intake"
        statement={SUBTITLE}
      />

      <section className="bg-background border-b border-border">
        <div className="page-shell pt-9 pb-9">
          <div className="mx-auto w-full">
            <div>
              <div className="bg-card border border-border rounded-xl p-6">
                {!filed ? (
                  <form onSubmit={onSubmit} className="intake-form space-y-7">
                    {/* Business Profile */}
                    <Group legend="Business Profile" first>
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label htmlFor="LegalName">Legal business name</Label>
                          <Input id="LegalName" name="LegalName" placeholder="Example: Source Standard LLC" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="BrandName">Public brand name</Label>
                          <Input id="BrandName" name="BrandName" placeholder="Example: Source Standard" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="Website">Website</Label>
                          <Input
                            id="Website"
                            name="Website"
                            type="url"
                            placeholder="https://example.com"
                            
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="PrincipalAddress">
                            Principal business address
                          </Label>
                          <Input
                            id="PrincipalAddress"
                            name="PrincipalAddress"
                            placeholder="Street, city, state, ZIP"
                            
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Vendor type</Label>
                          <Select value={vendorType} onValueChange={setVendorType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vendor type" />
                            </SelectTrigger>
                            <SelectContent>
                              {VENDOR_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Group>

                    {/* Category and Sourcing */}
                    <Group legend="Category and Sourcing">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Therapy categories</Label>
                          <div className="grid sm:grid-cols-2 gap-x-[18px] gap-y-2 pt-1">
                            {THERAPY_CATEGORIES.map((t) => (
                              <label
                                key={t}
                                className="flex items-center gap-2.5 text-[13.5px] text-foreground"
                              >
                                <Checkbox
                                  checked={!!therapies[t]}
                                  onCheckedChange={() => toggleTherapy(t)}
                                />
                                {t}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="PrimarySupplier">
                            Primary supplier / pharmacy name
                          </Label>
                          <Input id="PrimarySupplier" name="PrimarySupplier" placeholder="Pharmacy or supplier name" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Do you currently have recent supplier invoices available?</Label>
                          <Select value={hasInvoices} onValueChange={setHasInvoices}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select one" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Do you currently have COAs or sourcing documentation available?</Label>
                          <Select value={hasCoas} onValueChange={setHasCoas}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select one" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Group>

                    {/* Clinical Authority */}
                    <Group legend="Clinical Authority">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label htmlFor="PrescriberName">
                            Prescriber / Medical Director name, if applicable
                          </Label>
                          <Input id="PrescriberName" name="PrescriberName" placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="NPI">NPI, if applicable</Label>
                          <Input id="NPI" name="NPI" placeholder="10-digit NPI" />
                        </div>
                      </div>
                    </Group>

                    {/* Administrative Contact */}
                    <Group legend="Administrative Contact">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label htmlFor="ContactName">Contact name</Label>
                          <Input id="ContactName" name="ContactName" placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactEmail">Business email</Label>
                          <Input
                            id="ContactEmail"
                            name="ContactEmail"
                            type="email"
                            placeholder="name@company.com"
                            
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="ContactPhone">Business phone</Label>
                          <Input id="ContactPhone" name="ContactPhone" type="tel" placeholder="(000) 000-0000" />
                        </div>
                      </div>
                    </Group>


                    {/* Submission Acknowledgment */}
                    <Group legend="Submission Acknowledgment">
                      <label className="flex items-start gap-3 text-[13.5px] leading-[1.6] text-foreground">
                        <Checkbox
                          className="mt-0.5"
                          checked={acknowledged}
                          onCheckedChange={(v) => setAcknowledged(v === true)}
                          
                        />
                        <span className="text-muted-foreground">{ACK_TEXT}</span>
                      </label>
                    </Group>

                    <div className="flex sm:justify-end mt-6">
                      <Button
                        type="submit"
                        disabled={submitting || !acknowledged}
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        {submitting ? "Submitting" : "Submit Intake"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <h3 className="t-h3 text-foreground">Intake received</h3>
                    <p className="t-body-md text-muted-foreground">
                      If eligible for documentation review, Source Standard will send the
                      next-step access instructions to the administrative contact provided.
                    </p>
                    <p className="t-body-md text-muted-foreground pt-2">
                      Reference:{" "}
                      <span className="text-foreground font-medium">{reference}</span>
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

    
    </>
  );
};

export default Apply;
