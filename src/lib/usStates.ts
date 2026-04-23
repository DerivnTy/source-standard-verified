// US state → 2-letter abbreviation map for fuzzy search.
// Lowercased keys. Includes DC.
export const US_STATE_TO_ABBR: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY", "district of columbia": "DC",
};

/**
 * Resolve a free-text query to a 2-letter US state abbreviation,
 * supporting partial prefixes (e.g., "tenn" → "TN").
 * Returns undefined if no confident match.
 */
export const resolveStateAbbr = (query: string): string | undefined => {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  // Exact 2-letter abbreviation
  if (q.length === 2) {
    const upper = q.toUpperCase();
    if (Object.values(US_STATE_TO_ABBR).includes(upper)) return upper;
  }
  // Exact full name
  if (US_STATE_TO_ABBR[q]) return US_STATE_TO_ABBR[q];
  // Prefix match (>=3 chars to avoid false positives like "in" → Indiana)
  if (q.length >= 3) {
    const hit = Object.keys(US_STATE_TO_ABBR).find((name) => name.startsWith(q));
    if (hit) return US_STATE_TO_ABBR[hit];
  }
  return undefined;
};
