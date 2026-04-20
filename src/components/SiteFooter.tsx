import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const SiteFooter = () => {
  return (
    <footer className="mt-24 border-t border-border bg-surface-muted">
      <div className="container-tight py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A neutral, documentation-first verification standard for the peptide, TRT, hormone optimization, and wellness vendor space.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Standard</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</Link></li>
              <li><Link to="/directory" className="text-muted-foreground hover:text-foreground">Vendor Directory</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Vendors</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/apply" className="text-muted-foreground hover:text-foreground">Apply for Verification</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            Source Standard is a verification and standards organization. We are not a manufacturer, pharmacy, clinic,
            laboratory, regulator, or enforcement agency. Verification reflects documentation reviewed at the time of
            assessment and does not guarantee medical outcomes, product safety, or treatment efficacy.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Source Standard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
