import { ReactNode } from "react";

export const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => (
  <section className="relative bg-[hsl(var(--navy-surface))]">
    <div
      className="relative page-shell"
      style={{ paddingTop: "24px", paddingBottom: "26px" }}
    >
      <div className="mx-auto w-wide">
        {eyebrow && (
          <p
            className="t-eyebrow-sm"
            style={{ color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="ss-hero-title !text-white !mt-0"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="ss-lead !text-white/70"
            style={{ marginTop: "10px", textWrap: "balance" }}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  </section>
);
