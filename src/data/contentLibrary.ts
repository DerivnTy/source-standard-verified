/**
 * Unified content library.
 *
 * Source Standard maintains a deep internal taxonomy (clusters, intelligence
 * categories, news categories) for SEO, structured data, and related-content
 * relationships. Readers should not have to navigate it.
 *
 * This module flattens every editorial destination into ONE browsable library
 * with a small, human filter set. Nothing is deleted: each item still points
 * at its canonical URL, and the underlying taxonomies remain intact.
 */

import { ARTICLES } from "@/data/articles";
import { NEWS_ARTICLES, NEWS_CATEGORIES, type NewsCategoryId } from "@/data/learn";
import type { IntelCategory } from "@/data/intelArticles";

/** Human-facing filters. Deliberately short. */
export const LIBRARY_TOPICS = [
  "Regulatory",
  "Research",
  "Recalls & Safety",
  "Testing & Quality",
  "Sourcing & Transparency",
  "Guides",
] as const;

export type LibraryTopic = (typeof LIBRARY_TOPICS)[number];

export type LibraryItem = {
  /** Canonical in-site path. Unchanged from the original destination. */
  to: string;
  title: string;
  summary: string;
  /** ISO date used for ordering and display. */
  date: string;
  topic: LibraryTopic;
  /** Original internal classification, kept for context lines. */
  sourceLabel?: string;
};

const INTEL_TO_TOPIC: Record<IntelCategory, LibraryTopic> = {
  "Regulatory Updates": "Regulatory",
  Research: "Research",
  "Recalls & Safety": "Recalls & Safety",
  "Testing & Quality": "Testing & Quality",
  "Sourcing & Transparency": "Sourcing & Transparency",
  Guides: "Guides",
};

const NEWS_TO_TOPIC: Record<NewsCategoryId, LibraryTopic> = {
  regulatory: "Regulatory",
  scientific: "Research",
  industry: "Sourcing & Transparency",
  "source-standard": "Guides",
  editorial: "Guides",
};

const articleItems: LibraryItem[] = ARTICLES.map((a) => ({
  to: `/articles/${a.slug}`,
  title: a.question,
  summary: a.standfirst,
  date: a.updated || a.published,
  topic: a.category ? INTEL_TO_TOPIC[a.category] : "Guides",
  sourceLabel: a.source?.name,
}));

const newsItems: LibraryItem[] = NEWS_ARTICLES.map((n) => ({
  to: `/learn/news/${n.slug}`,
  title: n.headline,
  summary: n.standfirst,
  date: n.dateline,
  topic: NEWS_TO_TOPIC[n.category],
  sourceLabel: NEWS_CATEGORIES.find((c) => c.id === n.category)?.label,
}));

/** Every editorial item, newest first. */
export const LIBRARY_ITEMS: LibraryItem[] = [...articleItems, ...newsItems].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const libraryItemsByTopic = (topic: LibraryTopic) =>
  LIBRARY_ITEMS.filter((i) => i.topic === topic);

/** Topics that actually have content, in canonical order. */
export const ACTIVE_LIBRARY_TOPICS: LibraryTopic[] = LIBRARY_TOPICS.filter((t) =>
  LIBRARY_ITEMS.some((i) => i.topic === t),
);

export const recentLibraryItems = (count = 6) => LIBRARY_ITEMS.slice(0, count);
