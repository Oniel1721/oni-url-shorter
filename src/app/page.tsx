"use server";

import { shortUrl } from "@/actions/shortUrl";
import { ClipboardTextToCopy } from "@/components/ClipboardTextToCopy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";

export default async function Home(props: { searchParams: { url?: string } }) {
  const url = props.searchParams.url;
  const id = url ? await shortUrl(url) : null;

  return (
    <section className="flex-grow p-8 flex flex-col">
      <Label
        htmlFor="url"
        className="text-center text-2xl md:text-start sm:text-4xl md:text-5xl flex items-end text-muted-foreground text-pretty"
      >
        Short your long URL bellow{" "}
        <ChevronDownIcon className="hidden sm:block sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </Label>
      <div className="flex-grow flex flex-col w-full justify-evenly md:justify-center gap-y-12">
        <form method="GET" className="flex w-full flex-col md:flex-row gap-y-2">
          <Input
            defaultValue={url || ""}
            name="url"
            id="url"
            autoFocus={!Boolean(url)}
            type="url"
            placeholder="Enter your long URL"
            required
            className="rounded-r-none outline-none focus:outline-none text-xl h-12 w-full border-muted-foreground placeholder:text-destructive"
          />
          <Button
            className="rounded-l-none h-12 text-xl font-bold uppercase"
            variant={"outline"}
            type="submit"
          >
            Shorten
          </Button>
        </form>
        <div className="flex flex-col gap-y-2 w-full">
          <h2 className="text-base sm:text-lg flex items-end w-full text-muted-foreground">
            Shorten url will appear bellow <ChevronDownIcon size={24} />
          </h2>
          {id && <ClipboardTextToCopy id={id} />}
        </div>
      </div>
    </section>
  );
}
