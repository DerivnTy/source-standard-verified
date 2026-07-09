import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PageMeta } from "@/components/PageMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Page not found" description="The requested page is not part of the Source Standard public registry." />
      <section className="bg-background">
        <div className="page-shell" style={{ paddingTop: "96px", paddingBottom: "128px" }}>
          <div className="mx-auto text-center" style={{ maxWidth: "560px" }}>
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              404 · Not Found
            </p>
            <h1
              className="text-foreground"
              style={{
                marginTop: "16px",
                fontSize: "clamp(32px, 5vw, 44px)",
                lineHeight: 1.1,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Page not found.
            </h1>
            <p
              className="text-muted-foreground mx-auto"
              style={{
                marginTop: "16px",
                maxWidth: "52ch",
                fontSize: "15px",
                lineHeight: 1.65,
                textWrap: "balance",
              }}
            >
              The page you requested isn't part of the public registry. It may have been moved, retired, or never existed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1 mt-8 t-body-sm font-semibold uppercase tracking-[0.12em] text-primary hover:text-primary-hover"
            >
              ← Return home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
