import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CoverMedia } from "@/lib/media";

export async function coverDataUri(media: CoverMedia): Promise<string | null> {
  if (!media.src || media.src.startsWith("http")) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    media.src.replace(/^\//, ""),
  );

  try {
    const buffer = await readFile(filePath);
    const ext = path.extname(filePath).slice(1).toLowerCase();
    const mime = ext === "jpg" ? "jpeg" : ext || "jpeg";
    return `data:image/${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}
