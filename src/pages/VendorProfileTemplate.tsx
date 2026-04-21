import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const VendorProfileTemplate = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-TPL-VENDOR-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Template · Vendor Profile"
      title="Structural template for verified vendor registry entries"
      lead="Reference page defining the fields, identifiers, and formatting used for every public vendor profile in the verified vendors registry."
    />
    <PlaceholderSection docId="SS-TPL-VENDOR-2026.01" citeName="Vendor Profile Template" />
  </>
);

export default VendorProfileTemplate;
