import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FAQ_GROUP_LABEL,
  FAQGroup,
  libraryFaqs,
} from "@/data/library";

const GROUP_ORDER: FAQGroup[] = [
  "legality",
  "verification",
  "methodology",
  "due-diligence",
];

const EducationQuestions = () => {
  return (
    <>
      <div className="container-wide pt-6">
        <Link
          to="/education"
          className="text-[12.5px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
        >
          ← Back to Learn
        </Link>
      </div>
      <PageHeader
        eyebrow="Common Questions"
        title="All questions"
        description="Direct answers to the questions people most often ask, organized by topic."
      />
      <Section>
        <div className="space-y-10">
          {GROUP_ORDER.map((group) => {
            const items = libraryFaqs.filter((f) => f.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <h2 className="text-[14px] font-medium text-foreground mb-2">
                  {FAQ_GROUP_LABEL[group]}
                </h2>
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-border/60">
                      <AccordionTrigger className="text-[14.5px] font-medium text-foreground hover:no-underline text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed">
                        <p>{item.a}</p>
                        {item.relatedSlug && (
                          <p className="mt-3">
                            <Link
                              to={`/education/${item.relatedSlug}`}
                              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                            >
                              Read more →
                            </Link>
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default EducationQuestions;
