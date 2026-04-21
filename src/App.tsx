import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/SiteLayout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Greenlist from "./pages/Greenlist.tsx";
import GreenlistProfile from "./pages/GreenlistProfile.tsx";
import VerifiedVendors from "./pages/VerifiedVendors.tsx";
import ForVendors from "./pages/ForVendors.tsx";
import Education from "./pages/Education.tsx";
import EducationBasics from "./pages/EducationBasics.tsx";
import EducationGuides from "./pages/EducationGuides.tsx";
import EducationQuestions from "./pages/EducationQuestions.tsx";
import LibraryEntry from "./pages/LibraryEntry.tsx";
import Governance from "./pages/Governance.tsx";
import VendorProfile from "./pages/VendorProfile.tsx";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/greenlist" element={<Greenlist />} />
            <Route path="/greenlist/:slug" element={<GreenlistProfile />} />
            <Route path="/verified-vendors" element={<VerifiedVendors />} />
            <Route path="/for-vendors" element={<ForVendors />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/basics" element={<EducationBasics />} />
            <Route path="/education/guides" element={<EducationGuides />} />
            <Route path="/education/questions" element={<EducationQuestions />} />
            <Route path="/education/:slug" element={<LibraryEntry />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/directory" element={<VerifiedVendors />} />
            <Route path="/directory/:slug" element={<VendorProfile />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accountability" element={<Accountability />} />
            <Route path="/medical-advisory" element={<MedicalAdvisory />} />
            <Route path="/medical-advisory/:slug" element={<AdvisorProfile />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/report-a-concern" element={<ReportConcern />} />
            <Route path="/status-definitions" element={<StatusDefinitions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/verification-disclaimer" element={<VerificationDisclaimer />} />
            <Route path="/how-to-read-the-directory" element={<HowToReadTheDirectory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
