import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const GreenlistEntryTemplate = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-TPL-GREENLIST-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Template · Greenlist Entry"
      title="Structural template for greenlisted upstream source entries"
      lead="Reference page defining the fields, identifiers, regulatory references, and formatting used for every greenlist entry in the upstream registry."
    />
    <PlaceholderSection docId="SS-TPL-GREENLIST-2026.01" citeName="Greenlist Entry Template" />
  </>
);

export default GreenlistEntryTemplate;
