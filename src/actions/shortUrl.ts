import { createLink } from "@/db/queries";

export async function shortUrl(url: string): Promise<string> {
  const link = await createLink(url);
  return link.id;
}
