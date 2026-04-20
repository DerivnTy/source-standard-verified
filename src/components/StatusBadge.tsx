import { VerificationStatus } from "@/data/vendors";

const config: Record<VerificationStatus, { label: string; classes: string; dot: string }> = {
  verified: {
    label: "Verified",
    classes: "bg-verified-soft text-verified border-verified/20",
    dot: "bg-verified",
  },
  pending: {
    label: "Under Review",
    classes: "bg-pending-soft text-pending border-pending/20",
    dot: "bg-pending",
  },
  unverified: {
    label: "Unverified",
    classes: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/50",
  },
  expired: {
    label: "Expired",
    classes: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/50",
  },
};

export const StatusBadge = ({ status, size = "sm" }: { status: VerificationStatus; size?: "sm" | "md" }) => {
  const c = config[status];
  const sizing = size === "md" ? "text-xs px-3 py-1.5" : "text-[11px] px-2.5 py-1";
  return (
    <span className={`inline-flex items-center gap-2 border font-medium uppercase tracking-wider ${c.classes} ${sizing}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};
