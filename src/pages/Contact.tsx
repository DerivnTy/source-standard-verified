import { FormEvent, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
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
      <PageHeader
        eyebrow="Contact"
        title="Reach Source Standard."
        description="For verification inquiries, partnership questions, or general correspondence."
      />

      <section className="container-wide py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <aside className="md:col-span-4 space-y-8">
            <div>
              <p className="eyebrow mb-3">General</p>
              <p className="text-sm text-foreground">contact@sourcestandard.org</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Vendor Verification</p>
              <p className="text-sm text-foreground">verification@sourcestandard.org</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Press & Partnerships</p>
              <p className="text-sm text-foreground">press@sourcestandard.org</p>
            </div>
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Source Standard is not a regulator and does not accept consumer complaints, enforcement requests, or
                clinical inquiries.
              </p>
            </div>
          </aside>

          <form onSubmit={onSubmit} className="md:col-span-8 border border-border bg-background p-6 md:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.12em] font-semibold">Name</Label>
                <Input id="name" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org" className="text-xs uppercase tracking-[0.12em] font-semibold">Organization</Label>
                <Input id="org" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.12em] font-semibold">Email</Label>
                <Input id="email" type="email" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-xs uppercase tracking-[0.12em] font-semibold">Topic</Label>
                <Input id="topic" placeholder="Verification, partnership, press" className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-[0.12em] font-semibold">Message</Label>
              <Textarea id="message" rows={6} required />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6">
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
