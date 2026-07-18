import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getEducationArticle, getNewsArticle } from "../../../data/learn";

export default defineTool({
  name: "get_learn_article",
  title: "Get Learn article",
  description:
    "Return the full body of a Source Standard Learn article (education or news) by slug. Use list_learn_content first to discover slugs.",
  inputSchema: {
    kind: z.enum(["education", "news"]).describe("Which content stream the slug belongs to."),
    slug: z.string().min(1).describe("Article slug."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ kind, slug }) => {
    const article = kind === "education" ? getEducationArticle(slug) : getNewsArticle(slug);
    if (!article) {
      return {
        content: [{ type: "text", text: `No ${kind} article found for slug '${slug}'.` }],
        isError: true,
      };
    }
    const url =
      kind === "education"
        ? `https://sourcestandard.org/learn/${(article as { topic: string }).topic}#${slug}`
        : `https://sourcestandard.org/learn/news/${slug}`;
    const payload = { ...article, url };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: { article: payload },
    };
  },
});
