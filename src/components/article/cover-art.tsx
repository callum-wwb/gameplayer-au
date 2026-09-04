import { cn } from "@/lib/utils";

type CoverArtProps = {
  title: string;
  hue: number;
  className?: string;
  kicker?: string;
};

export function CoverArt({ title, hue, className, kicker }: CoverArtProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-black text-white",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 70% 18%) 0%, hsl(${(hue + 40) % 360} 55% 10%) 52%, hsl(${(hue + 80) % 360} 40% 6%) 100%)`,
      }}
      aria-hidden="true"
    >
      <div className="cover-grid absolute inset-0 opacity-50" />
      <div
        className="absolute -right-8 -bottom-10 size-48 rounded-full blur-2xl"
        style={{ background: `hsl(${hue} 90% 55% / 0.35)` }}
      />
      <div
        className="absolute top-6 left-6 size-24 rounded-full blur-xl"
        style={{ background: `hsl(${(hue + 160) % 360} 80% 60% / 0.25)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {kicker || title ? (
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          {kicker ? (
            <p className="mb-1 font-heading text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
              {kicker}
            </p>
          ) : null}
          {title ? (
            <p className="font-heading text-lg leading-tight font-semibold text-balance sm:text-xl">
              {title}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
