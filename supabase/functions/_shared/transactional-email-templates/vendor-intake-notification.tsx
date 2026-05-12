import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface VendorIntakeProps {
  referenceId?: string
  legalName?: string
  dba?: string
  entityType?: string
  ein?: string
  website?: string
  yearsOperating?: string
  vendorType?: string
  verificationTrack?: string
  medicalDirector?: string
  prescriberRole?: string
  licenseStates?: string
  sourcingModel?: string
  primarySupplier?: string
  therapyCategories?: string
  readiness?: string
  contactName?: string
  contactRole?: string
  contactEmail?: string
  contactPhone?: string
  notes?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={row}>
      <span style={rowLabel}>{label}:</span> <span style={rowValue}>{value}</span>
    </Text>
  ) : null

const VendorIntakeNotification = (p: VendorIntakeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New Vendor Verification Intake — {p.legalName || 'Unnamed vendor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Vendor Verification Intake</Heading>
        <Text style={meta}>Reference: {p.referenceId || '—'}</Text>
        <Hr style={hr} />

        <Heading as="h2" style={h2}>Business Identity</Heading>
        <Row label="Legal name" value={p.legalName} />
        <Row label="DBA" value={p.dba} />
        <Row label="Entity type" value={p.entityType} />
        <Row label="EIN" value={p.ein} />
        <Row label="Website" value={p.website} />
        <Row label="Years operating" value={p.yearsOperating} />

        <Heading as="h2" style={h2}>Operating Scope</Heading>
        <Row label="Vendor type" value={p.vendorType} />
        <Row label="Verification track" value={p.verificationTrack} />

        <Heading as="h2" style={h2}>Clinical Authority</Heading>
        <Row label="Medical Director" value={p.medicalDirector} />
        <Row label="Prescriber role" value={p.prescriberRole} />
        <Row label="License states" value={p.licenseStates} />

        <Heading as="h2" style={h2}>Sourcing Profile</Heading>
        <Row label="Sourcing model" value={p.sourcingModel} />
        <Row label="Primary supplier" value={p.primarySupplier} />
        <Row label="Therapy categories" value={p.therapyCategories} />

        <Heading as="h2" style={h2}>Review Readiness</Heading>
        <Row label="Items ready" value={p.readiness} />

        <Heading as="h2" style={h2}>Administrative Contact</Heading>
        <Row label="Name" value={p.contactName} />
        <Row label="Role" value={p.contactRole} />
        <Row label="Email" value={p.contactEmail} />
        <Row label="Phone" value={p.contactPhone} />

        {p.notes ? (
          <Section>
            <Heading as="h2" style={h2}>Notes</Heading>
            <Text style={notes}>{p.notes}</Text>
          </Section>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          Submitted via the Vendor Verification Intake form on sourcestandard.org.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: VendorIntakeNotification,
  subject: (d: Record<string, any>) =>
    `Vendor Intake — ${d.legalName || 'Unnamed vendor'}${d.referenceId ? ` (${d.referenceId})` : ''}`,
  to: 'info@sourcestandard.org',
  displayName: 'Vendor verification intake notification',
  previewData: {
    referenceId: 'SS-INTAKE-2024-A1B2C3',
    legalName: 'Acme Wellness LLC',
    dba: 'Acme Wellness',
    entityType: 'LLC',
    ein: '12-3456789',
    website: 'https://acmewellness.example',
    yearsOperating: '3',
    vendorType: 'Telehealth clinic',
    verificationTrack: 'Online vendor review',
    medicalDirector: 'Dr. Jane Smith, MD',
    prescriberRole: 'Medical Director',
    licenseStates: 'CA, TX, FL',
    sourcingModel: '503A pharmacy',
    primarySupplier: 'Example Pharmacy',
    therapyCategories: 'TRT, GLP-1',
    readiness: 'Business registration, Recent supplier invoice',
    contactName: 'John Doe',
    contactRole: 'Operations Lead',
    contactEmail: 'john@acmewellness.example',
    contactPhone: '+1 555 123 4567',
    notes: 'Available for review next week.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '640px' }
const h1 = { fontSize: '20px', fontWeight: 700, color: '#0a1f44', margin: '0 0 6px' }
const h2 = { fontSize: '13px', fontWeight: 700, color: '#0a1f44', textTransform: 'uppercase' as const, letterSpacing: '0.04em', margin: '20px 0 8px' }
const meta = { fontSize: '12px', color: '#6b7280', margin: '0 0 12px' }
const hr = { borderColor: '#e5e7eb', margin: '16px 0' }
const row = { fontSize: '14px', color: '#111827', margin: '4px 0', lineHeight: '1.5' }
const rowLabel = { color: '#6b7280', fontWeight: 600 }
const rowValue = { color: '#111827' }
const notes = { fontSize: '14px', color: '#111827', whiteSpace: 'pre-wrap' as const, lineHeight: '1.5' }
const footer = { fontSize: '12px', color: '#6b7280', margin: '20px 0 0' }
