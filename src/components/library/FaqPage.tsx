import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { NEXT_STEPS } from "@/data/learn";

export type FaqItem = { q: string; a: string };

type FaqPageProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

/* ── Continue Learning (shared closer pattern) ─────────────────── */

const ContinueLearning = () => (
  <section className="bg-background" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
    <div className="page-shell">
      <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
        <h2 className="t-section-title-sm text-foreground">Continue Learning</h2>
        <ul className="flex flex-col mt-4 divide-y divide-border/60 border-t border-b border-border/60" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {["vendor-registry", "how-verification-works", "facility-records"].map((key) => {
            const step = NEXT_STEPS[key as keyof typeof NEXT_STEPS];
            return (
              <li key={key}>
                <Link
                  to={step.to}
                  className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-3.5 items-baseline hover:bg-muted/40 active:bg-muted/60 transition-colors"
                  style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
                >
                  <span className="font-sans text-foreground group-hover:text-primary transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {step.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-muted-foreground/60 group-hover:text-foreground transition-colors font-mono"
                    style={{ fontSize: "14px" }}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

/**
 * FaqPage, flat editorial Q&A.
 *
 * No accordion. Questions render as h2 headings, answers as prose.
 * Header sits on page background with a hairline separator.
 * Closes with a single-sentence "Still have questions?" and Continue Learning.
 */
export const FaqPage = ({
  title,
  intro,
  items,
}: FaqPageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-background">
      {/* Back link + hairline */}
      <div className="border-b border-border/60 bg-background">
        <div className="page-shell" style={{ paddingTop: "14px", paddingBottom: "14px" }}>
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            <Link
              to="/learn/faq"
              className="inline-flex items-center gap-2 font-sans text-muted-foreground hover:text-foreground transition-all duration-200 group"
              style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">
                ←
              </span>
              <span>Back to FAQ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header className="bg-background">
        <div className="page-shell" style={{ paddingTop: "24px", paddingBottom: "0" }}>
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            <h1 className="t-article-title text-foreground">{title}</h1>
            {intro && (
              <p className="t-article-standfirst" style={{ marginTop: "12px" }}>
                {intro}
              </p>
            )}

            <div
              aria-hidden
              style={{
                height: "0.5px",
                background: "hsl(var(--border))",
                marginTop: "24px",
              }}
            />
          </div>
        </div>
      </header>

      {/* Flat Q&A */}
      <section className="bg-background" style={{ paddingTop: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            <div className="flex flex-col" style={{ gap: "24px" }}>
              {items.map((item, i) => (
                <div key={i}>
                  <h2
                    className="t-section-title-sm text-foreground"
                    style={{ marginBottom: "6px" }}
                  >
                    {item.q}
                  </h2>
                  <div className="t-article-prose">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Still have questions? — single sentence */}
      <section className="bg-background" style={{ paddingTop: "28px", paddingBottom: "0" }}>
        <div className="page-shell">
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Still have questions?{" "}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-foreground hover:text-primary transition-colors cursor-pointer"
                    style={{
                      textDecoration: "underline",
                      textDecorationThickness: "0.5px",
                      textUnderlineOffset: "3px",
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                    }}
                  >
                    Submit a question
                  </button>
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
              </Dialog>{" "}
              to the Source Standard team.
            </p>
          </div>
        </div>
      </section>

      <ContinueLearning />
    </article>
  );
};
