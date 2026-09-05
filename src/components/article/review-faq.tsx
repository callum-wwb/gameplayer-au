import { FaqBlock } from "@/components/article/faq-block";
import type { Article } from "@/lib/types";

export function ReviewFaq({ article }: { article: Article }) {
  if (!article.faq?.length) {
    return null;
  }

  return (
    <FaqBlock
      title={`${article.gameTitle ?? article.title}: quick answers`}
      faq={article.faq}
    />
  );
}
