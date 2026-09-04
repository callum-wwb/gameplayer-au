import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchForm } from "@/components/layout/search-form";
import { gameHubs } from "@/lib/games";
import { platformNav, primaryNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_18px_-6px_var(--neon)]">
            <Gamepad2 className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-bold tracking-tight">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>
        <nav
          className="ml-4 hidden items-center gap-4 md:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm font-semibold tracking-wide text-foreground/85 uppercase transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-full max-w-xs lg:block">
          <SearchForm compact />
        </div>
      </div>
      <div className="border-t border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2 text-xs">
          <span className="shrink-0 font-heading font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Hubs
          </span>
          {gameHubs.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}/`}
              className="shrink-0 text-foreground/80 hover:text-primary"
            >
              {game.shortTitle}
            </Link>
          ))}
          <span className="mx-1 h-3 w-px shrink-0 bg-border" />
          {platformNav.map((platform) => (
            <Link
              key={platform.href}
              href={platform.href}
              className="shrink-0 text-foreground/80 hover:text-primary"
            >
              {platform.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
