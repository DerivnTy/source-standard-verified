import { FormEvent, useState } from "react";
import { RecordHeader } from "@/components/RecordHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const checklist = [
  "Active business licensing",
  "Supplier documentation",
  "Applicable certificates of analysis",
  "Prescriber credentials (if clinical)",
  "Pharmacy partnership records (if applicable)",
];

const Apply = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Application received",
        description: "A reviewer will follow up within five business days to confirm receipt.",
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-INTAKE-2026.01" },
          { label: "Form", value: "Vendor Intake" },
          { label: "Status", value: "Open" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="Apply for Verification · Intake Form"
        title="Begin a Source Standard application."
        lead="Initial intake takes approximately fifteen minutes. A reviewer will follow up to confirm receipt and outline any additional documentation required."
      />

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Before You Begin</p>
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
                  <p className="meta-label">
                    Document upload via secure intake link issued after receipt of this form.
                  </p>
                </div>
              </div>
            </aside>

            <form
              onSubmit={onSubmit}
              className="md:col-span-8 border border-border bg-background"
            >
              <div className="px-6 md:px-8 py-3 border-b border-border bg-surface-muted">
                <p className="meta-label text-foreground">Form SS-INTAKE-01 · Required Fields</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="vendor" className="meta-label text-foreground">Vendor / Clinic Name</Label>
                    <Input id="vendor" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="meta-label text-foreground">Primary Contact</Label>
                    <Input id="contact" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="meta-label text-foreground">Email</Label>
                    <Input id="email" type="email" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="meta-label text-foreground">Phone</Label>
                    <Input id="phone" type="tel" className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="meta-label text-foreground">Vendor Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g. TRT Clinic, Compounding Pharmacy"
                      required
                      className="h-10 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="meta-label text-foreground">State of Operation</Label>
                    <Input id="state" required className="h-10 rounded-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="meta-label text-foreground">Operating Summary</Label>
                  <Textarea
                    id="notes"
                    rows={5}
                    placeholder="Briefly describe your operation, licensing, and the documentation you can provide."
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="px-6 md:px-8 py-4 border-t border-border bg-surface-muted flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="meta-label max-w-md">
                  Submissions are reviewed in the order received. Verification depends on documentation provided.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground h-10 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-none"
                >
                  {submitting ? "Submitting…" : "Submit application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
