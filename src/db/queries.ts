import { eq } from "drizzle-orm";
import { db } from ".";
import { links, type Link } from "./links";

const getLinkByUrl = async (url: string): Promise<Link | null> => {
  const link = await db
    .select()
    .from(links)
    .where(eq(links.url, url))
    .execute();

  return link[0] ?? null;
};

const generateId = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const length = 8;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const createLink = async (url: string): Promise<Link> => {
  const link = await getLinkByUrl(url);
  if (link) return link;
  const newId = generateId();
  const result = await db
    .insert(links)
    .values({ url, id: newId })
    .returning()
    .execute();
  return result[0];
};

export const getLinkById = async (id: string): Promise<Link | null> => {
  const link = await db.select().from(links).where(eq(links.id, id)).execute();
  return link[0] ?? null;
};
