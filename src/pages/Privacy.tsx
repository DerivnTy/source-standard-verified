import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const Privacy = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-PRIVACY-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Privacy Policy"
      title="Data practices, collection, and form handling"
      lead="Reference page documenting privacy practices, data collection scope, contact and form handling, and reporting privacy under SS-FRAMEWORK-2026.01."
    />
    <PlaceholderSection docId="SS-PRIVACY-2026.01" citeName="Privacy Policy" />
  </>
);

export default Privacy;
