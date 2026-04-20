import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const SiteFooter = () => {
  return (
    <footer className="border-t-2 border-primary bg-background mt-24">
      <div className="container-wide py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Logo />
            <span className="hidden sm:inline-block h-4 w-px bg-border" />
            <p className="text-sm text-muted-foreground">
              SourceStandard.org &nbsp;·&nbsp; Tampa, FL &nbsp;·&nbsp; Founded 2026
            </p>
          </div>
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
            Source Standard is a verification and standards organization. We are not a manufacturer, pharmacy, clinic,
            laboratory, regulator, or enforcement agency. Verification reflects documentation reviewed at the time of
            assessment and does not guarantee medical outcomes, product safety, or treatment efficacy.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Source Standard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
