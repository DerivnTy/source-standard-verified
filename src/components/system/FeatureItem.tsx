import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * FeatureItem — lightweight information item.
 *
 * No border, no background. Reads as content, not as a card. Use for
 * supporting information where card chrome would over-weight the copy.
 *
 *   variant="row"   icon left, text right   (checklists, dense lists)
 *   variant="block" icon top,  text below  (audience tiles, trust pillars)
 *
 * Icon and desc are both optional.
 *
 * Sitewide two-mode doctrine (Consumer vs Reference):
 *
 *   Consumer Mode — Homepage, About, Partners, How Verification Works, Learn.
 *   Built from PageSection + FeatureItem + NavCard + ProcessSteps.
 *   No bordered card stacks. Prose sits in a reading column, not a card.
 *
 *   Reference Mode — Governance, Status Definitions, Vendor Profiles,
 *   Facility Records, Registry detail pages. Keeps institutional chrome
 *   (RecordHeader, DocJumpBar, §-numbered anchors, doc metadata) so
 *   visitors read them as public records. Interior content still uses
 *   FeatureItem rows, ProcessSteps, and NavCard — the record chrome
 *   stays, the boxed-card interior goes.
 *
 * Presentation matches purpose:
 *   Processes → ProcessSteps.  Navigation → NavCard.  Checklists →
 *   FeatureItem rows w/ `check`.  Trust/audience pillars →
 *   FeatureItem blocks.  Reference metadata → RecordHeader / DataStrip.
 *   Prose → paragraphs, never wrapped in a card.
 *
 * Icon hierarchy (semantic, one meaning per glyph sitewide):
 *   • `search`         — discovery, lookup, registry browsing.
 *   • `shield-check`   — verification, trust, validation.
 *   • `check`          — checklist items / included attributes.
 *   • `minus`          — exclusion / limitation / does-not-mean.
 *   • `scale`          — governance, standards, accountability.
 *   • `graduation-cap` — education and learning resources.
 *   • `handshake`      — audiences, partners, collaboration.
 *
 * Principles:
 *   • Section glyphs provide context for the section, not decoration.
 *   • Remove decorative symbols that do not communicate meaning.
 *   • Interactive elements use arrows or chevrons, not contextual glyphs.
 *   • Checklist items use checkmarks only.
 *   • Cards are reserved for destinations, interactions, or genuinely
 *     high-value information — never as default containers for prose.
 *   • Avoid repeating the same contextual glyph in adjacent sections
 *     unless the repeated meaning is intentional.
 *   • Never render the same icon twice within one section.
 */

export const FeatureItem = ({
  icon,
  title,
  desc,
  variant = "row",
  className = "",
}: {
  icon?: GlyphName;
  title: string;
  desc?: string;
  variant?: "row" | "block";
  className?: string;
}) => {
  if (variant === "block") {
    return (
      <div className={`text-left ${className}`}>
        {icon && (
          <span className="text-primary/80 inline-flex" style={{ marginBottom: "10px" }}>
            <Glyph name={icon} size="md" />
          </span>
        )}

        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        {desc && (
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "14px",
              lineHeight: 1.65,
              fontWeight: 400,
              marginTop: "6px",
            }}
          >
            {desc}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 text-left ${className}`}>
      {icon && (
        <span className="text-primary/80 shrink-0" style={{ paddingTop: "2px" }}>
          <Glyph name={icon} size="sm" />
        </span>
      )}

      <div className="min-w-0">
        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        {desc && (
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              fontWeight: 400,
              marginTop: "4px",
            }}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureItem;
