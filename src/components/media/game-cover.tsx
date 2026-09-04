import Image from "next/image";
import { CoverArt } from "@/components/article/cover-art";
import { ImageCredit } from "@/components/media/image-credit";
import type { CoverMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

type CreditPlacement = "overlay" | "caption" | "both" | "compact" | "none";

type GameCoverProps = {
  media: CoverMedia;
  title?: string;
  kicker?: string;
  hue?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showTitle?: boolean;
  credit?: CreditPlacement;
  fill?: boolean;
};

export function GameCover({
  media,
  title,
  kicker,
  hue = 210,
  className,
  sizes = "(max-width: 768px) 100vw, 640px",
  priority = false,
  showTitle = false,
  credit = "overlay",
  fill = false,
}: GameCoverProps) {
  const overlayCredit =
    credit !== "none" &&
    (credit === "overlay" || credit === "both" || credit === "compact");
  const captionCredit = credit === "caption" || credit === "both";
  const compact =
    credit === "compact" || credit === "overlay" || credit === "both";

  return (
    <figure className={cn(fill ? "absolute inset-0" : "min-w-0")}>
      <div
        className={cn(
          "relative isolate overflow-hidden bg-black",
          fill ? "absolute inset-0" : className,
          fill && className,
        )}
      >
        {media.src ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <CoverArt title="" hue={hue} className="absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {(kicker || (showTitle && title)) && (
          <div className="absolute inset-x-0 top-0 z-10 p-3 sm:p-4">
            {kicker ? (
              <p className="font-heading text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                {kicker}
              </p>
            ) : null}
            {showTitle && title ? (
              <p className="mt-1 font-heading text-lg leading-tight font-semibold text-balance text-white sm:text-xl">
                {title}
              </p>
            ) : null}
          </div>
        )}
        {overlayCredit ? (
          <div className="absolute inset-x-0 bottom-0 z-10">
            <ImageCredit credit={media} overlay compact={compact} />
          </div>
        ) : null}
      </div>
      {captionCredit ? (
        <figcaption className="mt-2 px-0.5">
          <ImageCredit credit={media} />
          <span className="mt-1 block text-[10px] text-muted-foreground/80">
            {media.licenseNote}
          </span>
        </figcaption>
      ) : null}
      <meta itemProp="copyrightHolder" content={media.copyrightOwner} />
      <meta itemProp="creditText" content={media.creditLine} />
    </figure>
  );
}
