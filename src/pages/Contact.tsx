import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHeader } from "@/components/PageHeader";

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
        description="Reach Source Standard for verification inquiries, record questions, or general correspondence."
      />
      <Breadcrumb
        items={[
          { label: "About", to: "/about" },
          { label: "Contact" },
        ]}
      />

      <PageHeader
        eyebrow="Correspondence"
        title="Contact Source Standard"
        description="For verification inquiries, record questions, or general correspondence."
      />

      <section className="bg-background">
        <div className="page-shell" style={{ paddingTop: "36px", paddingBottom: "48px" }}>
          <div className="grid gap-10 text-left md:grid-cols-12 md:gap-16">
            <aside className="md:col-span-4">
              <div className="divide-y divide-border border-t border-b border-border">
                {[
                  { l: "General", v: "contact@sourcestandard.org" },
                  { l: "Clinic review", v: "verification@sourcestandard.org" },
                  { l: "Press", v: "press@sourcestandard.org" },
                ].map((c) => (
                  <div key={c.l} className="py-3">
                    <p className="t-eyebrow-sm">{c.l}</p>
                    <p className="mt-1 t-body-sm tabular-nums text-foreground">{c.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                For clinical questions or regulatory matters, contact the appropriate healthcare professional or regulatory authority.
              </p>
            </aside>

            <form onSubmit={onSubmit} className="md:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="org">Organization</Label>
                  <Input id="org" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="Review, records, press"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>
              </div>
              <div className="mt-5">
                <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Sending" : "Send message"}
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
