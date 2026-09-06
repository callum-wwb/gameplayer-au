import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-[#111827] font-heading font-bold tracking-tight text-[#7CFF6B] shadow-[0_0_18px_-6px_var(--neon)]",
        size === "sm" ? "size-7 text-[11px]" : "size-9 text-sm",
        className,
      )}
      aria-hidden="true"
    >
      GP
    </span>
  );
}
