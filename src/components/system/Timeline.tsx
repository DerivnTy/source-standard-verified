import { ReactNode } from "react";

export type TimelineEvent = {
  date: string;
  title: string;
  detail?: ReactNode;
  source?: string;
};

/**
 * Timeline, dated regulatory / inspection / enforcement events.
 * Hairline rule with date column on desktop, stacked on mobile.
 */
export const Timeline = ({
  events,
  emptyLabel = "No dated regulatory events have been established by Source Standard for this record.",
  className = "",
}: {
  events: TimelineEvent[];
  emptyLabel?: string;
  className?: string;
}) => {
  if (!events.length) {
    return (
      <p className={`text-muted-foreground ${className}`} style={{ fontSize: "14px", lineHeight: 1.6 }}>
        {emptyLabel}
      </p>
    );
  }
  return (
    <ol className={`border-t border-border ${className}`}>
      {events.map((event, i) => (
        <li
          key={`${event.date}-${i}`}
          className="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-1 sm:gap-5 border-b border-border py-3"
        >
          <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: "11px", letterSpacing: "0.08em", lineHeight: 1.9 }}>
            {event.date}
          </span>
          <div>
            <p className="text-foreground" style={{ fontSize: "15px", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
              {event.title}
            </p>
            {event.detail && (
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: "4px 0 0" }}>
                {event.detail}
              </p>
            )}
            {event.source && (
              <p
                className="font-mono uppercase text-muted-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.08em", margin: "6px 0 0" }}
              >
                {event.source}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};
