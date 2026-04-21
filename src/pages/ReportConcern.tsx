import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const ReportConcern = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-REPORT-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Report a Concern"
      title="Submission pathway for vendor, sourcing, and listing concerns"
      lead="Reference page documenting reportable concern types, submission guidance, review expectations, and the public accountability function of the reporting channel."
    />
    <PlaceholderSection docId="SS-REPORT-2026.01" citeName="Report a Concern" />
  </>
);

export default ReportConcern;
