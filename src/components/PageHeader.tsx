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
      <div className="container-tight py-16 md:py-24">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05] max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
