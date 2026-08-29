import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const TEMPLATE_NAME = 'vendor-intake-notification'
const FIXED_RECIPIENT = 'info@sourcestandard.org'

// Simple in-memory rate limit per instance: max 5 submissions / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const FIELDS = [
  'referenceId',
  'legalName',
  'dba',
  'entityType',
  'ein',
  'website',
  'yearsOperating',
  'principalAddress',
  'vendorType',
  'verificationTrack',
  'medicalDirector',
  'prescriberRole',
  'npi',
  'licenseStates',
  'sourcingModel',
  'primarySupplier',
  'therapyCategories',
  'hasInvoices',
  'hasCoas',
  'readiness',
  'contactName',
  'contactRole',
  'contactEmail',
  'contactPhone',
  'notes',
] as const

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return json({ error: 'Too many submissions. Try again later.' }, 429)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }

  const raw = (body.templateData ?? {}) as Record<string, unknown>
  const templateData: Record<string, string> = {}
  for (const key of FIELDS) {
    const value = raw[key]
    if (typeof value === 'string' && value.trim()) {
      templateData[key] = value.trim().slice(0, 2000)
    }
  }

  if (!templateData.legalName || !templateData.contactEmail) {
    return json({ error: 'legalName and contactEmail are required' }, 400)
  }

  const referenceId = templateData.referenceId || crypto.randomUUID()
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const supabase =
    supabaseUrl && supabaseServiceKey
      ? createClient(supabaseUrl, supabaseServiceKey)
      : null

  const log = async (status: string, errorMessage?: string) => {
    if (!supabase) return
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: TEMPLATE_NAME,
      recipient_email: FIXED_RECIPIENT,
      status,
      error_message: errorMessage ?? null,
    })
    if (error) {
      console.error('Failed to write email_send_log', {
        code: error.code,
        message: error.message,
      })
    }
  }

  try {
    const result = await sendTemplateEmail(TEMPLATE_NAME, FIXED_RECIPIENT, {
      templateData,
      idempotencyKey: `vendor-intake-${referenceId}`,
    })

    if (!result.sent) {
      await log('suppressed')
      return json({ success: false, reason: result.reason })
    }

    await log('sent')
    return json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await log('failed', message.slice(0, 1000))
    console.error('Vendor intake email send failed', { message })
    return json({ error: 'Failed to send notification' }, 500)
  }
})
