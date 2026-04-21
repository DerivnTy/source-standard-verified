import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const FAQ = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-FAQ-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Frequently Asked Questions"
      title="Public reference questions on verification, greenlisting, and registry use"
      lead="Reference page consolidating common questions on verification, greenlist inclusion, vendor participation, consumer use, and the meaning of public statuses."
    />
    <PlaceholderSection docId="SS-FAQ-2026.01" citeName="FAQ" />
  </>
);

export default FAQ;
