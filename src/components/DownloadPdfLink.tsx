import { Download } from "lucide-react";

/**
 * DownloadPdfLink — print-stylesheet driven "Download · PDF" link.
 * Phase 1: triggers window.print(); CSS @media print handles formatting.
 */
export const DownloadPdfLink = ({ className = "" }: { className?: string }) => (
  <button
    type="button"
    onClick={() => typeof window !== "undefined" && window.print()}
    aria-label="Download this document as PDF"
    className={`no-print inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors ${className}`}
  >
    <Download className="h-3.5 w-3.5" aria-hidden="true" />
    Download · PDF
  </button>
);
