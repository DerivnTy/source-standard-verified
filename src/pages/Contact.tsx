import { FormEvent, useState } from "react";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

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
      <PageMeta
        title="Contact"
        description="Reach Source Standard for verification inquiries, partnership questions, or general correspondence."
      />
      <Breadcrumb
        items={[
          { label: "Vendors", to: "/for-vendors" },
          { label: "Contact" },
        ]}
      />

      <UtilityHeader
        eyebrow="Get in touch"
        title="Reach Source Standard"
        description="For verification inquiries, partnership questions, or general correspondence."
      />

      <section className="bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8">
            <aside className="md:col-span-4">
              <div className="card-elevated overflow-hidden">
                <div className="px-5 py-3 border-b border-border/60 bg-surface-muted/60">
                  <p className="meta-label text-foreground">Direct Channels</p>
                </div>
                <div className="divide-y divide-border/60">
                  {[
                    { l: "General", v: "contact@sourcestandard.org" },
                    { l: "Vendor Verification", v: "verification@sourcestandard.org" },
                    { l: "Press & Partnerships", v: "press@sourcestandard.org" },
                  ].map((c) => (
                    <div key={c.l} className="px-5 py-3.5">
                      <p className="meta-label text-foreground">{c.l}</p>
                      <p className="mt-1 t-body-sm text-foreground tabular-nums">{c.v}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-border/60 bg-surface-muted/60">
                  <p className="t-utility-xs text-muted-foreground leading-relaxed">
                    For clinical questions or regulatory matters, please contact the appropriate healthcare professional or regulatory authority.
                  </p>
                </div>
              </div>
            </aside>

            <form onSubmit={onSubmit} className="md:col-span-8 card-elevated overflow-hidden">
              <div className="px-6 md:px-8 py-3 border-b border-border/60 bg-surface-muted/60">
                <p className="meta-label text-foreground">Message</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="meta-label text-foreground">Name</Label>
                    <Input id="name" required className="h-10 focus-visible:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org" className="meta-label text-foreground">Organization</Label>
                    <Input id="org" className="h-10 focus-visible:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="meta-label text-foreground">Email</Label>
                    <Input id="email" type="email" required className="h-10 focus-visible:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="meta-label text-foreground">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="Verification, partnership, press"
                      className="h-10 focus-visible:ring-primary/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="meta-label text-foreground">Message</Label>
                  <Textarea id="message" rows={6} required className="focus-visible:ring-primary/30" />
                </div>
              </div>
              <div className="px-6 md:px-8 py-4 border-t border-border/60 bg-surface-muted/60 flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-foreground hover:bg-foreground/90 text-background h-10 px-6 t-body-sm font-semibold"
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
