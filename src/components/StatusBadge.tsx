import { VerificationStatus } from "@/data/vendors";

const config: Record<VerificationStatus, { label: string; color: string }> = {
  verified: { label: "Verified", color: "text-verified" },
  pending: { label: "Under Review", color: "text-pending" },
  unverified: { label: "Unverified", color: "text-muted-foreground" },
  expired: { label: "Expired", color: "text-muted-foreground" },
};

export const StatusBadge = ({ status, size = "sm" }: { status: VerificationStatus; size?: "sm" | "md" }) => {
  const c = config[status];
  const text = size === "md" ? "text-[11px]" : "text-[10px]";
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.16em] tabular-nums ${text} ${c.color}`}
    >
      <span aria-hidden className="inline-block leading-none">■</span>
      {c.label}
    </span>
  );
};
