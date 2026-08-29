import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/SiteLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LegacyPathRedirect } from "@/components/LegacyPathRedirect";
import { Analytics } from "@/components/seo/Analytics";

import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Greenlist from "./pages/Greenlist.tsx";
import GreenlistProfile from "./pages/GreenlistProfile.tsx";
import VerifiedVendors from "./pages/VerifiedVendors.tsx";
import ForVendors from "./pages/ForVendors.tsx";

// Learn universe (new)
import Learn from "./pages/Learn.tsx";
import LearnGuide from "./pages/LearnGuide.tsx";
import {
  LearnEducationRedirect,
  LearnEducationArticleRedirect,
} from "./pages/LearnEducationRedirect.tsx";
import LearnNews from "./pages/LearnNews.tsx";
import LearnNewsArticle from "./pages/LearnNewsArticle.tsx";
import LearnFaq from "./pages/LearnFaq.tsx";

// FAQ pillar pages (Tier D, out of scope for content changes)
import FaqLegalRegulatory from "./pages/FaqLegalRegulatory.tsx";
import FaqClinicalSafety from "./pages/FaqClinicalSafety.tsx";
import FaqVerificationProcess from "./pages/FaqVerificationProcess.tsx";
import FaqConsumerDiligence from "./pages/FaqConsumerDiligence.tsx";

import Governance from "./pages/Governance.tsx";
import VendorProfile from "./pages/VendorProfile.tsx";
import DirectoryBrowse from "./pages/DirectoryBrowse.tsx";

import Apply from "./pages/Apply.tsx";
import Contact from "./pages/Contact.tsx";
import Accountability from "./pages/Accountability.tsx";
import MedicalAdvisory from "./pages/MedicalAdvisory.tsx";
import AdvisorProfile from "./pages/AdvisorProfile.tsx";
import FAQ from "./pages/FAQ.tsx";
import ReportConcern from "./pages/ReportConcern.tsx";
import StatusDefinitions from "./pages/StatusDefinitions.tsx";

import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import VerificationDisclaimer from "./pages/VerificationDisclaimer.tsx";
import HowToReadTheDirectory from "./pages/HowToReadTheDirectory.tsx";

import NotFound from "./pages/NotFound.tsx";

// Topic clusters + article library (programmatic SEO surfaces)
import ClusterPageView from "./pages/ClusterPageView.tsx";
import ArticlesIndex from "./pages/ArticlesIndex.tsx";
import Intelligence from "./pages/Intelligence.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import { CLUSTER_PAGES } from "@/seo/clusters";

const queryClient = new QueryClient();

/**
 * Legacy-route map for the Learn migration. Each retired route
 * client-side redirects (replace) to its successor. Kept in one place so
 * the sitemap generator and the router stay in sync.
 */
const LEARN_REDIRECTS: [string, string][] = [
  ["/education", "/learn"],
  ["/education/basics", "/learn/learn-the-basics"],
  ["/education/guides", "/learn"],
  ["/education/questions", "/learn"],
  ["/library/core", "/learn"],
  ["/library/latest", "/learn/news"],
  ["/library/publications", "/learn/news"],
  ["/library/sourcing", "/learn/sourcing-and-manufacturing"],
  ["/library/clinical", "/learn/verification"],
  ["/library/consumer", "/learn/choosing-a-provider"],

  // Core Reference articles → guide anchors
  ["/library/what-is-compounding", "/learn/learn-the-basics#what-is-a-compounded-medication"],
  ["/library/what-are-peptides", "/learn/learn-the-basics#what-are-peptides"],
  ["/library/interpreting-coas", "/learn/sourcing-and-manufacturing#how-to-read-a-certificate-of-analysis"],
  ["/library/dual-layer-difference", "/learn/verification#what-does-verified-mean"],
  ["/library/sterile-preparation-integrity", "/learn/sourcing-and-manufacturing#why-does-sourcing-matter"],
  ["/library/aseptic-technique", "/learn/sourcing-and-manufacturing#what-is-sterile-compounding"],
  ["/library/endocrinological-context", "/learn/sourcing-and-manufacturing#what-is-compounded-hormone-therapy"],
  ["/library/why-vendor-transparency-matters", "/learn/choosing-a-provider#what-information-should-a-transparent-provider-share"],
  ["/library/what-happens-during-a-verification-review", "/learn/verification#what-happens-during-a-verification-review"],

  // Analysis (Education targets)
  ["/library/analysis/questions-for-your-clinic", "/learn/choosing-a-provider#what-should-i-ask-my-provider"],
  ["/library/analysis/meaning-of-verification", "/learn/verification#what-does-verified-mean"],
  ["/library/analysis/undocumented-sourcing-signs", "/learn/choosing-a-provider#how-do-i-know-if-a-provider-is-trustworthy"],

  // Analysis (News target)
  ["/library/analysis/2026-reclassification", "/learn/news/2026-compounding-reclassification"],
];

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />

        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/facilities" element={<Greenlist />} />
            <Route path="/facilities/:slug" element={<GreenlistProfile />} />
            <Route path="/for-vendors" element={<ForVendors />} />

            {/* Learn, three-engine content system */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/education" element={<LearnEducationRedirect />} />
            <Route path="/learn/education/:slug" element={<LearnEducationArticleRedirect />} />
            <Route path="/learn/news" element={<LearnNews />} />
            <Route path="/learn/news/:slug" element={<LearnNewsArticle />} />
            <Route path="/learn/faq" element={<LearnFaq />} />
            <Route path="/learn/:topicId" element={<LearnGuide />} />

            {/* Topic clusters — hubs and spokes, one renderer, data-driven */}
            {CLUSTER_PAGES.map((p) => (
              <Route key={p.path} path={p.path} element={<ClusterPageView />} />
            ))}

            {/* Article library */}
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/articles" element={<ArticlesIndex />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />

            {/* Legacy → Learn redirects */}
            {LEARN_REDIRECTS.map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            {/* Catch-all for old /education/:slug dynamic route */}
            <Route path="/education/:slug" element={<Navigate to="/learn" replace />} />

            {/* Tier D FAQ pages, unchanged, surfaced through /learn/faq */}
            <Route path="/library/faq/legal-regulatory" element={<FaqLegalRegulatory />} />
            <Route path="/library/faq/clinical-safety" element={<FaqClinicalSafety />} />
            <Route path="/library/faq/verification-process" element={<FaqVerificationProcess />} />
            <Route path="/library/faq/consumer-diligence" element={<FaqConsumerDiligence />} />

            <Route path="/governance" element={<Governance />} />
            <Route path="/clinics" element={<VerifiedVendors />} />
            <Route path="/clinics/browse" element={<DirectoryBrowse />} />
            <Route path="/clinics/browse/:page" element={<DirectoryBrowse />} />
            <Route path="/clinics/:slug" element={<VendorProfile />} />

            {/* Retired URL prefixes → canonical homes. Preserves the rest
                of the path so old links and crawled URLs never 404. */}
            <Route path="/directory/*" element={<LegacyPathRedirect from="/directory" to="/clinics" />} />
            <Route path="/directory" element={<LegacyPathRedirect from="/directory" to="/clinics" />} />
            <Route path="/greenlist/*" element={<LegacyPathRedirect from="/greenlist" to="/facilities" />} />
            <Route path="/greenlist" element={<LegacyPathRedirect from="/greenlist" to="/facilities" />} />
            <Route path="/verified-vendors" element={<Navigate to="/clinics" replace />} />

            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accountability" element={<Accountability />} />
            <Route path="/medical-advisory" element={<MedicalAdvisory />} />
            <Route path="/medical-advisory/:slug" element={<AdvisorProfile />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/report-concern" element={<ReportConcern />} />
            <Route path="/report-a-concern" element={<Navigate to="/report-concern" replace />} />

            <Route path="/status-definitions" element={<StatusDefinitions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/verification-disclaimer" element={<VerificationDisclaimer />} />
            <Route path="/how-to-read-the-directory" element={<HowToReadTheDirectory />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
