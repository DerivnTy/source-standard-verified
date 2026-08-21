import { type ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Index from "./Index";
import HowItWorks from "./HowItWorks";
import VerifiedVendors from "./VerifiedVendors";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ClinicSearchResult } from "@/components/registry/ClinicSearchResult";
import type { Vendor } from "@/data/vendors";
import {
  HOME_DISCLAIMER,
  HOME_SEARCH_LEAD,
  HOME_STATUS_RULE,
  HOME_TAGLINE,
  HOW_IT_WORKS_FACILITY,
  HOW_IT_WORKS_SEARCH_PURPOSE,
  HOW_IT_WORKS_STEPS,
  RESULT_NOT_VERIFIED_BODY,
  RESULT_NOT_VERIFIED_LABEL,
  RESULT_VERIFIED_DISCLAIMER,
  RESULT_VERIFIED_LABEL,
} from "@/data/publicLanguage";
import {
  INDEX_VS_VERIFIED,
  METHODOLOGY_TESTING,
  WHAT_WE_DO_TODAY,
} from "@/data/institutionalCopy";

const wrap = (ui: ReactNode) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("locked public language", () => {
  it("renders the homepage copy without killed stats or vendor language", () => {
    wrap(<Index />);

    expect(screen.getByRole("heading", { name: HOME_TAGLINE })).toBeInTheDocument();
    expect(screen.getByText(HOME_SEARCH_LEAD)).toBeInTheDocument();
    expect(screen.getByText(HOME_STATUS_RULE)).toBeInTheDocument();
    expect(screen.getByText(HOME_DISCLAIMER)).toBeInTheDocument();
    expect(screen.getByText("Clinics: apply to have defined sourcing claims reviewed.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Facilities: a separate Greenlist. You can pay for an evaluation. You cannot pay for the result.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Patients: use the search. Read the scope on the record.")).toBeInTheDocument();

    expect(screen.queryByText(/4,179/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Providers Indexed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/50 States/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unsupported claims/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Vendor Registry/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Unverified$/)).not.toBeInTheDocument();
    expect(screen.getByText(WHAT_WE_DO_TODAY)).toBeInTheDocument();
    expect(screen.getByText(INDEX_VS_VERIFIED)).toBeInTheDocument();
    expect(screen.getByText(METHODOLOGY_TESTING)).toBeInTheDocument();
  });

  it("renders How Verification Works as apply-then-review, not index-then-review", () => {
    wrap(<HowItWorks />);

    for (const step of HOW_IT_WORKS_STEPS) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
    expect(screen.getByText(HOW_IT_WORKS_FACILITY)).toBeInTheDocument();
    expect(screen.getAllByText(HOW_IT_WORKS_SEARCH_PURPOSE).length).toBeGreaterThan(0);
    expect(screen.getByText(WHAT_WE_DO_TODAY)).toBeInTheDocument();
    expect(screen.getByText(METHODOLOGY_TESTING)).toBeInTheDocument();
    expect(screen.queryByText(/Vendor enters the registry/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/public information/i)).not.toBeInTheDocument();
  });

  it("removes Advisory Board from shared chrome and aligns the footer disclaimer", () => {
    wrap(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );

    expect(screen.queryByRole("link", { name: "Advisory Board" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Search Clinics" }).length).toBeGreaterThan(0);
    expect(screen.getByText(HOME_DISCLAIMER)).toBeInTheDocument();
    expect(screen.queryByText(/vendor sourcing claims/i)).not.toBeInTheDocument();
  });

  it("shows the locked Not Verified result copy", () => {
    wrap(<ClinicSearchResult name="Example Clinic" />);

    expect(screen.getByRole("heading", { name: "Example Clinic" })).toBeInTheDocument();
    expect(screen.getByText(RESULT_NOT_VERIFIED_LABEL)).toBeInTheDocument();
    expect(screen.getByText(RESULT_NOT_VERIFIED_BODY)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Apply" })).toHaveAttribute("href", "/apply");
  });

  it("does not browse indexed clinics until a name is searched", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/verified-vendors"]}>
          <VerifiedVendors />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getAllByText(HOME_SEARCH_LEAD).length).toBeGreaterThan(0);
    expect(screen.getByText(HOW_IT_WORKS_SEARCH_PURPOSE)).toBeInTheDocument();
    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
    expect(screen.queryByText(/Total Indexed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/4,179/)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "MATTR Biowellness Club" })).not.toBeInTheDocument();
  });

  it("shows the Not Verified result for a searched indexed name instead of a directory dump", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/verified-vendors?q=MATTR%20Biowellness%20Club"]}>
          <VerifiedVendors />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { name: "MATTR Biowellness Club" })).toBeInTheDocument();
    expect(screen.getByText(RESULT_NOT_VERIFIED_LABEL)).toBeInTheDocument();
    expect(screen.getByText(RESULT_NOT_VERIFIED_BODY)).toBeInTheDocument();
    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });

  it("shows the locked Verified result from record fields only", () => {
    const vendor: Vendor = {
      slug: "example-verified",
      name: "Example Verified Clinic",
      status: "verified",
      reviewDate: "2026-03-01",
      verifiedCategories: ["Peptides"],
      verifiedManufacturers: ["Example Facility"],
    };

    wrap(<ClinicSearchResult name={vendor.name} vendor={vendor} />);

    expect(screen.getByRole("heading", { name: vendor.name })).toBeInTheDocument();
    expect(screen.getByText(RESULT_VERIFIED_LABEL)).toBeInTheDocument();
    expect(screen.getByText(/Last review:/)).toBeInTheDocument();
    expect(screen.getByText(/Scope:/)).toBeInTheDocument();
    expect(screen.getByText(/Documented sources:/)).toBeInTheDocument();
    expect(screen.getByText("Example Facility")).toBeInTheDocument();
    expect(screen.getByText(RESULT_VERIFIED_DISCLAIMER)).toBeInTheDocument();
  });
});
