import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm({
  defaultValue = "",
  compact = false,
}: {
  defaultValue?: string;
  compact?: boolean;
}) {
  return (
    <form action="/search" method="get" className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search reviews, news, hubs…"
          aria-label="Search GamePlayer"
          className="bg-background/70 pl-8"
        />
      </div>
      <Button type="submit" size={compact ? "sm" : "default"}>
        Search
      </Button>
    </form>
  );
}
