import { defineMcp } from "@lovable.dev/mcp-js";
import searchVendors from "./tools/search-vendors";
import getVendor from "./tools/get-vendor";
import searchFacilities from "./tools/search-facilities";
import getFacility from "./tools/get-facility";
import listLearnContent from "./tools/list-learn-content";
import getLearnArticle from "./tools/get-learn-article";

export default defineMcp({
  name: "source-standard-mcp",
  title: "Source Standard",
  version: "0.1.0",
  instructions:
    "Source Standard is a public regulatory directory that cross-references medical clinics (vendors) against FDA-registered 503A/503B compounding pharmacies (upstream facilities). Use these tools to search the public Vendor Registry, look up the Greenlist of compounding facilities, and read Source Standard's educational Learn content (guides, articles, news, FAQ). All data returned is public and mirrors what is published on sourcestandard.org. No user account or authentication is required.",
  tools: [
    searchVendors,
    getVendor,
    searchFacilities,
    getFacility,
    listLearnContent,
    getLearnArticle,
  ],
});
