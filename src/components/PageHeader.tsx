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
    <section className="border-b border-border bg-background">
      <div className="container-wide py-14 md:py-20">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="text-[1.625rem] md:text-[2rem] font-semibold tracking-tight text-foreground leading-[1.15] max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[16px] text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
};
