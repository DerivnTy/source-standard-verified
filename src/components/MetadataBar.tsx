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
      className={`border-t border-border/40 ${className}`}
      role="region"
      aria-label="Document metadata"
    >
      <div className="container-wide flex flex-wrap items-center gap-x-10 gap-y-2 py-2.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2 t-utility-xs">
            <span className="text-muted-foreground/70">{it.label}</span>
            <span className="text-muted-foreground/90 font-medium">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
