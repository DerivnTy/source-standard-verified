import { FormEvent, useState } from "react";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message received", description: "We will respond within five business days." });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <UtilityHeader
        eyebrow="Contact"
        title="Reach Source Standard"
        description="For verification inquiries, partnership questions, or general correspondence."
      />

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-4">
              <div className="border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Direct Channels</p>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { l: "General", v: "contact@sourcestandard.org" },
                    { l: "Vendor Verification", v: "verification@sourcestandard.org" },
                    { l: "Press & Partnerships", v: "press@sourcestandard.org" },
                  ].map((c) => (
                    <div key={c.l} className="px-4 py-3">
                      <p className="meta-label text-foreground">{c.l}</p>
                      <p className="mt-1 text-[13px] text-foreground tabular-nums">{c.v}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-border bg-surface-muted">
                  <p className="meta-label leading-relaxed">
                    Source Standard is not a regulator and does not accept consumer complaints,
                    enforcement requests, or clinical inquiries.
                  </p>
                </div>
              </div>
            </aside>

            <form onSubmit={onSubmit} className="md:col-span-8 border border-border bg-background">
              <div className="px-6 md:px-8 py-3 border-b border-border bg-surface-muted">
                <p className="meta-label text-foreground">Form SS-CONTACT-01</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="meta-label text-foreground">Name</Label>
                    <Input id="name" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org" className="meta-label text-foreground">Organization</Label>
                    <Input id="org" className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="meta-label text-foreground">Email</Label>
                    <Input id="email" type="email" required className="h-10 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="meta-label text-foreground">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="Verification, partnership, press"
                      className="h-10 rounded-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="meta-label text-foreground">Message</Label>
                  <Textarea id="message" rows={6} required className="rounded-none" />
                </div>
              </div>
              <div className="px-6 md:px-8 py-4 border-t border-border bg-surface-muted flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground h-10 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-none"
                >
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
