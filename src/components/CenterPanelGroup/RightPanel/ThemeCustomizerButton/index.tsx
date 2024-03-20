import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useThemeStyle } from "@/stores/ThemeStyleStore";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState, useEffect } from "react";

export const ThemeCustomizerButton = () => {
  const { resetStyle, setStyle, style } = useThemeStyle();
  const [css, setCss] = useState<string>();
  useEffect(() => {
    // console.log("style is: ", style);
    setCss(style || "");
  }, [style]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          //   variant={"outline"}
          className="flex w-fit flex-row justify-between gap-3"
        >
          Customize theme
          <MagicWandIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 p-0">
        <ScrollArea className="flex h-full flex-col items-center justify-center gap-5 p-5">
          <DialogHeader>
            <DialogTitle>Custom Theme CSS</DialogTitle>
            <DialogDescription asChild>
              <div>
                You will need to get the CSS for your theme from somewhere like:
                <ul className="flex flex-col gap-1 px-4 py-2">
                  <li className="list-disc">
                    <a
                      className="text-foreground underline"
                      href="https://ui.shadcn.com/themes"
                      target="_blank"
                    >
                      Shadcn official theme page
                    </a>
                    <ul className="flex flex-col gap-1 px-4 py-2">
                      <li className="list-disc">
                        Created the base components this site is built on!
                      </li>
                    </ul>
                  </li>
                  <li className="list-disc">
                    <a
                      className="text-foreground underline"
                      href="https://zippystarter.com/tools/shadcn-ui-theme-generator"
                      target="_blank"
                    >
                      Shadcn UI theme generator
                    </a>{" "}
                    (zippystarter.com)
                    <ul className="flex flex-col gap-1 px-4 py-2">
                      <li className="list-disc">
                        Recommended! Just copy & paste
                      </li>
                    </ul>
                  </li>
                  <li className="list-disc">
                    <a
                      className="text-foreground underline"
                      href="https://gradient.page/tools/shadcn-ui-theme-generator"
                      target="_blank"
                    >
                      Shadcn UI Theme Generator
                    </a>{" "}
                    (gradient.page)
                    <ul className="flex flex-col gap-1 px-4 py-2">
                      <li className="list-disc">Only solid colors work here</li>
                    </ul>
                  </li>
                  <li className="list-disc">
                    <a
                      className="text-foreground underline"
                      href="https://oxidus.vercel.app/"
                      target="_blank"
                    >
                      Oxidus
                    </a>{" "}
                    (JairHuamanBellido)
                    <ul className="flex flex-col gap-1 px-4 py-2">
                      <li className="list-disc">
                        The most advanced and customizable theme generator I
                        have found
                      </li>
                    </ul>
                  </li>
                </ul>
                Then paste it below
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center gap-3 p-1 pb-5">
            <span>
              Do <span className="underline">not</span> include the{" "}
              <code className="rounded-sm bg-secondary px-1">@layer base</code>{" "}
              directive
            </span>
            <span>Should look like this:</span>
            <pre className="rounded-md bg-secondary p-2">
              <code>
                :root &#123;
                <br />
                ...
                <br />
                &#125;
                <br />
                .dark &#123;
                <br />
                ...
                <br />
                &#125;
              </code>
            </pre>
            <Textarea
              value={css}
              onInput={(e) => setCss(e.currentTarget.value)}
              //   placeholder="past CSS here..."
              className="h-fit"
            />
          </div>
        </ScrollArea>
        <DialogFooter className="gap-5 border-t-[1px] p-5">
          <DialogClose asChild>
            <Button
              className="bg-transparent text-destructive hover:bg-destructive/70 hover:text-destructive-foreground"
              onClick={() => resetStyle()}
            >
              Reset
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => css && setStyle(css)}>Apply</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
