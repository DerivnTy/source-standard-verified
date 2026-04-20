import { VerificationStatus } from "@/data/vendors";

const config: Record<VerificationStatus, { label: string; classes: string; dot: string }> = {
  verified: {
    label: "Verified",
    classes: "bg-verified-soft text-verified border-verified/30",
    dot: "bg-verified",
  },
  pending: {
    label: "Under Review",
    classes: "bg-pending-soft text-pending border-pending/30",
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
  const sizing = size === "md" ? "text-[11px] px-2.5 py-1.5" : "text-[10px] px-2 py-1";
  return (
    <span className={`inline-flex items-center gap-1.5 border font-semibold uppercase tracking-[0.12em] ${c.classes} ${sizing}`}>
      <span className={`h-1.5 w-1.5 ${c.dot}`} />
      {c.label}
    </span>
  );
};
