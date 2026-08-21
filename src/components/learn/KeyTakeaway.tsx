import { ReactNode } from "react";

/**
 * KeyTakeaway — quiet editorial callout at the top of an article body.
 * Restates the short answer in one place so a scanning reader sees the
 * conclusion immediately.
 */
export const KeyTakeaway = ({ children }: { children: ReactNode }) => (
  <section className="bg-background" style={{ paddingTop: "24px" }}>
    <div className="page-shell">
      <div className="w-reading-wide">
        <div
          style={{
            border: "1px solid hsl(var(--border))",
            borderLeft: "2px solid hsl(var(--primary))",
            borderRadius: "2px",
            background: "hsl(var(--muted) / 0.35)",
            padding: "16px 20px",
          }}
        >
          <p
            className="font-mono uppercase text-muted-foreground"
            style={{ fontSize: "10px", letterSpacing: "0.14em", marginBottom: "10px" }}
          >
            Key takeaway
          </p>
          <div
            className="text-foreground"
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default KeyTakeaway;
