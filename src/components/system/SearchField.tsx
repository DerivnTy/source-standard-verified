import { Search } from "lucide-react";
import type { ChangeEventHandler, FormEventHandler } from "react";

type SearchFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  ariaLabel: string;
  variant?: "navy" | "surface";
  onSubmit?: FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
  id?: string;
};

/**
 * Product search field. On navy, the input is a white control so the
 * query remains readable. On cream, it is a white field with a strong border.
 */
export const SearchField = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
  variant = "navy",
  onSubmit,
  submitLabel,
  id,
}: SearchFieldProps) => {
  const isNavy = variant === "navy";
  const field = (
    <div className="relative w-full">
      <Search
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: "14px",
          width: "15px",
          height: "15px",
          strokeWidth: 1.75,
          transform: "translateY(-50%)",
          color: isNavy ? "hsl(215 12% 42%)" : "hsl(var(--muted-foreground))",
        }}
      />
      <input
        id={id}
        value={value}
        onChange={onChange}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        aria-label={ariaLabel}
        placeholder={placeholder}
        className={`hero-search-input font-sans w-full min-w-0 ${
          isNavy
            ? ""
            : "!bg-white !text-foreground !border-[hsl(var(--border-strong))] !caret-foreground"
        }`}
        style={{
          height: "48px",
          paddingLeft: "40px",
          paddingRight: "14px",
        }}
      />
    </div>
  );

  if (!onSubmit) return field;

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label={ariaLabel}
      className="flex w-full flex-col items-stretch gap-2 min-[400px]:flex-row"
    >
      {field}
      {submitLabel && (
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center bg-white px-5 font-sans text-[13px] font-medium text-[hsl(var(--navy-surface))] hover:bg-white/90"
          style={{ borderRadius: "2px" }}
        >
          {submitLabel}
        </button>
      )}
    </form>
  );
};

export default SearchField;
