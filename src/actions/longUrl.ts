import { getLinkById } from "@/db/queries";

export async function longUrl(id: string): Promise<string | null> {
  const link = await getLinkById(id);
  if (link) return link.url;
  return null;
}
