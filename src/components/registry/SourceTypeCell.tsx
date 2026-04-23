import { GreenlistCategory } from "@/data/greenlist";

const CATEGORY_TICK: Record<GreenlistCategory, string> = {
  "503B": "bg-[hsl(var(--src-503b))]",
  "503A": "bg-[hsl(var(--src-503a))]",
  Other: "bg-[hsl(var(--src-other))]",
};

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B",
  "503A": "503A",
  Other: "OTHER",
};

/**
 * SourceTypeCell — locked source-type rendering for the registry table and
 * upcoming profile pages. 2px vertical tick + uppercase 11px tracking-wide
 * category label, with an optional muted type detail line beneath.
 *
 * When `alert` is set the cell switches to destructive tokens and labels
 * itself "NOT RECOGNIZED" with the alert's short reason as the detail line.
 */
export const SourceTypeCell = ({
  category,
  typeDetail,
  alert,
}: {
  category: GreenlistCategory;
  typeDetail?: string;
  alert?: { shortLabel?: string; reason: string } | null;
}) => {
  const isAlert = !!alert;
  const tick = isAlert ? "bg-destructive" : CATEGORY_TICK[category];
  const label = isAlert ? "NOT RECOGNIZED" : CATEGORY_LABEL[category];
  const detail = isAlert
    ? alert?.shortLabel ?? alert?.reason ?? `${category} (former)`
    : typeDetail;

  return (
    <div className="flex items-stretch gap-2.5 min-w-0">
      <span
        aria-hidden
        className={`inline-block w-[2px] shrink-0 self-stretch ${tick}`}
      />
      <div className="min-w-0 flex flex-col justify-center">
        <span
          className={`t-utility-xs font-semibold ${
            isAlert ? "text-destructive" : "text-foreground"
          }`}
        >
          {label}
        </span>
        {detail && (
          <span
            className="t-micro mt-0.5 text-muted-foreground truncate"
            title={detail}
          >
            {detail}
          </span>
        )}
      </div>
    </div>
  );
};
