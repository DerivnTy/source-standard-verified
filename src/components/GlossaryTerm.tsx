import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getGlossaryEntry } from "@/data/glossary";

/**
 * GlossaryTerm, inline term with dotted underline + tooltip definition.
 * Pulls from src/data/glossary.ts.
 */
export const GlossaryTerm = ({
  term,
  children,
}: {
  term: string;
  children?: ReactNode;
}) => {
  const entry = getGlossaryEntry(term);
  const label = children ?? entry?.term ?? term;
  if (!entry) return <>{label}</>;

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className="cursor-help underline decoration-dotted decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground focus:outline-none focus:decoration-foreground"
          aria-label={`Definition of ${entry.term}`}
        >
          {label}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[260px] bg-background border border-border text-foreground p-3 rounded-[4px] shadow-md"
      >
        <p className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
          {entry.term}
        </p>
        <p className="text-[12.5px] text-foreground leading-relaxed">
          {entry.definition}
        </p>
        <Link
          to={`/status-definitions${entry.anchor ? `#${entry.anchor}` : ""}`}
          className="mt-2 inline-block text-[10.5px] font-mono uppercase tracking-[0.12em] text-primary hover:text-primary-hover"
        >
          Read full →
        </Link>
      </TooltipContent>
    </Tooltip>
  );
};
