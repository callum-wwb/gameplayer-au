import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        404
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold">Game over</h1>
      <p className="mt-3 text-muted-foreground">
        That URL is not in the GamePlayer archive. It may have moved, or it may
        never have shipped.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to the homepage</Link>
      </Button>
    </div>
  );
}
