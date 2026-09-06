"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { SearchForm } from "@/components/layout/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getEvergreenHubs } from "@/lib/games";
import { platformNav, primaryNav } from "@/lib/site";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading">GamePlayer</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 pb-8">
          <SearchForm compact />
          <nav className="flex flex-col gap-2" aria-label="Sections">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading text-base font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Separator />
          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Platforms
            </p>
            <nav className="flex flex-col gap-2" aria-label="Platforms">
              {platformNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Game hubs
            </p>
            <nav className="flex flex-col gap-2" aria-label="Game hubs">
            {getEvergreenHubs().map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}/`}
                className="text-sm"
              >
                {game.shortTitle}
              </Link>
            ))}
            <Link href="/games/" className="text-sm text-muted-foreground">
              All game hubs
            </Link>
            <Link href="/community/" className="text-sm text-muted-foreground">
              Community
            </Link>
            <Link href="/about/" className="text-sm text-muted-foreground">
              About
            </Link>
            <Link href="/credits/" className="text-sm text-muted-foreground">
              Media credits
            </Link>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
