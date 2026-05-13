import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { US_STATE_TO_ABBR } from "@/lib/usStates";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const STATE_OPTIONS = Object.entries(US_STATE_TO_ABBR)
  .map(([name, abbr]) => ({
    abbr,
    label: name.replace(/\b\w/g, (c) => c.toUpperCase()),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const ENTITY_TYPES = [
  "LLC",
  "S-Corp",
  "C-Corp",
  "PLLC",
  "Professional Corp",
  "Sole Proprietor",
  "Other",
];

const VENDOR_TYPES = [
  "Physical clinic",
  "Telehealth clinic",
  "Online vendor",
  "Pharmacy / supplier",
  "Other",
];

const VERIFICATION_TRACKS = [
  "Physical vendor review",
  "Online vendor review",
  "Supplier / upstream source review",
];

const ROLES = [
  "Medical Director",
  "Prescribing Physician",
  "Nurse Practitioner",
  "Pharmacy Representative",
  "Not applicable",
];

const SOURCING_MODELS = [
  "503A pharmacy",
  "503B outsourcing facility",
  "Multiple suppliers",
  "Unsure",
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

const READINESS_ITEMS = [
  "Business registration",
  "Recent supplier invoice",
  "COA or sourcing documentation",
];

const ACK_TEXT =
  "I understand that submitting this intake does not approve, certify, or verify this organization. Source Standard will review the submitted operating profile and determine whether the applicant is eligible to enter documentation review. Verification status is assigned only after required documentation is reviewed, the vendor agreement is signed, and the certification record is activated.";

const SUBTITLE =
  "Submit your operating profile to open a Source Standard review file. This form does not create verified status. If eligible, your team will receive the secure documentation request and review instructions.";

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
  const [stateOfFormation, setStateOfFormation] = useState("");
  const [entityType, setEntityType] = useState("");
  const [registeredState, setRegisteredState] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [verificationTrack, setVerificationTrack] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [role, setRole] = useState("");
  const [sourcingModel, setSourcingModel] = useState("");

  const [therapies, setTherapies] = useState<Record<string, boolean>>({});
  const [readiness, setReadiness] = useState<Record<string, boolean>>({});
  const [acknowledged, setAcknowledged] = useState(false);

  const toggleTherapy = (key: string) =>
    setTherapies((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleReadiness = (key: string) =>
    setReadiness((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acknowledged) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k)?.toString() || "").trim();

    const id = crypto.randomUUID().slice(0, 6).toUpperCase();
    const referenceId = `SS-INTAKE-${new Date().getFullYear()}-${id}`;

    const therapyList = Object.keys(therapies).filter((k) => therapies[k]).join(", ");
    const readinessList = Object.keys(readiness).filter((k) => readiness[k]).join(", ");

    const templateData = {
      referenceId,
      legalName: get("LegalName"),
      dba: get("BrandName"),
      entityType,
      website: get("Website"),
      principalAddress: get("PrincipalAddress"),
      mailingAddress: get("MailingAddress"),
      stateOfFormation,
      registeredState,
      vendorType,
      verificationTrack,
      medicalDirector: get("PrescriberName"),
      npi: get("NPI"),
      licenseStates: licenseState,
      prescriberRole: role,
      sourcingModel,
      primarySupplier: get("PrimarySupplier"),
      additionalSuppliers: get("AdditionalSuppliers"),
      therapyCategories: therapyList,
      products: get("Products"),
      readiness: readinessList,
      contactName: get("ContactName"),
      contactRole: get("ContactRole"),
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
              <p className="t-utility-xs text-muted-foreground tracking-wider uppercase mb-3">
                Vendor intake
              </p>
              <h2 className="t-section-title-sm text-foreground">
                Vendor Verification Intake
              </h2>
              <p className="mt-3 t-body-md text-muted-foreground">{SUBTITLE}</p>

              <div className="mt-8 bg-card border border-border rounded-xl p-6">
                {!filed ? (
                  <form onSubmit={onSubmit} className="intake-form space-y-7">
                    {/* Business Identity */}
                    <Group legend="Business Identity" first>
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label htmlFor="LegalName">Legal business name</Label>
                          <Input id="LegalName" name="LegalName" placeholder="Example: Source Standard LLC" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="BrandName">Public brand / DBA name</Label>
                          <Input id="BrandName" name="BrandName" placeholder="Example: Source Standard" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="Website">Website</Label>
                          <Input
                            id="Website"
                            name="Website"
                            type="url"
                            placeholder="https://example.com"
                            required
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
                            required
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="MailingAddress">
                            Mailing address, if different
                          </Label>
                          <Input id="MailingAddress" name="MailingAddress" placeholder="Leave blank if same" />
                        </div>
                        <div className="space-y-2">
                          <Label>State of formation</Label>
                          <Select
                            value={stateOfFormation}
                            onValueChange={setStateOfFormation}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATE_OPTIONS.map((s) => (
                                <SelectItem key={s.abbr} value={s.abbr}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Entity type</Label>
                          <Select value={entityType} onValueChange={setEntityType} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                            <SelectContent>
                              {ENTITY_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Registered business / license state</Label>
                          <Select
                            value={registeredState}
                            onValueChange={setRegisteredState}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATE_OPTIONS.map((s) => (
                                <SelectItem key={s.abbr} value={s.abbr}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Group>

                    {/* Operating Scope */}
                    <Group legend="Operating Scope">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label>Vendor type</Label>
                          <Select value={vendorType} onValueChange={setVendorType} required>
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
                        <div className="space-y-2">
                          <Label>Verification track</Label>
                          <Select
                            value={verificationTrack}
                            onValueChange={setVerificationTrack}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select track" />
                            </SelectTrigger>
                            <SelectContent>
                              {VERIFICATION_TRACKS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
                        <div className="space-y-2">
                          <Label>License state, if applicable</Label>
                          <Select value={licenseState} onValueChange={setLicenseState}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATE_OPTIONS.map((s) => (
                                <SelectItem key={s.abbr} value={s.abbr}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Group>

                    {/* Sourcing Profile */}
                    <Group legend="Sourcing Profile">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="PrimarySupplier">
                            Primary supplier / pharmacy name
                          </Label>
                          <Input id="PrimarySupplier" name="PrimarySupplier" placeholder="List known suppliers" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="AdditionalSuppliers">
                            Additional supplier / pharmacy names
                          </Label>
                          <Textarea
                            id="AdditionalSuppliers"
                            name="AdditionalSuppliers"
                            rows={3}
                            placeholder="List known suppliers, one per line"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Current sourcing model</Label>
                          <Select
                            value={sourcingModel}
                            onValueChange={setSourcingModel}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sourcing model" />
                            </SelectTrigger>
                            <SelectContent>
                              {SOURCING_MODELS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="Products">
                            Products / compounds submitted for review
                          </Label>
                          <Textarea
                            id="Products"
                            name="Products"
                            rows={3}
                            placeholder="Example: TRT, GLP-1, peptides"
                          />
                        </div>
                      </div>
                    </Group>

                    {/* Review Readiness */}
                    <Group legend="Review Readiness">
                      <p className="t-body-sm text-muted-foreground mb-3">
                        Can your organization provide the following if accepted for review?
                      </p>
                      <div className="space-y-2.5">
                        {READINESS_ITEMS.map((item) => (
                          <label
                            key={item}
                            className="flex items-start gap-2.5 text-[13.5px] text-foreground"
                          >
                            <Checkbox
                              className="mt-0.5"
                              checked={!!readiness[item]}
                              onCheckedChange={() => toggleReadiness(item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </Group>

                    {/* Administrative Contact */}
                    <Group legend="Administrative Contact">
                      <div className="grid sm:grid-cols-2 gap-[18px]">
                        <div className="space-y-2">
                          <Label htmlFor="ContactName">Contact name</Label>
                          <Input id="ContactName" name="ContactName" placeholder="Full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactEmail">Business email</Label>
                          <Input
                            id="ContactEmail"
                            name="ContactEmail"
                            type="email"
                            placeholder="name@company.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactPhone">Business phone</Label>
                          <Input id="ContactPhone" name="ContactPhone" type="tel" placeholder="(000) 000-0000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ContactRole">Role / title</Label>
                          <Input id="ContactRole" name="ContactRole" placeholder="Example: Medical Director" />
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
                          required
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
