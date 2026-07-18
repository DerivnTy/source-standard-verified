import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  EDUCATION_TOPICS,
  EDUCATION_ARTICLES,
  NEWS_CATEGORIES,
  NEWS_ARTICLES,
  FAQ_ENTRIES,
} from "../../../data/learn";

export default defineTool({
  name: "list_learn_content",
  title: "List Learn content",
  description:
    "List Source Standard educational content: guide topics, individual education articles, news articles, and FAQ pillar pages. Use this to discover what educational material is available before calling get_learn_article.",
  inputSchema: {
    kind: z
      .enum(["all", "education", "news", "faq", "topics"])
      .optional()
      .describe("Filter which content to list. Defaults to 'all'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ kind }) => {
    const k = kind ?? "all";
    const payload: Record<string, unknown> = {};

    if (k === "all" || k === "topics") {
      payload.topics = EDUCATION_TOPICS.map((t) => ({
        id: t.id,
        label: t.label,
        description: t.description,
        guideUrl: `https://sourcestandard.org/learn/${t.id}`,
      }));
    }
    if (k === "all" || k === "education") {
      payload.education = EDUCATION_ARTICLES.map((a) => ({
        slug: a.slug,
        topic: a.topic,
        question: a.question,
        shortAnswer: a.shortAnswer,
        updated: a.updated,
      }));
    }
    if (k === "all" || k === "news") {
      payload.newsCategories = NEWS_CATEGORIES;
      payload.news = NEWS_ARTICLES.map((a) => ({
        slug: a.slug,
        category: a.category,
        headline: a.headline,
        standfirst: a.standfirst,
        dateline: a.dateline,
        url: `https://sourcestandard.org/learn/news/${a.slug}`,
      }));
    }
    if (k === "all" || k === "faq") {
      payload.faqPillars = FAQ_ENTRIES.map((f) => ({
        label: f.label,
        description: f.description,
        url: `https://sourcestandard.org${f.to}`,
      }));
    }

    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
