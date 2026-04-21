import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const MedicalAdvisory = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-MAB-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Medical Advisory Board"
      title="Physician oversight and clinical review of framework criteria"
      lead="Reference page documenting the medical advisory roster, credentials, advisory role, and the function of clinical oversight in standard maintenance."
    />
    <PlaceholderSection docId="SS-MAB-2026.01" citeName="Medical Advisory Board" />
  </>
);

export default MedicalAdvisory;
