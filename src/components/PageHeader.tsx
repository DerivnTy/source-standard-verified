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
      style={{ paddingTop: "56px", paddingBottom: "56px" }}
    >
      <div className="flex w-full flex-col items-start text-left">
        {eyebrow && (
          <p
            className="t-eyebrow-sm"
            style={{ color: "rgba(255,255,255,0.55)", marginBottom: "14px" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="ss-hero-title !mt-0" style={{ color: "#ffffff" }}>
          {title}
        </h1>
        {description && (
          <p
            className="ss-lead"
            style={{ marginTop: "14px", color: "rgba(255,255,255,0.74)" }}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6 w-full max-w-[36rem]">{children}</div>}
      </div>
    </div>
  </section>
);
