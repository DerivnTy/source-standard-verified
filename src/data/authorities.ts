export type Authority = {
  code: string;
  name: string;
  full: string;
  url: string;
  references: string;
};

export const authorities: Authority[] = [
  {
    code: "FDA",
    name: "FDA",
    full: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov",
    references: "503B outsourcing facility registration, drug establishment registration, recall records.",
  },
  {
    code: "PCAB",
    name: "PCAB",
    full: "Pharmacy Compounding Accreditation Board",
    url: "https://achc.org/pcab/",
    references: "Accreditation status of compounding pharmacies operating under USP standards.",
  },
  {
    code: "NSF",
    name: "NSF",
    full: "NSF International",
    url: "https://www.nsf.org",
    references: "Independent product testing and facility certification under recognized public standards.",
  },
  {
    code: "USP",
    name: "USP",
    full: "United States Pharmacopeia",
    url: "https://www.usp.org",
    references: "Compounding chapters (e.g. <795>, <797>, <800>) used as benchmarks for sterile and non-sterile compounding.",
  },
  {
    code: "STATE",
    name: "State Boards",
    full: "State Boards of Pharmacy",
    url: "https://nabp.pharmacy",
    references: "State-level pharmacy and prescriber licensure records cited per applicable jurisdiction.",
  },
];
