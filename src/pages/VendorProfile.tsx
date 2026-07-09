import { Link, useParams } from "react-router-dom";
import { ReactNode, useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  Globe,
  MapPin,
  ChevronDown,
  ExternalLink,
   
  
  UserRound,
} from "lucide-react";
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
 * Balance (deliberate): ~40% provider directory, ~30% clinic profile,
 * ~30% verification record. Verification is authoritative but no longer
 * dominant.
 *
 * Section order:
 *   1. Cover + Identity header (logo, name, status, socials, fulfillment)
 *   2. Service badges (hero discoverability strip)
 *   3. Profile Completeness meter (claim incentive)
 *   4. About / Overview (summary, philosophy, patient focus)
 *   5. Conditions Treated · Services Offered · States Served
 *   6. Location card (address, map, directions)
 *   7. Providers (headshots, medical director, leadership)
 *   8. Facility Photos
 *   9. Verification Record (compact for unverified, expandable for detail)
 *  10. Claim This Profile
 */

const CARD: React.CSSProperties = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  padding: "20px",
  background: "hsl(var(--card))",
};

const formatLocation = (v: Vendor): string =>
  v.city && v.state ? `${v.city}, ${v.state}` : v.city || v.state || "—";

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

const socialUrl = (
  platform: "instagram" | "facebook" | "linkedin" | "youtube",
  value?: string,
): string | undefined => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  const h = value.replace(/^@/, "");
  switch (platform) {
    case "instagram":
      return `https://instagram.com/${h}`;
    case "facebook":
      return `https://facebook.com/${h}`;
    case "linkedin":
      return `https://linkedin.com/company/${h}`;
    case "youtube":
      return `https://youtube.com/${h.startsWith("@") ? h : "@" + h}`;
  }
};

const mapsSearchUrl = (v: Vendor): string | undefined => {
  if (v.googleMapsUrl) return v.googleMapsUrl;
  const parts = [v.name, v.address, v.city, v.state, v.zip].filter(Boolean).join(", ");
  if (!parts) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts)}`;
};

const directionsUrl = (v: Vendor): string | undefined => {
  const parts = [v.address, v.city, v.state, v.zip].filter(Boolean).join(", ");
  if (!parts) return undefined;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parts)}`;
};

// ─── Atoms ────────────────────────────────────────────────────────────────────

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p
    className="font-sans font-semibold uppercase text-muted-foreground"
    style={{ fontSize: "12px", letterSpacing: "0.05em" }}
  >
    {children}
  </p>
);

const SectionHeading = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <h2
      className="font-sans font-semibold uppercase text-muted-foreground"
      style={{ fontSize: "12px", letterSpacing: "0.05em" }}
    >
      {children}
    </h2>
    {action}
  </div>
);

const Tag = ({ children, href }: { children: ReactNode; href?: string }) => {
  const cls =
    "inline-flex items-center font-sans font-semibold uppercase border border-border text-foreground bg-background transition-colors hover:border-foreground/60";
  const style: React.CSSProperties = {
    fontSize: "12px",
    letterSpacing: "0.06em",
    padding: "5px 10px",
    borderRadius: "16px",
  };
  return href ? (
    <Link to={href} className={cls} style={style}>
      {children}
    </Link>
  ) : (
    <span className={cls} style={style}>
      {children}
    </span>
  );
};


const SocialIconBtn = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "16px",
      border: "0.5px solid hsl(var(--border))",
    }}
  >
    {children}
  </a>
);

const FulfillmentChip = ({ active, label }: { active: boolean; label: string }) => (
  <span
    className="inline-flex items-center gap-1.5 font-sans font-semibold uppercase"
    style={{
      fontSize: "9.5px",
      letterSpacing: "0.08em",
      padding: "4px 9px",
      borderRadius: "12px",
      border: "0.5px solid hsl(var(--border))",
      color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.5)",
      background: active ? "hsl(var(--muted) / 0.5)" : "transparent",
    }}
  >
    <span
      aria-hidden
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.35)",
      }}
    />
    {label}
  </span>
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
    value !== undefined &&
    value !== null &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0);
  const display = Array.isArray(value) ? (value as ReactNode[]).join(", ") : value;
  return (
    <div>
      <dt
        className="font-sans font-semibold uppercase text-muted-foreground"
        style={{ fontSize: "13px", letterSpacing: "0.05em" }}
      >
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono tabular-nums" : "font-sans"} ${
          present ? "text-foreground" : "text-muted-foreground"
        }`}
        style={{ fontSize: "15px", fontWeight: 400, lineHeight: "1.5" }}
      >
        {present ? (
          href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors break-words [overflow-wrap:anywhere]"
            >
              {display}
            </a>
          ) : (
            display
          )
        ) : (
          <span className="text-muted-foreground/70">Not provided to Source Standard</span>
        )}
      </dd>
    </div>
  );
};


// Logo with registry placeholder fallback
const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const LogoBlock = ({ vendor, size }: { vendor: Vendor; size: number }) => {
  const showMark = size >= 56;
  return (
    <div
      className="shrink-0 relative flex items-center justify-center overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${Math.round(size * 0.14)}px`,
        border: "0.5px solid hsl(var(--border))",
        background: vendor.logoUrl ? "hsl(var(--background))" : "hsl(var(--muted) / 0.45)",
      }}
      aria-label={vendor.logoUrl ? undefined : `${vendor.name} registry placeholder`}
    >
      {vendor.logoUrl ? (
        <img
          src={vendor.logoUrl}
          alt={`${vendor.name} logo`}
          className="w-full h-full object-contain"
        />
      ) : (
        <>
          {showMark && (
            <span
              className="absolute font-mono uppercase text-muted-foreground/70"
              style={{
                top: "5px",
                left: "6px",
                fontSize: "7px",
                letterSpacing: "0.14em",
                lineHeight: 1,
              }}
            >
              SS
            </span>
          )}
          <span
            className="font-serif text-foreground/75"
            style={{
              fontSize: `${Math.round(size * 0.36)}px`,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {getInitials(vendor.name)}
          </span>
          {showMark && (
            <span
              className="absolute font-mono tabular-nums text-muted-foreground/60"
              style={{
                bottom: "5px",
                right: "6px",
                fontSize: "7px",
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              REG
            </span>
          )}
        </>
      )}
    </div>
  );
};

// ─── Transparency helpers ─────────────────────────────────────────────────────

const StatusSummary = ({ status }: { status: VendorPublicStatus }) => {
  const copy: Record<VendorPublicStatus, string> = {
    verified:
      "This provider has completed the Source Standard verification process and currently maintains Verified status.",
    unverified:
      "This provider has not completed the Source Standard verification process.",
    "under-review": "This provider is currently under Source Standard review.",
    suspended:
      "This provider's Source Standard status is currently suspended.",
    removed:
      "This provider has been removed from the Source Standard registry.",
  };
  return (
    <p
      className="mt-3 text-muted-foreground"
      style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.55 }}
    >
      {copy[status]}
    </p>
  );
};

type QuickFactRow = { label: string; value: string };

const QuickFactsTable = ({ rows }: { rows: QuickFactRow[] }) => (
  <section
    aria-label="Quick facts"
    className="mt-4"
    style={{
      borderTop: "0.5px solid hsl(var(--border))",
      borderBottom: "0.5px solid hsl(var(--border))",
    }}
  >
    <dl>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="flex items-baseline justify-between gap-4 py-2"
          style={
            i > 0
              ? { borderTop: "0.5px solid hsl(var(--border) / 0.6)" }
              : undefined
          }
        >
          <dt
            className="font-sans font-semibold uppercase text-muted-foreground"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            {r.label}
          </dt>
          <dd
            className="font-sans text-foreground text-right"
            style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.35 }}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

const AboutThisProfileCard = ({ claimed }: { claimed: boolean }) => (
  <article className="mt-4" style={CARD}>
    <p
      className="font-sans font-semibold uppercase text-muted-foreground"
      style={{ fontSize: "12px", letterSpacing: "0.05em" }}
    >
      About This Profile
    </p>
    <p
      className="mt-2 text-foreground"
      style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.55 }}
    >
      {claimed
        ? "This profile has been claimed but has not yet completed Source Standard verification. Some information displayed on this page has not been provided to Source Standard and therefore cannot currently be verified."
        : "This provider has not yet claimed or completed their Source Standard profile. Some information displayed on this page has not been provided to Source Standard and therefore cannot currently be verified."}
    </p>
  </article>
);

type ActivityRow = { label: string; value: string; provided: boolean };

const Activity = ({ rows }: { rows: ActivityRow[] }) => (
  <article className="mt-4" style={CARD}>
    <p
      className="font-sans font-semibold uppercase text-muted-foreground"
      style={{ fontSize: "12px", letterSpacing: "0.05em" }}
    >
      Activity
    </p>
    <dl className="mt-3">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="flex items-baseline justify-between gap-4 py-2"
          style={
            i > 0
              ? { borderTop: "0.5px solid hsl(var(--border) / 0.6)" }
              : undefined
          }
        >
          <dt
            className="font-sans font-semibold uppercase text-muted-foreground"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            {r.label}
          </dt>
          <dd
            className={`font-mono tabular-nums text-right ${
              r.provided ? "text-foreground" : "text-muted-foreground"
            }`}
            style={{ fontSize: "13px", fontWeight: 400 }}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  </article>
);




const ReadMore = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={open ? "" : "line-clamp-6"}>{children}</div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        {open ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};




// ─── Page ─────────────────────────────────────────────────────────────────────

const VendorProfile = () => {
  const { slug } = useParams();
  const vendor = slug ? getVendor(slug) : undefined;
  const [verificationOpen, setVerificationOpen] = useState(false);

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
  const fulfillment = getVendorFulfillment(vendor);
  const isOnline = fulfillment === "online";
  const isInPerson = fulfillment === "in-person";
  const isHybrid = fulfillment === "hybrid";
  const location = formatLocation(vendor);
  const claimed = vendor.claimed === true || isVerified;

  // Status pill
  const StatusPill = () => {
    const baseStyle = {
      fontSize: "12px",
      letterSpacing: "0.06em",
      lineHeight: 1,
      gap: "4px",
      fontWeight: 600,
    } as const;
    if (isVerified) {
      return (
        <span
          className="shrink-0 inline-flex items-center justify-end font-sans uppercase tabular-nums"
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
              height: "12px",
              width: "16px",
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
    const { label, color } = FALLBACK[status];
    return (
      <span
        className="shrink-0 inline-flex items-center justify-end font-sans uppercase tabular-nums"
        style={{ ...baseStyle, color }}
      >
        {label}
      </span>
    );
  };


  // Verified scope flattening
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

  // Socials
  const ig = socialUrl("instagram", vendor.instagram);
  const fb = socialUrl("facebook", vendor.facebook);
  const li = socialUrl("linkedin", vendor.linkedin);
  const yt = socialUrl("youtube", vendor.youtube);
  const phoneHref = vendor.phone ? `tel:${vendor.phone.replace(/[^\d+]/g, "")}` : undefined;
  const emailHref = vendor.email ? `mailto:${vendor.email}` : undefined;
  const mapsHref = mapsSearchUrl(vendor);
  const dirHref = directionsUrl(vendor);

  // Service badges — merge clinicalFocus + treatmentCategories + servicesOffered (dedupe)
  const serviceBadges = (() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const v of [
      ...(vendor.clinicalFocus ?? []),
      ...(vendor.treatmentCategories ?? []),
      ...(vendor.servicesOffered ?? []),
    ]) {
      const key = v.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(v.trim());
    }
    return out;
  })();

  const hasAbout = Boolean(vendor.summary || vendor.clinicalPhilosophy || vendor.patientFocus);
  const hasProvider = Boolean(
    vendor.medicalDirector ||
      vendor.credentials ||
      vendor.clinicalLeadership ||
      (vendor.additionalProviders && vendor.additionalProviders.length > 0) ||
      (vendor.providerHeadshots && vendor.providerHeadshots.length > 0),
  );
  const hasLocation = Boolean(vendor.address || vendor.city || vendor.state);
  const hasFacility = Boolean(vendor.facilityPhotos && vendor.facilityPhotos.length > 0);

  // JSON-LD
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
  if (vendor.coverImageUrl) orgLd.image = vendor.coverImageUrl;
  if (vendor.phone) orgLd.telephone = vendor.phone;
  if (vendor.email) orgLd.email = vendor.email;
  if (sameAs.length) orgLd.sameAs = sameAs;
  if (vendor.summary) orgLd.description = vendor.summary;
  if (vendor.address || vendor.city || vendor.state) {
    orgLd.address = {
      "@type": "PostalAddress",
      ...(vendor.address ? { streetAddress: vendor.address } : {}),
      ...(vendor.city ? { addressLocality: vendor.city } : {}),
      ...(vendor.state ? { addressRegion: vendor.state } : {}),
      ...(vendor.zip ? { postalCode: vendor.zip } : {}),
      addressCountry: "US",
    };
  }
  if (serviceBadges.length) orgLd.knowsAbout = serviceBadges;
  if (vendor.statesServed?.length || vendor.telehealthAvailability) {
    orgLd.areaServed = vendor.statesServed?.length
      ? vendor.statesServed
      : vendor.telehealthAvailability;
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
      { "@type": "ListItem", position: 2, name: "Directory", item: absoluteUrl("/verified-vendors") },
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
        title={`${vendor.name} · ${vendor.category ?? "Vendor"}${location !== "—" ? " · " + location : ""}`}
        description={metaDescription}
        path={canonicalPath}
        type="profile"
        jsonLd={[orgLd, breadcrumbLd]}
      />
      <Breadcrumb
        items={[
          { label: "Directory", to: "/verified-vendors" },
          { label: vendor.category ?? "Vendor" },
          { label: vendor.name },
        ]}
      />

      <section className="bg-background">
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "760px", paddingTop: "12px", paddingBottom: "24px" }}
        >
          {/* Back link */}
          <Link
            to="/verified-vendors"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Registry
          </Link>

          {/* ────── 1. IDENTITY HEADER ────── */}
          <article className="mt-4 overflow-hidden" style={{ ...CARD, padding: 0 }}>
            {/* Cover — only when an image is provided */}
            {vendor.coverImageUrl && (
              <div
                className="relative w-full overflow-hidden"
                style={{
                  height: "72px",
                  background: `center / cover no-repeat url(${vendor.coverImageUrl})`,
                  borderBottom: "0.5px solid hsl(var(--border))",
                }}
              />
            )}

            {/* Identity body — compressed */}
            <div style={{ padding: "14px 14px 12px" }}>
              {/* Status + Service model — record classification */}
              <div
                className="flex flex-wrap items-center font-sans uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.06em", lineHeight: 1, gap: "6px" }}
              >
                <StatusPill />
                {(isInPerson || isHybrid) && (
                  <>
                    <span aria-hidden style={{ color: "hsl(var(--muted-foreground))" }}>•</span>
                    <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))", fontSize: "12px", letterSpacing: "0.06em" }}>In-Person</span>
                  </>
                )}
                {(isOnline || isHybrid) && (
                  <>
                    <span aria-hidden style={{ color: "hsl(var(--muted-foreground))" }}>•</span>
                    <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))", fontSize: "12px", letterSpacing: "0.06em" }}>Telehealth</span>
                  </>
                )}
              </div>

              {/* Name + logo */}
              <div className="mt-2 flex items-center gap-2.5">
                <div
                  style={
                    vendor.coverImageUrl
                      ? { boxShadow: "0 0 0 3px hsl(var(--card))", borderRadius: "8px" }
                      : undefined
                  }
                >
                  <LogoBlock vendor={vendor} size={44} />
                </div>
                <h1
                  className="min-w-0 flex-1 font-sans text-foreground"
                  style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.01em" }}
                >
                  {vendor.name}
                </h1>
              </div>

              {/* Location — aligned with card edge, part of identity */}
              {location !== "—" && (
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className="inline-flex items-center gap-1 text-muted-foreground"
                    style={{ fontSize: "15px", fontWeight: 400 }}
                  >
                    <MapPin size={14} strokeWidth={1.5} />
                    {location}
                  </span>
                </div>
              )}



              {/* Contact row — website / phone / email / maps */}
              {(vendor.website || phoneHref || emailHref || mapsHref) && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {vendor.website && (
                    <SocialIconBtn href={vendor.website} label={`Website: ${hostname(vendor.website)}`}>
                      <Globe size={14} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {phoneHref && (
                    <SocialIconBtn href={phoneHref} label={`Call ${vendor.phone}`}>
                      <Phone size={14} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {emailHref && (
                    <SocialIconBtn href={emailHref} label={`Email ${vendor.email}`}>
                      <Mail size={14} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {mapsHref && (
                    <SocialIconBtn href={mapsHref} label="View on Google Maps">
                      <MapPin size={14} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                </div>
              )}
            </div>
          </article>

          {/* ────── 2. STATUS SUMMARY ────── */}
          <StatusSummary status={status} />

          {/* ────── 3. QUICK FACTS (summary table) ────── */}
          <QuickFactsTable
            rows={[
              { label: "Profile Status", value: claimed ? "Claimed" : "Unclaimed" },
              { label: "Verification", value: VENDOR_STATUS_LABEL[status] },
              {
                label: "Last Reviewed",
                value:
                  isVerified && vendor.reviewDate
                    ? vendor.reviewDate
                    : "Not yet reviewed",
              },
              { label: "Provider Type", value: VENDOR_FULFILLMENT_LABEL[fulfillment] },
              ...(isVerified && vendor.reviewDate && vendor.nextReviewDate
                ? [{
                    label: "Verification Period",
                    value: `${vendor.reviewDate} → ${vendor.nextReviewDate}`,
                  }]
                : []),
            ]}
          />

          {/* ────── 4. ABOUT THIS PROFILE (unclaimed / claimed-but-unverified only) ────── */}
          {!isVerified && <AboutThisProfileCard claimed={claimed} />}


          {/* ────── 5. VERIFICATION STATUS ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>What has been verified?</SectionHeading>

            <p
              className="mt-2 text-muted-foreground"
              style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.55 }}
            >
              {isVerified
                ? `Source Standard reviewed this provider's sourcing information${vendor.reviewDate ? ` on ${vendor.reviewDate}` : ""} and assigned Verified status.`
                : status === "under-review"
                ? "This provider's sourcing information is currently under review."
                : "This provider has not participated in the Source Standard verification process."}
            </p>

            {isVerified && vendor.verifiedManufacturers && vendor.verifiedManufacturers.length > 0 && (
              <p
                className="mt-1.5 text-foreground"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}
              >
                <span
                  className="font-sans font-semibold uppercase text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.08em", marginRight: "6px" }}
                >
                  Verified Source{vendor.verifiedManufacturers.length > 1 ? "s" : ""}
                </span>
                {vendor.verifiedManufacturers.join(" · ")}
              </p>
            )}

            {/* Expandable detail */}
            <button
              type="button"
              onClick={() => setVerificationOpen((o) => !o)}
              aria-expanded={verificationOpen}
              className="mt-3 inline-flex items-center gap-1 font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "12px", letterSpacing: "0.05em" }}
            >

              {verificationOpen ? "Hide details" : "See what this covers"}
              <ChevronDown
                size={12}
                strokeWidth={1.5}
                style={{
                  transition: "transform 250ms ease-out",
                  transform: verificationOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>


            <div
              className="grid"
              style={{
                gridTemplateRows: verificationOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 300ms ease-out",
              }}
            >
              <div className="overflow-hidden">
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                >
                  <dl
                    className="grid grid-cols-2"
                    style={{ columnGap: "20px", rowGap: "16px" }}
                  >
                    <Cell label="Status" value={VENDOR_STATUS_LABEL[status]} />
                    <Cell label="Source Type" value={isVerified ? "503A / 503B / Retail" : undefined} />
                    <Cell label="Review ID" value={isVerified ? vendor.reviewId : undefined} mono />
                    <Cell label="Verification Date" value={isVerified ? vendor.reviewDate : undefined} mono />
                    <Cell
                      label="Audit Date"
                      value={isVerified ? vendor.scopeReviewDate || vendor.reviewDate : undefined}
                      mono
                    />
                    <Cell label="Fulfillment" value={VENDOR_FULFILLMENT_LABEL[fulfillment]} />
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
                  </dl>

                  <div
                    className="mt-5 pt-5"
                    style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                  >
                    <Eyebrow>What verification does not mean</Eyebrow>
                    <p
                      className="mt-2"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: "rgba(0,16,33,0.7)",
                      }}
                    >
                      Verified status reflects only the sourcing information Source Standard
                      reviewed. Unverified status does not mean a provider is unsafe, unlawful,
                      fraudulent, or clinically inappropriate.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ────── 6. CONTACT ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>How to reach them</SectionHeading>
            <dl
              className="mt-3 grid grid-cols-2"
              style={{ columnGap: "20px", rowGap: "16px" }}
            >
              <Cell
                label="Website"
                value={vendor.website ? hostname(vendor.website) : undefined}
                href={vendor.website}
              />
              <Cell
                label="Phone"
                value={vendor.phone}
                href={phoneHref}
              />
              <div className="col-span-2">
                <Cell
                  label="Practice Address"
                  value={
                    vendor.address || vendor.city || vendor.state || vendor.zip
                      ? [
                          vendor.address,
                          [vendor.city, vendor.state].filter(Boolean).join(", "),
                          vendor.zip,
                        ]
                          .filter(Boolean)
                          .join(" ")
                      : undefined
                  }
                />
              </div>
              <Cell
                label="Instagram"
                value={vendor.instagram ? normalizeHandle(vendor.instagram) : undefined}
                href={ig}
              />
              <Cell
                label="LinkedIn"
                value={vendor.linkedin ? normalizeHandle(vendor.linkedin) : undefined}
                href={li}
              />
            </dl>
          </article>


          {/* ────── 3. SERVICE BADGES HERO STRIP ────── */}

          {serviceBadges.length > 0 && (
            <article className="mt-4" style={CARD}>
              <SectionHeading>What they offer</SectionHeading>
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
            </article>
          )}




          {/* ────── 4. ABOUT THIS VENDOR ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>Who is this provider?</SectionHeading>
            {hasAbout ? (
              <div className="mt-3">
                <ReadMore>
                  <div className="space-y-4">
                    {vendor.summary && (
                      <p className="text-foreground" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
                        {vendor.summary}
                      </p>
                    )}
                    {vendor.clinicalPhilosophy && (
                      <div>
                        <Eyebrow>Clinical Philosophy</Eyebrow>
                        <p
                          className="mt-1.5 text-foreground"
                          style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                        >
                          {vendor.clinicalPhilosophy}
                        </p>
                      </div>
                    )}
                    {vendor.patientFocus && (
                      <div>
                        <Eyebrow>Patient Focus</Eyebrow>
                        <p
                          className="mt-1.5 text-foreground"
                          style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                        >
                          {vendor.patientFocus}
                        </p>
                      </div>
                    )}
                  </div>
                </ReadMore>
              </div>

            ) : (
              <p
                className="mt-3 text-muted-foreground"
                style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
              >
                No description provided yet.{" "}
                {!claimed && (
                  <Link
                    to={`/apply?claim=${encodeURIComponent(vendor.slug)}`}
                    className="underline underline-offset-2 decoration-border hover:decoration-foreground text-foreground"
                  >
                    Claim this profile
                  </Link>
                )}
              </p>
            )}
          </article>

          {/* ────── 5. CONDITIONS · SERVICES · STATES ────── */}
          {(vendor.conditionsTreated?.length ||
            vendor.servicesOffered?.length ||
            vendor.statesServed?.length ||
            vendor.telehealthAvailability) && (
            <article className="mt-4" style={CARD}>
              <SectionHeading>Clinical Coverage</SectionHeading>
              <div className="mt-3 grid gap-4">
                {vendor.conditionsTreated?.length ? (
                  <div>
                    <Eyebrow>Conditions Treated</Eyebrow>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {vendor.conditionsTreated.map((c) => (
                        <Tag key={c}>{c}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null}
                {vendor.servicesOffered?.length ? (
                  <div>
                    <Eyebrow>Services Offered</Eyebrow>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {vendor.servicesOffered.map((c) => (
                        <Tag key={c}>{c}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null}
                {(vendor.statesServed?.length || vendor.telehealthAvailability) && (
                  <div>
                    <Eyebrow>States Served</Eyebrow>
                    <p
                      className="mt-1.5 text-foreground"
                      style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                    >
                      {vendor.statesServed?.length
                        ? vendor.statesServed.join(" · ")
                        : vendor.telehealthAvailability}
                    </p>
                  </div>
                )}
                {vendor.telehealthAvailability && vendor.statesServed?.length ? (
                  <div>
                    <Eyebrow>Telehealth Availability</Eyebrow>
                    <p
                      className="mt-1.5 text-foreground"
                      style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                    >
                      {vendor.telehealthAvailability}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          )}

          {/* Location section removed — address now lives in Contact */}

          {/* ────── 7. PROVIDERS ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>Providers &amp; Clinical Leadership</SectionHeading>
            {/* Headshot strip — only when available */}
            {vendor.providerHeadshots?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {vendor.providerHeadshots.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div
                      className="overflow-hidden bg-muted/40 shrink-0"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "22px",
                        border: "0.5px solid hsl(var(--border))",
                      }}
                    >
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <UserRound size={20} strokeWidth={1.25} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-sans font-semibold text-foreground truncate"
                        style={{ fontSize: "15px" }}
                      >
                        {p.name}
                      </p>
                      {p.role && (
                        <p
                          className="font-sans text-muted-foreground truncate"
                          style={{ fontSize: "13px", fontWeight: 400 }}
                        >
                          {p.role}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Always render the provider grid — missing fields stay visible as
                "Information Not Submitted" so unclaimed profiles feel intentionally sparse. */}
            <dl
              className="mt-4 grid grid-cols-2"
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
                        .map(
                          (p) =>
                            [p.name, p.credentials].filter(Boolean).join(", ") +
                            (p.role ? ` — ${p.role}` : ""),
                        )
                        .join(" · ")
                    : undefined
                }
              />
            </dl>

          </article>

          {/* ────── 8. FACILITY PHOTOS ────── */}
          {hasFacility && (
            <article className="mt-4" style={CARD}>
              <SectionHeading>Facility</SectionHeading>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {vendor.facilityPhotos!.map((p, i) => (
                  <div
                    key={i}
                    className="overflow-hidden bg-muted/40"
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: "8px",
                      border: "0.5px solid hsl(var(--border))",
                    }}
                  >
                    <img
                      src={p.url}
                      alt={p.caption ?? `${vendor.name} facility`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </article>
          )}


          {/* ────── 9. ACTIVITY ────── */}
          <Activity
            rows={[
              {
                label: "Profile Created",
                value: vendor.profileCreatedDate ?? "—",
                provided: Boolean(vendor.profileCreatedDate),
              },
              {
                label: "Last Reviewed",
                value: isVerified && vendor.reviewDate ? vendor.reviewDate : "Not yet reviewed",
                provided: Boolean(isVerified && vendor.reviewDate),
              },
              {
                label: "Verification Status Issued",
                value: isVerified && vendor.reviewDate ? vendor.reviewDate : "Not yet issued",
                provided: Boolean(isVerified && vendor.reviewDate),
              },
              {
                label: "Last Updated",
                value: vendor.lastUpdatedDate ?? "—",
                provided: Boolean(vendor.lastUpdatedDate),
              },
            ]}
          />

          {/* ────── 10. CLAIM YOUR PROFILE (elevated CTA) ────── */}
          {!claimed && (
            <article
              className="mt-6"
              style={{
                border: "0.5px solid hsl(var(--border))",
                borderRadius: "16px",
                padding: "24px",
                background: "hsl(var(--foreground) / 0.04)",
              }}
            >
              <p
                className="font-sans font-semibold uppercase text-muted-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.08em" }}
              >
                For Providers
              </p>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    className="font-sans font-semibold text-foreground"
                    style={{ fontSize: "18px", lineHeight: 1.3, letterSpacing: "-0.01em" }}
                  >
                    Claim Your Profile
                  </h2>
                  <p
                    className="mt-2 text-muted-foreground"
                    style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                  >
                    Claiming this profile allows your organization to submit additional information,
                    maintain public profile details, and begin the Source Standard verification process.
                  </p>
                </div>
                <Link
                  to={`/apply?claim=${encodeURIComponent(vendor.slug)}`}
                  className="shrink-0 inline-flex items-center justify-center font-sans font-semibold uppercase bg-foreground text-background hover:opacity-90 transition-opacity"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    padding: "14px 22px",
                    borderRadius: "24px",
                  }}
                >
                  Claim Profile
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
