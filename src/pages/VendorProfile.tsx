import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_FULFILLMENT_LABEL,
  getVendorFulfillment,
} from "@/data/vendors";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { VerifiedShieldMark } from "@/components/registry/VerifiedShieldMark";
import { absoluteUrl, SITE_URL } from "@/lib/siteUrl";

/**
 * VendorProfile — Public clinic identity + verification record.
 *
 * Structure (top → bottom):
 *   1. Identity Header (logo, name, status, category, contact + social row,
 *      fulfillment indicators)
 *   2. About This Clinic (summary, philosophy, patient focus, treatments)
 *   3. Services & Clinical Focus (searchable badges)
 *   4. Providers (medical director, credentials, additional providers)
 *   5. Social Proof (socials, Google Business)
 *   6. Verification Record (status, scope, dates, documentation, history)
 *   7. Claim This Profile (only when not claimed)
 *
 * Visual rules — match Source Standard's institutional aesthetic:
 *   white cards, 0.5px hairline borders, no shadows, no marketing prose,
 *   monospaced ids and dates.
 */

const CARD_STYLE: React.CSSProperties = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "10px",
  padding: "24px",
  background: "hsl(var(--card))",
};

const formatLocation = (vendor: Vendor): string =>
  vendor.city && vendor.state
    ? `${vendor.city}, ${vendor.state}`
    : vendor.city || vendor.state || "—";

const sourceTypeFor = (_v: Vendor): string => "503A / 503B / Retail";

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const normalizeHandle = (h?: string): string | undefined => {
  if (!h) return undefined;
  return h.startsWith("@") ? h.slice(1) : h.replace(/^https?:\/\/[^/]+\//, "").replace(/\/$/, "");
};

const socialUrl = (platform: "instagram" | "facebook" | "linkedin" | "youtube", value?: string): string | undefined => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, "");
  switch (platform) {
    case "instagram": return `https://instagram.com/${handle}`;
    case "facebook": return `https://facebook.com/${handle}`;
    case "linkedin": return `https://linkedin.com/company/${handle}`;
    case "youtube": return `https://youtube.com/${handle.startsWith("@") ? handle : "@" + handle}`;
  }
};

// ─── Atomic UI ────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p
    className="font-sans font-semibold uppercase text-muted-foreground"
    style={{ fontSize: "10px", letterSpacing: "0.08em" }}
  >
    {children}
  </p>
);

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2
    className="font-sans font-semibold uppercase text-muted-foreground"
    style={{ fontSize: "11px", letterSpacing: "0.1em" }}
  >
    {children}
  </h2>
);

const Cell = ({
  label,
  value,
  mono,
  href,
}: {
  label: string;
  value?: ReactNode;
  mono?: boolean;
  href?: string;
}) => {
  const present =
    value !== undefined && value !== null && value !== "" &&
    !(Array.isArray(value) && value.length === 0);
  const display = Array.isArray(value) ? (value as ReactNode[]).join(", ") : value;
  return (
    <div>
      <dt
        className="font-sans font-semibold uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono tabular-nums" : "font-sans font-medium"} ${
          present ? "text-foreground" : "text-muted-foreground"
        }`}
        style={{ fontSize: "12px", lineHeight: "1.5" }}
      >
        {present ? (
          href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors break-words"
            >
              {display}
            </a>
          ) : (
            display
          )
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
};

const Tag = ({ children, href }: { children: ReactNode; href?: string }) => {
  const cls =
    "inline-flex items-center font-sans font-semibold uppercase border border-border text-foreground bg-background transition-colors hover:border-foreground/60";
  const style: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.06em",
    padding: "4px 9px",
    borderRadius: "16px",
  };
  return href ? (
    <Link to={href} className={cls} style={style}>{children}</Link>
  ) : (
    <span className={cls} style={style}>{children}</span>
  );
};

// Tiny 1px-stroke social icons. No fills, no emojis — matches institutional rule.
const SocialIcon = ({ kind, size = 14 }: { kind: "instagram" | "facebook" | "linkedin" | "youtube" | "google" | "phone" | "web"; size?: number }) => {
  const stroke = "currentColor";
  const sw = 1.25;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (kind) {
    case "instagram":
      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill={stroke} stroke="none" /></svg>);
    case "facebook":
      return (<svg {...props}><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5C14 8.2 14.2 8 14 8z" /></svg>);
    case "linkedin":
      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4" /></svg>);
    case "youtube":
      return (<svg {...props}><rect x="2.5" y="6" width="19" height="12" rx="3" /><path d="M10 9.5v5l4-2.5z" fill={stroke} /></svg>);
    case "google":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></svg>);
    case "phone":
      return (<svg {...props}><path d="M5 4h3l2 4-2 1a10 10 0 0 0 5 5l1-2 4 2v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>);
    case "web":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>);
  }
};

const ContactLink = ({ href, label, icon }: { href: string; label: string; icon: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
    style={{ fontSize: "12px" }}
  >
    {icon}
    <span className="font-sans">{label}</span>
  </a>
);

const FulfillmentChip = ({ active, label }: { active: boolean; label: string }) => (
  <span
    className="inline-flex items-center gap-1 font-sans font-semibold uppercase"
    style={{
      fontSize: "9.5px",
      letterSpacing: "0.08em",
      padding: "3px 8px",
      borderRadius: "12px",
      border: "0.5px solid hsl(var(--border))",
      color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.55)",
      background: active ? "hsl(var(--muted) / 0.5)" : "transparent",
    }}
  >
    <span
      aria-hidden
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.4)",
      }}
    />
    {label}
  </span>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const VendorProfile = () => {
  const { slug } = useParams();
  const vendor = slug ? getVendor(slug) : undefined;

  if (!vendor) {
    return (
      <>
        <PageMeta
          title="Vendor not found"
          description="No vendor profile found in the Source Standard public directory."
          noindex
        />
        <section className="container-narrow py-24 text-center">
          <p className="eyebrow mb-3">Not Found</p>
          <h1 className="title-page mb-4">No vendor profile found.</h1>
          <Link
            to="/verified-vendors"
            className="t-utility-xs font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
          >
            ← Back to Directory
          </Link>
        </section>
      </>
    );
  }

  const status = vendor.status;
  const isVerified = status === "verified";
  const isUnverified = status === "unverified";
  const fulfillment = getVendorFulfillment(vendor);
  const isOnline = fulfillment === "online";
  const isInPerson = fulfillment === "in-person";
  const isHybrid = fulfillment === "hybrid";
  const location = formatLocation(vendor);
  const sourceType = sourceTypeFor(vendor);
  const claimed = vendor.claimed === true || isVerified;

  // Status pill (top-right of identity header)
  const renderProfileStatus = (s: VendorPublicStatus) => {
    const baseStyle = {
      fontSize: "10px",
      letterSpacing: "0.08em",
      lineHeight: 1,
      gap: "4px",
    } as const;
    if (s === "verified") {
      return (
        <span
          className="shrink-0 inline-flex items-center justify-end font-sans font-bold uppercase tabular-nums"
          style={{ ...baseStyle, color: "#001021" }}
        >
          VERIFIED
          <span
            aria-hidden
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10px",
              width: "16px",
              overflow: "visible",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(calc(-50% - 1px))",
                display: "block",
              }}
            >
              <VerifiedShieldMark height={18} color="#001021" />
            </span>
          </span>
        </span>
      );
    }
    const FALLBACK: Record<
      Exclude<VendorPublicStatus, "verified">,
      { label: string; color: string }
    > = {
      unverified: { label: "UNVERIFIED", color: "#FF3B30" },
      "under-review": { label: "UNDER REVIEW", color: "#FF9500" },
      suspended: { label: "SUSPENDED", color: "hsl(var(--muted-foreground))" },
      removed: { label: "REMOVED", color: "hsl(var(--muted-foreground))" },
    };
    const { label, color } = FALLBACK[s];
    return (
      <span
        className="shrink-0 inline-flex items-center justify-end font-sans font-bold uppercase tabular-nums"
        style={{ ...baseStyle, color }}
      >
        {label}
      </span>
    );
  };

  // Verified scope flattening (unchanged)
  const hasGroups =
    isVerified &&
    vendor.verifiedScopeGroups &&
    Object.keys(vendor.verifiedScopeGroups).length > 0;
  const hasFlatCompounds =
    isVerified && vendor.verifiedCompounds && vendor.verifiedCompounds.length > 0;
  const hasCategoryFallback =
    isVerified &&
    !hasGroups &&
    !hasFlatCompounds &&
    vendor.verifiedCategories &&
    vendor.verifiedCategories.length > 0;
  const scopeCompounds = hasGroups
    ? Object.values(vendor.verifiedScopeGroups!).flat()
    : hasFlatCompounds
    ? vendor.verifiedCompounds!
    : hasCategoryFallback
    ? vendor.verifiedCategories!
    : [];
  const hasScope = scopeCompounds.length > 0;
  const license = isVerified
    ? vendor.reviewId
    : VENDOR_FULFILLMENT_LABEL[fulfillment];
  const verificationDate = isVerified ? vendor.reviewDate : undefined;

  // Contact links collection
  const ig = socialUrl("instagram", vendor.instagram);
  const fb = socialUrl("facebook", vendor.facebook);
  const li = socialUrl("linkedin", vendor.linkedin);
  const yt = socialUrl("youtube", vendor.youtube);
  const phoneHref = vendor.phone ? `tel:${vendor.phone.replace(/[^\d+]/g, "")}` : undefined;
  const hasAnySocial = Boolean(ig || fb || li || yt || vendor.googleBusinessUrl);

  // Services badges: merge clinicalFocus + treatmentCategories (dedupe, preserve order)
  const serviceBadges = (() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const v of [...(vendor.clinicalFocus ?? []), ...(vendor.treatmentCategories ?? [])]) {
      const key = v.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(v.trim());
    }
    return out;
  })();

  // Aboutness — combine philosophy, summary, patient focus into a single SEO-rich body
  const hasAbout = Boolean(vendor.summary || vendor.clinicalPhilosophy || vendor.patientFocus);

  // Provider data presence
  const hasProvider = Boolean(
    vendor.medicalDirector ||
      vendor.credentials ||
      vendor.clinicalLeadership ||
      (vendor.additionalProviders && vendor.additionalProviders.length > 0),
  );

  // JSON-LD — upgrade to MedicalBusiness when this is clearly a clinic
  const clinicalCategories = new Set(["TRT Clinic", "Hormone Optimization"]);
  const isClinicalEntity =
    !!vendor.category &&
    clinicalCategories.has(vendor.category) &&
    !!vendor.city &&
    !!vendor.state &&
    !!vendor.website;
  const orgType = isClinicalEntity ? "MedicalBusiness" : "Organization";
  const canonicalPath = `/directory/${vendor.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  const sameAs = [ig, fb, li, yt, vendor.googleBusinessUrl].filter(Boolean) as string[];

  const orgLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": orgType,
    name: vendor.name,
    url: vendor.website || canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  };
  if (vendor.logoUrl) orgLd.logo = vendor.logoUrl;
  if (vendor.phone) orgLd.telephone = vendor.phone;
  if (sameAs.length) orgLd.sameAs = sameAs;
  if (vendor.summary) orgLd.description = vendor.summary;
  if (vendor.city || vendor.state) {
    orgLd.address = {
      "@type": "PostalAddress",
      ...(vendor.city ? { addressLocality: vendor.city } : {}),
      ...(vendor.state ? { addressRegion: vendor.state } : {}),
      ...(vendor.zip ? { postalCode: vendor.zip } : {}),
      addressCountry: "US",
    };
  }
  if (serviceBadges.length) {
    orgLd.knowsAbout = serviceBadges;
  }
  if (vendor.medicalDirector) {
    orgLd.employee = [
      {
        "@type": "Person",
        name: vendor.medicalDirector,
        ...(vendor.credentials ? { hasCredential: vendor.credentials } : {}),
        jobTitle: "Medical Director",
      },
    ];
  }
  orgLd.additionalProperty = [
    {
      "@type": "PropertyValue",
      propertyID: "source-standard-status",
      name: "Source Standard Status",
      value: VENDOR_STATUS_LABEL[status],
    },
    ...(isVerified && vendor.reviewId
      ? [
          {
            "@type": "PropertyValue",
            propertyID: "source-standard-review-id",
            name: "Source Standard Review ID",
            value: vendor.reviewId,
          },
        ]
      : []),
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Directory",
        item: absoluteUrl("/verified-vendors"),
      },
      { "@type": "ListItem", position: 3, name: vendor.name, item: canonicalUrl },
    ],
  };

  const metaDescription = [
    `${vendor.name}.`,
    vendor.category ? `${vendor.category}.` : "",
    location !== "—" ? `${location}.` : "",
    serviceBadges.length ? `Services: ${serviceBadges.slice(0, 6).join(", ")}.` : "",
    `Source Standard status: ${VENDOR_STATUS_LABEL[status]}.`,
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 300);

  return (
    <>
      <PageMeta
        title={`${vendor.name} · ${vendor.category ?? "Clinic"}${location !== "—" ? " · " + location : ""}`}
        description={metaDescription}
        path={canonicalPath}
        type="profile"
        jsonLd={[orgLd, breadcrumbLd]}
      />
      <Breadcrumb
        items={[
          { label: "Directory", to: "/verified-vendors" },
          { label: vendor.category ?? "Clinic" },
          { label: vendor.name },
        ]}
      />

      <section className="bg-background">
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "720px", paddingTop: "16px", paddingBottom: "64px" }}
        >
          {/* Back link */}
          <Link
            to="/verified-vendors"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Registry
          </Link>

          {/* ───────────────── 1. IDENTITY HEADER ───────────────── */}
          <article className="mt-4" style={CARD_STYLE}>
            <header className="flex items-start gap-4">
              {/* Logo */}
              <div
                className="shrink-0 flex items-center justify-center bg-background overflow-hidden"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "10px",
                  border: "0.5px solid hsl(var(--border))",
                }}
              >
                {vendor.logoUrl ? (
                  <img
                    src={vendor.logoUrl}
                    alt={`${vendor.name} logo`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span
                    className="font-sans font-semibold text-muted-foreground"
                    style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
                  >
                    {vendor.name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h1
                    className="min-w-0 font-sans font-semibold text-foreground"
                    style={{ fontSize: "20px", lineHeight: 1.25, letterSpacing: "-0.01em" }}
                  >
                    {vendor.name}
                  </h1>
                  {renderProfileStatus(status)}
                </div>

                {/* Category + Review ID */}
                {(vendor.category || vendor.reviewId) && (
                  <div className="mt-2 flex items-center gap-x-2 flex-wrap">
                    {vendor.category && (
                      <span
                        className="inline-flex items-center font-sans font-semibold uppercase bg-primary text-primary-foreground"
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.06em",
                          padding: "3px 6px",
                          borderRadius: "3px",
                        }}
                      >
                        {vendor.category}
                      </span>
                    )}
                    {vendor.reviewId && (
                      <span className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>
                        {vendor.reviewId}
                      </span>
                    )}
                  </div>
                )}

                {/* Location */}
                {location !== "—" && (
                  <p
                    className="mt-2 text-muted-foreground"
                    style={{ fontSize: "12.5px", lineHeight: 1.4 }}
                  >
                    {location}
                  </p>
                )}
              </div>
            </header>

            {/* Fulfillment chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <FulfillmentChip active={isInPerson || isHybrid} label="In-Person" />
              <FulfillmentChip active={isOnline || isHybrid} label="Telehealth" />
            </div>

            {/* Contact + Social row */}
            {(vendor.website || vendor.phone || hasAnySocial) && (
              <>
                <div
                  aria-hidden
                  className="mt-5 mb-4"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                />
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {vendor.website && (
                    <ContactLink
                      href={vendor.website}
                      label={hostname(vendor.website)}
                      icon={<SocialIcon kind="web" />}
                    />
                  )}
                  {phoneHref && (
                    <ContactLink href={phoneHref} label={vendor.phone!} icon={<SocialIcon kind="phone" />} />
                  )}
                  {ig && (
                    <ContactLink href={ig} label={normalizeHandle(vendor.instagram) ?? "Instagram"} icon={<SocialIcon kind="instagram" />} />
                  )}
                  {fb && (
                    <ContactLink href={fb} label="Facebook" icon={<SocialIcon kind="facebook" />} />
                  )}
                  {li && (
                    <ContactLink href={li} label="LinkedIn" icon={<SocialIcon kind="linkedin" />} />
                  )}
                  {yt && (
                    <ContactLink href={yt} label="YouTube" icon={<SocialIcon kind="youtube" />} />
                  )}
                  {vendor.googleBusinessUrl && (
                    <ContactLink href={vendor.googleBusinessUrl} label="Google Business" icon={<SocialIcon kind="google" />} />
                  )}
                </div>
              </>
            )}
          </article>

          {/* ───────────────── 2. ABOUT THIS CLINIC ───────────────── */}
          <article className="mt-4" style={CARD_STYLE}>
            <SectionHeading>About This Clinic</SectionHeading>
            {hasAbout ? (
              <div className="mt-3 space-y-4">
                {vendor.summary && (
                  <p
                    className="text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    {vendor.summary}
                  </p>
                )}
                {vendor.clinicalPhilosophy && (
                  <div>
                    <SectionLabel>Clinical Philosophy</SectionLabel>
                    <p
                      className="mt-1.5 text-foreground"
                      style={{ fontSize: "13px", lineHeight: 1.6 }}
                    >
                      {vendor.clinicalPhilosophy}
                    </p>
                  </div>
                )}
                {vendor.patientFocus && (
                  <div>
                    <SectionLabel>Patient Focus</SectionLabel>
                    <p
                      className="mt-1.5 text-foreground"
                      style={{ fontSize: "13px", lineHeight: 1.6 }}
                    >
                      {vendor.patientFocus}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-3 text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                Information Not Yet Submitted.
              </p>
            )}
          </article>

          {/* ───────────────── 3. SERVICES & CLINICAL FOCUS ───────────────── */}
          <article className="mt-4" style={CARD_STYLE}>
            <SectionHeading>Services &amp; Clinical Focus</SectionHeading>
            {serviceBadges.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {serviceBadges.map((tag) => (
                  <Tag
                    key={tag}
                    href={`/verified-vendors?focus=${encodeURIComponent(tag.toLowerCase())}`}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                Information Not Yet Submitted.
              </p>
            )}
          </article>

          {/* ───────────────── 4. PROVIDERS ───────────────── */}
          <article className="mt-4" style={CARD_STYLE}>
            <SectionHeading>Providers &amp; Clinical Leadership</SectionHeading>
            {hasProvider ? (
              <dl
                className="mt-3 grid grid-cols-2"
                style={{ columnGap: "20px", rowGap: "16px" }}
              >
                <Cell label="Medical Director" value={vendor.medicalDirector} />
                <Cell label="Credentials" value={vendor.credentials} />
                <Cell label="Clinical Leadership" value={vendor.clinicalLeadership} />
                <Cell
                  label="Additional Providers"
                  value={
                    vendor.additionalProviders?.length
                      ? vendor.additionalProviders
                          .map((p) =>
                            [p.name, p.credentials].filter(Boolean).join(", ") +
                            (p.role ? ` — ${p.role}` : ""),
                          )
                          .join(" · ")
                      : undefined
                  }
                />
              </dl>
            ) : (
              <p className="mt-3 text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                Information Not Yet Submitted.
              </p>
            )}
          </article>

          {/* ───────────────── 5. SOCIAL PRESENCE ───────────────── */}
          {hasAnySocial && (
            <article className="mt-4" style={CARD_STYLE}>
              <SectionHeading>Social Presence</SectionHeading>
              <p
                className="mt-2 text-muted-foreground"
                style={{ fontSize: "11px", lineHeight: 1.5 }}
              >
                Informational links to the clinic's public channels. These references do not
                affect Source Standard verification status.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {ig && (
                  <ContactLink
                    href={ig}
                    label={normalizeHandle(vendor.instagram) ?? "Instagram"}
                    icon={<SocialIcon kind="instagram" />}
                  />
                )}
                {fb && <ContactLink href={fb} label="Facebook" icon={<SocialIcon kind="facebook" />} />}
                {li && <ContactLink href={li} label="LinkedIn" icon={<SocialIcon kind="linkedin" />} />}
                {yt && <ContactLink href={yt} label="YouTube" icon={<SocialIcon kind="youtube" />} />}
                {vendor.googleBusinessUrl && (
                  <ContactLink
                    href={vendor.googleBusinessUrl}
                    label="Google Business Profile"
                    icon={<SocialIcon kind="google" />}
                  />
                )}
              </div>
            </article>
          )}

          {/* ───────────────── 6. VERIFICATION RECORD ───────────────── */}
          <article className="mt-4" style={CARD_STYLE}>
            <SectionHeading>Verification Record</SectionHeading>

            <dl
              className="mt-4 grid grid-cols-2"
              style={{ columnGap: "20px", rowGap: "16px" }}
            >
              <Cell label="Status" value={VENDOR_STATUS_LABEL[status]} />
              <Cell label="Source Type" value={isVerified ? sourceType : undefined} />
              <Cell label="License / Review ID" value={isVerified ? license : undefined} mono />
              <Cell label="Verification Date" value={isVerified ? verificationDate : undefined} mono />
              <Cell
                label="Audit Date"
                value={isVerified ? vendor.scopeReviewDate || vendor.reviewDate : undefined}
                mono
              />
              <Cell
                label="Verified Scope"
                value={isVerified && hasScope ? scopeCompounds.join(" · ") : undefined}
              />
              <Cell
                label="Documentation Reviewed"
                value={
                  isVerified && vendor.documentation?.length
                    ? vendor.documentation
                        .filter((d) => d.status !== "Not provided")
                        .map((d) => d.label)
                        .join(" · ")
                    : undefined
                }
              />
              <Cell
                label="Status History"
                value={
                  isVerified && vendor.reviewDate
                    ? `Verified ${vendor.reviewDate}`
                    : status === "under-review"
                    ? "Application under review"
                    : "No published status history."
                }
              />
            </dl>

            {/* Status meaning blocks */}
            {isUnverified && (
              <>
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                >
                  <SectionLabel>Status Meaning</SectionLabel>
                  <p
                    className="mt-2 text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    No sufficient documentation has been reviewed by Source Standard to
                    support the stated sourcing claim within the registry framework.
                  </p>
                </div>

                <div
                  className="mt-5 pt-5"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                >
                  <SectionLabel>Review Boundary</SectionLabel>
                  <p
                    className="mt-2"
                    style={{ fontSize: "13.5px", lineHeight: 1.55, color: "rgba(0,16,33,0.6)" }}
                  >
                    Unverified status does not imply that the vendor is unsafe, unlawful,
                    fraudulent, or clinically inappropriate. It reflects only the absence
                    of sufficient reviewed documentation within the Source Standard framework.
                  </p>
                </div>
              </>
            )}
          </article>

          {/* ───────────────── 7. CLAIM PROFILE ───────────────── */}
          {!claimed && (
            <article
              className="mt-4"
              style={{
                ...CARD_STYLE,
                background: "hsl(var(--muted) / 0.4)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <SectionLabel>Unclaimed Listing</SectionLabel>
                  <p
                    className="mt-2 text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    Represent this clinic? Claim the profile to add a logo, provider
                    information, services, social links, and begin verification.
                  </p>
                </div>
                <Link
                  to={`/apply?claim=${encodeURIComponent(vendor.slug)}`}
                  className="shrink-0 inline-flex items-center justify-center font-sans font-semibold uppercase bg-foreground text-background hover:opacity-90 transition-opacity"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    padding: "10px 16px",
                    borderRadius: "20px",
                  }}
                >
                  Claim This Profile
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
