import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { greenlistEntries } from "../../../data/greenlist";

export default defineTool({
  name: "search_facilities",
  title: "Search compounding facilities (Greenlist)",
  description:
    "Search the Source Standard Greenlist of FDA-registered 503A/503B compounding pharmacies and outsourcing facilities. Filter by category, state, or free-text query.",
  inputSchema: {
    query: z.string().optional().describe("Substring matched against facility name, focus, and location."),
    category: z
      .enum(["503B", "503A", "Other"])
      .optional()
      .describe("Facility category."),
    state: z.string().optional().describe("Two-letter US state code."),
    limit: z.number().int().min(1).max(100).optional().describe("Max results. Defaults to 25."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, state, limit }) => {
    const q = query?.trim().toLowerCase();
    const st = state?.trim().toUpperCase();
    const cap = limit ?? 25;

    const filtered = greenlistEntries.filter((e) => {
      if (category && e.category !== category) return false;
      if (st && (e.state ?? "").toUpperCase() !== st) return false;
      if (q) {
        const hay = `${e.name} ${e.focus} ${e.location}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const results = filtered.slice(0, cap).map((e) => ({
      slug: e.slug,
      name: e.name,
      type: e.type,
      category: e.category,
      location: e.location,
      focus: e.focus,
      website: e.website,
      hasAlert: !!e.regulatoryAlert,
      alertStatus: e.regulatoryAlert?.status,
      profileUrl: `https://sourcestandard.org/greenlist/${e.slug}`,
    }));

    return {
      content: [
        {
          type: "text",
          text: `Found ${filtered.length} facility record(s). Returning ${results.length}.\n\n${JSON.stringify(results, null, 2)}`,
        },
      ],
      structuredContent: { total: filtered.length, returned: results.length, results },
    };
  },
});
