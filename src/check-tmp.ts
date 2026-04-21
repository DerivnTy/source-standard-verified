import { vendors, getClinicalFocusOptions, getVendorStates } from "./data/vendors";
import { greenlistEntries, getGreenlistStates } from "./data/greenlist";

console.log("focus options:", getClinicalFocusOptions());
console.log("vendor states count:", getVendorStates().length);
console.log("US-state vendors remaining:", vendors.filter((v) => v.state === "US").length);
console.log("Ft Lauderdale (raw) vendors:", vendors.filter((v) => v.city === "Ft Lauderdale").length);
console.log("Fort Lauderdale vendors:", vendors.filter((v) => v.city === "Fort Lauderdale").length);
console.log("Dorset vendors:", vendors.filter((v) => v.city === "Dorset").length);
console.log("greenlist states:", getGreenlistStates());
console.log("multi-loc:", greenlistEntries.filter((e) => e.serviceArea).map((e) => `${e.name} → ${e.serviceArea}`));
console.log("multi-state entries:", greenlistEntries.filter((e) => e.additionalLocations).map((e) => `${e.name}: ${e.state} + ${JSON.stringify(e.additionalLocations)}`));
