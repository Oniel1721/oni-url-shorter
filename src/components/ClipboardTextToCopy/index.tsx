"use client";

import { ClipboardCopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type ClipboardTextToCopyProps = {
  id: string;
};

export const ClipboardTextToCopy = (props: ClipboardTextToCopyProps) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/${props.id}`);
    return () => {
      toast.dismiss();
    };
  }, [props.id]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    toast("Copied to clipboard", {
      description: url,
    });
  };

  return (
    <Button
      variant={"outline"}
      autoFocus
      className="h-12 text-base max-w-full overflow-clip text-clip cursor-pointer select-text text-primary border-foreground sm:text-2xl flex gap-x-1 justify-between items-center focus-visible:text-primary focus-visible:border-primary hover:border-primary hover:text-primary hover:bg-inherit focus-visible:outline-foreground"
      onClick={copyToClipboard}
    >
      {url}
      <ClipboardCopyIcon className="hidden sm:block" />
    </Button>
  );
};
