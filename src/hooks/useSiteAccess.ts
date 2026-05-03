import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "site-access-token";

type Status = "checking" | "locked" | "unlocked";

export function useSiteAccess() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      setStatus("locked");
      return;
    }
    supabase.functions
      .invoke("site-access", { body: { action: "verify", token } })
      .then(({ data, error }) => {
        if (!error && data?.valid) {
          setStatus("unlocked");
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setStatus("locked");
        }
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setStatus("locked");
      });
  }, []);

  const login = useCallback(async (password: string) => {
    const { data, error } = await supabase.functions.invoke("site-access", {
      body: { action: "login", password },
    });
    if (error || !data?.token) {
      throw new Error(data?.error || error?.message || "Incorrect password");
    }
    localStorage.setItem(STORAGE_KEY, data.token);
    setStatus("unlocked");
  }, []);

  const lock = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStatus("locked");
  }, []);

  return { status, login, lock };
}
