const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const enc = new TextEncoder();

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
  return out;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function sign(payload: string, key: CryptoKey): Promise<string> {
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return b64url(sig);
}

async function makeToken(signingKey: string): Promise<string> {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = b64url(enc.encode(String(exp)));
  const key = await getKey(signingKey);
  const sig = await sign(payload, key);
  return `${payload}.${sig}`;
}

async function verifyToken(token: string, signingKey: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const key = await getKey(signingKey);
  const expected = await sign(payload, key);
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const exp = Number(new TextDecoder().decode(b64urlDecode(payload)));
    return Number.isFinite(exp) && exp > Date.now();
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const password = Deno.env.get("SITE_ACCESS_PASSWORD");
    const signingKey = Deno.env.get("SITE_ACCESS_SIGNING_KEY");
    if (!password || !signingKey) {
      return json({ error: "Server not configured" }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action;

    if (action === "login") {
      const submitted = String(body?.password ?? "");
      // small constant delay to slow brute force
      await new Promise((r) => setTimeout(r, 400));
      if (!timingSafeEqual(submitted, password)) {
        return json({ error: "Incorrect password" }, 401);
      }
      const token = await makeToken(signingKey);
      return json({ token });
    }

    if (action === "verify") {
      const token = String(body?.token ?? "");
      const valid = await verifyToken(token, signingKey);
      return json({ valid });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
