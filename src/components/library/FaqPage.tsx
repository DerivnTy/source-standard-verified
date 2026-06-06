import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  eyebrow = "Source Standard · Common Inquiry",
  title,
  intro,
  items,
}: FaqPageProps) => (
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
    <header className="page-shell" style={{ paddingTop: "48px", paddingBottom: "32px" }}>
      <div className="mx-auto w-wide max-w-[68ch]">
        <p
          className="font-mono uppercase text-muted-foreground"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-3 font-serif text-foreground"
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
          style={{ fontSize: "16px", lineHeight: "1.6" }}
        >
          {intro}
        </p>
      </div>
    </header>

    {/* FAQ list */}
    <section className="page-shell" style={{ paddingBottom: "72px" }}>
      <div className="mx-auto w-wide max-w-[68ch]">
        <Accordion
          type="single"
          collapsible
          defaultValue="q-0"
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
                  style={{ fontSize: "16px", lineHeight: "1.4" }}
                >
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "15px", lineHeight: "1.65" }}
                >
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </article>
);
