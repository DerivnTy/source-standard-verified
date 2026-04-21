import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const StatusDefinitions = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-STATUS-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Status Definitions"
      title="Public status terms used across the registry"
      lead="Reference page defining Verified, Pending Review, Suspended, Removed, Greenlisted, Not Listed, and Under Review, including how each status is applied publicly."
    />
    <PlaceholderSection docId="SS-STATUS-2026.01" citeName="Status Definitions" />
  </>
);

export default StatusDefinitions;
