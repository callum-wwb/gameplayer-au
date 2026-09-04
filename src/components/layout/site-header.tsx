import Link from "next/link";
import { Gamepad2, Monitor, Smartphone, Joystick } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchForm } from "@/components/layout/search-form";
import { getEvergreenHubs } from "@/lib/games";
import {
  classicPlatforms,
  extraPlatforms,
  originalHubs,
  primaryNav,
  siteConfig,
} from "@/lib/site";

const classicIcons = {
  "/pc": Monitor,
  "/mobile": Smartphone,
  "/classic": Joystick,
} as const;

export function SiteHeader() {
  const extraHubs = getEvergreenHubs().filter(
    (game) => !originalHubs.some((hub) => hub.href.includes(game.slug)),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_-6px_var(--neon)]">
            <Gamepad2 className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-bold tracking-tight">
              {siteConfig.name}
              <span className="text-primary">™</span>
            </span>
            <span className="hidden text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>
        <div className="ml-auto hidden w-full max-w-xs md:block">
          <SearchForm compact />
        </div>
      </div>

      <nav
        className="hidden border-t border-border/60 md:block"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm font-semibold tracking-wide text-foreground/90 uppercase transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          {originalHubs.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="font-heading text-sm font-semibold tracking-wide text-foreground/80 uppercase transition-colors hover:text-primary"
            >
              {hub.label}
            </Link>
          ))}
          {extraHubs.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}/`}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {game.shortTitle}
            </Link>
          ))}
          <Link
            href="/games/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            All hubs
          </Link>
        </div>
      </nav>

      <div className="border-t border-border/60 bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
          <span className="mr-1 font-heading text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Platforms
          </span>
          {classicPlatforms.map((platform) => {
            const Icon = classicIcons[platform.href as keyof typeof classicIcons];
            return (
              <Link
                key={platform.href}
                href={platform.href}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/70 px-2.5 py-1 text-xs font-medium hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-3.5" />
                {platform.label}
              </Link>
            );
          })}
          <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
          {extraPlatforms.map((platform) => (
            <Link
              key={platform.href}
              href={platform.href}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              {platform.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
