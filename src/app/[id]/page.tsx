"use server";

import { longUrl } from "@/actions/longUrl";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const url = await longUrl(id);

  if (!url) {
    redirect("/");
  }

  redirect(url);
}
