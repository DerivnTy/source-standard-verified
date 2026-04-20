import { FormEvent, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

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
      <PageHeader
        eyebrow="Apply for Verification"
        title="Begin a Source Standard application."
        description="Initial intake takes approximately fifteen minutes. A reviewer will follow up to confirm receipt and outline any additional documentation required."
      />

      <section className="container-wide py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <aside className="md:col-span-4">
            <p className="eyebrow mb-4">Before You Begin</p>
            <ul className="border border-border bg-surface-muted divide-y divide-border text-sm">
              {[
                "Active business licensing",
                "Supplier documentation",
                "Applicable certificates of analysis",
                "Prescriber credentials (if clinical)",
                "Pharmacy partnership records (if applicable)",
              ].map((i, idx) => (
                <li key={i} className="px-4 py-3 flex gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground tabular-nums pt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground leading-relaxed">{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
              Documentation upload is handled in a follow-up secure intake link issued after this form is received.
            </p>
          </aside>

          <form onSubmit={onSubmit} className="md:col-span-8 border border-border bg-background p-6 md:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="vendor" className="text-xs uppercase tracking-[0.12em] font-semibold">Vendor / Clinic Name</Label>
                <Input id="vendor" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-xs uppercase tracking-[0.12em] font-semibold">Primary Contact</Label>
                <Input id="contact" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.12em] font-semibold">Email</Label>
                <Input id="email" type="email" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs uppercase tracking-[0.12em] font-semibold">Phone</Label>
                <Input id="phone" type="tel" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs uppercase tracking-[0.12em] font-semibold">Vendor Category</Label>
                <Input id="category" placeholder="e.g. TRT Clinic, Compounding Pharmacy" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-xs uppercase tracking-[0.12em] font-semibold">State of Operation</Label>
                <Input id="state" required className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-xs uppercase tracking-[0.12em] font-semibold">Operating Summary</Label>
              <Textarea id="notes" rows={5} placeholder="Briefly describe your operation, licensing, and the documentation you can provide." />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground max-w-md">
                Submissions are reviewed in the order received. Verification is not guaranteed and depends on documentation provided.
              </p>
              <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6">
                {submitting ? "Submitting…" : "Submit application"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Apply;
