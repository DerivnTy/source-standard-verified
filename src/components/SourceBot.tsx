import { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPattern } from "./HeroPattern";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SEED_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hello! I am the Clinical Assistant. I can help you understand peptide safety, 503A/B regulations, or how our verification process works. What can I help you find today?",
};

export const SourceBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([SEED_MESSAGE]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    // TODO: wire to LLM. Send `messages` to an edge function that injects
    // the Source Standard library content (src/data/library.ts + the
    // SS-SERIES analysis pages) as system context, then stream the reply.
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      {
        role: "assistant",
        content:
          "Thanks for your question. The assistant isn't connected to the knowledge base yet, once wired up, I'll answer using the Source Standard library and analysis series.",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label="Clinical Assistant"
          className="fixed bottom-24 right-6 z-50 flex flex-col w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-8rem)] rounded-xl border border-border/60 bg-background shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="relative flex items-start justify-between gap-3 border-b border-border/50 px-4 py-3 overflow-hidden">
            <HeroPattern opacity={0.05} />
            <div className="relative flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground leading-tight">
                  Clinical Assistant
                </p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  Educational reference · not medical advice
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-[13.5px] leading-[1.6] max-w-[85%] ${
                    m.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-surface-muted text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-border/50 p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about peptides, 503A/B, verification…"
              className="flex-1 h-10 rounded-full border border-border/60 bg-background px-4 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 focus:ring-2 focus:ring-ring/30 transition-all"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="rounded-full h-10 w-10 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Clinical Assistant" : "Open Clinical Assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {open ? <X className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
      </button>
    </>
  );
};

export default SourceBot;
