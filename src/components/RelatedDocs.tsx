import { Link } from "react-router-dom";

export type RelatedDoc = { to: string; label: string; description?: string };

export const RelatedDocs = ({
  title = "Read deeper",
  items,
}: {
  title?: string;
  items: RelatedDoc[];
}) => (
  <div>
    <p className="eyebrow mb-4">{title}</p>
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className="group block bg-surface border border-border/60 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="t-body-sm font-semibold text-foreground leading-snug">
                  {item.label}
                </p>
                {item.description && (
                  <p className="t-utility-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="text-primary t-body-sm shrink-0 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
