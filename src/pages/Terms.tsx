import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const Terms = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-TERMS-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Terms of Use"
      title="Site usage, public content, and liability terms"
      lead="Reference page documenting terms of use, permitted public content usage, liability limitations, and the general legal structure governing this site."
    />
    <PlaceholderSection docId="SS-TERMS-2026.01" citeName="Terms of Use" />
  </>
);

export default Terms;
