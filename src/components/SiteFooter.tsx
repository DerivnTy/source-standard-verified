import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-surface-muted mt-24">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
              A documentation-first verification standard for peptide, TRT, hormone optimization, and wellness vendors.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Florida Launch 2026
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground mb-4">Standard</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
              <li><Link to="/greenlist" className="hover:text-foreground">Greenlist</Link></li>
              <li><Link to="/education" className="hover:text-foreground">Education</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground mb-4">Vendors</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/for-vendors" className="hover:text-foreground">For Vendors</Link></li>
              <li><Link to="/apply" className="hover:text-foreground">Apply</Link></li>
              <li><Link to="/verified-vendors" className="hover:text-foreground">Directory</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
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
