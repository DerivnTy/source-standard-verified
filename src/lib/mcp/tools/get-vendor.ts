import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getVendor, VENDOR_STATUS_LABEL, VENDOR_STATUS_DISCLOSURE } from "../../../data/vendors";

export default defineTool({
  name: "get_vendor",
  title: "Get vendor profile",
  description:
    "Return the full public profile for a Source Standard vendor by slug, including status, verification detail, clinical focus, and profile URL.",
  inputSchema: {
    slug: z.string().min(1).describe("Vendor slug (from search_vendors results or the URL /directory/<slug>)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const v = getVendor(slug);
    if (!v) {
      return {
        content: [{ type: "text", text: `No vendor found for slug '${slug}'.` }],
        isError: true,
      };
    }
    const profile = {
      ...v,
      statusLabel: VENDOR_STATUS_LABEL[v.status],
      statusDisclosure: VENDOR_STATUS_DISCLOSURE[v.status],
      profileUrl: `https://sourcestandard.org/directory/${v.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: { vendor: profile },
    };
  },
});
