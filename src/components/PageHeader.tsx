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
}) => {
  return (
    <section className="border-b border-border bg-surface-muted">
      <div className="container-wide py-20 md:py-28">
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-foreground leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
};
