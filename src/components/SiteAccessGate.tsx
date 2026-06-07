import { useState, type FormEvent } from "react";
import { useSiteAccess } from "@/hooks/useSiteAccess";

export const SiteAccessGate = ({ children }: { children: React.ReactNode }) => {
  const { status, login } = useSiteAccess();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "unlocked") return <>{children}</>;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await login(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect password");
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{ backgroundColor: "hsl(var(--navy-surface))" }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p
            className="t-utility-xs mb-4"
            style={{ color: "hsl(var(--cream) / 0.55)" }}
          >
            Source Standard
          </p>
          <h1
            className="t-page-title"
            style={{ color: "hsl(var(--cream))", maxWidth: "none" }}
          >
            {status === "checking" ? "Verifying access" : "Restricted access"}
          </h1>
          <p
            className="mt-3 t-body-sm"
            style={{ color: "hsl(var(--cream) / 0.6)" }}
          >
            {status === "checking"
              ? "One moment."
              : "Enter the access password to continue."}
          </p>
        </div>

        {status === "locked" && (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent px-4 py-3 t-body-md outline-none transition-colors"
              style={{
                color: "hsl(var(--cream))",
                border: "1px solid hsl(var(--cream) / 0.2)",
                borderRadius: "2px",
              }}
              disabled={submitting}
            />
            {error && (
              <p className="t-utility-xs" style={{ color: "hsl(var(--cream) / 0.7)" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full py-3 t-utility-xs transition-opacity disabled:opacity-40"
              style={{
                color: "hsl(var(--navy-surface))",
                backgroundColor: "hsl(var(--cream))",
                borderRadius: "2px",
              }}
            >
              {submitting ? "Checking" : "Enter"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
