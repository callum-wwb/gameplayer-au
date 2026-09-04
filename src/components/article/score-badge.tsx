import { cn } from "@/lib/utils";

export function ScoreBadge({
  score,
  size = "md",
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const formatted = Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1);
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-full border-2 border-primary bg-background/90 font-heading font-bold text-primary shadow-[0_0_20px_-6px_var(--neon)]",
        size === "sm" && "size-11 text-sm",
        size === "md" && "size-14 text-lg",
        size === "lg" && "size-24 text-4xl",
        className,
      )}
      aria-label={`Score ${formatted} out of 10`}
    >
      <span>{formatted}</span>
      {size === "lg" ? (
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          / 10
        </span>
      ) : null}
    </div>
  );
}
