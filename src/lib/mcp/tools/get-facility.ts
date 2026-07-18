import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getGreenlistEntry } from "../../../data/greenlist";

export default defineTool({
  name: "get_facility",
  title: "Get facility record",
  description:
    "Return the full Greenlist record for a compounding facility by slug, including FDA registration detail, inspection history, and any active regulatory alert.",
  inputSchema: {
    slug: z.string().min(1).describe("Facility slug from search_facilities or /greenlist/<slug>."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const e = getGreenlistEntry(slug);
    if (!e) {
      return {
        content: [{ type: "text", text: `No facility found for slug '${slug}'.` }],
        isError: true,
      };
    }
    const record = { ...e, profileUrl: `https://sourcestandard.org/greenlist/${e.slug}` };
    return {
      content: [{ type: "text", text: JSON.stringify(record, null, 2) }],
      structuredContent: { facility: record },
    };
  },
});
