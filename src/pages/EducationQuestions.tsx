import { Link } from "react-router-dom";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Section } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
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
      <PageMeta
        title="Common Questions"
        description="Indexed FAQs across legality, verification methodology, and clinical due diligence."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Common Questions" },
        ]}
      />

      <UtilityHeader
        backHref="/education"
        backLabel="Back to Resource Library"
        eyebrow="Recorded inquiries"
        title="Regulatory FAQ: full archive"
        description="Recorded answers to recurring inquiries on verification, clinical safety, and regulatory standing."
      />
      <Section density="doc">
        <div className="space-y-10">
          {GROUP_ORDER.map((group) => {
            const items = libraryFaqs.filter((f) => f.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <h2 className="h-card mb-2">
                  {FAQ_GROUP_LABEL[group]}
                </h2>
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-border/60">
                      <AccordionTrigger className="t-body-sm font-medium text-foreground hover:no-underline text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="t-body-sm text-muted-foreground leading-relaxed">
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
