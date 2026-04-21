import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { UtilityHeader } from "@/components/UtilityHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <UtilityHeader
      eyebrow="404"
      title="Page not found"
      description="The page you requested isn't part of the public registry."
    >
      <Link
        to="/"
        className="text-[13px] text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
      >
        ← Return home
      </Link>
    </UtilityHeader>
  );
};

export default NotFound;
