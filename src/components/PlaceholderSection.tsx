import { Section, SectionLabel } from "./Section";

export const PlaceholderSection = ({ docId, citeName }: { docId: string; citeName: string }) => {
  return (
    <Section>
      <SectionLabel number="§1" title="Section in development" />
      <p className="text-[14.5px] text-muted-foreground leading-relaxed max-w-2xl">
        Content for this reference page is being prepared and will publish under document
        version 2026.01. Structural placement and document identifier are final; copy and
        records will be added in a subsequent revision.
      </p>
    </Section>
  );
};
