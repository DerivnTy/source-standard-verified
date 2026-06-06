import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type FaqItem = { q: string; a: string };

type FaqPageProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

/**
 * FaqPage — Consumer-facing common-inquiry layout.
 * Eyebrow · Title · Intro · Expandable Q&A. No metadata cards, no record IDs.
 */
export const FaqPage = ({
  title,
  intro,
  items,
}: FaqPageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-background">
      {/* Back link */}
      <div className="bg-background border-b border-border/60">
        <div className="page-shell py-3">
          <div className="mx-auto w-wide">
            <Link
              to="/education"
              className="inline-flex items-center gap-1.5 t-body-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Back to Resource Library
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="page-shell pt-5 pb-8">
        <div className="mx-auto w-wide max-w-[68ch]">
          <h1
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              lineHeight: "1.08",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-muted-foreground"
            style={{ fontSize: "14px", lineHeight: "1.6" }}
          >
            {intro}
          </p>
        </div>
      </header>

      {/* FAQ list */}
      <section className="page-shell pb-0">
        <div className="mx-auto w-wide max-w-[68ch]">
          <Accordion
            type="single"
            collapsible
            className="border-t border-border/60"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="border-b border-border/60"
              >
                <AccordionTrigger className="py-5 hover:no-underline text-left">
                  <span
                    className="font-sans font-semibold text-foreground"
                    style={{ fontSize: "14px", lineHeight: "1.4" }}
                  >
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13px", lineHeight: "1.65" }}
                  >
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have a Question? */}
      <section className="page-shell py-8">
        <div className="mx-auto w-wide max-w-[68ch]">
          <div className="bg-card border border-border/60 rounded-xl p-6 md:p-8">
            <h2 className="font-sans font-semibold text-foreground" style={{ fontSize: "16px", lineHeight: "1.3" }}>
              Still Have a Question?
            </h2>
            <p
              className="mt-2 text-muted-foreground"
              style={{ fontSize: "12px", lineHeight: "1.6" }}
            >
              Can&apos;t find the answer you&apos;re looking for? Submit a question to the Source Standard team. Common questions may be reviewed and added to the public Resource Library and Common Inquiry database.
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-5" size="sm">
                  Submit a Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle className="font-sans font-semibold text-foreground" style={{ fontSize: "16px", lineHeight: "1.3" }}>
                    Submit a Question
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                    Common questions may be reviewed and added to the public Resource Library.
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="mt-4 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="t-label-sm text-foreground">
                      Name
                    </Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="t-label-sm text-foreground">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question" className="t-label-sm text-foreground">
                      Question
                    </Label>
                    <Textarea id="question" placeholder="What would you like to know?" className="min-h-[100px]" />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </article>
  );
};
