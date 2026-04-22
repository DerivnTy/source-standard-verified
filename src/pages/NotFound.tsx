import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="bg-background">
      <div className="container-narrow section-band">
        <div className="card-elevated p-10 md:p-14 text-center">
          <p className="eyebrow mb-3">Error 404</p>
          <h1 className="title-page text-foreground mb-4">Page not found.</h1>
          <p className="max-w-[52ch] mx-auto t-body-sm text-muted-foreground leading-[1.7] mb-8">
            The page you requested isn't part of the public registry. It may have been moved, retired, or never existed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary hover:text-primary-hover"
          >
            ← Return home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
