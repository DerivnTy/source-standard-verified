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
      style={{ paddingTop: "48px", paddingBottom: "48px" }}
    >
      <div className="mx-auto flex w-reading flex-col items-center text-center">
        {eyebrow && (
          <p
            className="t-eyebrow-sm"
            style={{ color: "rgba(255,255,255,0.55)", marginBottom: "12px" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="ss-hero-title !mt-0"
          style={{ color: "#ffffff", textWrap: "balance" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="ss-lead"
            style={{ marginTop: "14px", color: "rgba(255,255,255,0.74)", textWrap: "balance" }}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-5 w-full">{children}</div>}
      </div>
    </div>
  </section>
);
