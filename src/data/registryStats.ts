/**
 * Registry stats — single source of truth for the headline numbers
 * shown on the Home hero, Vendor Registry, and Facility Records pages.
 * Any page that displays "providers indexed" or "states represented"
 * MUST read from this file so the numbers never diverge across surfaces.
 */
import { vendors } from "@/data/vendors";
import { greenlistEntries } from "@/data/greenlist";

const uniqueStates = new Set<string>();
for (const v of vendors) if (v.state) uniqueStates.add(v.state);

export const registryStats = {
  providersIndexed: vendors.length,
  statesRepresented: uniqueStates.size,
  facilityRecords: greenlistEntries.length,
} as const;
