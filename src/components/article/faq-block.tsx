export function FaqBlock({
  title,
  faq,
}: {
  title: string;
  faq: { question: string; answer: string }[];
}) {
  if (!faq.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-border/70 bg-card/40 p-5">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <dl className="mt-4 space-y-4">
        {faq.map((item) => (
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
