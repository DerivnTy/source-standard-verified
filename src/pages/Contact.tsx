import { FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Source Standard will respond shortly." });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach Source Standard."
        description="For verification inquiries, vendor applications, partnerships, or media."
      />
      <section className="container-tight py-16 md:py-20 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-8 text-sm">
          <div>
            <p className="eyebrow mb-3">Verification Inquiries</p>
            <p className="text-foreground">verification@sourcestandard.org</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Vendor Applications</p>
            <p className="text-foreground">apply@sourcestandard.org</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Partnerships & Media</p>
            <p className="text-foreground">contact@sourcestandard.org</p>
          </div>
          <div className="pt-6 border-t border-border">
            <p className="eyebrow mb-3">Office of Record</p>
            <p className="text-muted-foreground leading-relaxed">
              Source Standard<br />
              United States
            </p>
          </div>
        </aside>

        <form onSubmit={onSubmit} className="lg:col-span-8 border border-border bg-surface p-8 md:p-10 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="cname" className="text-xs uppercase tracking-wider text-muted-foreground">Name *</Label>
              <Input id="cname" required className="rounded-sm h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cemail" className="text-xs uppercase tracking-wider text-muted-foreground">Email *</Label>
              <Input id="cemail" type="email" required className="rounded-sm h-11" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="csubject" className="text-xs uppercase tracking-wider text-muted-foreground">Subject</Label>
              <Input id="csubject" className="rounded-sm h-11" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cmsg" className="text-xs uppercase tracking-wider text-muted-foreground">Message *</Label>
              <Textarea id="cmsg" rows={6} required className="rounded-sm" />
            </div>
          </div>
          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" size="lg" className="rounded-sm">Send Message</Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contact;
