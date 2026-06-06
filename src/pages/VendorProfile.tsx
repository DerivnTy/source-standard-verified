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
  Star,
  Building2,
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
    style={{ fontSize: "10px", letterSpacing: "0.1em" }}
  >
    {children}
  </p>
);

const SectionHeading = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <h2
      className="font-sans font-semibold uppercase text-muted-foreground"
      style={{ fontSize: "11px", letterSpacing: "0.1em" }}
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
    fontSize: "10.5px",
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
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono tabular-nums" : "font-sans font-medium"} ${
          present ? "text-foreground" : "text-muted-foreground"
        }`}
        style={{ fontSize: "12.5px", lineHeight: "1.5" }}
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
          <span className="italic text-muted-foreground/70">Information Not Submitted</span>
        )}
      </dd>
    </div>
  );
};

// Logo with fallback initial
const LogoBlock = ({ vendor, size }: { vendor: Vendor; size: number }) => (
  <div
    className="shrink-0 flex items-center justify-center bg-background overflow-hidden"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${Math.round(size * 0.18)}px`,
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
        style={{ fontSize: `${Math.round(size * 0.42)}px`, letterSpacing: "-0.02em" }}
      >
        {vendor.name.trim().charAt(0).toUpperCase()}
      </span>
    )}
  </div>
);

// ─── (Profile completeness intentionally omitted — Source Standard does not gamify completion.) ───


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
      fontSize: "10px",
      letterSpacing: "0.08em",
      lineHeight: 1,
      gap: "4px",
    } as const;
    if (isVerified) {
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
        className="shrink-0 inline-flex items-center justify-end font-sans font-bold uppercase tabular-nums"
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
          style={{ maxWidth: "760px", paddingTop: "12px", paddingBottom: "64px" }}
        >
          {/* Back link */}
          <Link
            to="/verified-vendors"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Registry
          </Link>

          {/* ────── 1. COVER + IDENTITY HEADER ────── */}
          <article className="mt-4 overflow-hidden" style={{ ...CARD, padding: 0 }}>
            {/* Cover */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: "140px",
                background: vendor.coverImageUrl
                  ? `center / cover no-repeat url(${vendor.coverImageUrl})`
                  : "linear-gradient(180deg, hsl(var(--muted) / 0.5), hsl(var(--background)))",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              {!vendor.coverImageUrl && (
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center text-muted-foreground/40"
                >
                  <Building2 strokeWidth={1} size={42} />
                </div>
              )}
            </div>

            {/* Identity body */}
            <div style={{ padding: "20px" }}>
              <div className="flex items-start gap-4" style={{ marginTop: "-44px" }}>
                <div
                  style={{
                    boxShadow: "0 0 0 4px hsl(var(--card))",
                    borderRadius: "14px",
                  }}
                >
                  <LogoBlock vendor={vendor} size={72} />
                </div>
                <div className="min-w-0 flex-1 pt-12">
                  <StatusPill />
                </div>
              </div>

              {/* Name */}
              <h1
                className="mt-3 font-sans font-semibold text-foreground"
                style={{ fontSize: "22px", lineHeight: 1.2, letterSpacing: "-0.01em" }}
              >
                {vendor.name}
              </h1>

              {/* Meta row */}
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
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
                {location !== "—" && (
                  <span
                    className="inline-flex items-center gap-1 text-muted-foreground"
                    style={{ fontSize: "12px" }}
                  >
                    <MapPin size={12} strokeWidth={1.5} />
                    {location}
                  </span>
                )}
                {vendor.reviewId && (
                  <span className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>
                    {vendor.reviewId}
                  </span>
                )}
              </div>

              {/* Social icon row */}
              {(vendor.website || phoneHref || emailHref || ig || fb || li || yt || mapsHref) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {vendor.website && (
                    <SocialIconBtn href={vendor.website} label={`Website: ${hostname(vendor.website)}`}>
                      <Globe size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {phoneHref && (
                    <SocialIconBtn href={phoneHref} label={`Call ${vendor.phone}`}>
                      <Phone size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {emailHref && (
                    <SocialIconBtn href={emailHref} label={`Email ${vendor.email}`}>
                      <Mail size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {ig && (
                    <SocialIconBtn href={ig} label="Instagram">
                      <Instagram size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {fb && (
                    <SocialIconBtn href={fb} label="Facebook">
                      <Facebook size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {li && (
                    <SocialIconBtn href={li} label="LinkedIn">
                      <Linkedin size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {yt && (
                    <SocialIconBtn href={yt} label="YouTube">
                      <Youtube size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                  {mapsHref && (
                    <SocialIconBtn href={mapsHref} label="View on Google Maps">
                      <MapPin size={15} strokeWidth={1.5} />
                    </SocialIconBtn>
                  )}
                </div>
              )}

              {/* Fulfillment chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <FulfillmentChip active={isInPerson || isHybrid} label="In-Person" />
                <FulfillmentChip active={isOnline || isHybrid} label="Telehealth" />
              </div>
            </div>
          </article>

          {/* ────── 2. SERVICE BADGES HERO STRIP ────── */}
          {serviceBadges.length > 0 && (
            <article className="mt-4" style={CARD}>
              <SectionHeading>Services &amp; Clinical Focus</SectionHeading>
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




          {/* ────── 4. ABOUT THIS CLINIC ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>About This Clinic</SectionHeading>
            {hasAbout ? (
              <div className="mt-3 space-y-4">
                {vendor.summary && (
                  <p className="text-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    {vendor.summary}
                  </p>
                )}
                {vendor.clinicalPhilosophy && (
                  <div>
                    <Eyebrow>Clinical Philosophy</Eyebrow>
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
                    <Eyebrow>Patient Focus</Eyebrow>
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
              <p
                className="mt-3 text-muted-foreground"
                style={{ fontSize: "13px", lineHeight: 1.55 }}
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
                      style={{ fontSize: "13px", lineHeight: 1.55 }}
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
                      style={{ fontSize: "13px", lineHeight: 1.55 }}
                    >
                      {vendor.telehealthAvailability}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          )}

          {/* ────── 6. LOCATION ────── */}
          {hasLocation && (
            <article className="mt-4" style={CARD}>
              <SectionHeading>Location</SectionHeading>
              <div className="mt-3 flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground" style={{ fontSize: "13.5px", lineHeight: 1.55 }}>
                    {vendor.address && <>{vendor.address}<br /></>}
                    {location !== "—" && location}
                    {vendor.zip ? ` ${vendor.zip}` : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mapsHref && (
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans font-semibold uppercase text-foreground hover:opacity-70 transition-opacity"
                        style={{
                          fontSize: "10.5px",
                          letterSpacing: "0.08em",
                          padding: "6px 12px",
                          borderRadius: "16px",
                          border: "0.5px solid hsl(var(--border))",
                        }}
                      >
                        Open in Maps <ExternalLink size={11} strokeWidth={1.5} />
                      </a>
                    )}
                    {dirHref && (
                      <a
                        href={dirHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans font-semibold uppercase text-foreground hover:opacity-70 transition-opacity"
                        style={{
                          fontSize: "10.5px",
                          letterSpacing: "0.08em",
                          padding: "6px 12px",
                          borderRadius: "16px",
                          border: "0.5px solid hsl(var(--border))",
                        }}
                      >
                        Directions <ExternalLink size={11} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* ────── 7. PROVIDERS ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading>Providers &amp; Clinical Leadership</SectionHeading>
            {hasProvider ? (
              <>
                {/* Headshot strip */}
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
                            className="font-sans font-medium text-foreground truncate"
                            style={{ fontSize: "12.5px" }}
                          >
                            {p.name}
                          </p>
                          {p.role && (
                            <p
                              className="font-sans text-muted-foreground truncate"
                              style={{ fontSize: "10.5px" }}
                            >
                              {p.role}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

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
              </>
            ) : (
              <p
                className="mt-3 text-muted-foreground"
                style={{ fontSize: "13px", lineHeight: 1.55 }}
              >
                Provider information not yet submitted.
              </p>
            )}
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

          {/* ────── 9. VERIFICATION RECORD (compact for unverified) ────── */}
          <article className="mt-4" style={CARD}>
            <SectionHeading
              action={
                !isVerified ? null : null
              }
            >
              Verification Record
            </SectionHeading>

            {/* Compact summary */}
            <div className="mt-3 flex items-start gap-3">
              <Star size={14} strokeWidth={1.5} className="text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="font-sans font-semibold text-foreground" style={{ fontSize: "13.5px" }}>
                  Verification Status: {VENDOR_STATUS_LABEL[status]}
                </p>
                <p
                  className="mt-1 text-muted-foreground"
                  style={{ fontSize: "12.5px", lineHeight: 1.55 }}
                >
                  {isVerified
                    ? `Reviewed under SS-FRAMEWORK-2026.01${vendor.reviewDate ? ` on ${vendor.reviewDate}` : ""}.`
                    : status === "under-review"
                    ? "An application is currently undergoing review under SS-FRAMEWORK-2026.01."
                    : "No verification review has been completed within the Source Standard framework."}
                </p>
              </div>
            </div>

            {/* Expandable detail */}
            <button
              type="button"
              onClick={() => setVerificationOpen((o) => !o)}
              aria-expanded={verificationOpen}
              className="mt-4 inline-flex items-center gap-1 font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "10.5px", letterSpacing: "0.08em" }}
            >
              {verificationOpen ? "Hide Verification Details" : "View Verification Details"}
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
                    <Cell
                      label="Fulfillment"
                      value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
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
                  </dl>

                  <div
                    className="mt-5 pt-5"
                    style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                  >
                    <Eyebrow>Review Boundary</Eyebrow>
                    <p
                      className="mt-2"
                      style={{
                        fontSize: "12.5px",
                        lineHeight: 1.55,
                        color: "rgba(0,16,33,0.6)",
                      }}
                    >
                      Verification status reflects only documentation reviewed by Source Standard
                      within its registry framework. Unverified status does not imply that a vendor
                      is unsafe, unlawful, fraudulent, or clinically inappropriate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ────── 10. CLAIM PROFILE ────── */}
          {!claimed && (
            <article
              className="mt-4"
              style={{
                ...CARD,
                background: "hsl(var(--muted) / 0.4)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <Eyebrow>Unclaimed Listing</Eyebrow>
                  <p
                    className="mt-2 text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    Represent this clinic? Claim the profile to add a logo, provider information,
                    services, social links, and begin verification.
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
