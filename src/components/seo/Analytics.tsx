import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Analytics — GA4 loader + SPA page_view tracking.
 *
 * The measurement ID is supplied at build time via VITE_GA_MEASUREMENT_ID.
 * With no ID configured the component is inert, so local dev and preview
 * builds never pollute the production property.
 *
 * Because this is a client-routed app, GA's automatic page_view only fires
 * on the first load. We send an explicit page_view on every route change so
 * organic landing pages, clinic profiles, and articles are all attributed
 * to their own URL.
 */
const GA_ID = (import.meta as { env?: Record<string, string | undefined> }).env
  ?.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const Analytics = () => {
  const { pathname, search } = useLocation();
  const loaded = useRef(false);

  useEffect(() => {
    if (!GA_ID || loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // Route changes are reported manually below.
    window.gtag("config", GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default Analytics;
