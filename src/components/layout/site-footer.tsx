import Link from "next/link";
import { gameHubs } from "@/lib/games";
import { platformNav, primaryNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Independent Australian coverage of video games — reviews scored out
            of 10, news, previews, and the arguments worth having.
          </p>
        </div>
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Sections
          </p>
          <ul className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Platforms
          </p>
          <ul className="space-y-2 text-sm">
            {platformNav.map((item) => (
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
            Evergreen hubs
          </p>
          <ul className="space-y-2 text-sm">
            {gameHubs.map((game) => (
              <li key={game.slug}>
                <Link
                  href={`/games/${game.slug}/`}
                  className="hover:text-primary"
                >
                  {game.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/feed.xml" className="hover:text-primary">
                RSS feed
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Editorial site for{" "}
          {siteConfig.url.replace("https://", "")}. Not affiliated with the
          publishers we cover.
        </p>
      </div>
    </footer>
  );
}
