import { describe, expect, it } from "vitest";
import type { Vendor } from "@/data/vendors";
import { searchClinics } from "./clinicSearch";

const clinic = (name: string, slug = name.toLowerCase().replace(/\s+/g, "-")): Vendor => ({
  slug,
  name,
  status: "unverified",
});

const directory: Vendor[] = [
  clinic("MATTR Biowellness Club", "mattr-biowellness-club"),
  clinic("Austin Regenerative Therapy", "austin-regenerative-therapy"),
  clinic("Limitless Male Medical Clinic", "limitless-male-1"),
  clinic("Limitless Male Medical Clinic", "limitless-male-2"),
  clinic("Wellness Center North", "wellness-north"),
  clinic("Wellness Center South", "wellness-south"),
  clinic("Wellness Center East", "wellness-east"),
  clinic("Wellness Center West", "wellness-west"),
  clinic("Wellness Center Central", "wellness-central"),
  clinic("Wellness Center Metro", "wellness-metro"),
  clinic("Wellness Center Lakes", "wellness-lakes"),
  clinic("Wellness Center Park", "wellness-park"),
  clinic("Wellness Center Hill", "wellness-hill"),
];

describe("searchClinics", () => {
  it("returns no hits for an empty query so the directory is not browsed", () => {
    expect(searchClinics("", directory)).toEqual([]);
    expect(searchClinics(" ", directory)).toEqual([]);
    expect(searchClinics("a", directory)).toEqual([]);
  });

  it("returns the indexed clinic for a searched name", () => {
    const hits = searchClinics("MATTR Biowellness Club", directory);
    expect(hits).toEqual([
      { kind: "indexed", vendor: directory[0] },
    ]);
  });

  it("does not dump a generic browse wall when many names contain the query", () => {
    const hits = searchClinics("Wellness Center", directory);
    expect(hits).toEqual([{ kind: "unknown", name: "Wellness Center" }]);
  });

  it("treats an unmatched name as Not Verified for that name", () => {
    expect(searchClinics("Acme Peptide Clinic", directory)).toEqual([
      { kind: "unknown", name: "Acme Peptide Clinic" },
    ]);
  });
});
