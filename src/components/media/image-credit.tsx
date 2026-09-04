import type { ImageCreditMeta } from "@/lib/media";
import { cn } from "@/lib/utils";

type ImageCreditProps = {
  credit: ImageCreditMeta;
  compact?: boolean;
  overlay?: boolean;
  className?: string;
};

export function ImageCredit({
  credit,
  compact = false,
  overlay = false,
  className,
}: ImageCreditProps) {
  const label = compact
    ? `© ${credit.copyrightOwner}`
    : credit.creditLine;

  return (
    <p
      className={cn(
        "text-pretty",
        overlay
          ? "bg-black/75 px-2 py-1 text-[10px] leading-snug text-white/95 backdrop-blur-[2px] sm:text-[11px]"
          : "text-[11px] leading-relaxed text-muted-foreground",
        compact && overlay && "line-clamp-2",
        className,
      )}
      title={credit.creditLine}
    >
      <span className="sr-only">Image credit: </span>
      {label}
    </p>
  );
}
