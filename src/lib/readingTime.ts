/**
 * readingTimeMinutes — derives an estimated reading time (whole minutes,
 * minimum 1) from an article's sections. Pure. Zero data changes.
 */
type Section = { title?: string; body: string | string[] };

const WORDS_PER_MINUTE = 220;

const countWords = (text: string) =>
  text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;

export const readingTimeMinutes = (sections: Section[] | undefined): number => {
  if (!sections || sections.length === 0) return 1;
  let words = 0;
  for (const s of sections) {
    if (s.title) words += countWords(s.title);
    const body = Array.isArray(s.body) ? s.body : [s.body];
    for (const p of body) words += countWords(p);
  }
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const formatReadingTime = (mins: number) => `${mins} min read`;
