import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | { kind: "validating" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid"; message: string }
  | { kind: "submitting" }
  | { kind: "done" };

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<State>({ kind: "validating" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid", message: "Missing unsubscribe token." });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (data.valid) setState({ kind: "valid" });
        else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
        else setState({ kind: "invalid", message: data.error || "Invalid or expired link." });
      } catch {
        setState({ kind: "invalid", message: "Unable to validate link. Try again later." });
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState({ kind: "submitting" });
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setState({ kind: "done" });
      else setState({ kind: "invalid", message: data?.error || "Could not unsubscribe." });
    } catch {
      setState({ kind: "invalid", message: "Could not unsubscribe. Try again later." });
    }
  };

  return (
    <>
      <PageMeta title="Email preferences" description="Manage your email subscription." />
      <section className="bg-background min-h-[60vh]">
        <div className="page-shell pt-12 pb-16">
          <div className="mx-auto w-standard max-w-xl">
            <p className="t-utility-xs text-muted-foreground tracking-wider uppercase mb-3">
              Email preferences
            </p>
            <h1 className="t-section-title-sm text-foreground">Unsubscribe</h1>

            <div className="mt-8 bg-card border border-border rounded-xl p-6">
              {state.kind === "validating" && (
                <p className="t-body-md text-muted-foreground">Validating link…</p>
              )}
              {state.kind === "valid" && (
                <div className="space-y-4">
                  <p className="t-body-md text-foreground">
                    Confirm that you want to stop receiving emails from Source Standard at this address.
                  </p>
                  <Button onClick={confirm}>Confirm Unsubscribe</Button>
                </div>
              )}
              {state.kind === "submitting" && (
                <p className="t-body-md text-muted-foreground">Processing…</p>
              )}
              {state.kind === "already" && (
                <p className="t-body-md text-foreground">This address has already been unsubscribed.</p>
              )}
              {state.kind === "done" && (
                <p className="t-body-md text-foreground">
                  You have been unsubscribed. You will no longer receive these emails.
                </p>
              )}
              {state.kind === "invalid" && (
                <p className="t-body-md text-foreground">{state.message}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Unsubscribe;
