import type { Article } from "@/lib/types";

export function ReviewFaq({ article }: { article: Article }) {
  if (!article.faq?.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-border/70 bg-card/40 p-5">
      <h2 className="font-heading text-xl font-semibold">
        {article.gameTitle ?? article.title}: quick answers
      </h2>
      <dl className="mt-4 space-y-4">
        {article.faq.map((item) => (
          <div key={item.question}>
            <dt className="font-heading text-sm font-semibold">{item.question}</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
