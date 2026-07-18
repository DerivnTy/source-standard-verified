import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { vendors, VENDOR_STATUS_LABEL } from "../../../data/vendors";

export default defineTool({
  name: "search_vendors",
  title: "Search verified vendors",
  description:
    "Search the Source Standard public vendor registry. Filter by US state, verification status, clinical focus, or free-text query on vendor name/city.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Case-insensitive substring matched against vendor name, city, and medical director."),
    state: z
      .string()
      .optional()
      .describe("Two-letter US state code (e.g. 'FL', 'TX')."),
    status: z
      .enum(["verified", "unverified", "under-review", "suspended", "removed"])
      .optional()
      .describe("Public verification status."),
    focus: z
      .string()
      .optional()
      .describe("Clinical focus keyword (e.g. 'TRT', 'Peptides', 'Weight Loss')."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("Max results to return. Defaults to 25, max 100."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, state, status, focus, limit }) => {
    const q = query?.trim().toLowerCase();
    const st = state?.trim().toUpperCase();
    const f = focus?.trim().toLowerCase();
    const cap = limit ?? 25;

    const filtered = vendors.filter((v) => {
      if (st && (v.state ?? "").toUpperCase() !== st) return false;
      if (status && v.status !== status) return false;
      if (f && !(v.clinicalFocus ?? []).some((c) => c.toLowerCase().includes(f))) return false;
      if (q) {
        const hay = `${v.name} ${v.city ?? ""} ${v.medicalDirector ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const results = filtered.slice(0, cap).map((v) => ({
      slug: v.slug,
      name: v.name,
      status: v.status,
      statusLabel: VENDOR_STATUS_LABEL[v.status],
      city: v.city,
      state: v.state,
      category: v.category,
      clinicalFocus: v.clinicalFocus,
      website: v.website,
      profileUrl: `https://sourcestandard.org/directory/${v.slug}`,
    }));

    return {
      content: [
        {
          type: "text",
          text: `Found ${filtered.length} vendor(s). Returning ${results.length}.\n\n${JSON.stringify(results, null, 2)}`,
        },
      ],
      structuredContent: { total: filtered.length, returned: results.length, results },
    };
  },
});
