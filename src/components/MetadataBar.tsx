import { ReactNode } from "react";

export type MetadataItem = { label: string; value: ReactNode };

export const MetadataBar = ({
  items,
  className = "",
}: {
  items: MetadataItem[];
  className?: string;
}) => {
  return (
    <div
      className={`border-b border-border/60 bg-surface-muted/50 ${className}`}
      role="region"
      aria-label="Document metadata"
    >
      <div className="container-wide flex flex-wrap items-center gap-x-8 gap-y-2 py-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2 text-[12.5px]">
            <span className="text-muted-foreground/80">{it.label}</span>
            <span className="text-foreground font-medium">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
