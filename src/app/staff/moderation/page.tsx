import { ModerationDesk } from "@/components/community/moderation-desk";
import { moderationConfigured } from "@/lib/moderation-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Moderation",
  description: "Staff moderation queue. Not a public page.",
  robots: { index: false, follow: false },
};

export default function ModerationPage() {
  const configured = moderationConfigured();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Staff
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Moderation
      </h1>
      <p className="mt-3 mb-8 text-sm text-muted-foreground">
        Pending comments and tips. Approve to publish, reject to hide. This
        route is disallowed in robots.txt and is not in the public nav.
      </p>
      {configured ? (
        <ModerationDesk />
      ) : (
        <p className="rounded-xl border border-border/70 bg-card/40 px-4 py-5 text-sm text-muted-foreground">
          Set <code className="font-mono">MODERATION_SECRET</code> (8+ characters)
          on the server before this queue will unlock.
        </p>
      )}
    </div>
  );
}
