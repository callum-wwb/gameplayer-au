import Link from "next/link";
import { Rss } from "lucide-react";
import { SearchForm } from "@/components/layout/search-form";
import { getEvergreenHubs } from "@/lib/games";
import { classicPlatforms, extraPlatforms, primaryNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-[#0b0d14]">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-4 text-center">
        <p className="font-heading text-xl font-bold">
          {siteConfig.name}
          <span className="text-primary">™</span>
        </p>
        <p className="mt-2 font-heading text-base font-semibold tracking-wide text-primary">
          {siteConfig.slogan}™
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Site index
          </p>
          <ul className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Platforms
          </p>
          <ul className="space-y-2 text-sm">
            {[...classicPlatforms, ...extraPlatforms].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            About GamePlayer
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about/" className="hover:text-primary">
                About us
              </Link>
            </li>
            <li>
              <Link href="/credits/" className="hover:text-primary">
                Media credits
              </Link>
            </li>
            <li>
              <Link href="/games/" className="hover:text-primary">
                Game hubs
              </Link>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                Contact us
              </a>
            </li>
            <li>
              <Link href="/feed.xml" className="hover:text-primary">
                Subscribe
              </Link>
            </li>
            {getEvergreenHubs().map((game) => (
              <li key={game.slug}>
                <Link href={`/games/${game.slug}/`} className="hover:text-primary">
                  {game.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Find a story
          </p>
          <SearchForm compact />
          <Link
            href="/feed.xml"
            className="mt-4 inline-flex items-center gap-2 text-sm hover:text-primary"
          >
            <Rss className="size-4" />
            RSS feed
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.slogan}.
          Editorial site for {siteConfig.url.replace("https://", "")}. Game
          titles, characters, artwork, hardware names, and trademarks belong to
          their respective owners and publishers — not to GamePlayer.{" "}
          <Link href="/credits/" className="underline-offset-2 hover:text-primary hover:underline">
            Media credits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
